package com.eazybytes.eazystore.service;

import java.util.List;

import com.eazybytes.eazystore.dto.OrderResponse;

public interface OrderService {

    OrderResponse placeOrder();

    List<OrderResponse> getOrders();

    OrderResponse getOrderById(Long orderId);
}