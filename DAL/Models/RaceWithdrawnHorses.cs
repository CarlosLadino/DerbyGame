namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class RaceWithdrawnHorses
    {
        public RaceWithdrawnHorses()
        {
            
        }

        [Required]
        public int Id { get; set; }

        [Required]
        public int RaceId { get; set; }

        [Required]
        public int HorseNumber { get; set; }
 
        [ForeignKey("RaceId")]
        [InverseProperty("RaceWithdrawnHorsesRace")]
        [IgnoreDataMember]
        public virtual Races Race { get; set; }

    }
}
