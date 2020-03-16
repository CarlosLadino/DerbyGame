using Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace BLL
{
    public class RaceResultsManager
    {
        protected readonly DataContext _context;
        public RaceResultsManager(DataContext context)
        {
            this._context = context;
        }

        public IEnumerable<RaceResults> All 
        { 
            get 
            {
                return this._context.RaceResults;  
            }
        }

        public IEnumerable<RaceResults> AllByRaceId(int raceId)
        {
            return this._context.RaceResults.Where(r => r.RaceId == raceId);            
        }

        public RaceResults Find(int id)
        {
            return this._context.RaceResults.Where(e => e.Id == id).FirstOrDefault();
        }

        public RaceResults Save(RaceResults record, ICollection<ValidationResult> errorMessages)
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
                    this._context.RaceResults.Add(record);
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

        private bool IsUnique(RaceResults record, ICollection<ValidationResult> errorMessages)
        {
            bool recordsFound = false;
            recordsFound = this._context.RaceResults.Any(e => e.RaceId == record.RaceId && e.PlaceId == record.PlaceId && e.Id != record.Id);

            if ( recordsFound)
            {
                errorMessages.Add(new ValidationResult("A record with the same race and place already exists."));
            }

            return !recordsFound;
        }
    }
}
