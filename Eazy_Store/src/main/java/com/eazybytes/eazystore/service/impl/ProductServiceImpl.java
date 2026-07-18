package com.eazybytes.eazystore.service.impl;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eazybytes.eazystore.dto.ProductRequest;
import com.eazybytes.eazystore.dto.ProductResponse;
import com.eazybytes.eazystore.entity.Category;
import com.eazybytes.eazystore.entity.Product;
import com.eazybytes.eazystore.exception.CategoryNotFoundException;
import com.eazybytes.eazystore.exception.ProductNotFoundException;
import com.eazybytes.eazystore.repository.CategoryRepository;
import com.eazybytes.eazystore.repository.ProductRepository;
import com.eazybytes.eazystore.service.IProductService;

@Service
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryRepository categoryRepository) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ProductResponse createProduct(ProductRequest request) {

        // Find Category
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new CategoryNotFoundException(
                                "Category not found with id: " + request.getCategoryId()));

        // Create Product
        Product product = new Product();

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setImageUrl(request.getImageUrl());
        product.setPopularity(request.getPopularity());

        // Set Relationship
        product.setCategory(category);

        product.setCreatedAt(Instant.now());
        product.setUpdatedAt(Instant.now());

        product.setCreatedBy("SYSTEM");
        product.setUpdatedBy("SYSTEM");

        // Save Product
        Product savedProduct = productRepository.save(product);

        // Prepare Response
        ProductResponse response = new ProductResponse();

        response.setProductId(savedProduct.getProductId());
        response.setName(savedProduct.getName());
        response.setDescription(savedProduct.getDescription());
        response.setPrice(savedProduct.getPrice());
        response.setImageUrl(savedProduct.getImageUrl());
        response.setPopularity(savedProduct.getPopularity());

        response.setCategoryId(savedProduct.getCategory().getCategoryId());
        response.setCategoryName(savedProduct.getCategory().getName());

        response.setCreatedAt(savedProduct.getCreatedAt());
        response.setUpdatedAt(savedProduct.getUpdatedAt());

        return response;
    }

    @Override
    public List<ProductResponse> getProducts() {

        return productRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ProductResponse getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with id : " + id));

        return mapToResponse(product);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest request) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with id : " + id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new CategoryNotFoundException(
                                "Category not found with id : " + request.getCategoryId()));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setImageUrl(request.getImageUrl());
        product.setPopularity(request.getPopularity());
        product.setCategory(category);

        product.setUpdatedAt(Instant.now());
        product.setUpdatedBy("SYSTEM");

        Product updatedProduct = productRepository.save(product);

        return mapToResponse(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with id : " + id));

        productRepository.delete(product);
    }
    private ProductResponse mapToResponse(Product product) {

        ProductResponse response = new ProductResponse();

        response.setProductId(product.getProductId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setImageUrl(product.getImageUrl());
        response.setPopularity(product.getPopularity());

        response.setCategoryId(product.getCategory().getCategoryId());
        response.setCategoryName(product.getCategory().getName());

        response.setCreatedAt(product.getCreatedAt());
        response.setUpdatedAt(product.getUpdatedAt());

        return response;
    }
}