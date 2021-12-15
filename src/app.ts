import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import moongose from 'mongoose';
import usuarioRouter from './routers/usuario.router';
import mensagemRouter from './routers/mensagem.router';
import { PORT, MONGODB_URL } from './env';

dotenv.config();

export class App {
  private express: express.Application;
  private port = PORT;

  constructor() {
    this.express = express();
    this.middlewares();
    this.database();
    this.routes();
    this.listen();
  }

  public getApp(): express.Application {
    return this.express;
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
    console.log('🔏 Middlewares configured');
  }

  private listen(): void {
    this.express.listen(this.port, () => {
      console.log('🚀 Server started on port ' + this.port);
    });
  }

  private database(): void {
    moongose.connect(MONGODB_URL),
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      };
    console.log('💻 Connected to database');
  }

  private routes(): void {
    this.express.use('/usuarios', usuarioRouter);
    this.express.use('/mensagens', mensagemRouter);
    console.log('🌎 Routes loaded');
  }
}
