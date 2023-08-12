// src/app.ts
import express, {json, urlencoded, Response as ExResponse, Request as ExRequest} from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes";
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://127.0.0.1/testTS';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to mongo successfully!'));

const db = mongoose.connection;

console.log('hello from typescript nodeJS')
console.log('hello from git hahaha')

console.log('hello from git sub feature')

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

export const app = express();

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(
        swaggerUi.generateHTML(await import("../swagger.json"))
    );
});



// Use body parser to read sent json payloads
app.use(
    urlencoded({
        extended: true,
    })
);
app.use(json());

RegisterRoutes(app);