import { Request, Response } from "express";
import Quote from "../models/quote.models";

export const consultQuotes = async (req: Request, res: Response) => {

    const quote = await Quote.findAll({
    });

    res.status(200).json({
        msg: 'Bienvenido al modulo de Cotizaciones',
        quote
    })
}

export const consultQuoteById = async (req: Request, res: Response) => {

    const { id } = req.params;
    const quote = await Quote.findByPk(id);

    if (quote) {
        res.status(200).json({ quote })
    } else {
        res.status(404).json({ msg: "No se encontro la Cotización" });
    }
}

export const consultQuoteByCustomer = async (req: Request, res: Response) => {

    let { idCustomer } = req.params;

    const quote = await Quote.findAll({
        where: { idCustomer }
    });
}

export const saveQuote = async (req: Request, res: Response) => {

    const { idCustomer, idProduct, stock, total, priceTotal, idUser, discount, percentageDiscount, idStateQuote } = req.body;

    const lastQuote = await Quote.findOne({ order: [['id', 'DESC']], });
    const year = new Date().getFullYear();
    const lastId = lastQuote?.dataValues.id as number;
    const newQuoteNumber: string = `CT${String(lastId + 1).padStart(3, '0')}/${year}`;

    const quote = await Quote.create({ number: newQuoteNumber, idCustomer, idProduct, stock, total, priceTotal, idUser, discount, percentageDiscount, idStateQuote });

    res.status(200).json({ msg: `Se creo con exito la Cotizacion # ${quote.dataValues.number}` })
}

export const updateQuote = async (req: Request, res: Response) => {

    const { id, number, idCustomer, idProduct, stock, total, priceTotal, idUser, discount, percentageDiscount } = req.body;

    await Quote.update({ number, idCustomer, idProduct, stock, total, priceTotal, idUser, discount, percentageDiscount }, {
        where: {
            id
        }
    });

    res.status(200).json({ msg: `Se edito con exito la Cotizacion ${number} del Cliente ${idCustomer}` })
}

export const deleteQuote = async (req: Request, res: Response) => {

    const { id, idCustomer } = req.params;

    const stateQuote = "Anulada"
    await Quote.update({ stateQuote }, {
        where: {
            id
        }
    })

    res.status(200).json({ msg: `Se elimino con exito la cotización ${id} del Cliente ${idCustomer}` })
}