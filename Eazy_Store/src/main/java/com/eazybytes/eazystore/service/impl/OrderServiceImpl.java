package com.eazybytes.eazystore.service.impl;

import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.eazybytes.eazystore.entity.Cart;
import com.eazybytes.eazystore.entity.Order;
import com.eazybytes.eazystore.entity.OrderItem;
import com.eazybytes.eazystore.entity.User;
import com.eazybytes.eazystore.exception.UserNotFoundException;
import com.eazybytes.eazystore.dto.OrderResponse;
import com.eazybytes.eazystore.repository.CartRepository;
import com.eazybytes.eazystore.repository.OrderItemRepository;
import com.eazybytes.eazystore.repository.OrderRepository;
import com.eazybytes.eazystore.repository.UserRepository;
import com.eazybytes.eazystore.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    public OrderServiceImpl(OrderRepository orderRepository,
                            OrderItemRepository orderItemRepository,
                            CartRepository cartRepository,
                            UserRepository userRepository) {

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
    }

    @Override
    public OrderResponse placeOrder() {

        // Logged-in User
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        // User Cart
        List<Cart> cartItems = cartRepository.findByUser(user);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // Calculate Total Amount
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (Cart cart : cartItems) {

            BigDecimal itemTotal = cart.getProduct()
                    .getPrice()
                    .multiply(BigDecimal.valueOf(cart.getQuantity()));

            totalAmount = totalAmount.add(itemTotal);
        }

        // Create Order
        Order order = new Order();

        order.setUser(user);
        order.setCreatedAt(Instant.now());
        order.setStatus("PLACED");
        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);

        // Save Order Items
        for (Cart cart : cartItems) {

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(savedOrder);
            orderItem.setProduct(cart.getProduct());
            orderItem.setQuantity(cart.getQuantity());
            orderItem.setPrice(cart.getProduct().getPrice());

            orderItemRepository.save(orderItem);
        }

        // Clear Cart
        cartRepository.deleteAll(cartItems);

        // Response
        OrderResponse response = new OrderResponse();

        response.setOrderId(savedOrder.getOrderId());
        response.setStatus(savedOrder.getStatus());
        response.setTotalAmount(savedOrder.getTotalAmount());
        response.setCreatedAt(savedOrder.getCreatedAt());

        return response;
    }
    @Override
    public List<OrderResponse> getOrders() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        return orderRepository.findByUser(user)
                .stream()
                .map(order -> {

                    OrderResponse response = new OrderResponse();

                    response.setOrderId(order.getOrderId());
                    response.setStatus(order.getStatus());
                    response.setTotalAmount(order.getTotalAmount());
                    response.setCreatedAt(order.getCreatedAt());

                    return response;

                }).toList();
    }

    @Override
    public OrderResponse getOrderById(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        OrderResponse response = new OrderResponse();

        response.setOrderId(order.getOrderId());
        response.setStatus(order.getStatus());
        response.setTotalAmount(order.getTotalAmount());
        response.setCreatedAt(order.getCreatedAt());

        return response;
    }
}
