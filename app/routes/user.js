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
    router.get('/', (req,res)=>{res.json({msg:'root'})})
    router.post("/new", UserController.create);
    router.put("/:firebase_id", UserController.update )
    router.get('/:firebase_id', UserController.getDetail)
    router.delete('/:firebase_id', UserController.delete);
        //.get()
        //.post()
    return router
};

export {user}
// findOne({ where: { title: 'aProject' } })
