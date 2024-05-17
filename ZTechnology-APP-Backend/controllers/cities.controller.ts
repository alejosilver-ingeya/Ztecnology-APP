import { Request, Response } from "express";
import Cities from "../models/citie.models";

export const consultCitys = async (req: Request, res: Response) => {

    const city = await Cities.findAll({
        attributes: ['id', 'name']
    });

    res.status(200).json({
        msg: 'Bienvenido al modulo de Ciudades',
        city
    })
}

export const consultCityById = async (req: Request, res: Response) => {

    const { id } = req.params;
    const city = await Cities.findByPk(id);

    if (city) {
        res.status(200).json({ city })
    } else {
        res.status(404).json({ msg: "No se encontro la Ciudad" });
    }
}

export const consulCtityByNames = async (req: Request, res: Response) => {

    let { name } = req.params;

    name = name.toLowerCase();

    const city = await Cities.findAll({
        where: { name }
    });

    if (city.length > 0) {
        res.status(200).json({ city })
    } else {
        res.status(404).json({ msg: "No se encontro la ciudad" });
    }
}

export const saveCity = async (req: Request, res: Response) => {

    const { name } = req.body;

    const city = await Cities.create({ name });
    const id = city.dataValues.id;

    res.status(200).json({ msg: `Se creo con exito la Ciudad con iD ${id}` })

}

export const updateCity = async (req: Request, res: Response) => {

    const { id, name } = req.body;

    await Cities.update({ name }, {
        where: {
            id
        }
    });

    res.status(200).json({ msg: `Se edito con exito la Ciudad ${name}` })
}

export const deleteCity = async (req: Request, res: Response) =>{

    const { id } = req.params;

    const state = 0
    await Cities.destroy({
        where:{
            id
        }
    })

    res.status(200).json({ msg: `Se elimino con exito la Ciudad ${id}` })
}