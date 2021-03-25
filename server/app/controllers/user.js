import db from "../models/index.js";

const UserController = {
    "update" : (req, res) => {
        const { email, payload } = req.body
        const users = db.sequelize.models.usuario.update(payload,
            {
                where: {
                    email: email
                }
            })
            .then((data) => {
                let status = data[0]
                if (status == 1) {
                    res.json({
                        "message": "Update com sucesso.",
                        "status": "Success"
                    })
                }
                res.json({ "status": "Failure" })
            })
            .catch(err => {
                console.log(err);
                res.status(500).send("Nao foi possivel.")
            });
    }
}
    
export default UserController ;