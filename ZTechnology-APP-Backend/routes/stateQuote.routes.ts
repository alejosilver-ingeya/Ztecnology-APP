import { Router } from "express";
import { consultStateQuote, saveStateQuote, updateStateQuote, deleteStateQuote } from "../controllers/stateQuote.controller";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        msg: "Hola Mundo"
    })
})

router.get('/consultar-estado-cotizacion', consultStateQuote)
router.post('/guardar-estado-cotizacion', saveStateQuote)
router.put('/editar-estado-cotizacion', updateStateQuote)
router.delete('/eliminar-estado-cotizacion/:id', deleteStateQuote)


router.get('*', (req,res)=>{
    res.status(404).json({ msg: "Pagina no encontrada" });
})

export default router;