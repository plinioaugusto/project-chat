import { Request, Response } from 'express';
import mensagemModel from '../models/mensagem.model';
import usuarioModel from '../models/usuario.model';
import mensagemService from '../services/mensagem.service';

class UsuarioController {
  public async cadastrar(req: Request, res: Response): Promise<Response> {
    const usuario = await usuarioModel.create(req.body);
    const resposta = {
      message: 'Usuário cadastrado com sucesso',
      _id: usuario._id,
      nome: usuario.nome
    };
    return res.json(resposta);
  }

  public async autenticar(req: Request, res: Response): Promise<Response> {
    const { nome, senha } = req.body;
    const usuario = await usuarioModel.findOne({ nome });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const senhaCorreta = await usuario.compararSenhas(senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    return res.json({
      message: 'Autenticação realizada com sucesso',
      usuario,
      token: usuario.gerarToken()
    });
  }

  public getById(req: Request, res: Response): Response {
    return res.json(req.usuarioChat);
  }

  public async listar(req: Request, res: Response): Promise<Response> {
    const idUsuarioLogado = req.usuario._id;

    const usuarios = await usuarioModel.find({ _id: { $ne: idUsuarioLogado } });

    const usuariosMensagem = await Promise.all(
      usuarios.map(async (usuario) => {
        const mensagens = await mensagemModel.buscaChat(idUsuarioLogado, usuario._id).sort({ createdAt: -1 }).limit(1);

        return mensagemService.getResultadoMensagemUsuario(mensagens, usuario);
      })
    );

    const mensagensOrdenadas = mensagemService.retornaMensagensOrdenadas(usuariosMensagem);

    return res.json(mensagensOrdenadas);
  }
}

export default new UsuarioController();
