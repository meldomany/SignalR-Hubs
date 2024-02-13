var senderField = document.getElementById('senderField');
var recieverField = document.getElementById('recieverField');
var messageField = document.getElementById('messageField');
var sendMessageBtn = document.getElementById('sendMessageBtn');
var messageList = document.getElementById('messageList');

var connectionChat = new signalR.HubConnectionBuilder().withUrl('/hubs/basicChatHub').build();

connectionChat.on('RecivedMessage', (user, messageDetails) => {
    var liElement = document.createElement("li");
    messageList.appendChild(liElement);
    liElement.textContent = `${user} - ${messageDetails}`;
});

sendMessageBtn.addEventListener('click', function () {
    if (recieverField.value.length > 0)
        connectionChat.send('SendMessageToReciever', senderField.value, recieverField.value, messageField.value);
    else
        connectionChat.send('SendMessageToAll', senderField.value, messageField.value);
});

function fulfilledVote() {
    console.log('Connection started.');
}

function rejectedVote() {
    console.log('Connection failed.');
}

connectionChat.start().then(fulfilledVote, rejectedVote);