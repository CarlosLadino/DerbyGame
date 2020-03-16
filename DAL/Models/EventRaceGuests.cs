namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class EventRaceGuests
    {
        public EventRaceGuests()
        {
            
        }

        [Required]
        public int Id { get; set; }

        [Required]
        public int EventRaceId { get; set; }

        [Required]
        public int Guest1Id { get; set; }

        public int? Guest2Id { get; set; }

        [Required]
        public int AssignedHorseNumber { get; set; }

        public int? PlaceId { get; set; }

        public decimal WonAmount { get; set; }
 
        [ForeignKey("EventRaceId")]
        [InverseProperty("EventRaceGuestsEventRace")]
        [IgnoreDataMember]
        public virtual EventRaces EventRace { get; set; }
 
        [ForeignKey("Guest1Id")]
        [InverseProperty("EventRaceGuestsGuest1")]
        [IgnoreDataMember]
        public virtual Guests Guest1 { get; set; }
 
        [ForeignKey("Guest2Id")]
        [InverseProperty("EventRaceGuestsGuest2")]
        [IgnoreDataMember]
        public virtual Guests Guest2 { get; set; }
 
        [ForeignKey("PlaceId")]
        [InverseProperty("EventRaceGuestsPlace")]
        [IgnoreDataMember]
        public virtual Places Place { get; set; }

    }
}
