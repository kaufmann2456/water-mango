using System;
using Microsoft.EntityFrameworkCore;
using WaterMangoBackend.Model;

namespace WaterMangoBackend
{
    public class WaterMangoDatabaseContext : DbContext
    {
        public DbSet<Plant> Plants { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) 
        {
            optionsBuilder.UseSqlite(@"DataSource=watermangodatabase.db;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // seed data
            modelBuilder.Entity<Plant>().HasData(new Plant {
                Id = 1, Name = "Mango", LastWateredTime = DateTime.Now,
                ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/3/31/MANGO_%28NILAM%29.jpg"
            });
            modelBuilder.Entity<Plant>().HasData(new Plant {
                Id = 2, Name = "Feather Reed Grass", LastWateredTime = DateTime.Now,
                ImageUrl = "https://live.staticflickr.com/2586/3973205399_2868137498_b.jpg"
            });
            modelBuilder.Entity<Plant>().HasData(new Plant { 
                Id = 3, Name = "Nasturtium", LastWateredTime = DateTime.Now,
                ImageUrl = "https://www.gardeningknowhow.com/wp-content/uploads/2021/07/nasturtium-tropaeolum-majus.jpg"
            });
            modelBuilder.Entity<Plant>().HasData(new Plant { 
                Id = 4, Name = "Pinwheel Zinnia", LastWateredTime = DateTime.Now,
                ImageUrl = "https://extension.umass.edu/plant-identification/sites/plant-identification/files/plant/images/growth/Zinnia%207%20plant_2.jpg"
            });
            modelBuilder.Entity<Plant>().HasData(new Plant { 
                Id = 5, Name = "Sea Holly", LastWateredTime = DateTime.Now,
                ImageUrl = "https://cdn.pixabay.com/photo/2012/02/17/14/53/alpine-sea-holly-14129_1280.jpg"
            });
            modelBuilder.Entity<Plant>().HasData(new Plant { 
                Id = 6, Name = "Thornless Honeylocust", LastWateredTime = DateTime.Now,
                ImageUrl = "https://live.staticflickr.com/65535/40713266143_9126230a1e_b.jpg"
            });
        }
    }
}