package com.eazybytes.eazystore.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.eazybytes.eazystore.dto.ProductRequest;
import com.eazybytes.eazystore.dto.ProductResponse;
public interface IProductService {

	ProductResponse createProduct(ProductRequest request);

//	List<ProductResponse> getProducts();
	ProductResponse getProductById(Long id);

	ProductResponse updateProduct(Long id, ProductRequest request);

	void deleteProduct(Long id);
	Page<ProductResponse> getProducts(
            String keyword,
            int page,
            int size,
            String sortBy,
            String direction
    );

}
