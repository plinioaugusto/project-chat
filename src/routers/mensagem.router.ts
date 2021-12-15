import { Router } from 'express';
import mensagemController from '../controllers/mensagem.controller';
import authMiddleware from '../middlewares/auth.middleware';

const mensagemRouter = Router();

mensagemRouter.post('/:id', authMiddleware.autorizarUsuarioByParams, authMiddleware.autorizarUsuarioByToken, mensagemController.enviar);
mensagemRouter.get('/:id', authMiddleware.autorizarUsuarioByParams, authMiddleware.autorizarUsuarioByToken, mensagemController.listar);

export default mensagemRouter;
