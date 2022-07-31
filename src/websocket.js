import { io } from "./http";
//atribuição de array para os usuários da sala
const users = [];
//atribuição de array para as mensagens da sala
const messages = [];

//inicio do servidor socket.io
io.on("connection", (socket) => {
  socket.on("select_room", (data, callback) => {
    socket.join(data.room);
    //verificação de o nome do usuário já consta na sala
    const userInRoom = users.find(
      (user) => user.username === data.username && data.room
    );

    // se caso o usuário já esteja só é atribuido o novo socket.id se caso negativo é criado um novo.
    if (userInRoom) {
      userInRoom.socket_id = socket.id;
    } else {
      users.push({
        room: data.room,
        username: data.username,
        socket_id: socket.id,
      });
    }
    //reune todas as mensagens enviadas e envia novamente para a página
    const messagesRoom = getMessagesRoom(data.room);
    callback(messagesRoom);
  });

  // aguarda a mensagem enviada pelo usuário e atribui no schema
  socket.on("message", (data) => {
    //salvar as mensagens - banco de dados -
    const message = {
      room: data.room,
      username: data.username,
      text: data.message,
      createdAt: new Date(),
      //pode ser colocado também uma ID
    };

    //atribui a mensagem nas mensagens da sala
    messages.push(message);

    //enviar para usuários da sala
    io.to(data.room).emit("message", message);
  });
});

//função para pegar todas as mensagens da sala
function getMessagesRoom(room) {
  const messagesRoom = messages.filter((message) => message.room === room);
  return messagesRoom;
}
