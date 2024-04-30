package com.blogfriday.ai.service;

import com.blogfriday.product.dto.ProductDTO;

import java.util.List;

public interface AIService {
    String predict(String text, List<String> productNames);
    List<String> getProductNames();
    List<ProductDTO> searchProductsByName(String productName);
    List<ProductDTO> findSimilarProductNames(String productName);
}