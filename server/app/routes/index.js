import express from 'express';

import {user} from "./user.js"
import {viagem} from "./viagem.js"

import {auth} from "../middlewares/authMiddleware.js"
let router = express.Router()

const routingMiddleWare = (app) => {
    
    app.use("/user", user(router));
    app.use("/viagem", auth, viagem(router))
    // Retrieve all Tutorials
    // router.get("/", tutorials.findAll);

    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);

    // // Retrieve a single Tutorial with id
    // router.get("/:id", tutorials.findOne);

    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);

    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);

    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);

    // app.use('/api/tutorials', router);
};
export { routingMiddleWare }
