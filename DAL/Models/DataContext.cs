namespace Data.Models
{
    using Microsoft.Data.SqlClient;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Data.SqlClient;
    using System.Linq;

    public partial class DataContext : DbContext
    {
        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        // Tables
        public virtual DbSet<EventRaceGuests> EventRaceGuests { get; set; }
        public virtual DbSet<EventRaces> EventRaces { get; set; }
        public virtual DbSet<Events> Events { get; set; }
        public virtual DbSet<Guests> Guests { get; set; }
        public virtual DbSet<Places> Places { get; set; }
        public virtual DbSet<RaceResults> RaceResults { get; set; }
        public virtual DbSet<RaceWithdrawnHorses> RaceWithdrawnHorses { get; set; }
        public virtual DbSet<Races> Races { get; set; }



        // Views
        public virtual DbSet<VW_EventRaces> VW_EventRaces { get; set; }
        public virtual DbSet<VW_EventRaceGuests> VW_EventRaceGuests { get; set; }
        public virtual DbSet<VW_EventGuestTotals> VW_EventGuestTotals { get; set; }

        // Stored Procedures
        public void ResetAllGuestToNotActive()
        {
            this.Database.ExecuteSqlRaw("Update Guests set IsActive = 0");
        }

        public bool SaveEventRacesList(int eventId, string racesList)
        {
            SqlParameter paramEventId = new SqlParameter("@EventId", eventId);
            SqlParameter paramRaceIds = new SqlParameter("@RaceIds", racesList);
            return this.Database.ExecuteSqlRaw("exec SaveEventRaces @EventId, @RaceIds", paramEventId, paramRaceIds) > 0;
        }
    }
}
