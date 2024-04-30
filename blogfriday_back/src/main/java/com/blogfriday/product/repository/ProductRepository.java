package com.blogfriday.product.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.blogfriday.product.dto.ProductDTO;
import com.blogfriday.product.dto.ProducthistoryDTO;
import com.blogfriday.product.dto.ProductimgDTO;

import jnr.ffi.Struct.int16_t;

@Mapper
@Repository
public interface ProductRepository {
    public void saveProduct(ProductDTO dto);
    public void saveImgProduct(ProductimgDTO dto);
    public void updateProduct(ProductDTO dto);
    public void deleteProduct(int product_code);
    public void deleteProductImg(int product_code);
    public ProductDTO content(int product_code);
    public ProductimgDTO contentImg(int product_code);
    public Integer findProductCodeByName(String product_name);
    public List<ProductDTO> searchlist(String product_name);
    public List<ProductDTO> sellerlist(int user_id);
    public List<ProductDTO> findProductNamesByText(String searchText);
    public List<ProductDTO> searchcategorylist(String category_name);
    public List<String> getProductNames();
    public List<ProductDTO> findSimilarProductNames(String product_name);
    public ProductDTO findByProductCode(int product_code);
    public ProductimgDTO findByImgProductCode(int product_code);
    public List<ProducthistoryDTO> findBySellerCode(int user_id1);
    public List<ProducthistoryDTO>  findByBuyerCode(int user_id2);
    
    public void saveProducthistory(ProducthistoryDTO producthistoryDTO);
}