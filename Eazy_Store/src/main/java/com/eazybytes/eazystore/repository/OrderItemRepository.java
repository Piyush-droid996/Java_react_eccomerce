package com.eazybytes.eazystore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eazybytes.eazystore.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}