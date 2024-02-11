using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class SubscriptionGroupHub : Hub
    {
        public static List<string> SubscriptionGroups { get; set; } = new List<string>();

        public async Task JoinGroup(string group)
        {
            if(!SubscriptionGroups.Contains(Context.ConnectionId + ":" + group))
            {
                SubscriptionGroups.Add(Context.ConnectionId + ":" + group);

                var userGroups = "";
                foreach (var item in SubscriptionGroups)
                {
                    if (item.Contains(Context.ConnectionId))
                    {
                        userGroups += item.Split(':')[1] + " ";
                    }
                }

                await Clients.Caller.SendAsync("subscriptionStatus", userGroups, group, true);
                await Clients.All.SendAsync("newMemberJoined", group);
                await Groups.AddToGroupAsync(Context.ConnectionId, group);
            }
        }

        public async Task LeaveGroup(string group)
        {
            if (SubscriptionGroups.Contains(Context.ConnectionId + ":" + group))
            {
                SubscriptionGroups.Remove(Context.ConnectionId + ":" + group);

                var userGroups = "";
                foreach (var item in SubscriptionGroups)
                {
                    if (item.Contains(Context.ConnectionId))
                    {
                        userGroups += item.Split(':')[1] + " ";
                    }
                }

                await Clients.Caller.SendAsync("subscriptionStatus", userGroups, group, false);
                await Clients.All.SendAsync("memberLeaved", group);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, group);
            }
        }

        public async Task PushNotification(string Group)
        {
            await Clients.Group(Group).SendAsync("triggerNotification", Group);
        }
    }
}
