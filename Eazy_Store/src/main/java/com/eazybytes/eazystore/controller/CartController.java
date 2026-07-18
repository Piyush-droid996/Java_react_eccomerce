package com.eazybytes.eazystore.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.eazybytes.eazystore.dto.CartRequest;
import com.eazybytes.eazystore.dto.CartResponse;
import com.eazybytes.eazystore.service.CartService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
    public CartResponse addToCart(
            @Valid @RequestBody CartRequest request) {

        return cartService.addToCart(request);
    }

    @GetMapping
    public List<CartResponse> getCartItems() {

        return cartService.getCartItems();
    }

    @PutMapping("/{cartId}")
    public CartResponse updateCartItem(
            @PathVariable Long cartId,
            @Valid @RequestBody CartRequest request) {

        return cartService.updateCartItem(cartId, request);
    }

    @DeleteMapping("/{cartId}")
    public void deleteCartItem(@PathVariable Long cartId) {

        cartService.deleteCartItem(cartId);
    }
}