namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class VW_Guests
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        public bool IsActive { get; set; }

        [StringLength(50)]
        public string AvatarName { get; set; }

        public bool IsSystem { get; set; }

        public bool CanDelete { get; set; }

    }
}
