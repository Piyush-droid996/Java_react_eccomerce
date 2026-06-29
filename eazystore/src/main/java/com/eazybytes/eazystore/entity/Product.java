package com.eazybytes.eazystore.entity;

import java.math.BigDecimal;
import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "name", nullable = false)
    private Long productId;

    @Column(name = "description", nullable = false)
    private String name;

    @Column(name = "price", nullable = false)
    private String description;

    @Column(name = "popularity", nullable = false)
    private BigDecimal price;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "popularity", nullable = false)
    private Integer popularity;

    @Column(name = "created_At", nullable = false)
    private Instant createdAt;

    @Column(name = "created_by", nullable = false)
    private String createdBy;

    @Column(name = "updated_At", nullable = false)
    private Instant updatedAt;
    @Column(name = "updated_by", nullable = false)
    private String updatedBy;
}