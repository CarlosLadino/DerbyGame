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
    public class GuestsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly BLL.GuestsManager guestsManager;
        public GuestsController(DataContext context)
        {
            this._context = context;
            this.guestsManager = new BLL.GuestsManager(this._context);
        }

        // GET: api/Guests/GetGuests
        [HttpGet]
        [ActionName("GetGuests")]
        public ActionResult<IEnumerable<Guests>> GetGuests()
        {
            return this.Ok(this.guestsManager.All);
        }

        [HttpGet]
        [ActionName("GetActiveGuests")]
        public ActionResult<IEnumerable<Guests>> GetActiveGuests()
        {
            return this.Ok(this.guestsManager.AllActive);
        }

        [HttpGet]
        [ActionName("GetNotActiveGuests")]
        public ActionResult<IEnumerable<Guests>> GetNotActiveGuests()
        {
            return this.Ok(this.guestsManager.AllNotActive);
        }

        // GET: api/Guests/5
        [HttpGet("{id}")]
        [ActionName("GetGuest")]
        public ActionResult<Guests> GetGuest(int id)
        {
            Guests record;

            if(id > 0)
            {
                record = this.guestsManager.Find(id);
            }
            else
            {
                record = new Guests();
                record.IsActive = true;
            }

            if (record == null)
            {
                return NotFound();
            }

            return this.Ok(record);
        }

        [HttpPost]
        [ActionName("Save")]
        public ActionResult<Guests> Save (Guests record)
        {
            var errorMessages = new List<ValidationResult>();
            this.guestsManager.Save(record, errorMessages);
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
            return this.guestsManager.Delete(id);
        }
        
        [HttpPost]
        [ActionName("SetIsActive")]
        public ActionResult<Guests> SetIsActive(Guests record)
        {
            var errorMessages = new List<ValidationResult>();
            var result = this.guestsManager.SetIsActive(record.Id, record.IsActive, errorMessages);
            if (errorMessages.Count() == 0)
            {
                return this.Ok(true);
            }
            else
            {
                return this.BadRequest(errorMessages.ToString());
            }
        }

        [HttpPost]
        [ActionName("ResetIsActiveAll")]
        public ActionResult<bool> ResetIsActiveAll()
        {
            var errorMessages = new List<ValidationResult>();
            this.guestsManager.ResetIsActiveAll(errorMessages);
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
