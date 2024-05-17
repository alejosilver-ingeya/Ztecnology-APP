import { Request, Response } from "express";
import StateQuote from "../models/stateQuote.models";

export const consultStateQuote = async (req: Request, res: Response) => {

    const stateQuote = await StateQuote.findAll({});

    res.status(200).json({
        msg: 'Bienvenido al modulo de Estado de Cotización',
        stateQuote
    })
}

export const saveStateQuote = async (req: Request, res: Response) => {

    const { name } = req.body;

    const stateQuote = await StateQuote.create({ name });
    const id = stateQuote.dataValues.id;

    res.status(200).json({ msg: `Se creo con exito el estado de Cotizacion con iD ${id}` })

}

export const updateStateQuote = async (req: Request, res: Response) => {

    const { id, name } = req.body;

    await StateQuote.update({ name }, {
        where: {
            id
        }
    });

    res.status(200).json({ msg: `Se edito con exito el estado de Cotizacion a ${name}` })
}

export const deleteStateQuote = async (req: Request, res: Response) =>{

    const { id } = req.params;

    await StateQuote.destroy({
        where: {
            id
        }
    })

    res.status(200).json({ msg: `Se elimino con exito el estado de Cotizacion ${id}` })
}