// import {router} from "./index.js"
// import { userController } from "../controllers/user.js"
// const Op = db.Sequelize.Op;
const viagem = (router) => {
    // TODO: Criar viagem    => POST /new
    // TODO: Editar viagem   => PUT /edit/:id
    // TODO: Deletar viagem  => DELETE /:id
    // TODO: Listar viagens  => GET /
    // TODO: Detalhar viagem => GET /:id

    router
        .get("/", (req,res)=>{res.json({'msg':'nada'})})
    //.get()
    //.post()
    return router
};

export { viagem }
