var pyramidsCountElement = document.getElementById('pyramidsCount');
var alahlyCountElement = document.getElementById('alahlyCount');
var elzamalekCountElement = document.getElementById('elzamalekCount');

var connectionVote = new signalR.HubConnectionBuilder().withUrl('/hubs/voteHub').build();

connectionVote.on('clubVotes', (alahlyCount, elzamalekCount, pyramidsCount) => {
    alahlyCountElement.innerText = alahlyCount.toString();
    elzamalekCountElement.innerText = elzamalekCount.toString();
    pyramidsCountElement.innerText = pyramidsCount.toString();
});

function GetClubVotes() {
    connectionVote.invoke('GetClubVotes').then(res => {
        alahlyCountElement.innerText = res.Alahly.toString();
        elzamalekCountElement.innerText = res.Elzamalek.toString();
        pyramidsCountElement.innerText = res.Pyramids.toString();
    });
}

function fulfilledVote() {
    console.log('Connection started.');
    GetClubVotes();
}

function rejectedVote() {
    console.log('Connection failed.');
}

connectionVote.start().then(fulfilledVote, rejectedVote);