import db from "../models/index.js";
import {convertTimeStampToDate, timeNow} from "../helper/convertDate.js"

const UserController = {
    "create" : async (req, res) => {
        try{
            const usuario = {
                email: req.body.email,
                email_verificado: false,
                nome_usuario: req.body.nome,
                sexo: req.body.sexo,
                dt_nascimento: convertTimeStampToDate(req.body.dt_nascimento),
                firebase_id: req.body.firebase_id
            };

            const user = await db.sequelize.models.usuario.create(usuario);
            return res.status(201).json({
                message: "Criado", 
                status: "Success"})} 
        catch(erro){
            console.log(erro);
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
        try{
            let {payload} = req.body
            let {firebase_id} = req.body
            if ( ((payload.email || payload.nome_usuario || payload.sexo || payload.dt_nascimento) !== undefined) && ((req.body.firebase_id && req.body.payload) !== undefined) ){

                if (payload.dt_nascimento !== undefined){
                    payload.dt_nascimento = convertTimeStampToDate(payload.dt_nascimento)
                }
                //email, nome, sexo, dt_nascimento
                const users = await db.sequelize.models.usuario.update(payload,{
                    where: {
                        firebase_id: firebase_id
                    }
                })  
                if ( users[0] === 1){
                    return res.status(200).json({
                        message: "Updated.", 
                        status: "Success"
                    })
                }
                return res.status(200).json({
                    message: "Nothing changed.",
                    status: "Success"
                })

            }
            return res.status(400).json({
                message: "Bad Request",
                status: "Failure" })
            
        }catch(err){
            return res.status(500).json({
                message: "Incorrect",
                status: "Failure"
            })
        }

    },
    "getDetail" : async (req, res) =>{
        try{
            let {firebase_id} = req.params
            let user = await db.sequelize.models.usuario.findOne({
                where: { 
                    firebase_id: firebase_id 
                }
            });

            if (user !== null){
                let userData = {...user.dataValues}
                return res.status(200).json({
                    data : userData
                })
            }
            return res.status(404).json({
                message: "Not Found"
            })

        }catch{
            return res.status(400).json({
                message: "Bad Request"
            })
        }   
    }
}
    
export default UserController ;