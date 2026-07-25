package com.eazybytes.eazystore.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eazybytes.eazystore.dto.ProductRequest;
import com.eazybytes.eazystore.dto.ProductResponse;
import com.eazybytes.eazystore.service.IProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final IProductService productService;

    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ProductResponse createProduct(
            @Valid @RequestBody ProductRequest request) {

        return productService.createProduct(request);
    }

//    @GetMapping
//    public List<ProductResponse> getProducts() {
//
//        return productService.getProducts();
//    }

    @GetMapping("/{id}")
    public ProductResponse getProductById(@PathVariable Long id) {

        return productService.getProductById(id);
    }

    @PutMapping("/{id}")
    public ProductResponse updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request) {

        return productService.updateProduct(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {

        System.out.println("DELETE API HIT");

        productService.deleteProduct(id);
    }
    @GetMapping
    public Page<ProductResponse> getProducts(

            @RequestParam(defaultValue = "") String keyword,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size,

            @RequestParam(defaultValue = "productId") String sortBy,

            @RequestParam(defaultValue = "asc") String direction) {

        return productService.getProducts(
                keyword,
                page,
                size,
                sortBy,
                direction);
    }
}