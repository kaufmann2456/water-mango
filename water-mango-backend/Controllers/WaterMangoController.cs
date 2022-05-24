using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using WaterMangoBackend.Model;

namespace WaterMangoBackend.Controllers
{   
    [Route("watermangobackend")]
    [ApiController]
    public class WaterMangoController : ControllerBase
    {
        [HttpGet("getPlants")]
        public IActionResult GetPlants()
        {
            List<Plant> plants = new List<Plant>();
            using (var context = new WaterMangoDatabaseContext()) 
            {
                plants.AddRange(context.Plants.ToList());
            }

            return Ok(plants);
        }

        [HttpPost("updateLastWateredTime")]   
        public IActionResult UpdateLastWateredTime([FromForm]int id, [FromForm] string dateTime)
        {
            Plant plant = new Plant();
            DateTime updatedLastWateredTime = DateTime.Parse(dateTime);
            using (var context = new WaterMangoDatabaseContext()) 
            {
                plant = context.Plants.Where(i => i.Id == id).FirstOrDefault();
                if(plant != null) {
                    plant.LastWateredTime = updatedLastWateredTime;
                    context.SaveChanges();
                }
            }
            return Ok(plant);
        }
    }
}