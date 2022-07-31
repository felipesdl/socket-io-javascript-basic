//importação do server http
import { serverHttp } from "./http";
//importação de todo o conteudo do websocket
import "./websocket";
//inicialização do servidor
serverHttp.listen(3000, () => {
  console.log("Server running");
  console.log("http://localhost:3000/index.html");
});
