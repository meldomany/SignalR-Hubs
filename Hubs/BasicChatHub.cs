using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SignalRSample.Data;

namespace SignalRSample.Hubs
{
    public class BasicChatHub : Hub
    {
        private readonly ApplicationDbContext applicationDbContext;

        public BasicChatHub(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        public async Task SendMessageToAll(string user, string message)
        {
            await Clients.All.SendAsync("RecivedMessage", user, message);
        }

        [Authorize]
        public async Task SendMessageToReciever(string sender, string reciever, string message)
        {
            var recieverObj = await applicationDbContext.Users.FirstOrDefaultAsync(e => e.Email.ToLower() == reciever.ToLower());
            if(recieverObj != null)
            {
                await Clients.User(recieverObj.Id.ToString()).SendAsync("RecivedMessage", sender, message);
            }
        }
    }
}
