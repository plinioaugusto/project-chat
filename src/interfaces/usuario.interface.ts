export interface IUsuarioInterface {
  _id: any | string;
  nome?: string;
  senha?: string;
  avatar?: string;
}

export interface IMensagemUsuario extends IUsuarioInterface {
  ultimaMensagem: string;
  dataUltimaMensagem: Date;
}
