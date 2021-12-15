import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import usuarioModel from '../models/usuario.model';
import { IUsuarioInterface } from '../interfaces/usuario.interface';
import { SECRET_KEY } from '../env';

dotenv.config();

class AuthMiddleware {
  public async autorizarUsuarioByToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({
        message: 'Token não informado!'
      });
    }

    try {
      const usuarioToken = jwt.verify(token, SECRET_KEY) as IUsuarioInterface;
      const usuario = await usuarioModel.findById(usuarioToken._id);

      if (!usuario) {
        return res.status(400).send({
          message: 'Usuário não existe!'
        });
      }

      req.usuario = usuario;

      return next();
    } catch (error) {
      return res.status(401).send({
        message: 'Token inválido!'
      });
    }
  }

  public async autorizarUsuarioByParams(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const usuario = await usuarioModel.findById(req.params.id);

      if (!usuario) {
        return res.status(400).send({
          message: 'Usuário remetente não existe!'
        });
      }

      req.usuarioChat = usuario;

      return next();
    } catch (error) {
      return res.status(401).send({
        message: 'Usuário destinatário inválido!'
      });
    }
  }
}

export default new AuthMiddleware();
