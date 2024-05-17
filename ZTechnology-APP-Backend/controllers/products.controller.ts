import { Request, Response } from "express";
import Product from "../models/product.models";

export const consultProducts = async (req: Request, res: Response) => {

    const products = await Product.findAll({
    });

    res.status(200).json({
        msg: 'Bienvenido al modulo de Productos',
        products
    })
}

export const consultProductById = async (req: Request, res: Response) => {

    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (product) {
        res.status(200).json({ product })
    } else {
        res.status(404).json({ msg: "No se encontro el Producto" });
    }
}

export const consultProductByNames = async (req: Request, res: Response) => {

    let { name } = req.params;

    name = name.toLowerCase();

    const product = await Product.findAll({
        where: { name }
    });

    if (product.length > 0) {
        res.status(200).json({ product })
    } else {
        res.status(404).json({ msg: "No se encontro el Producto" });
    }
}

export const saveProduct = async (req: Request, res: Response) => {

    const { name, description, priceUnit, photo, state } = req.body;

    const product = await Product.create({ name, description, priceUnit, photo, state });
    const id = product.dataValues.id;

    res.status(200).json({ msg: `Se creo con exito el Producto` })

}

export const updateProduct = async (req: Request, res: Response) => {

    const { id, name, description, priceUnit, photo } = req.body;

    await Product.update({ name, description, priceUnit, photo }, {
        where: {
            id
        }
    });

    res.status(200).json({ msg: `Se edito con exito el Producto` })
}

export const deleteProduct = async (req: Request, res: Response) => {

    const { id } = req.params;

    const state = 0
    await Product.update({ state }, {
        where: {
            id
        }
    })

    res.status(200).json({ msg: `Se elimino con exito el Producto ${id}` })
}