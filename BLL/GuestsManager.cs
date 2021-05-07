using Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace BLL
{
    public class GuestsManager
    {
        protected readonly DataContext _context;
        public GuestsManager(DataContext context)
        {
            this._context = context;
        }

        public IEnumerable<Guests> All 
        { 
            get 
            {
                return this._context.Guests.Where(g => g.IsSystem == false);  
            }
        }

        public IEnumerable<Guests> AllActive
        {
            get
            {
                return this._context.Guests.Where( g => g.IsActive == true && g.IsSystem == false).OrderBy(g => g.Name);
            }
        }

        public IEnumerable<Guests> AllNotActive
        {
            get
            {
                return this._context.Guests.Where(g => g.IsActive == false && g.IsSystem == false).OrderBy(g => g.Name);
            }
        }

        public Guests Find(int id)
        {
            return this._context.Guests.Where(e => e.Id == id).FirstOrDefault();
        }

        public Guests Save(Guests record, ICollection<ValidationResult> errorMessages)
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
                    this._context.Guests.Add(record);
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

        public bool SetIsActive(int id, bool isActive, ICollection<ValidationResult> errorMessages)
        {
            bool isOk = false;
            var record = this.Find(id);
            if (record != null)
            {
                record.IsActive = isActive;
                this.Save(record, errorMessages);
                isOk = true;
            }

            return isOk;
        }

        private bool IsUnique(Guests record, ICollection<ValidationResult> errorMessages)
        {
            bool recordsFound = false;
            recordsFound = this._context.Guests.Any(e => e.Name == record.Name && e.Id != record.Id);

            if ( recordsFound)
            {
                errorMessages.Add(new ValidationResult("A record with the same name already exists."));
            }

            return !recordsFound;
        }

        public void ResetIsActiveAll(List<ValidationResult> errorMessages)
        {
            this._context.ResetAllGuestToNotActive();
        }
    }
}
