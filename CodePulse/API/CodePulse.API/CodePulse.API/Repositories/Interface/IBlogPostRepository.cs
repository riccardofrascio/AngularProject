using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories.Interface;

public interface IBlogPostRepository
{
    public Task<BlogPost> CreateAsync(BlogPost blogPost);

    public Task<IEnumerable<BlogPost>> GetAllAsync();

    public Task<BlogPost?> UpdateAsync(BlogPost blogPost);

    public Task<BlogPost?> getByIdAsync(Guid id);


}
