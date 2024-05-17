import { Router } from "express";
import { consultCitys, consultCityById, consulCtityByNames, saveCity, updateCity, deleteCity } from "../controllers/cities.controller";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        msg: "Hola Mundo"
    })
})

router.get('/consultar-ciudades', consultCitys)
router.get('/consultar-ciudad/:id', consultCityById)
router.get('/consultar-ciudad-nombre/:name', consulCtityByNames)
router.post('/guardar-ciudad', saveCity)
router.put('/editar-ciudad', updateCity)
router.delete('/eliminar-ciudad/:id', deleteCity)


router.get('*', (req,res)=>{
    res.status(404).json({ msg: "Pagina no encontrada" });
})

export default router;