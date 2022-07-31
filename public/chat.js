const socket = io(); // <- server externo pode ser colocado

//busca na página as informações de if e name
const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

//altera o username e a sala conectada no chat.html
const usernameDiv = document.getElementById("username");
usernameDiv.innerHTML = `Olá ${username} - Você está na sala ${room}`;

// emit => emitir alguma informação
// on => escutando alguma informação

//emite para o servidor ao usuário se logar na sala e exibe as mensagens contidas na página anteriormente
socket.emit(
  "select_room",
  {
    username,
    room,
  },
  (messages) => {
    messages.forEach((message) => createMessage(message));
  }
);

//envia para o servidor socket.io as informações de room, mensagem e username, enviados na página chat.html
document
  .getElementById("message_input")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const message = event.target.value;

      const data = {
        room,
        message,
        username,
      };

      socket.emit("message", data);
      event.target.value = "";
    }
  });

//exibe a mensagem enviada do usuario na tela
socket.on("message", (data) => {
  createMessage(data);
});

// função para criar a div com a messagen enviada
function createMessage(data) {
  const messageDiv = document.getElementById("messages");
  messageDiv.innerHTML += `
  <div class="new_message">
    <label class="form-label">
      <strong> ${data.username} </strong> <span> ${data.text} - ${dayjs(
    data.createdAt
  ).format("DD/MM HH:mm")}</span>
    </label>
  </div>
  `;
}

// redireciona ao clicar em logout para a página inicial
document.getElementById("Logout").addEventListener("click", (event) => {
  window.location.href = "index.html";
});
