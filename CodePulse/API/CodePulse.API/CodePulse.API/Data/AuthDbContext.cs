using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Data
{
    public class AuthDbContext : IdentityDbContext
    {
        public AuthDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var readerRoleId = "6e63b2fe-db10-48c8-a8fd-93e8ff0ae16c";
            var writerRoleId = "e6ef93ee-7137-4206-ade0-b37c4a173fff";

            var roles = new List<IdentityRole>
            {
                new IdentityRole()
                {
                    Id = readerRoleId,
                    Name = "Reader",
                    NormalizedName = "reader".ToUpper(),
                    ConcurrencyStamp = readerRoleId

                },
                new IdentityRole()
                {
                    Id = writerRoleId,
                    Name = "Writer",
                    NormalizedName = "Writer".ToUpper(),
                    ConcurrencyStamp = writerRoleId

                }
            };
            builder.Entity<IdentityRole>().HasData(roles);
            
            var adminUserId = "90cab6b0-b32c-4388-a9a1-9177e0950a1d";
            var admin = new IdentityUser()
            {
                Id = adminUserId,
                UserName = "admin@codepulse.com",
                Email = "admin@codepulse.com",
                NormalizedEmail = "admin@codepulse.com".ToUpper(),
                NormalizedUserName = "admin@codepulse.com".ToUpper()
            };
            admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "Admin@123");
            builder.Entity<IdentityUser>().HasData(admin);

            var adminRoles = new List<IdentityUserRole<string>>()
            {
                new IdentityUserRole<string>
                {
                    UserId = adminUserId,
                    RoleId = readerRoleId
                },
                new IdentityUserRole<string>
                {
                    UserId = adminUserId,
                    RoleId = writerRoleId
                },
            };

            builder.Entity<IdentityUserRole<string>>().HasData(adminRoles);
        }
    }
}
