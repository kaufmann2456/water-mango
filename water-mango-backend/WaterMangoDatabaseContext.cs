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
            modelBuilder.Entity<Plant>().HasData(new Plant { Id = 1, Name = "Mango", LastWateredTime = DateTime.Now });
            modelBuilder.Entity<Plant>().HasData(new Plant { Id = 2, Name = "Feather Reed Grass", LastWateredTime = DateTime.Now });
            modelBuilder.Entity<Plant>().HasData(new Plant { Id = 3, Name = "Nasturtium", LastWateredTime = DateTime.Now });
            modelBuilder.Entity<Plant>().HasData(new Plant { Id = 4, Name = "Pinwheel Zinnia", LastWateredTime = DateTime.Now });
            modelBuilder.Entity<Plant>().HasData(new Plant { Id = 5, Name = "Sea Holly", LastWateredTime = DateTime.Now });
            modelBuilder.Entity<Plant>().HasData(new Plant { Id = 6, Name = "Thornless Honeylocust", LastWateredTime = DateTime.Now });
        }
    }
}