import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

export class User {
    constructor(
        first,
        last,
        email,
    ){
        this._id = new mongoose.Types.ObjectId();;
        this.guid = uuidv4();
        this.isActive = true;
        this.balance = "0";
        this.picture = process.env.DEFAULT_IMG || "";
        this.age = "";
        this.eyeColor = "";
        this.name = {first, last};
        this.company = "";
        this.email = email;
        this.password = "";
        this.phone = "";
        this.address = "";
        this.role_id = "6750fb0deb59027051418f8c"
    }
}