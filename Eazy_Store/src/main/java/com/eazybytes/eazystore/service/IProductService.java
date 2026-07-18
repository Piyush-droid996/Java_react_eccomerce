package com.eazybytes.eazystore.service;

import java.util.List;

import com.eazybytes.eazystore.dto.ProductRequest;
import com.eazybytes.eazystore.dto.ProductResponse;
public interface IProductService {

	ProductResponse createProduct(ProductRequest request);

	List<ProductResponse> getProducts();
	ProductResponse getProductById(Long id);

	ProductResponse updateProduct(Long id, ProductRequest request);

	void deleteProduct(Long id);
}
