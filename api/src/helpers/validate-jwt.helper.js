import jwt from "jsonwebtoken";
import { Low, JSONFile } from 'lowdb';
import path from 'path';

// Adapter Configuration
const dbPath = path.resolve('src/data/users.json');
const adapter = new JSONFile(dbPath);
const db = new Low(adapter);


export const checkJWT = async(token='') => {

    const { uid } = jwt.verify( token, process.env.SECRETKEY );

    await db.read();
    db.data ||= { users: [] }; 

    // User Exist?
    const user = db.data.users.find(
        u => u.guid === uid
    );
    if (!user || user.isActive === false) {
        return { msg: 'User do not exist, create an account' };
    }

    return user;

}