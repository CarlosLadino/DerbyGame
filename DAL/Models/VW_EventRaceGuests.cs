namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class VW_EventRaceGuests
    {
        public VW_EventRaceGuests()
        {
            
        }

        public int Id { get; set; }

        public int EventRaceId { get; set; }

        public int Guest1Id { get; set; }

        public int Guest2Id { get; set; }

        public string Guest1Name { get; set; }

        public string Guest2Name { get; set; }

        public string Guest1Avatar { get; set; }

        public string Guest2Avatar { get; set; }
        public int AssignedHorseNumber { get; set; }

        public int PlaceId { get; set; }

        public decimal? WonAmount { get; set; }

        public bool IsProtagonist { get; set; }
    }
}
