import db from "../models/index.js";

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