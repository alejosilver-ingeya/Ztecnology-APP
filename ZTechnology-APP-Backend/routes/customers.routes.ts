import { Router } from "express";
import { consultCustomerById, consultCustomerByNames, consultCustomers, deleteCustomer, saveCustomer, updateCustomer, } from "../controllers/customers.controller";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        msg: "Hola Mundo"
    })
})

router.get('/consultar-clientes', consultCustomers)
router.get('/consultar-cliente/:id', consultCustomerById)
router.get('/consultar-cliente-nombre/:names', consultCustomerByNames)
router.post('/guardar-cliente', saveCustomer)
router.put('/editar-cliente', updateCustomer)
router.delete('/eliminar-cliente/:id', deleteCustomer)


router.get('*', (req,res)=>{
    res.status(404).json({ msg: "Pagina no encontrada" });
})

export default router;