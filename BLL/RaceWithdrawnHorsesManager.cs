using Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace BLL
{
    public class RaceWithdrawnHorsesManager
    {
        protected readonly DataContext _context;
        public RaceWithdrawnHorsesManager(DataContext context)
        {
            this._context = context;
        }

        public IEnumerable<RaceWithdrawnHorses> All 
        { 
            get 
            {
                return this._context.RaceWithdrawnHorses;  
            }
        }

        public IEnumerable<RaceWithdrawnHorses> AllByRaceId(int raceId)
        {
            return this._context.RaceWithdrawnHorses.Where(r => r.RaceId == raceId);            
        }

        public RaceWithdrawnHorses Find(int id)
        {
            return this._context.RaceWithdrawnHorses.Where(e => e.Id == id).FirstOrDefault();
        }

        public RaceWithdrawnHorses Save(RaceWithdrawnHorses record, ICollection<ValidationResult> errorMessages)
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
                    this._context.RaceWithdrawnHorses.Add(record);
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

        private bool IsUnique(RaceWithdrawnHorses record, ICollection<ValidationResult> errorMessages)
        {
            bool recordsFound = false;
            recordsFound = this._context.RaceWithdrawnHorses.Any(e => e.RaceId == record.RaceId && e.HorseNumber == record.HorseNumber && e.Id != record.Id);

            if ( recordsFound)
            {
                errorMessages.Add(new ValidationResult("A record with the same race and horse number already exists."));
            }

            return !recordsFound;
        }
    }
}
