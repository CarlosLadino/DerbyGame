namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class RaceResults
    {
        public RaceResults()
        {
            
        }

        [Required]
        public int Id { get; set; }

        [Required]
        public int RaceId { get; set; }

        [Required]
        public int PlaceId { get; set; }

        [Required]
        public int HorseNumber { get; set; }
 
        [ForeignKey("PlaceId")]
        [InverseProperty("RaceResultsPlace")]
        [IgnoreDataMember]
        public virtual Places Place { get; set; }
 
        [ForeignKey("RaceId")]
        [InverseProperty("RaceResultsRace")]
        [IgnoreDataMember]
        public virtual Races Race { get; set; }

    }
}
