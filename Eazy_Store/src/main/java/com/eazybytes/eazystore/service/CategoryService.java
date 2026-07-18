package com.eazybytes.eazystore.service;

import java.util.List;

import com.eazybytes.eazystore.dto.CategoryRequest;
import com.eazybytes.eazystore.dto.CategoryResponse;

public interface CategoryService {

    CategoryResponse createCategory(CategoryRequest request);
    List<CategoryResponse> getAllCategories();
    CategoryResponse updateCategory(Long id, CategoryRequest request);
    void deleteCategory(Long id);
}