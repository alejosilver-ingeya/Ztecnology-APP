import bcrypt from "bcryptjs";
import User from "../models/user.models";
import jwt from "jsonwebtoken";
import { differenceInHours } from "date-fns";

export const ERR_USER_NOT_FOUND = "usuario no encontrado";
export const ERR_PASSWORD_NOT_VALID = "contrasena no valida";
export const ERR_EMAIL_ALREADY_EXISTS = "el correo electronico ya esta registrado";
export const ERR_USER_BLOCKED = "El usuario se encuentra bloqueado";

interface Payload {
  email: string;
  id: number;
}

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const user = await User.findOne({
    where: { email },
  });
  if (!user) {
    throw new Error(ERR_USER_NOT_FOUND);
  }

  const validPassword = bcrypt.compare(password, user.dataValues.password);

  if (!validPassword) {
    throw new Error(ERR_PASSWORD_NOT_VALID);
  }

  const payload: Payload = {
    email: user.dataValues.email,
    id: user.dataValues.id,
  };

  return jwt.sign(payload, "auth_key_custom_secret", {
    // expiresIn: "1h",
  });
};

export const checkIsBloked = async (email: string) => {
  const user = await User.findOne({
    where: {
      email
    }
  })
  if (!user) {
    throw new Error(ERR_USER_NOT_FOUND)
  }
  if (user.blocked) {
    const currentTime = new Date();
    const blockedTime = new Date(user.lastFailedLogin);
    const hoursDifference = differenceInHours(currentTime, blockedTime);

    console.log(hoursDifference)

    if (hoursDifference >= 2) {
      await user.update({
        bloked: false, failedLogin: 0
      }, {
        where: { email }
      });
      return false;
    } else {
      throw new Error(ERR_USER_BLOCKED)
    }
  }
  return true;
}

export const addFailedLoginAttempt = async (email: string) => {
  const user = await User.findOne({ where: { email } })

  let failedLogin = user?.failedLogin || 0;
  failedLogin++;

  const currentDate = new Date().toISOString();

  if (failedLogin >= 3) {
    await User.update({ blocked: true, lastFailedLogin: currentDate }, { where: { email } });
  } else {
    await User.update({ failedLogin, lastFailedLogin: currentDate }, { where: { email } });
  }
};