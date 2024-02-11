using Microsoft.AspNetCore.Http;

namespace SignalRSample.Models
{
    public static class ClubVote
    {
        static ClubVote()
        {
            ClubVotes = new Dictionary<string, int>();
            ClubVotes.Add(Alahly, 0);
            ClubVotes.Add(Elzamalek, 0);
            ClubVotes.Add(Pyramids, 0);
        }

        public static Dictionary<string, int> ClubVotes;
        public const string Alahly = "Alahly";
        public const string Elzamalek = "Elzamalek";
        public const string Pyramids = "Pyramids";
    }
}
