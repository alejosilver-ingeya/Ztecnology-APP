import { Router } from "express";
import { consultProductById, consultProductByNames, consultProducts, deleteProduct, saveProduct, updateProduct } from "../controllers/products.controller";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        msg: "Hola Mundo"
    })
})

router.get('/consultar-productos', consultProducts)
router.get('/consultar-producto/:id', consultProductById)
router.get('/consultar-producto-nombre/:name', consultProductByNames)
router.post('/guardar-producto', saveProduct)
router.put('/editar-producto', updateProduct)
router.delete('/eliminar-producto/:id', deleteProduct)


router.get('*', (req,res)=>{
    res.status(404).json({ msg: "Pagina no encontrada" });
})

export default router;