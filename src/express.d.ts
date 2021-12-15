import { IUsuarioInterface } from './interfaces/usuario.interface';

declare global {
  namespace Express {
    interface Request {
      usuario?: IUsuarioInterface;
      usuarioChat?: IUsuarioInterface;
    }
  }
}
