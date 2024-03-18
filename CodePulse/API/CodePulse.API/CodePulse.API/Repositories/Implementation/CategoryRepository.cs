using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        public readonly ApplicationDbContext context;

        public CategoryRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<Category> CreateAsync(Category category)
        {
            await context.Categories.AddAsync(category);
            await context.SaveChangesAsync();

            return category;
        }

        public async Task<Category?> DeleteAsync(Guid id)
        {
            var exsistingCategory = await context.Categories.FirstOrDefaultAsync(elem => elem.Id == id);

            if (exsistingCategory is null)
            {
                return null;
            }
            context.Categories.Remove(exsistingCategory);
            await context.SaveChangesAsync();
            return exsistingCategory;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await context.Categories.ToListAsync();
        }

        public async Task<Category?> GetById(Guid id)
        {
            return await context.Categories.FirstOrDefaultAsync(elem => elem.Id == id);
        }

        public async Task<Category?> UpdateAsync(Category category)
        {
            var exsistingCategory = await context.Categories.FirstOrDefaultAsync(elem => elem.Id == category.Id);

            if (exsistingCategory is null)
            {
                return null;
            } else
            {
                context.Entry(exsistingCategory).CurrentValues.SetValues(category);
                await context.SaveChangesAsync();
            }
            return category;
        }
    }
}
