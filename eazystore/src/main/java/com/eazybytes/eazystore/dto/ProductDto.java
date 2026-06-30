package com.eazybytes.eazystore.dto;

import java.math.BigDecimal;
import java.time.Instant;

import jakarta.persistence.Column;

public class ProductDto {
	
    private Long productId;

    
    private String name;

   
    private String description;

   
    private BigDecimal price;

       private String imageUrl;

   
    private Integer popularity;

   
    private Instant createdAt;


	public Long getProductId() {
		return productId;
	}


	public void setProductId(Long productId) {
		this.productId = productId;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public BigDecimal getPrice() {
		return price;
	}


	public void setPrice(BigDecimal price) {
		this.price = price;
	}


	public String getImageUrl() {
		return imageUrl;
	}


	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}


	public Integer getPopularity() {
		return popularity;
	}


	public void setPopularity(Integer popularity) {
		this.popularity = popularity;
	}


	public Instant getCreatedAt() {
		return createdAt;
	}


	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}
    
    
}
