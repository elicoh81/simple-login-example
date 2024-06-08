import mongoose from "mongoose";
import { User } from "../schemas/userSchema";
import bc from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req: any, res: any, next: Function) {

    const user = await User.findOne({ username: req.body.username });
    if (user) {
        const validated = bc.compareSync(req.body.password, user.hashPassword);
        if (validated) {
            const token = jwt.sign({ name: user.name, lastname: user.lastName, email: user.email }, "SOMEKEY");
            res.status(200).send(token);
            next();
        } else {
            res.status(401).send("Incorrect password or username");
        }
    } else {
        res.status(401).send("Incorrect password or username");
    }
}

export async function register(req: any, res: any, next: Function) {
    const user = new User({ username: req.body.username, email: req.body.email, hashPassword: await bc.hash(req.body.password, 5), name: req.body.name, lastName: req.body.lastname });
    await user.save().then(val => {
        val.hashPassword = "";
        res.status(201).send(val);
        next();
    }).catch(err => {
        res.status(304).send(`User already exist`);
        console.log(err);
    });
}

export async function users(req: any, res: any, next: Function) {
    if (!req.body.user) {
        res.status(401).send("Please login");
    } else {
        const users = await User.find().limit(10);
        if (users) {
            res.status(200).send(users.map(u => ({ name: u.name, lastName: u.lastName })));
        } else {
            res.status(500).send("No User exists");
        }
    }
    next();
}
