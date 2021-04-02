import db from "../models/index.js";
import { convertTimeStampToDate, timeNow } from "../helper/convertDate.js";

const UserController = {
    create: async (req, res) => {
        try {
            const usuario = {
                email: req.body.email,
                estado_conta: false,
                nome_usuario: req.body.nome,
                dt_nascimento: convertTimeStampToDate(req.body.dt_nascimento),
                id_firebase: req.body.firebase_id,
                ts_cadastro: new Date(),
                ts_alteracao_perfil: new Date(),
                conta_ativa: true,
            };

            const user = await db.sequelize.models.usuario.create(usuario);
            return res.status(201).json({
                message: "Criado",
                status: "Success",
            });
        } catch (erro) {
            console.log(erro);
            if (erro.original.errno === 1062) {
                return res.status(400).json({
                    message: "Campo chave duplicado",
                    status: "Failure",
                });
            } else {
                return res.status(500).json({
                    message: "Incorrect",
                    status: "Failure",
                });
            }
        }
    },

    update: async (req, res) => {
        try {
            let { firebase_id } = req.params;
            let payload = req.body;

            // converte datas
            if (payload.dt_nascimento !== undefined) {
                payload.dt_nascimento = convertTimeStampToDate(
                    payload.dt_nascimento
                );
            }

            const users = await db.sequelize.models.usuario.update(payload, {
                where: { id_firebase: firebase_id },
            });

            if (users[0] === 1) {
                return res.status(200).json({
                    message: "Updated.",
                    status: "Success",
                });
            }
            // }
            // if (
            // (payload.email ||
            // payload.nome_usuario ||
            // payload.dt_nascimento) !== undefined &&
            // (req.body.firebase_id && req.body.payload) !== undefined
            // ) {
            // if (payload.dt_nascimento !== undefined) {
            // payload.dt_nascimento = convertTimeStampToDate(
            // payload.dt_nascimento
            // );
            // }
            // //email, nome, sexo, dt_nascimento
            // const users = await db.sequelize.models.usuario.update(
            // payload,
            // {
            // where: {
            // firebase_id: firebase_id,
            // },
            // }
            // );
            // if (users[0] === 1) {
            // return res.status(200).json({
            // message: "Updated.",
            // status: "Success",
            // });
            // }
            // return res.status(200).json({
            // message: "Nothing changed.",
            // status: "Success",
            // });
            // }
            return res.status(400).json({
                message: "Bad Request",
                status: "Failure",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Incorrect",
                status: "Failure",
            });
        }
    },

    getDetail: async (req, res) => {
        try {
            let { firebase_id } = req.params;
            let user = await db.sequelize.models.usuario.findOne({
                where: {
                    id_firebase: firebase_id,
                },
            });

            if (user !== null) {
                let userData = { ...user.dataValues };
                return res.status(200).json(userData);
            }
            return res.status(404).json({
                message: "Not Found",
            });
        } catch {
            return res.status(400).json({
                message: "Bad Request",
            });
        }
    },

    delete: async (req, res) => {
        try{
            if(req.body.soft_delete){
                const users = await db.sequelize.models.usuario.update({conta_ativa: false}, {
                    where: { id_firebase: req.body.firebase_id },
                });

            }
            else{
                const users = await db.sequelize.models.usuario.destroy({
                    where: { id_firebase: req.body.firebase_id },
                });

            }
            return res.status(200).json({
                message: "Apagado",
                status: "Success",
            });
        }
        catch{
            return res.status(400).json({
                message: "Bad Request",
            });
        }

    },
};

export default UserController;
