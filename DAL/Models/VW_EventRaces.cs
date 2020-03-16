namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class VW_EventRaces
    {        
        [Required]
        public Int64 Id { get; set; }

        [Required]
        public int EventId { get; set; }

        [Required]
        public int RaceId { get; set; }
 
        public string RaceName { get; set; }

        public string RaceUrl { get; set; }

        public string VideoName { get; set; }

        public int NumberOfHorses { get; set; }

        public int EventRaceId { get; set; }

        public bool Selected { get; set; }

        public bool Saved { get; set; }

        public bool Archived { get; set; }
    }
}
