var connection = new signalR.HubConnectionBuilder().withUrl('/hubs/userCount').build();

connection.on('updateTotalViews', res => {
    var totalViewsCountElement = document.getElementById('totalViewsCount');
    totalViewsCountElement.innerText = res;
});

connection.on('updateTotalUsers', res => {
    var totalUsersCountElement = document.getElementById('totalUsersCount');
    totalUsersCountElement.innerText = res;
});

function newWindowLoadedOnClient() {
    connection.send('NewWindowLoaded');
}

function fulfilled() {
    console.log('Connection started.');
    newWindowLoadedOnClient();
}

function rejected() {
    console.log('Connection failed.');
}

connection.start().then(fulfilled, rejected);