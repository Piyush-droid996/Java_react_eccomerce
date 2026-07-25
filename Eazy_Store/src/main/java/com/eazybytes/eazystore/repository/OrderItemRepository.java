package com.eazybytes.eazystore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eazybytes.eazystore.entity.Order;
import com.eazybytes.eazystore.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrder(Order order);


}