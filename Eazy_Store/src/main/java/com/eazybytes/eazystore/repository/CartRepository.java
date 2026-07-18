package com.eazybytes.eazystore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eazybytes.eazystore.entity.Cart;
import com.eazybytes.eazystore.entity.Product;
import com.eazybytes.eazystore.entity.User;

public interface CartRepository extends JpaRepository<Cart, Long> {
	 Optional<Cart> findByUserAndProduct(User user, Product product);
	 List<Cart> findByUser(User user);
}