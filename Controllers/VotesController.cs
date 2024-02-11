using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRSample.Hubs;
using SignalRSample.Models;

namespace SignalRSample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VotesController : ControllerBase
    {
        private readonly IHubContext<VoteHub> voteHubContext;

        public VotesController(IHubContext<VoteHub> voteHubContext)
        {
            this.voteHubContext = voteHubContext;
        }

        [HttpGet]
        [Route("VoteClub/{key}")]
        public async Task<IActionResult> VoteClub(string key)
        {
            if(ClubVote.ClubVotes.ContainsKey(key))
            {
                ClubVote.ClubVotes[key]++;
            }

            await voteHubContext.Clients.All.SendAsync("clubVotes",
                ClubVote.ClubVotes[ClubVote.Alahly],
                ClubVote.ClubVotes[ClubVote.Elzamalek],
                ClubVote.ClubVotes[ClubVote.Pyramids]);
            
            return Accepted();
        }
    }
}
