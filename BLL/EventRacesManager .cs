using Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace BLL
{
    public class EventRacesManager
    {
        protected readonly DataContext _context;
        public EventRacesManager(DataContext context)
        {
            this._context = context;
        }

        public IEnumerable<EventRaces> All 
        { 
            get 
            {
                return this._context.EventRaces;  
            }
        }

        public IEnumerable<VW_EventRaces> VW_AllByEvent(int eventId)
        {
                return this._context.VW_EventRaces.Where(e => e.EventId == eventId && e.Archived == false);           
        }
        public IEnumerable<VW_EventRaces> VW_AllByEventSelected(int eventId)
        {
            return this._context.VW_EventRaces.Where(e => e.EventId == eventId && e.Selected == true);
        }

        public IEnumerable<VW_EventRaces> VW_AllByEventNonSelected(int eventId)
        {
            return this._context.VW_EventRaces.Where(e => e.EventId == eventId && e.Selected == false);
        }

        public EventRaces Find(int id)
        {
            return this._context.EventRaces.Where(e => e.Id == id).FirstOrDefault();
        }

        public EventRaces Save(EventRaces record, ICollection<ValidationResult> errorMessages)
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
                    this._context.EventRaces.Add(record);
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

        private bool IsUnique(EventRaces record, ICollection<ValidationResult> errorMessages)
        {
            bool recordsFound = false;
            recordsFound = this._context.EventRaces.Any(e => e.EventId == record.EventId && e.RaceId == record.RaceId && e.Id != record.Id);

            if ( recordsFound)
            {
                errorMessages.Add(new ValidationResult("A record with the same event and race already exists."));
            }

            return !recordsFound;
        }

        public bool SaveList(int eventId, string eventRaces)
        {
            return this._context.SaveEventRacesList(eventId, eventRaces);
        }

    }
}
