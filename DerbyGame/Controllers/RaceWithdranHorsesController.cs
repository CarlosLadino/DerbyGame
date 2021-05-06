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
    public class RaceWithdrawnHorsesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly BLL.RaceWithdrawnHorsesManager raceWithdrawnHorsesManager;
        public RaceWithdrawnHorsesController(DataContext context)
        {
            this._context = context;
            this.raceWithdrawnHorsesManager = new BLL.RaceWithdrawnHorsesManager(this._context);
        }

        // GET: api/RaceWithdrawnHorses/GetRaceWithdrawnHorses
        [HttpGet("{raceId}")]
        [ActionName("GetRaceWithdrawnHorses")]
        public ActionResult<IEnumerable<RaceWithdrawnHorses>> GetRaceWithdrawnHorses(int raceId)
        {
            if (raceId > 0)
            {
                return this.Ok(this.raceWithdrawnHorsesManager.AllByRaceId(raceId).OrderBy(r => r.HorseNumber));
            }
            else
            {               
                return this.BadRequest("Race does not exist.");
            }
            
        }
  
        [HttpPost]
        [ActionName("Save")]
        public ActionResult<RaceWithdrawnHorses> Save (RaceWithdrawnHorses record)
        {
            var errorMessages = new List<ValidationResult>();
            this.raceWithdrawnHorsesManager.Save(record, errorMessages);
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
            return this.raceWithdrawnHorsesManager.Delete(id);
        }
    }
}
