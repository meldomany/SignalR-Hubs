using Microsoft.AspNetCore.SignalR;
using SignalRSample.Models;

namespace SignalRSample.Hubs
{
    public class VoteHub : Hub
    {
        public Dictionary<string, int> GetClubVotes()
        {
            return ClubVote.ClubVotes;
        }
    }
}
