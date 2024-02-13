var notificationText = document.getElementById('notificationText');
var notificationBtn = document.getElementById('notificationBtn');
var notificationCount = document.getElementById('notificationCount');
var notificationOptions = document.getElementById('notificationOptions');

var connectionNotification = new signalR.HubConnectionBuilder().withUrl('/hubs/notificationHub').build();

notificationBtn.addEventListener('click', function (event) {
    connectionNotification.send('PushNotification', notificationText.value);
    event.preventDefault();
});

connectionNotification.on('notificationPushed', res => {
    var optionElement = document.createElement('option');
    optionElement.value = res;
    optionElement.textContent = res;
    notificationOptions.appendChild(optionElement);
});


connectionNotification.on('notificationCount', res => {
    notificationCount.innerText = res.toString();
});


function fulfilled() {
    console.log('Connection started.');
}

function rejected() {
    console.log('Connection failed.');
}

connectionNotification.start().then(fulfilled, rejected);