import dotenv from 'dotenv';
import { model, Schema } from 'mongoose';
import { IUsuarioInterface } from '../interfaces/usuario.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../env';

dotenv.config();

interface IUsuarioModel extends IUsuarioInterface {
  compararSenhas(senha: string): Promise<boolean>;
  gerarToken(): string;
}

const UsuarioSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  }
});

UsuarioSchema.pre<IUsuarioModel>('save', async function criptografarSenha() {
  this.senha = await bcrypt.hash(this.senha, 10);
});

UsuarioSchema.pre<IUsuarioModel>('save', async function gerarAvatar() {
  const radomId = Math.floor(Math.random() * 100000) + 1;
  this.avatar = `https://api.adorable.io/avatars/285/${radomId}.png`;
});

UsuarioSchema.methods.compararSenhas = function (senha: string): Promise<boolean> {
  return bcrypt.compare(senha, this.senha);
};

UsuarioSchema.methods.gerarToken = function (): string {
  const decodedToken = {
    _id: String(this._id),
    nome: this.nome,
    avatar: this.avatar
  };
  return jwt.sign(decodedToken, SECRET_KEY, { expiresIn: '1d' });
};

export default model<IUsuarioModel>('Usuario', UsuarioSchema);
