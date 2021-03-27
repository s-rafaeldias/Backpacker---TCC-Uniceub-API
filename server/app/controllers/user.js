import db from "../models/index.js";
const user =

// Create and Save a new Tutorial
exports.create = (req, res) => {
   // Validate request
   if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const usuario = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Usuario.create(usuario)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao criar novo usuário"
      });
    });
};

const UserController = {
    "update" : async (req, res) => {
        const { email, payload } = req.body
        const users = await db.sequelize.models.usuario.update(payload,{
            where: {
                email: email
            }
        })
        if (users[0] == 1) {
            return res.status(200).json({
                message: "Updated.", 
                status: "Success"
            })
        }
        return res.status(500).json({
            message: "Incorrect",
            status: "Failure" })
            
        // const users = db.sequelize.models.usuario.update(payload,
        //     {
        //         where: {
        //             email: email
        //         }
        //     })
        //     .then((data) => {
        //         let status = data[0]
        //         if (status == 1) {
        //             res.status(200).json({
        //                 message: "Update com sucesso.",
        //                 status: "Success"})
        //         }
        //         res.json({ "status": "Failure" },500)
        //     })
            // .catch(err => {
            //     console.log(err);
            //     res.send("Nao foi possivel", 500)
            // });
        // res.send("Nao foi possivel", 500)
    }
}
    
export default UserController ;