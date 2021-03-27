import db from "../models/index.js";
import { user } from "../routes/user.js";

const UserController = {
    "create" : async (req, res) => {
        try{
            const usuario = {
                email: req.body.email,
                estado_conta: false,
                nome_usuario: req.body.nome,
                sexo: req.body.sexo,
                dt_nascimento: new Date(req.body.dt_nascimento * 1000).toISOString().slice(0, 19).replace('T', ' '),
                id_firebase: req.body.firebase
            };

            const users = await db.sequelize.models.usuario.create(usuario);
            return res.status(201).json({
                message: "Criado", 
                status: "Success"})} 
        catch(erro){
            if (erro.original.errno === 1062){
                return res.status(400).json({
                    message: "Campo chave duplicado",
                    status: "Failure" })
            }
            else {
                return res.status(500).json({
                    message: "Incorrect",
                    status: "Failure" })
                }
        }    
    },


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
    }
}
    
export default UserController ;