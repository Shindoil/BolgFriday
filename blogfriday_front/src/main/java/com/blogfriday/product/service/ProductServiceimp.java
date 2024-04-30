package com.blogfriday.product.service;

import com.blogfriday.product.dto.ProductDTO;
import com.blogfriday.product.dto.ProducthistoryDTO;
import com.blogfriday.product.dto.ProductimgDTO;
import com.blogfriday.product.repository.ProductRepository;

import org.python.antlr.PythonParser.return_stmt_return;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceimp implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void saveProcess(ProductDTO dto) {
        productRepository.saveProduct(dto);
    }

    @Override
    public void saveImgProcess(ProductimgDTO dto) {
        productRepository.saveImgProduct(dto);
    }

    @Override
    public void updateProcess(ProductDTO dto) {
        productRepository.updateProduct(dto);
    }

    @Override
    public void deleteProcess(int product_code) {
        productRepository.deleteProduct(product_code);
    }

    @Override
    public void deleteProductImgProcess(int product_code) {
        productRepository.deleteProductImg(product_code);
    }

    @Override
    public ProductDTO contentProcess(int product_code) {
        return productRepository.content(product_code);
    }

    @Override
    public ProductimgDTO contentImgProcess(int product_code) {
        return productRepository.contentImg(product_code);
    }

    @Override
    public Integer findProductCodeByName(String product_name) {
        return productRepository.findProductCodeByName(product_name);
    }

    @Override
    public List<ProductDTO> searchlistProcess(String product_name) {
        return productRepository.searchlist(product_name);
    }

    @Override
    public List<ProductDTO> sellerlistProcess(int user_id) {
        return productRepository.sellerlist(user_id);
    }

    @Override
    public List<String> getProductNames() {
        return productRepository.getProductNames();
    }

    @Override
    public List<ProductDTO> findSimilarProductNames(String productName) {
        return productRepository.findSimilarProductNames(productName);
    }
    
    @Override
    public List<ProductDTO> searchcategorylistProcess(String category_name){
    	return productRepository.searchcategorylist(category_name);
    }
    
    @Override
    public ProductDTO findByProductCodeProcess(int product_code){
    	return productRepository.findByProductCode(product_code);
    }
    
    @Override
    public ProductimgDTO findByImgProductCodeProcess(int product_code){
    	return productRepository.findByImgProductCode(product_code);
    }
    
    @Override
    public List<ProducthistoryDTO>  findBySellerCodeProcess(int user_id1) {
    	return productRepository.findBySellerCode(user_id1);
    }
    
    @Override
    public List<ProducthistoryDTO>  findByBuyerCodeProcess(int user_id2) {
    	return productRepository.findByBuyerCode(user_id2);
    }
    
    @Override
    public void saveProducthistoryProcess(ProducthistoryDTO producthistoryDTO) {
    	productRepository.saveProducthistory(producthistoryDTO);
    }
}