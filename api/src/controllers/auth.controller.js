import bcrypt from "bcryptjs";
import { Low, JSONFile } from 'lowdb';
import path from 'path';
import { User } from "../models/user.model.js";
import { createJWT } from "../helpers/generate-jwt.helper.js";
import { checkJWT } from "../helpers/validate-jwt.helper.js";

// Adapter Configuration
const dbPath = path.resolve('src/data/users.json');
const adapter = new JSONFile(dbPath);
const db = new Low(adapter);


export const login = async(req, res) => {
    try {
        const { email, password } = req.body; 
        // Read or create db.json
        await db.read();
        db.data ||= { users: [] }; 

        // User Exist?
        const user = db.data.users.find(
            u => u.email === email
        );
        if (!user || user.isActive == false) {
            return res.status(400).json({
                msg: 'User do not exist, create an account'
            });
        }

        // Comapare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                msg: 'Email or password incorrects'
            });
        }

        // Create Token
        const token = await createJWT( user.guid );
        
        return res.status(200).json({
            msg: 'Welcome to Smart Pump',
            user,
            token
        });

    } catch (error) {
        console.log('Error from login: ',error);
        return res.status(500).json({
            msg: 'Error validating data, try it leter',
        });
    }
}


export const signin = async(req, res) => {
    try {
        let { 
            name="", 
            last_name="", 
            email="", 
            password="" 
        } = req.body;

        email = email.toLowerCase();

        // Read or create db.json
        await db.read();
        db.data ||= { users: [] }; 

        // User Already Exist?
        const user = db.data.users.find(
            u => u.email === email
        );
        if (user) {
            return res.status(400).json({
                msg: 'User already exist'
            });
        }

        // Create new User
        const newUser = new User(name, last_name, email);
        newUser.password = await setPassword(password);

        // Save User
        db.data.users.push(newUser);
        await db.write();

        // Create Token
        const token = await createJWT( newUser.guid );

        return res.status(201).json({
            msg: 'User created succesfully',
            user: newUser,
            token
        });

    } catch (error) {
        console.log('Error from signin: ',error);
        return res.status(400).json({
            msg: 'Error creating the user'
        });
    }
}


export const validateJWT = async(req, res) => {
    try {
        const { token } = req.body;

        let user = await checkJWT(token);

        console.log(user);

        if (user.msg) {
            return res.status(400).json({
                msg: 'Error validating token'
            });
        }

        return res.status(200).json({
            msg: 'Token ok',
            user,
        });

    } catch (error) {
        console.log('Error from validateJWT: ',error);
        return res.status(400).json({
            msg: 'Error from server, try it leter'
        });
    }
}


const setPassword = async(password) => {
    if (!password) {
        throw new Error("Password should not be empty");
    }
    try {
        let encrypted = +process.env.ENCRYPTED;
        const salt = await bcrypt.genSalt(encrypted);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        console.error('Error encrypting password:', err);
        return res.status(500).json({
            msg: 'Error encrypting password'
        });
    }
}