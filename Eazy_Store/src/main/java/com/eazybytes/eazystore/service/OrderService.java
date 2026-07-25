package com.eazybytes.eazystore.service;

import java.util.List;

import com.eazybytes.eazystore.dto.OrderResponse;
import com.eazybytes.eazystore.dto.OrderStatusRequest;
import com.eazybytes.eazystore.dto.OrderStatusRequest;

public interface OrderService {

    OrderResponse placeOrder();

    List<OrderResponse> getOrders();

    OrderResponse getOrderById(Long orderId);
    OrderResponse updateOrderStatus(Long orderId,
            OrderStatusRequest request);
    List<OrderResponse> getAllOrders();
}