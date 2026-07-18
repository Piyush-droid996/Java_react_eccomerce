package com.eazybytes.eazystore.service;

import java.util.List;

import com.eazybytes.eazystore.dto.CartRequest;
import com.eazybytes.eazystore.dto.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    List<CartResponse> getCartItems();

    CartResponse updateCartItem(Long cartId, CartRequest request);

    void deleteCartItem(Long cartId);
}
