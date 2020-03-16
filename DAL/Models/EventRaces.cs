namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class EventRaces
    {
        public EventRaces()
        {
            EventRaceGuestsEventRace = new HashSet<EventRaceGuests>();
        }

        [Required]
        public int Id { get; set; }

        [Required]
        public int EventId { get; set; }

        [Required]
        public int RaceId { get; set; }
 
        [ForeignKey("EventId")]
        [InverseProperty("EventRacesEvent")]
        [IgnoreDataMember]
        public virtual Events Event { get; set; }
 
        [ForeignKey("RaceId")]
        [InverseProperty("EventRacesRace")]
        [IgnoreDataMember]
        public virtual Races Race { get; set; }

        [InverseProperty("EventRace")]
        [IgnoreDataMember]
        public virtual ICollection<EventRaceGuests> EventRaceGuestsEventRace { get; set; }
    }
}
