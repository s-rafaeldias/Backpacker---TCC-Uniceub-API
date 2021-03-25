// import {router} from "./index.js"

const user = (router) =>{
    router.get("/", (req,res) => { 
        res.json({ message: "Welcome to Backpacker application." })
    })
    return router
};

export {user}