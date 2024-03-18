using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation
{
    public class BlogPostRepository : IBlogPostRepository
    {

        public readonly ApplicationDbContext context;

        public BlogPostRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<BlogPost> CreateAsync(BlogPost blogPost)
        {
            await context.BlogPosts.AddAsync(blogPost);
            await context.SaveChangesAsync();
            return blogPost;
        }

        public async Task<IEnumerable<BlogPost>> GetAllAsync()
        {
            return await context.BlogPosts.Include(x => x.Categories).ToListAsync();
        }

        public async Task<BlogPost?> getByIdAsync(Guid id)
        {
            return await context.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(elem => elem.Id == id);
        }

        public async Task<BlogPost?> UpdateAsync(BlogPost blogPost)
        {
            var exsistingBlogPost = await context.BlogPosts.FirstOrDefaultAsync(elem => elem.Id == blogPost.Id);

            if (exsistingBlogPost is null)
            {
                return null;
            }
            else
            {
                context.Entry(exsistingBlogPost).CurrentValues.SetValues(blogPost);
                exsistingBlogPost.Categories = blogPost.Categories;
                await context.SaveChangesAsync();
            }
            return blogPost;
        }
    }
}
