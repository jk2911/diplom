using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class MatchStatistic
    {
        [Key]
        public int id { get; set; }
        public virtual Match Match { get; set; }
        public int cornerHome { get; set; } = 0;
        public int cornerAway { get; set; } = 0;
        public int shotsHome { get; set; } = 0;
        public int shotsAway { get; set; } = 0;
        public int shotsInTargetHome { get; set; } = 0;
        public int shotsInTargetAway { get; set; } = 0;
        public int saveHome { get; set; } = 0;
        public int saveAway { get; set; } = 0;
        public int possession { get; set; } = 50;
        public int foulsHome { get; set; } = 0;
        public int foulsAway { get; set; } = 0;
        public int offsideHome { get; set; } = 0;
        public int offsideAway { get; set; } = 0;
        public int yellowCardHome { get; set; } = 0;
        public int yellowCardAway { get; set; } = 0;
        public int redCardHome { get; set; } = 0;
        public int redCardAway { get; set; } = 0;

    }
}
