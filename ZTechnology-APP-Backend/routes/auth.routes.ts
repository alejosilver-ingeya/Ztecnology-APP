import { Router, Request, Response } from "express";
import {
    ERR_PASSWORD_NOT_VALID,
    ERR_USER_NOT_FOUND,
    ERR_EMAIL_ALREADY_EXISTS,
    login,
    checkIsBloked,
    addFailedLoginAttempt
} from "../controllers/auth.controller";
import { createUser } from "../controllers/users.controller";
import verifyToken from "../middleware/login.middleware";

const router = Router();

export const ERR_INTERNAL_SERVER = "internal server error";
export const ERR_UNAUTHORIZED = "usuario no autorizado";


router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        await checkIsBloked(email)
        const token = await login(email, password);

        res.status(200).json({ token });
    } catch (e) {
        if (e instanceof Error && e.message === ERR_PASSWORD_NOT_VALID) {
            addFailedLoginAttempt(email)
            res.status(401).json({ msg: ERR_PASSWORD_NOT_VALID });
        } else if (e instanceof Error && e.message === ERR_USER_NOT_FOUND) {
            res.status(404).json({ msg: ERR_USER_NOT_FOUND });
        } else {
            console.error(e);
            res.status(500).json({ msg: ERR_INTERNAL_SERVER });
        }
        console.log(e)
    }
});

router.post('/crear-usuario', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const newUser = await createUser(email, password);

        res.status(201).json({ user: newUser });
    } catch (err) {
        //     if (err.message === ERR_EMAIL_ALREADY_EXISTS) {
        //         res.status(400).json({ msg: ERR_EMAIL_ALREADY_EXISTS });
        //     } else {
        //         console.error(err);
        //         res.status(500).json({ msg: ERR_INTERNAL_SERVER });
        //     }
    }
});

router.get("/protected-route", verifyToken, (req: Request, res: Response) => {
    try {
        res.status(200).json({ msg: "Acceso concedido" });
    } catch (err) {
        // if (err.message === ERR_UNAUTHORIZED) {
        //     res.status(401).json({ msg: ERR_UNAUTHORIZED });
        // } else {
        //     console.error(err);
        //     res.status(500).json({ msg: ERR_INTERNAL_SERVER });
        // }
    }
});

export default router;
