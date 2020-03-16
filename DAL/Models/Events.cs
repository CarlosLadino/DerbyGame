namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class Events
    {
        public Events()
        {
            EventRacesEvent = new HashSet<EventRaces>();
        }

        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        [Required]
        public DateTime EventDate { get; set; }

        [Required]
        public bool Active { get; set; }

        [InverseProperty("Event")]
        [IgnoreDataMember]
        public virtual ICollection<EventRaces> EventRacesEvent { get; set; }
    }
}
