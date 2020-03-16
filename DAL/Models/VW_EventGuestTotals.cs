namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class VW_EventGuestTotals
    {        
        public int Id { get; set; }

        public int EventId { get; set; }

        public string GuestName { get; set; }

        public string GuestAvatar { get; set; }

        public decimal TotalAmount { get; set; }
    }
}
