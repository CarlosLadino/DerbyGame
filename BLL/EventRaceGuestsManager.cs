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
