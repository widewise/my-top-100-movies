import express from 'express';
import { graphqlHTTP } from "express-graphql";
import * as mongoose from "mongoose";
import schema from "./schema"
import cors from "cors";
import dotenv from "dotenv";
import { verifyToken } from "./utils/jwt";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.set("strictQuery", false);
mongoose
    .connect("mongodb://127.0.0.1", {
        dbName: "top100movies",
        autoIndex: true,
        autoCreate: true,
    })
    .then(() => console.log("Connected to database..."))
    .catch(err => console.error(err));

app.use(verifyToken);

app.use('/graphql', graphqlHTTP(req => ({
    schema,
    graphiql: true,
    context: {
        // @ts-ignore
        isAuth: req.isAuth,
        // @ts-ignore
        userId: req.userId,
        // @ts-ignore
        userType: req.userType,
    },
})));


app.get('/', (req, res) => {
   res.send('Hello world!');
});

app.listen(5000, () => {
    console.log(`Express listen server`);
});