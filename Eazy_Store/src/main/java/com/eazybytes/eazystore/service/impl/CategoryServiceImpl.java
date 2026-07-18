package com.eazybytes.eazystore.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eazybytes.eazystore.dto.CategoryRequest;
import com.eazybytes.eazystore.dto.CategoryResponse;
import com.eazybytes.eazystore.entity.Category;
import com.eazybytes.eazystore.exception.CategoryAlreadyExistsException;
import com.eazybytes.eazystore.exception.CategoryNotFoundException;
import com.eazybytes.eazystore.repository.CategoryRepository;
import com.eazybytes.eazystore.service.CategoryService;
@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryResponse createCategory(CategoryRequest request) {

    	if (categoryRepository.existsByName(request.getName())) {
    	    throw new CategoryAlreadyExistsException(
    	            "Category with name '" + request.getName() + "' already exists.");
    	}

        Category category = new Category();

        category.setName(request.getName());
        category.setDescription(request.getDescription());

        Category savedCategory = categoryRepository.save(category);

        CategoryResponse response = new CategoryResponse();

        response.setCategoryId(savedCategory.getCategoryId());
        response.setName(savedCategory.getName());
        response.setDescription(savedCategory.getDescription());
        response.setCreatedAt(savedCategory.getCreatedAt());
        response.setUpdatedAt(savedCategory.getUpdatedAt());

        return response;
    }

    @Override
    public List<CategoryResponse> getAllCategories() {

        List<Category> categories = categoryRepository.findAll();

        List<CategoryResponse> responseList = new ArrayList<>();

        for (Category category : categories) {

            CategoryResponse response = new CategoryResponse();

            response.setCategoryId(category.getCategoryId());
            response.setName(category.getName());
            response.setDescription(category.getDescription());
            response.setCreatedAt(category.getCreatedAt());
            response.setUpdatedAt(category.getUpdatedAt());

            responseList.add(response);
        }

        return responseList;
    }
    @Override
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new CategoryNotFoundException("Category not found with id: " + id));

        category.setName(request.getName());
        category.setDescription(request.getDescription());

        Category updatedCategory = categoryRepository.save(category);

        CategoryResponse response = new CategoryResponse();
        response.setCategoryId(updatedCategory.getCategoryId());
        response.setName(updatedCategory.getName());
        response.setDescription(updatedCategory.getDescription());
        response.setCreatedAt(updatedCategory.getCreatedAt());
        response.setUpdatedAt(updatedCategory.getUpdatedAt());

        return response;
    }
    @Override
    public void deleteCategory(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new CategoryNotFoundException("Category not found with id: " + id));

        categoryRepository.delete(category);
    }

}