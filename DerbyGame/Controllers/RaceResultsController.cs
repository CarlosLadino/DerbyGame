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
    public class RaceResultsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly BLL.RaceResultsManager raceResultsManager;
        public RaceResultsController(DataContext context)
        {
            this._context = context;
            this.raceResultsManager = new BLL.RaceResultsManager(this._context);
        }

        // GET: api/RaceResults/GetRaceResults
        [HttpGet("{raceId}")]
        [ActionName("GetRaceResults")]
        public ActionResult<IEnumerable<RaceResults>> GetRaceResults(int raceId)
        {
            if (raceId > 0)
            {
                return this.Ok(this.raceResultsManager.AllByRaceId(raceId));
            }
            else
            {
                List<RaceResults> results = new List<RaceResults>();
                results.Add(new RaceResults() { PlaceId = 1, RaceId = 0, HorseNumber = 0 });
                results.Add(new RaceResults() { PlaceId = 2, RaceId = 0, HorseNumber = 0 });
                results.Add(new RaceResults() { PlaceId = 3, RaceId = 0, HorseNumber = 0 });
                return this.Ok(results);
            }
            
        }

        // GET: api/RaceResults/5
        [HttpGet("{id}")]
        [ActionName("GetRaceResult")]
        public ActionResult<RaceResults> GetRaceResult(int id)
        {
            RaceResults record;

            if(id > 0)
            {
                record = this.raceResultsManager.Find(id);
            }
            else
            {
                record = new RaceResults();       
            }

            if (record == null)
            {
                return NotFound();
            }

            return this.Ok(record);
        }

        [HttpGet("{id}")]
        [ActionName("GetRaceResultByRaceId")]
        public ActionResult<RaceResults> GetRaceResultByRaceId(int id)
        {
            return this.Ok(this.raceResultsManager.AllByRaceId(id));            
        }

        [HttpPost]
        [ActionName("Save")]
        public ActionResult<RaceResults> Save (RaceResults record)
        {
            var errorMessages = new List<ValidationResult>();
            this.raceResultsManager.Save(record, errorMessages);
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
            return this.raceResultsManager.Delete(id);
        }
    }
}
