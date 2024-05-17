import { Request, Response } from "express";
import User from "../models/user.models";
import bcrypt from 'bcryptjs';

const ERR_EMAIL_ALREADY_EXISTS = 'Email already exists';

interface UserAttributes {
    email: string;
    password: string;
}

export const consultUsers = async (req: Request, res: Response) => {

    const users = await User.findAll({});

    res.status(200).json({
        msg: 'Bienvenido al modulo de usuarios',
        users
    })
}

export const consultUserById = async (req: Request, res: Response) => {

    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user) {
        res.status(200).json({ user })
    } else {
        res.status(404).json({ msg: "No se encontro el usuario" });
    }
}

export const consultUserByNames = async (req: Request, res: Response) => {

    let { names } = req.params;

    names = names.toLowerCase();

    const user = await User.findAll({
        where: { names }
    });

    if (user.length > 0) {
        res.status(200).json({ user })
    } else {
        res.status(404).json({ msg: "No se encontro el usuario" });
    }
}

export const createUser = async (req: Request, res: Response) => {

    let { names, email, password, phone, area } = req.body;
    const id_rol = 2;//Se asume que es un gestor por defecto

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error(ERR_EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ names, email, password: hashedPassword, phone, area, idRol: id_rol });
    res.status(200).json({ msg: `Se creo con exito el usuario` })

    return newUser;
};

export const updateUser = async (req: Request, res: Response) => {
    const { id, names, email, password, phone, area } = req.body;

    try {
        // Encripta la contraseña antes de actualizar el usuario
        const hashedPassword = await bcrypt.hash(password, 10);

        // Actualiza el usuario en la base de datos con la contraseña encriptada
        await User.update({ names, email, password: hashedPassword, phone, area }, {
            where: { id }
        });

        res.status(200).json({ msg: `Se editó con éxito el usuario` });
    } catch (error) {
        console.error("Error al actualizar el Usuario:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deteleUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    const state = 0
    await User.update({ state }, {
        where: {
            id
        }
    })

    res.status(200).json({ msg: `Se elimino con exito el usuario ${id}` })
}