import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();

//atribui as rotas a os nomes dos arquivos .html
app.use(express.static(path.join(__dirname, "..", "public")));

//cria o servidor http com as informações do express
const serverHttp = http.createServer(app);

// cria o servidor do io com as informações do http
const io = new Server(serverHttp);

//exporta as funções
export { serverHttp, io };
