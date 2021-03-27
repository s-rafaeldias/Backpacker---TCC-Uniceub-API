// import {router} from "./index.js"
import userController
 from "../controllers/user.js"
// const Op = db.Sequelize.Op;
const user = (router) =>{
    // TODO: Cadastrar => POST /new
    // TODO: Editar    => PUT /edit/:id
    // TODO: Deletar   => DELETE /:id
    // TODO: Detalhar  => GET /:id

    // Create a new Tutorial
    router.post("/new", userController.create);

    router
        .put("/", userController.update )
        //.get()
        //.post()
    return router
};

export {user}
