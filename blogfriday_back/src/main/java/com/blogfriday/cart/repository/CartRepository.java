package com.blogfriday.cart.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.blogfriday.cart.dto.CartDTO;
import com.blogfriday.cart.dto.CartItemDTO;
import com.blogfriday.cart.dto.CartimgDTO;

@Mapper
public interface CartRepository {
   
  
   public List<CartDTO> findAll();//장바구니 리스트 출력
//   public List<CartItemDTO> findAllByUserId(int user_id);//장바구니 리스트 출력
   public CartDTO findByCode(int cart_product_code);
   public void insert(CartDTO cart);// 장바구니에 물건 추가
//   public void update(Map<String, Object> map);// 장바구니 물건 수정
   public void update(CartDTO cart);
   public void delete(int cart_product_code);// 장바구니 물건 삭제
   public void saveImg(CartimgDTO dto);
   public CartimgDTO contentImg(int product_code);
   public List<CartItemDTO> searchCartList(int user_id);
  
   
}//end class