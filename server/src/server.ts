import express from 'express';
import { graphqlHTTP } from "express-graphql";
import * as mongoose from "mongoose";
import schema from "./schema"
import cors from "cors";

const app = express();
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

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));


app.get('/', (req, res) => {
   res.send('Hello world!');
});

app.listen(5000, () => {
    console.log(`Express listen server`);
});