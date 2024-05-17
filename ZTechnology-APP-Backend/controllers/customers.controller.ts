import { Request, Response } from "express";
import Customer from "../models/customer.models";

export const consultCustomers = async (req: Request, res: Response) => {

    const customers = await Customer.findAll({
        where: {
            state: 1
        }
    });

    res.status(200).json({
        msg: 'Bienvenido al modulo de Clientes',
        customers
    })
}

export const consultCustomerById = async (req: Request, res: Response) => {

    const { id } = req.params;
    const customer = await Customer.findByPk(id);

    if (customer) {
        res.status(200).json({ customer })
    } else {
        res.status(404).json({ msg: "No se encontro el Cliente" });
    }
}

export const consultCustomerByNames = async (req: Request, res: Response) => {

    let { name } = req.params;

    name = name.toLowerCase();

    const customer = await Customer.findAll({
        where: { name }
    });

    if (customer.length > 0) {
        res.status(200).json({ customer })
    } else {
        res.status(404).json({ msg: "No se encontro el Cliente" });
    }
}

export const saveCustomer = async (req: Request, res: Response) => {

    const { document, name, email, phone, address, idCitie } = req.body;

    const customer = await Customer.create({ document, name, email, phone, address, idCitie });
    const id = customer.dataValues.id;

    res.status(200).json({ msg: `Se creo con exito el Cliente con iD ${id}` })

}

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const { id, document, name, email, phone, address, idCitie } = req.body;

        await Customer.update({ document, name, email, phone, address, idCitie }, {
            where: {
                id
            }
        });

        res.status(200).json({ msg: `Se edito con exito el Cliente` });
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

export const deleteCustomer = async (req: Request, res: Response) => {

    const { id } = req.params;

    const state = 0
    await Customer.update({ state }, {
        where: {
            id
        }
    })

    res.status(200).json({ msg: `Se elimino con exito el Cliente ${id}` })
}