import express from 'express';
// import {create} from "../controllers/tutorial.controller.js";

import {user} from "./user.js"
let router = express.Router()

const routingMiddleWare = (app) => {

    app.use("/user", user(router));



    // app.use('/api/tutorials', router);
};
export { routingMiddleWare }
