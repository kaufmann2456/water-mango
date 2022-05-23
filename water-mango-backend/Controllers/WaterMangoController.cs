using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
    }
}