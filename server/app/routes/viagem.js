// import {router} from "./index.js"
// import { userController } from "../controllers/user.js"
// const Op = db.Sequelize.Op;
const viagem = (router) => {
    router
        .put("/", (req,res)=>{res.json({'msg':'nada'})})
    //.get()
    //.post()
    return router
};

export { viagem }