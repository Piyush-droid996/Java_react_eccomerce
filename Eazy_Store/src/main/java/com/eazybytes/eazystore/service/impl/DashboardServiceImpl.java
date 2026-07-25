package com.eazybytes.eazystore.service.impl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eazybytes.eazystore.dto.DashboardResponse;
import com.eazybytes.eazystore.entity.Order;
import com.eazybytes.eazystore.repository.CategoryRepository;
import com.eazybytes.eazystore.repository.OrderRepository;
import com.eazybytes.eazystore.repository.ProductRepository;
import com.eazybytes.eazystore.repository.UserRepository;
import com.eazybytes.eazystore.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final OrderRepository orderRepository;

    public DashboardServiceImpl(
            UserRepository userRepository,
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            OrderRepository orderRepository) {

        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public DashboardResponse getDashboardSummary() {

        DashboardResponse response = new DashboardResponse();

        response.setTotalUsers(userRepository.count());

        response.setTotalProducts(productRepository.count());

        response.setTotalCategories(categoryRepository.count());

        response.setTotalOrders(orderRepository.count());

        List<Order> orders = orderRepository.findAll();

        BigDecimal revenue = BigDecimal.ZERO;

        for (Order order : orders) {

            revenue = revenue.add(order.getTotalAmount());

        }

        response.setTotalRevenue(revenue);

        return response;
    }

}