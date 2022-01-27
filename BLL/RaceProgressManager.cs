using Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace BLL
{
    public class RaceProgressManager
    {
        protected readonly DataContext _context;
        public RaceProgressManager(DataContext context)
        {
            this._context = context;
        }

        public IEnumerable<RaceProgress> All 
        { 
            get 
            {
                return this._context.RaceProgress;  
            }
        }

        public IEnumerable<VW_RaceProgress> VW_All
        {
            get
            {
                return this._context.VW_RaceProgress;
            }
        }

        public IEnumerable<VW_RaceProgress> RaceProgressByRaceid(int raceId)
        {
            return this._context.VW_RaceProgress.Where(r => r.RaceId == raceId);
        }

        public IEnumerable<RaceProgress> AllByRaceId(int raceId)
        {
            return this._context.RaceProgress.Where(r => r.RaceId == raceId);            
        }

        public RaceProgress Find(int id)
        {
            return this._context.RaceProgress.Where(e => e.Id == id).FirstOrDefault();
        }

        public RaceProgress Find(int raceId, int placeId)
        {
            return this._context.RaceProgress.Where(e => e.RaceId == raceId && e.PlaceId == placeId).FirstOrDefault();
        }

        public RaceProgress Save(RaceProgress record, ICollection<ValidationResult> errorMessages)
        {
            if (record == null)
            {
                throw new ArgumentNullException("record");
            }

            if (errorMessages == null)
            {
                throw new ArgumentNullException("errorMessages");
            }

            if(Validator.TryValidateObject(record, new ValidationContext(record,null,null), errorMessages) && this.IsUnique(record, errorMessages))
            {
                if (record.Id == 0)
                {
                    this._context.RaceProgress.Add(record);
                }
                else
                {
                    this._context.Entry(record).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                }

                this._context.SaveChanges();
            }

            return record;
        }
       
        public VW_RaceProgress SaveProgress(VW_RaceProgress record, ICollection<ValidationResult> errorMessages)
        {
            if (record == null)
            {
                throw new ArgumentNullException("record");
            }

            if (errorMessages == null)
            {
                throw new ArgumentNullException("errorMessages");
            }

            var makerExists = this._context.RaceProgress.Where(r => r.RaceId == record.RaceId && r.TimeMarker == record.TimeMarker).Any();
            RaceProgress firstPlace;
            RaceProgress secondPlace;
            RaceProgress thirdPlace;

            if (makerExists)
            {
                this.UpdateProgressRecord(record.RaceId, 1, record.TimeMarker, record.FirstPlace, errorMessages);
                this.UpdateProgressRecord(record.RaceId, 2, record.TimeMarker, record.SecondPlace, errorMessages);
                this.UpdateProgressRecord(record.RaceId, 3, record.TimeMarker, record.ThirdPlace, errorMessages);
            }
            else
            {
                firstPlace = new RaceProgress { RaceId = record.RaceId, PlaceId = 1, TimeMarker = record.TimeMarker, HorseNumber = record.FirstPlace };
                this.Save(firstPlace, errorMessages);
                secondPlace = new RaceProgress { RaceId = record.RaceId, PlaceId = 2, TimeMarker = record.TimeMarker, HorseNumber = record.SecondPlace };
                this.Save(secondPlace, errorMessages);
                thirdPlace = new RaceProgress { RaceId = record.RaceId, PlaceId = 3, TimeMarker = record.TimeMarker, HorseNumber = record.ThirdPlace };
                this.Save(thirdPlace, errorMessages);
            }

            return record;
        }

        public bool DeleteProgress(VW_RaceProgress vwRecord)
        {
            bool isOk = false;
            var firstPlace = this.Find(vwRecord.RaceId, 1);
            if (firstPlace != null)
            {
                this._context.Remove(firstPlace);
            }
            var secondPlace = this.Find(vwRecord.RaceId, 2);
            if (secondPlace != null)
            {
                this._context.Remove(secondPlace);
            }
            var thirdPlace = this.Find(vwRecord.RaceId, 3);
            if (thirdPlace != null)
            {
                this._context.Remove(thirdPlace);
            }
            isOk = this._context.SaveChanges() > 0;
            return isOk;
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

        private bool IsUnique(RaceProgress record, ICollection<ValidationResult> errorMessages)
        {
            bool recordsFound = false;
            recordsFound = this._context.RaceResults.Any(e => e.RaceId == record.RaceId && e.PlaceId == record.PlaceId && e.HorseNumber == record.HorseNumber && e.Id != record.Id);

            if ( recordsFound)
            {
                errorMessages.Add(new ValidationResult("A record with the same race, place and horse already exists."));
            }

            return !recordsFound;
        }

        private void  UpdateProgressRecord(int raceId, int placeId, int timeMarker, int horseNumber, ICollection<ValidationResult> errorMessages)
        {
            var record = this.Find(raceId, placeId);
            if (record != null)
            {
                record.TimeMarker = timeMarker;
                record.HorseNumber = horseNumber;
                this.Save(record, errorMessages);
            }
        }
    }
}
