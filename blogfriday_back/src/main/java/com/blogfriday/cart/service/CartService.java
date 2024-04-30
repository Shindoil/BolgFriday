package com.blogfriday.cart.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.blogfriday.cart.dto.CartDTO;
import com.blogfriday.cart.dto.CartItemDTO;
import com.blogfriday.cart.dto.CartimgDTO;
//import org.apache.ibatis.annotations.Mapper;
public interface CartService {
   
   public List<CartDTO> getAllCarts();
//   public List<CartItemDTO> getCartsByUserId(int user_id);
   public CartDTO getCartByCode(int cart_product_code);
   public void insert(CartDTO cart);
//   public void update(Map<String, Object> map);
   public void update(CartDTO cart);
   public void delete(int cart_product_code);
   public void saveImgProcess(CartimgDTO dto);
   public CartimgDTO contentImgProcess(int product_code);
   public List<CartItemDTO> searchCartList(int user_id);
  

}//end class