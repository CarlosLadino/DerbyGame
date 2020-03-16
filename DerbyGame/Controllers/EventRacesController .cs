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
    public class EventRacesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly BLL.EventRacesManager eventRacesManager;
        public EventRacesController(DataContext context)
        {
            this._context = context;
            this.eventRacesManager = new BLL.EventRacesManager(this._context);
        }

        // GET: api/EventRaces/GetEventRaces
        [HttpGet]
        [ActionName("GetEventRaces")]
        public ActionResult<IEnumerable<EventRaces>> GetEventRaces()
        {
            return this.Ok(this.eventRacesManager.All);
        }

        // GET: api/EventRaces/GetEventRaces
        [HttpGet("{id}")]
        [ActionName("GetEventRacesByEventId")]
        public ActionResult<IEnumerable<VW_EventRaces>> GetEventRacesByEventId(int id)
        {
            var data = this.eventRacesManager.VW_AllByEvent(id);
            return this.Ok(data);
        }

        [HttpGet("{id}")]
        [ActionName("GetSelecteRacesByEventId")]
        public ActionResult<IEnumerable<VW_EventRaces>> GetSelecteRacesByEventId(int id)
        {
            return this.Ok(this.eventRacesManager.VW_AllByEventSelected(id).OrderBy(e => e.NumberOfHorses));
        }

        [HttpGet("{id}")]
        [ActionName("GetNonSelecteRacesByEventId")]
        public ActionResult<IEnumerable<VW_EventRaces>> GetNonSelecteRacesByEventId(int id)
        {
            return this.Ok(this.eventRacesManager.VW_AllByEventNonSelected(id));
        }

        // GET: api/EventRaces/5
        [HttpGet("{id}")]
        [ActionName("GetEventRace")]
        public ActionResult<EventRaces> GetEventRace(int id)
        {
            EventRaces record;

            if(id > 0)
            {
                record = this.eventRacesManager.Find(id);
            }
            else
            {
                record = new EventRaces();               
            }

            if (record == null)
            {
                return NotFound();
            }

            return this.Ok(record);
        }

        [HttpPost]
        [ActionName("Save")]
        public ActionResult<EventRaces> Save (EventRaces record)
        {
            var errorMessages = new List<ValidationResult>();
            this.eventRacesManager.Save(record, errorMessages);
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
        [ActionName("SaveList")]
        public ActionResult<bool> SaveList(HelperObjects.EventRacesList eventRacesList)
        {
            
            if (this.eventRacesManager.SaveList(eventRacesList.EventId, eventRacesList.RacesList))
            {
                return this.Ok(true);
            }
            else
            {
                return this.BadRequest("Unable to save the Event Races");
            }
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return this.eventRacesManager.Delete(id);
        }

        [HttpPost]
        [ActionName("SetActive")]
        public ActionResult<EventRaces> SetActive(EventRaces record)
        {
            var errorMessages = new List<ValidationResult>();
            this.eventRacesManager.Save(record, errorMessages);
            if (errorMessages.Count() == 0)
            {
                return this.Ok(record);
            }
            else
            {
                return this.BadRequest(errorMessages.ToString());
            }
        }
    }
}
