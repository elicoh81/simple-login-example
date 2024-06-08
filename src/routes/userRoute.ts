import { Express } from "express"
import { login, register, users } from "../controllers/userController";

const routes = (app: Express) => {
    app.route('/login')
        .post(login);

    app.route('/register')
        .post(register);

    app.route('/users')
        .get(users);
}

export default routes;