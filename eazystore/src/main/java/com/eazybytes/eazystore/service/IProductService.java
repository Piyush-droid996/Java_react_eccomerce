package com.eazybytes.eazystore.service;

import java.util.List;

import com.eazybytes.eazystore.dto.ProductDto;
import com.eazybytes.eazystore.entity.Product;

public interface IProductService {
	
	
	List<ProductDto> getProducts();

}
