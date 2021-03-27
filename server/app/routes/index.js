import express from 'express';
import {user} from "./user.js"
import {viagem} from "./viagem.js"
let router = express.Router()

const routingMiddleWare = (app) => {
    
    app.use("/user", user(router));
    app.use("/viagem", viagem(router));
    app.use("/new", viagem)
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
