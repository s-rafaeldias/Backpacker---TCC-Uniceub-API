import express from "express";

import userRoutes from "./user";
import travelRoutes from "./travel";
import spotRoutes from "./spot";
import expenseRoutes from "./expense";


export const routingMiddleWare = (app) => {
  app.use("/user", userRoutes);
  app.use("/travel", travelRoutes);
  app.use("/spot", spotRoutes);
  app.use("/expense", expenseRoutes);

  // app.use("/viagem", viagem(router));
  // app.use("/new", viagem)
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
