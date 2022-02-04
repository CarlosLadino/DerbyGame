using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Data.Models;
using System.ComponentModel.DataAnnotations;

namespace DerbyGame.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class EventRaceGuestsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly BLL.EventRaceGuestsManager eventRaceGuestsManager;
        public EventRaceGuestsController(DataContext context)
        {
            this._context = context;
            this.eventRaceGuestsManager = new BLL.EventRaceGuestsManager(this._context);
        }

        // GET: api/EventRaceGuests/GetEventRaceGuests
        [HttpGet]
        [ActionName("GetEventRaceGuests")]
        public ActionResult<IEnumerable<EventRaceGuests>> GetEventRaceGuests()
        {
            return this.Ok(this.eventRaceGuestsManager.All);
        }

        // GET: api/EventRaceGuests/GetEventRaceGuests
        [HttpGet("{id}")]
        [ActionName("GetEventRaceGuestsByEventRaceId")]
        public ActionResult<IEnumerable<VW_EventRaceGuests>> GetEventRaceGuestsByEventRaceId(int id)
        {
            //return this.Ok(this.eventRaceGuestsManager.VW_AllByEventRaceId(id));
            return this.Ok(this.eventRaceGuestsManager.GetEventRaceGuestsByEventRaceId(id));
        }

        // GET: api/EventRaceGuests/5
        [HttpGet("{id}")]
        [ActionName("GetEventRaceGuest")]
        public ActionResult<EventRaceGuests> GetEventRaceGuest(int id)
        {
            EventRaceGuests record;

            if(id > 0)
            {
                record = this.eventRaceGuestsManager.Find(id);
            }
            else
            {
                record = new EventRaceGuests();               
            }

            if (record == null)
            {
                return NotFound();
            }

            return this.Ok(record);
        }

        [HttpPost]
        [ActionName("Save")]
        public ActionResult<EventRaceGuests> Save (EventRaceGuests record)
        {
            var errorMessages = new List<ValidationResult>();
            if (record.Guest2Id == 0)
            {
                record.Guest2Id = null;
            }
            this.eventRaceGuestsManager.Save(record, errorMessages);
            if (errorMessages.Count() == 0)
            {
                return this.Ok(record);
            }
            else
            {
                return this.BadRequest(errorMessages.ToString());
            }
        }

        [HttpPost]
        [ActionName("SaveRace")]
        public ActionResult<EventRaceGuests> SaveRace(List<EventRaceGuests> records)
        {
            var errorMessages = new List<ValidationResult>();
            records.ForEach(record => 
            {                
                if (record.Guest2Id == 0)
                {
                    record.Guest2Id = null;
                }
                this.eventRaceGuestsManager.Save(record, errorMessages);
            });

            if (errorMessages.Count() == 0)
            {
                return this.Ok(true);
            }
            else
            {
                return this.BadRequest(errorMessages.ToString());
            }
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return this.eventRaceGuestsManager.Delete(id);
        }
    }
}
