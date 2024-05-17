import { Router } from "express";
import {consultUsers, consultUserById, consultUserByNames, createUser, updateUser, deteleUser} from "../controllers/users.controller";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({msg: "Hola Mundo" })
})

router.get('/consultar-usuarios', consultUsers)
router.get('/consultar-usuario/:id', consultUserById)
router.get('/consultar-usuario-nombre/:names', consultUserByNames)
router.post('/crear-usuario', createUser)
router.put('/editar-usuario', updateUser)
router.delete('/eliminar-usuario/:id', deteleUser)


router.get('*', (req,res)=>{
    res.status(404).json({ msg: "Pagina no encontrada" });
})

export default router;