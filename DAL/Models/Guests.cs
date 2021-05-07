namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class Guests
    {
        public Guests()
        {
            EventRaceGuestsGuest1 = new HashSet<EventRaceGuests>();
            EventRaceGuestsGuest2 = new HashSet<EventRaceGuests>();
        }

        [Required]
        public int Id { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [StringLength(50)]
        public string AvatarName { get; set; }

        [Required]
        public bool IsSystem { get; set; }

        [InverseProperty("Guest1")]
        [IgnoreDataMember]
        public virtual ICollection<EventRaceGuests> EventRaceGuestsGuest1 { get; set; }

        [InverseProperty("Guest2")]
        [IgnoreDataMember]
        public virtual ICollection<EventRaceGuests> EventRaceGuestsGuest2 { get; set; }
    }
}
