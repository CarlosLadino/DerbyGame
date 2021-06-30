namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class Races
    {
        public Races()
        {
            EventRacesRace = new HashSet<EventRaces>();
            RaceResultsRace = new HashSet<RaceResults>();
        }

        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(256)]
        public string Name { get; set; }

        [Required]
        [StringLength(256)]
        public string Url { get; set; }

        [Required]
        public int NumberOfHorses { get; set; }

        [Required]
        public bool Archived { get; set; }

        public string VideoName { get; set; }

        [Required]
        public int FinishLineTime { get; set; }

        [InverseProperty("Race")]
        [IgnoreDataMember]
        public virtual ICollection<EventRaces> EventRacesRace { get; set; }

        [InverseProperty("Race")]
        [IgnoreDataMember]
        public virtual ICollection<RaceResults> RaceResultsRace { get; set; }

        [InverseProperty("Race")]
        [IgnoreDataMember]
        public virtual ICollection<RaceWithdrawnHorses> RaceWithdrawnHorsesRace { get; set; }
    }
}
