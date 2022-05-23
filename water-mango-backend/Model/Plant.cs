using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace WaterMangoBackend.Model
{   
    public class Plant
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime LastWateredTime { get; set; }
    }
}