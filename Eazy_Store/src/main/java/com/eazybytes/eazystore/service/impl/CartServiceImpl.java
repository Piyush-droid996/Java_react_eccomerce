package com.eazybytes.eazystore.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import java.time.Instant;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.eazybytes.eazystore.entity.Cart;
import com.eazybytes.eazystore.entity.Product;
import com.eazybytes.eazystore.entity.User;
import com.eazybytes.eazystore.exception.CartNotFoundException;
import com.eazybytes.eazystore.exception.ProductNotFoundException;
import com.eazybytes.eazystore.exception.UserNotFoundException;
import com.eazybytes.eazystore.dto.CartRequest;
import com.eazybytes.eazystore.dto.CartResponse;
import com.eazybytes.eazystore.repository.CartRepository;
import com.eazybytes.eazystore.repository.ProductRepository;
import com.eazybytes.eazystore.repository.UserRepository;
import com.eazybytes.eazystore.service.CartService;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartServiceImpl(CartRepository cartRepository,
                           ProductRepository productRepository,
                           UserRepository userRepository) {

        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public CartResponse addToCart(CartRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        Cart cart = cartRepository.findByUserAndProduct(user, product)
                .orElse(null);

        if (cart != null) {
            cart.setQuantity(cart.getQuantity() + request.getQuantity());
            cart.setUpdatedAt(Instant.now());
        } else {
            cart = new Cart();
            cart.setUser(user);
            cart.setProduct(product);
            cart.setQuantity(request.getQuantity());
            cart.setCreatedAt(Instant.now());
            cart.setUpdatedAt(Instant.now());
        }

        Cart savedCart = cartRepository.save(cart);

        CartResponse response = new CartResponse();

        response.setCartId(savedCart.getCartId());
        response.setProductId(savedCart.getProduct().getProductId());
        response.setProductName(savedCart.getProduct().getName());
        response.setQuantity(savedCart.getQuantity());
        response.setPrice(savedCart.getProduct().getPrice());
        response.setTotalPrice(
                savedCart.getProduct()
                        .getPrice()
                        .multiply(java.math.BigDecimal.valueOf(savedCart.getQuantity()))
        );

        return response;
    }
    @Override
    public List<CartResponse> getCartItems() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return cartRepository.findByUser(user)
                .stream()
                .map(cart -> {

                    CartResponse response = new CartResponse();

                    response.setCartId(cart.getCartId());
                    response.setProductId(cart.getProduct().getProductId());
                    response.setProductName(cart.getProduct().getName());

                    response.setQuantity(cart.getQuantity());
                    response.setPrice(cart.getProduct().getPrice());

                    response.setTotalPrice(
                            cart.getProduct().getPrice()
                                    .multiply(java.math.BigDecimal.valueOf(cart.getQuantity()))
                    );

                    return response;

                }).toList();
    }

    @Override
    public CartResponse updateCartItem(Long cartId, CartRequest request) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() ->
                        new CartNotFoundException("Cart not found"));

        cart.setQuantity(request.getQuantity());
        cart.setUpdatedAt(Instant.now());

        Cart savedCart = cartRepository.save(cart);

        CartResponse response = new CartResponse();

        response.setCartId(savedCart.getCartId());
        response.setProductId(savedCart.getProduct().getProductId());
        response.setProductName(savedCart.getProduct().getName());

        response.setQuantity(savedCart.getQuantity());
        response.setPrice(savedCart.getProduct().getPrice());

        response.setTotalPrice(
                savedCart.getProduct().getPrice()
                        .multiply(java.math.BigDecimal.valueOf(savedCart.getQuantity()))
        );

        return response;
    }

    @Override
    public void deleteCartItem(Long cartId) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() ->
                        new CartNotFoundException("Cart not found"));

        cartRepository.delete(cart);
    }
}