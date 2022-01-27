namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class VW_RaceProgress
    {
        public VW_RaceProgress()
        {}

        public long Id { get; set; }

        public int RaceId { get; set; }

        public int TimeMarker { get; set; }

        public int FirstPlace { get; set; }

        public int SecondPlace { get; set; }

        public int ThirdPlace { get; set; }
    }
}
