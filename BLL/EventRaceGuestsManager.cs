using Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace BLL
{
    public class EventRaceGuestsManager
    {
        protected readonly DataContext _context;
        public EventRaceGuestsManager(DataContext context)
        {
            this._context = context;
        }

        public IEnumerable<EventRaceGuests> All 
        { 
            get 
            {
                return this._context.EventRaceGuests;  
            }
        }

        public IEnumerable<VW_EventRaceGuests> VW_All
        {
            get
            {
                return this._context.VW_EventRaceGuests;
            }
        }

        public IEnumerable<VW_EventRaceGuests> VW_AllByEventRaceId(int eventRaceId)
        {
            return this._context.VW_EventRaceGuests.Where( e => e.EventRaceId == eventRaceId).OrderBy(e=>e.AssignedHorseNumber);
        }

        public EventRaceGuests Find(int id)
        {
            return this._context.EventRaceGuests.Where(e => e.Id == id).FirstOrDefault();
        }

        public EventRaceGuests Save(EventRaceGuests record, ICollection<ValidationResult> errorMessages)
        {
            if (record == null)
            {
                throw new ArgumentNullException("record");
            }

            if (errorMessages == null)
            {
                throw new ArgumentNullException("errorMessages");
            }

            if(Validator.TryValidateObject(record, new ValidationContext(record,null,null), errorMessages))
            {
                if (record.Id == 0)
                {
                    this._context.EventRaceGuests.Add(record);
                }
                else
                {
                    this._context.Entry(record).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                }

                this._context.SaveChanges();
            }

            return record;
        }
       
        public bool Delete(int id)
        {
            bool isOk = false;
            var record = this.Find(id);
            if (record != null)
            {
                this._context.Remove(record);
                isOk = this._context.SaveChanges() > 0;
            }

            return isOk;
        }

        public IEnumerable<VW_EventRaceGuests> GetEventRaceGuestsByEventRaceId(int eventRaceId)
        {
            var raceId = this._context.EventRaces.Where(e => e.Id == eventRaceId).FirstOrDefault().RaceId;          
            List<VW_EventRaceGuests> erg = this.VW_AllByEventRaceId(eventRaceId).ToList();
            if (raceId > 0 && erg.Count == 0)
            { 
                erg = new List<VW_EventRaceGuests>();
                this.AddHorses(erg, raceId, eventRaceId);
                this.MarkWithdrawnHorses(erg, raceId);                       
            }
            this.MarkProtagonist(erg, raceId);
            return erg;
        }

        private void AddHorses(List<VW_EventRaceGuests> erg, int raceId, int eventRaceId)
        {
            var numberOfHorses = this._context.Races.Where(r => r.Id == raceId).FirstOrDefault().NumberOfHorses;

            for (int index = 0; index < numberOfHorses; index++)
            {
                erg.Add(new VW_EventRaceGuests { EventRaceId = eventRaceId, AssignedHorseNumber = index + 1 });                
            }
        }
        private void MarkWithdrawnHorses(List<VW_EventRaceGuests> erg, int raceId)
        {
            var withDrawnHorses = this._context.RaceWithdrawnHorses.Where(w => w.RaceId == raceId).ToList();
            var scratchedGuest = this._context.Guests.Where(g => g.Id == 7003).FirstOrDefault();
            if (withDrawnHorses != null && scratchedGuest != null)
            {
                withDrawnHorses.ForEach(horse => {
                    var item = erg.Where(e => e.AssignedHorseNumber == horse.HorseNumber).FirstOrDefault();
                    if(item != null)
                    {
                        item.Guest1Id = scratchedGuest.Id;
                        item.Guest1Name = scratchedGuest.Name;
                        item.Guest1Avatar = scratchedGuest.AvatarName;
                        item.Guest2Id = scratchedGuest.Id;
                        item.Guest2Name = scratchedGuest.Name;
                        item.Guest2Avatar = scratchedGuest.AvatarName;
                    }
                });
            }
        }
        private void MarkWinnerHorses(List<VW_EventRaceGuests> erg, int raceId)
        {

            var raceResults = this._context.RaceResults.Where(r => r.RaceId == raceId).ToList();
            raceResults.ForEach(result => {
                var item = erg.Where(e => e.AssignedHorseNumber == result.HorseNumber).FirstOrDefault();
                if (item != null)
                {
                    item.PlaceId = result.PlaceId;                    
                }
            });
        }
        private void MarkProtagonist(IEnumerable<VW_EventRaceGuests> erg,int raceId)
        {
            var raceProgress = this._context.RaceProgress.Where(r => r.RaceId == raceId).ToList().GroupBy(h =>h.HorseNumber).Select(grp => grp.First()).ToList();

            // Mark Winners if any as protagonist
            if (raceProgress.Count == 0)
            {
                erg.ToList().ForEach(e => {
                    e.IsProtagonist = e.PlaceId > 0;
                });
            }
            // Mark Progress
            raceProgress.ForEach(result => {
                var item = erg.Where(e => e.AssignedHorseNumber == result.HorseNumber).FirstOrDefault();
                if (item != null)
                {
                    item.IsProtagonist = true;
                }
            });
        }
        ////private bool IsUnique(EventRaceGuests record, ICollection<ValidationResult> errorMessages)
        ////{
        ////    bool recordsFound = false;
        ////    recordsFound = this._context.EventRaceGuests.Any(e => e.EventRaceId == record.EventRaceId && e.Guest1Id == record.Guest1Id && e.Id != record.Id);

        ////    if ( recordsFound)
        ////    {
        ////        errorMessages.Add(new ValidationResult("A record with the same race and guest already exists."));
        ////    }

        ////    return !recordsFound;
        ////}
    }
}
