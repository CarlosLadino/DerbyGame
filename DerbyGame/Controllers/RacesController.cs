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
    public class RacesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly BLL.RacesManager racesManager;
        public RacesController(DataContext context)
        {
            this._context = context;
            this.racesManager = new BLL.RacesManager(this._context);
        }

        // GET: api/Races/GetRaces
        [HttpGet]
        [ActionName("GetRaces")]
        public ActionResult<IEnumerable<Races>> GetRaces()
        {
            return this.Ok(this.racesManager.All);
        }

        // GET: api/Races/5
        [HttpGet("{id}")]
        [ActionName("GetRace")]
        public ActionResult<Races> GetRace(int id)
        {
            Races record;

            if(id > 0)
            {
                record = this.racesManager.Find(id);
            }
            else
            {
                record = new Races();       
            }

            if (record == null)
            {
                return NotFound();
            }

            return this.Ok(record);
        }

        [HttpPost]
        [ActionName("Save")]
        public ActionResult<Races> Save (Races record)
        {
            var errorMessages = new List<ValidationResult>();
            this.racesManager.Save(record, errorMessages);
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
            return this.racesManager.Delete(id);
        }
    }
}
