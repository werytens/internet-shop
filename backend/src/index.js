import express from "express";
import bodyParser from "body-parser";
import createRoute from "./routes/post.js";
import getRoute from "./routes/get.js";
import deleteRoute from "./routes/delete.js";
import patchRoute from "./routes/patch.js";
import cors from "cors";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", getRoute);
app.post("/", createRoute);
app.delete("/", deleteRoute);
app.patch("/", patchRoute);

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
