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
    public class RaceProgressController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly BLL.RaceProgressManager raceProgressManager;
        public RaceProgressController(DataContext context)
        {
            this._context = context;
            this.raceProgressManager = new BLL.RaceProgressManager(this._context);
        }

        // GET: api/RaceResults/GetRaceResults
        [HttpGet("{raceId}")]
        [ActionName("GetRaceProgress")]
        public ActionResult<IEnumerable<VW_RaceProgress>> GetRaceProgress(int raceId)
        {
            return this.Ok(this.raceProgressManager.RaceProgressByRaceid(raceId).OrderBy(r => r.TimeMarker));            
        }

        [HttpPost]
        [ActionName("Save")]
        public ActionResult<VW_RaceProgress> Save (VW_RaceProgress record)
        {
            var errorMessages = new List<ValidationResult>();
            this.raceProgressManager.SaveProgress(record, errorMessages);
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
            return this.raceProgressManager.Delete(id);
        }
    }
}
