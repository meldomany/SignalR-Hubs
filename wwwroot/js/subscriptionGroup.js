var lbl_subscribeJoined = document.getElementById('lbl_subscribeJoined');

var btn_subscribePrimary = document.getElementById('btn_subscribePrimary');
var btn_subscribeSecondary = document.getElementById('btn_subscribeSecondary');
var btn_subscribeDanger = document.getElementById('btn_subscribeDanger');

var btn_unSubscribePrimary = document.getElementById('btn_unSubscribePrimary');
var btn_unSubscribeSecondary = document.getElementById('btn_unSubscribeSecondary');
var btn_unSubscribeDanger = document.getElementById('btn_unSubscribeDanger');

var btn_trSubscribePrimary = document.getElementById('btn_trSubscribePrimary');
var btn_trSubscribeSecondary = document.getElementById('btn_trSubscribeSecondary');
var btn_trSubscribeDanger = document.getElementById('btn_trSubscribeDanger');


var connectionSubscription = new signalR.HubConnectionBuilder().withUrl('/hubs/subscriptionGroupHub').build();

//Join Groups
btn_subscribePrimary.addEventListener("click", function (event) {
    connectionSubscription.send("JoinGroup", "Primary");
    event.preventDefault();
});

btn_subscribeSecondary.addEventListener("click", function (event) {
    connectionSubscription.send("JoinGroup", "Secondary");
    event.preventDefault();
});

btn_subscribeDanger.addEventListener("click", function (event) {
    connectionSubscription.send("JoinGroup", "Danger");
    event.preventDefault();
});

//Leave Groups
btn_unSubscribePrimary.addEventListener("click", function (event) {
    connectionSubscription.send("LeaveGroup", "Primary");
    event.preventDefault();
});

btn_unSubscribeSecondary.addEventListener("click", function (event) {
    connectionSubscription.send("LeaveGroup", "Secondary");
    event.preventDefault();
});

btn_unSubscribeDanger.addEventListener("click", function (event) {
    connectionSubscription.send("LeaveGroup", "Danger");
    event.preventDefault();
});

//Push Notification
btn_trSubscribePrimary.addEventListener("click", function (event) {
    connectionSubscription.send("PushNotification", "Primary");
    event.preventDefault();
});

btn_trSubscribeSecondary.addEventListener("click", function (event) {
    connectionSubscription.send("PushNotification", "Secondary");
    event.preventDefault();
});

btn_trSubscribeDanger.addEventListener("click", function (event) {
    connectionSubscription.send("PushNotification", "Danger");
    event.preventDefault();
});

connectionSubscription.on('newMemberJoined', (Group) => {
    toastr.success('New Member Joined ' + Group +'...');
});

connectionSubscription.on('memberLeaved', (Group) => {
    toastr.success('Member Leaved ' + Group + '...');
});

connectionSubscription.on('subscriptionStatus', (subscriptionGroupList, Group, isSubscriped) => {
    lbl_subscribeJoined.innerText = subscriptionGroupList;

    if (isSubscriped == true) {
        switch (Group) {
            case 'Primary':
                btn_subscribePrimary.style.display = 'none';
                btn_unSubscribePrimary.style.display = '';
                break;
            case 'Secondary':
                btn_subscribeSecondary.style.display = 'none';
                btn_unSubscribeSecondary.style.display = '';
                break;
            case 'Danger':
                btn_subscribeDanger.style.display = 'none';
                btn_unSubscribeDanger.style.display = '';
                break;
            default:
                break;
        }

        toastr.success('Subscribed Successfully...');
    } else {
        switch (Group) {
            case 'Primary':
                btn_subscribePrimary.style.display = '';
                btn_unSubscribePrimary.style.display = 'none';
                break;
            case 'Secondary':
                btn_subscribeSecondary.style.display = '';
                btn_unSubscribeSecondary.style.display = 'none';
                break;
            case 'Danger':
                btn_subscribeDanger.style.display = '';
                btn_unSubscribeDanger.style.display = 'none';
                break;
            default:
                break;
        }

        toastr.success('Unsubscribed Successfully...');
    }


})

connectionSubscription.on('triggerNotification', group => {
    toastr.success(group + ' Notification Triggered...');
})

function fulfilledVote() {
    console.log('Connection started.');
}

function rejectedVote() {
    console.log('Connection failed.');
}

connectionSubscription.start().then(fulfilledVote, rejectedVote);