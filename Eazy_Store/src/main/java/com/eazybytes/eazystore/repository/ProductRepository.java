package com.eazybytes.eazystore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eazybytes.eazystore.entity.Product;

public interface ProductRepository extends JpaRepository<Product,Long>{

}
