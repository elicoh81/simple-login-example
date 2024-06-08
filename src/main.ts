import express from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import routes from "./routes/userRoute";

const app = express();

connect("mongodb://localhost:27017", {
    dbName: "testdb"
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    const authorization = req?.headers?.authorization?.split(' ');
    if (authorization && authorization[0] === 'JWT') {
        jwt.verify(authorization[1], "SOMEKEY", (err, decode) => {
            if (err) {
                req.body.user = undefined;
            }
            req.body.user = decode;
            next();
        })
    } else {
        req.body.user = undefined;
        next();
    }
});

const port = process.env.PORT || 3000;


routes(app);

app.use(express.static('public'));


app.listen(port, () => {
    console.log("server is up and running!!");
})