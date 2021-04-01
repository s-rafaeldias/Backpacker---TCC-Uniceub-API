// import {router} from "./index.js"
import UserController
 from "../controllers/user.js"
// const Op = db.Sequelize.Op;
const user = (router) =>{
    // TODO: Cadastrar => POST /new
    // TODO: Editar    => PUT /edit/:id
    // TODO: Deletar   => DELETE /:id
    // TODO: Detalhar  => GET /:id

    // Create a new Tutorial
    router.post("/new", UserController.create);

    router
        .put("/edit", UserController.update )
        //.get()
        //.post()
    return router
};

export {user}
