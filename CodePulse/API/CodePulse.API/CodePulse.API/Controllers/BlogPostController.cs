using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BlogPostController : ControllerBase
{
    private readonly IBlogPostRepository _blogPostRepository;
    private readonly ICategoryRepository _categoryRepository;

    public BlogPostController(IBlogPostRepository blogPostRepository, ICategoryRepository categoryRepository)
    {
        this._blogPostRepository = blogPostRepository;
        this._categoryRepository = categoryRepository;
    }

    [HttpPost]
    [Authorize(Roles = "Writer")]
    public async Task<IActionResult> CreateBlogPost([FromBody] CreateBlogPostRequestDto requestDto)
    {
        var _blogPost = new BlogPost
        {
            Title = requestDto.Title,
            ShortDescription = requestDto.ShortDescription,
            Content = requestDto.Content,
            FeaturedImageUrl = requestDto.FeaturedImageUrl,
            UrlHandle = requestDto.UrlHandle,
            PublishedDate = requestDto.PublishedDate,
            Author = requestDto.Author,
            IsVisible = requestDto.IsVisible,
            Categories = new List<Category>()
        };

        foreach (var categoryGuid in requestDto.Categories)
        {
            var existingCat = await _categoryRepository.GetById(categoryGuid);
            if (existingCat is not null)
            {
                _blogPost.Categories.Add(existingCat);
            }
        }

        if (_blogPost.Title == "" || _blogPost.ShortDescription== "" || _blogPost.Content== "" || 
                _blogPost.FeaturedImageUrl == "" || _blogPost.UrlHandle == "" || _blogPost.Author== "")
        {
            return BadRequest();
        }

        await _blogPostRepository.CreateAsync(_blogPost);

        var response = new BlogPostDto
        {
            Id = _blogPost.Id,
            Title = _blogPost.Title,
            ShortDescription = _blogPost.ShortDescription,
            Content = _blogPost.Content,
            FeaturedImageUrl = _blogPost.FeaturedImageUrl,
            UrlHandle = _blogPost.UrlHandle,
            PublishedDate = _blogPost.PublishedDate,
            Author = _blogPost.Author,
            IsVisible = _blogPost.IsVisible,
            Categories = _blogPost.Categories.Select(x => new CategoryDto { 
                Id = x.Id,
                Name = x.Name,
                UrlHandle= x.UrlHandle
            }).ToList()
        };

        return Ok(response);
    }

    // GET: https://localhost:7128/api/BlogPost
    [HttpGet]
    public async Task<IActionResult> GetAllBlogPosts()
    {
        var _blogPosts = await _blogPostRepository.GetAllAsync();
        var _response = new List<BlogPostDto>();
        foreach (var _blogPost in _blogPosts)
        {
            _response.Add(new BlogPostDto
            {
                Id = _blogPost.Id,
                Title = _blogPost.Title,
                ShortDescription = _blogPost.ShortDescription,
                Content = _blogPost.Content,
                FeaturedImageUrl = _blogPost.FeaturedImageUrl,
                UrlHandle = _blogPost.UrlHandle,
                PublishedDate = _blogPost.PublishedDate,
                Author = _blogPost.Author,
                IsVisible = _blogPost.IsVisible,
                Categories = _blogPost.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle
                }).ToList()
            });
        }
        return Ok(_response);
    }

    [HttpGet]
    [Route("{id:guid}")]
    public async Task<IActionResult> GetBlogPostById([FromRoute] Guid id)
    {
        var _existingBlogPosts = await _blogPostRepository.GetByIdAsync(id);
        if (_existingBlogPosts is null)
        {
            return NotFound();
        }
        var _response = new BlogPostDto
        {
            Id = _existingBlogPosts.Id,
            Title = _existingBlogPosts.Title,
            ShortDescription = _existingBlogPosts.ShortDescription,
            Content = _existingBlogPosts.Content,
            FeaturedImageUrl = _existingBlogPosts.FeaturedImageUrl,
            UrlHandle = _existingBlogPosts.UrlHandle,
            PublishedDate = _existingBlogPosts.PublishedDate,
            Author = _existingBlogPosts.Author,
            IsVisible = _existingBlogPosts.IsVisible,
            Categories = _existingBlogPosts.Categories.Select(x => new CategoryDto
            {
                Id = x.Id,
                Name = x.Name,
                UrlHandle = x.UrlHandle
            }).ToList()
        };

        return Ok(_response);
    }

    [HttpGet]
    [Route("{url}")]
    public async Task<IActionResult> GetBlogPostByUrl([FromRoute] string url)
    {
        var _existingBlogPosts = await _blogPostRepository.GetByUrlAsync(url);
        if (_existingBlogPosts is null)
        {
            return NotFound();
        }
        var _response = new BlogPostDto
        {
            Id = _existingBlogPosts.Id,
            Title = _existingBlogPosts.Title,
            ShortDescription = _existingBlogPosts.ShortDescription,
            Content = _existingBlogPosts.Content,
            FeaturedImageUrl = _existingBlogPosts.FeaturedImageUrl,
            UrlHandle = _existingBlogPosts.UrlHandle,
            PublishedDate = _existingBlogPosts.PublishedDate,
            Author = _existingBlogPosts.Author,
            IsVisible = _existingBlogPosts.IsVisible,
            Categories = _existingBlogPosts.Categories.Select(x => new CategoryDto
            {
                Id = x.Id,
                Name = x.Name,
                UrlHandle = x.UrlHandle
            }).ToList()
        };

        return Ok(_response);
    }

    [HttpPut]
    [Route("{id:guid}")]
    [Authorize(Roles = "Writer")]
    public async Task<IActionResult> UpdateBlogPost([FromRoute] Guid id, UpdateBlogPostRequest request)
    {
        var _blogPost = new BlogPost
        {
            Id = id,
            Title = request.Title,
            ShortDescription = request.ShortDescription,
            Content = request.Content,
            FeaturedImageUrl = request.FeaturedImageUrl,
            UrlHandle = request.UrlHandle,
            PublishedDate = request.PublishedDate,
            Author = request.Author,
            IsVisible = request.IsVisible,
            Categories = new List<Category>()
        };

        foreach (var categoryId in request.Categories)
        {
            var cat = await _categoryRepository.GetById(categoryId);
            if (cat is not null)
            {
                _blogPost.Categories.Add(cat);
            }
        }

        var updatedBlogPost = await _blogPostRepository.UpdateAsync(_blogPost);

        if (updatedBlogPost is null)
        {
            return NotFound();
        }

        var response = new BlogPostDto
        {
            Id = _blogPost.Id,
            Title = _blogPost.Title,
            ShortDescription = _blogPost.ShortDescription,
            Content = _blogPost.Content,
            FeaturedImageUrl = _blogPost.FeaturedImageUrl,
            UrlHandle = _blogPost.UrlHandle,
            PublishedDate = _blogPost.PublishedDate,
            Author = _blogPost.Author,
            IsVisible = _blogPost.IsVisible,
            Categories = _blogPost.Categories.Select(x => new CategoryDto
            {
                Id = x.Id,
                Name = x.Name,
                UrlHandle = x.UrlHandle
            }).ToList()
        };

        return Ok(response);
    }

    [HttpDelete]
    [Route("{id:guid}")]
    [Authorize(Roles = "Writer")]
    public async Task<IActionResult> DeleteBlogPost([FromRoute] Guid id)
    {
        var blogpost = await _blogPostRepository.DeleteAsync(id);
        if (blogpost is null)
        {
            return NotFound();
        }
        var response = new BlogPostDto
        {
            Id = blogpost.Id,
            Title = blogpost.Title,
            ShortDescription = blogpost.ShortDescription,
            Content = blogpost.Content,
            FeaturedImageUrl = blogpost.FeaturedImageUrl,
            UrlHandle = blogpost.UrlHandle,
            PublishedDate = blogpost.PublishedDate,
            Author = blogpost.Author,
            IsVisible = blogpost.IsVisible,
            Categories = blogpost.Categories.Select(x => new CategoryDto
            {
                Id = x.Id,
                Name = x.Name,
                UrlHandle = x.UrlHandle
            }).ToList()
        };
        return Ok(blogpost);
    }
}
