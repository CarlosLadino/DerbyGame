using Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace BLL
{
    public class RacesManager
    {
        protected readonly DataContext _context;
        public RacesManager(DataContext context)
        {
            this._context = context;
        }

        public IEnumerable<Races> All 
        { 
            get 
            {
                return this._context.Races;  
            }
        }

        public IEnumerable<VW_Races> VwAll
        {
            get
            {
                return this._context.VW_Races;
            }
        }

        public IEnumerable<Races> AllNotArchived
        {
            get
            {
                var result =  this._context.Races.Where( r=> r.Archived == false);
                return result;
            }
        }

        public Races Find(int id)
        {
            return this._context.Races.Where(e => e.Id == id).FirstOrDefault();
        }

        public Races Save(Races record, ICollection<ValidationResult> errorMessages)
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
                    this._context.Races.Add(record);
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

        private bool IsUnique(Races record, ICollection<ValidationResult> errorMessages)
        {
            bool recordsFound = false;
            recordsFound = this._context.Races.Any(e => e.Name == record.Name && e.Id != record.Id);

            if ( recordsFound)
            {
                errorMessages.Add(new ValidationResult("A record with the same name already exists."));
            }

            return !recordsFound;
        }
    }
}
