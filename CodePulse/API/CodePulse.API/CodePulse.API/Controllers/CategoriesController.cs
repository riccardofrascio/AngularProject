using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoriesController(ICategoryRepository categoryRepository)
    {
        this._categoryRepository = categoryRepository;
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequestDto requestDto)
    {
        var category = new Category
        {
            Name = requestDto.Name,
            UrlHandle = requestDto.UrlHandle,
        };

        await _categoryRepository.CreateAsync(category);

        var response = new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            UrlHandle = category.UrlHandle,
        };

        return Ok(response);
    }

    // GET: https://localhost:7128/api/Categories
    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        var categories = await _categoryRepository.GetAllAsync();
        var response = new List<CategoryDto>();
        foreach (var category in categories)
        {
            response.Add(new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            });
        }
        return Ok(response);
    }

    // GET: https://localhost:7128/api/Categories/{id}
    [HttpGet]
    [Route("{id:guid}")]
    public async Task<IActionResult> GetCategoryById([FromRoute] Guid id)
    {
        var searchedCategory = await _categoryRepository.GetById(id);
        if(searchedCategory is null)
        {
            return NotFound();
        } else
        {
            var response = new CategoryDto
            {
                Id = searchedCategory.Id,
                Name = searchedCategory.Name,
                UrlHandle = searchedCategory.UrlHandle
            };
            return Ok(response);
        }
    }

    // PUT: https://localhost:7128/api/Categories/{id}
    [HttpPut]
    [Route("{id:guid}")]
    public async Task<IActionResult> UpdateCategory([FromRoute] Guid id, UdateCategoryRequestDto request)
    {
        var category = new Category
        {
            Id = id,
            Name = request.Name,
            UrlHandle = request.urlHandle
        };

        category = await _categoryRepository.UpdateAsync(category);
        if(category is null)
        {
            return NotFound();
        }

        var response = new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            UrlHandle = category.UrlHandle
        };
        return Ok(response);
    }

    // PUT: https://localhost:7128/api/Categories/{id}
    [HttpDelete]
    [Route("{id:guid}")]
    public async Task<IActionResult> DeleteCategory([FromRoute] Guid id)
    {
        var category = await _categoryRepository.DeleteAsync(id);
        if (category is null)
        {
            return NotFound();
        }
        var response = new CategoryDto 
        { 
            Id = category.Id, 
            Name = category.Name, 
            UrlHandle = category.UrlHandle
        };
        return Ok(response);
    }


}
