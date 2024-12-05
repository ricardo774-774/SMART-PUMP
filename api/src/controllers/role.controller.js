import { isValidObjectId } from "mongoose";
import { Low, JSONFile } from 'lowdb';
import path from 'path';

// Adapter Configuration
const dbPath = path.resolve('src/data/roles.json');
const adapter = new JSONFile(dbPath);
const db = new Low(adapter);

export const getRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Is Mongo Id?
        if (!isValidObjectId(id)) {
            throw new Error('Error in id, is not a valid MongoId');
        }

        // Read role data
        await db.read();
        db.data ||= { roles: [] };

        // Looking for a role
        const role = db.data.roles.find(r => r._id === id);
        if (!role) {
            throw new Error('Role does not exist');
        }
        return res.status(200).json({ role });
        
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(400).json({
            msg: error.message || 'Error in id, looking for a role',
        });
    }
};