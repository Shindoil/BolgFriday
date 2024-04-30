package com.blogfriday.ai.repository;

import com.blogfriday.product.dto.ProductDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface AIRepository {
    List<String> getProductNames();
    List<ProductDTO> searchProductsByName(String productName);
    List<ProductDTO> findSimilarProductNames(String productName);
}