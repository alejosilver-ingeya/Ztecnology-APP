import { Router } from "express";
import { consultQuoteById, consultQuoteByCustomer, consultQuotes, deleteQuote, saveQuote, updateQuote } from "../controllers/quotes.controller";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        msg: "Hola Mundo"
    })
})

router.get('/consultar-cotizaciones', consultQuotes)
router.get('/consultar-cotizaciones/:id', consultQuoteById)
router.get('/consultar-cotizaciones-cliente/:idCustomer', consultQuoteByCustomer)
router.post('/guardar-cotizacion', saveQuote)
router.put('/editar-cotizacion', updateQuote)
router.delete('/eliminar-cotizacion/:id', deleteQuote)

router.get('*', (req,res)=>{
    res.status(404).json({ msg: "Pagina no encontrada" });
})

export default router;