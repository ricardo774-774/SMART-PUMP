import { Low, JSONFile } from 'lowdb';
import path from 'path';

// Adapter Configuration
const dbPath = path.resolve('src/data/users.json');
const adapter = new JSONFile(dbPath);
const db = new Low(adapter);

export const updatedUser = async(req, res) => {
   try {
      const { id } = req.params;
      const {  
         age,
         eyeColor,
         company,
         phone,
         address,
      } = req.body;
      
      await db.read();
      db.data ||= { users: [] }; // Init if data empty

      // Find User by Id
      const user = db.data.users.find(u => u.guid === id);
      if (!user) {
         return res.status(404).json({
            msg: 'User not found'
         });
      }

      // Real changes?
      if(user.age !== age) { user.age = age };
      if(user.eyeColor !== eyeColor) { user.eyeColor = eyeColor };
      if(user.company !== company) { user.company = company };
      if(user.phone !== phone) { user.phone = phone };
      if(user.address !== address) { user.address = address };

      // Save data
      await db.write();

      return res.status(200).json({
         msg: 'User updated successfully',
         user
      });

   } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({
         msg: 'Internal server error',
      });
   }
}

export const deleteUser = async (req, res) => {
   try {
      let { id } = req.params;

      // Init db
      await db.read();
      db.data ||= { users: [] };

      // Find User by Id
      const user = db.data.users.find(u => u.guid === id);
      if (!user) {
         return res.status(404).json({
            msg: 'User not found'
         });
      }
   
      // Delete user logically balance
      user.isActive = false;
   
      // Save data
      await db.write();
   
      res.status(200).json({
         msg: 'User deleted successfully',
         user: true
      });
      
   } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({
         msg: 'Internal server error',
      });
   }

}


export const setUserBalance = async (req, res) => {
   try {
      let { balance } = req.body; 
      let { id } = req.params;  
 
      // Init db
      await db.read();
      db.data ||= { users: [] };

      // Find User by Id
      const user = db.data.users.find(u => u.guid === id);
      if (!user) {
         return res.status(404).json({
            msg: 'User not found'
         });
      }
   
      // Update balance
      user.balance = balance;
   
      // Save data
      await db.write();
   
      res.status(200).json({
         msg: 'Balance updated successfully',
         balance: user.balance,
      });
   } catch (error) {
      console.error('Error updating user balance:', error);
      res.status(500).json({
         msg: 'Internal server error',
      });
   }
 };