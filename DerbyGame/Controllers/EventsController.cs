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
    public class EventsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly BLL.EventsManager eventsManager;
        public EventsController(DataContext context)
        {
            this._context = context;
            this.eventsManager = new BLL.EventsManager(this._context);
        }

        // GET: api/Events/GetEvents
        [HttpGet]
        [ActionName("GetEvents")]
        public ActionResult<IEnumerable<VW_Events>> GetEvents()
        {
            return this.Ok(this.eventsManager.VwAll);
        }

        [HttpGet]
        [ActionName("GetActive")]
        public ActionResult<Events> GetActive()
        {
            var activeEvent = this.eventsManager.GetActive;
            if (activeEvent != null)
            {
                return this.Ok(activeEvent);
            }
            else
            {
                return NotFound();
            }
            
        }

        [HttpGet("{id}")]
        [ActionName("GetTotalsById")]
        public ActionResult<Events> GetTotalsById(int id)
        {
            var eventTotals = this.eventsManager.GetEventTotalsById(id);
            if (eventTotals != null)
            {
                return this.Ok(eventTotals);
            }
            else
            {
                return NotFound();
            }

        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        [ActionName("GetEvent")]
        public ActionResult<Events> GetEvent(int id)
        {
            Events record;

            if(id > 0)
            {
                record = this.eventsManager.Find(id);
            }
            else
            {
                record = new Events();
                record.EventDate = DateTime.Now;
            }

            if (record == null)
            {
                return NotFound();
            }

            return this.Ok(record);
        }

        [HttpPost]
        [ActionName("Save")]
        public ActionResult<Events> Save (Events record)
        {
            var errorMessages = new List<ValidationResult>();
            this.eventsManager.Save(record, errorMessages);
            if (errorMessages.Count() == 0)
            {
                return this.Ok(record);
            }
            else
            {
                return this.BadRequest(errorMessages.ToString());
            }
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return this.eventsManager.Delete(id);
        }

        [HttpPost]
        [ActionName("SetActive")]
        public ActionResult<Events> SetActive(Events record)
        {
            var errorMessages = new List<ValidationResult>();
            var result = this.eventsManager.SetActive(record.Id, record.Active, errorMessages);
            if (errorMessages.Count() == 0)
            {
                return this.Ok(true);
            }
            else
            {
                return this.BadRequest(errorMessages.ToString());
            }
        }
    }
}
