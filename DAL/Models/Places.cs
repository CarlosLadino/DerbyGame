namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class Places
    {
        public Places()
        {
            EventRaceGuestsPlace = new HashSet<EventRaceGuests>();
            RaceResultsPlace = new HashSet<RaceResults>();
        }

        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }


        [InverseProperty("Place")]
        [IgnoreDataMember]
        public virtual ICollection<EventRaceGuests> EventRaceGuestsPlace { get; set; }

        [InverseProperty("Place")]
        [IgnoreDataMember]
        public virtual ICollection<RaceResults> RaceResultsPlace { get; set; }
    }
}
