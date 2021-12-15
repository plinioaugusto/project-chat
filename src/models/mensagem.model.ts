import { model, Schema, Model, Document, Query } from 'mongoose';
import { IMensagemInterface } from '../interfaces/mensagem.interface';

interface IMensagemModel extends IMensagemInterface, Document {}

interface IMensagemStatic extends Model<IMensagemModel> {
  buscaChat(idUsuarioLogado: string, idUsuarioChat: string): Query<IMensagemModel[], IMensagemModel>;
}

const MensagemSchema = new Schema({
  texto: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  remetente: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  destinatario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
});

MensagemSchema.statics.buscaChat = function (idUsuarioLogado: string, idUsuarioChat: string): Query<IMensagemModel[], IMensagemModel> {
  return this.find({
    $or: [
      { $and: [{ remetente: idUsuarioLogado }, { destinatario: idUsuarioChat }] },
      { $and: [{ remetente: idUsuarioChat }, { destinatario: idUsuarioLogado }] }
    ]
  });
};

export default model<IMensagemModel, IMensagemStatic>('Mensagem', MensagemSchema);
