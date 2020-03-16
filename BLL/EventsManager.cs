using Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace BLL
{
    public class EventsManager
    {
        protected readonly DataContext _context;
        public EventsManager(DataContext context)
        {
            this._context = context;
        }

        public IEnumerable<Events> All 
        { 
            get 
            {
                return this._context.Events;  
            }
        }

        public Events GetActive
        {
            get
            {
                return this._context.Events.Where(e => e.Active == true).FirstOrDefault();
            }
        }

        public Events Find(int id)
        {
            return this._context.Events.Where(e => e.Id == id).FirstOrDefault();
        }

        public Events Save(Events record, ICollection<ValidationResult> errorMessages)
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
                    this._context.Events.Add(record);
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

        private bool IsUnique(Events record, ICollection<ValidationResult> errorMessages)
        {
            bool recordsFound = false;
            recordsFound = this._context.Events.Any(e => e.Name == record.Name && e.Id != record.Id);

            if ( recordsFound)
            {
                errorMessages.Add(new ValidationResult("A record with the same name already exists."));
            }

            return !recordsFound;
        }

        public bool SetActive(int id, bool active, List<ValidationResult> errorMessages)
        {
            bool isOk = false;
            var record = this.Find(id);
            if (record != null)
            {
                record.Active = active;
                this.Save(record, errorMessages);
                isOk = true;
            }

            return isOk;
        }

        public IEnumerable<VW_EventGuestTotals> GetEventTotalsById(int id)
        {
            return this._context.VW_EventGuestTotals.Where(e => e.EventId == id).OrderByDescending(e => e.TotalAmount).ThenBy(e => e.GuestName);
        }
    }
}
