using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class NotificationHub : Hub
    {
        public static List<string> Notifications { get; set; } = new List<string>();


        public async Task PushNotification(string notification)
        {
            if(!Notifications.Contains(notification))
            {
                Notifications.Add(notification);
            }

            await Clients.All.SendAsync("notificationPushed", notification);
            await Clients.All.SendAsync("notificationCount", Notifications.Count);
        }
    }
}
