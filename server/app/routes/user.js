// import {router} from "./index.js"
import userController
 from "../controllers/user.js"
// const Op = db.Sequelize.Op;
const user = (router) =>{
    router
        .put("/", userController.update )
        //.get()
        //.post()
    return router
};

export {user}