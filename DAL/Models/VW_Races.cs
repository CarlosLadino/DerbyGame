namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class VW_Races
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Url { get; set; }

        public int NumberOfHorses { get; set; }

        public bool Archived { get; set; }

        public string VideoName { get; set; }

        public bool CanDelete { get; set; }

        public int ScratchedHorses { get; set; }
    }
}
