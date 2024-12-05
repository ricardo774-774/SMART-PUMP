import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import authRouter from "../routes/auth.route.js";
import userRouter from "../routes/user.route.js";
import rolesRouter from "../routes/role.route.js";

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = createServer(this.app);
        this.prefix = process.env.PREFIX || '/api/v1';
        this.paths = {
            auth: `${this.prefix}/auth`,
            users: `${this.prefix}/users`,
            roles: `${this.prefix}/roles`,
        };

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use( cors());

        // Read Body
        this.app.use( express.json() );

        // Shows logs from http Req
        this.app.use( morgan('dev') );
    }

    routes() {
        this.app.use(this.paths.auth, authRouter);
        this.app.use(this.paths.users, userRouter);
        this.app.use(this.paths.roles, rolesRouter);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
        });
    }
};

export default Server;