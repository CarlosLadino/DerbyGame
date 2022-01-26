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

        public IEnumerable<RaceProgress> AllByRaceId(int raceId)
        {
            return this._context.RaceProgress.Where(r => r.RaceId == raceId);            
        }

        public RaceProgress Find(int id)
        {
            return this._context.RaceProgress.Where(e => e.Id == id).FirstOrDefault();
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
    }
}
