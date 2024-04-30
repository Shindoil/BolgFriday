package com.blogfriday.cart.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.blogfriday.cart.dto.CartDTO;
import com.blogfriday.cart.dto.CartItemDTO;
import com.blogfriday.cart.dto.CartimgDTO;
import com.blogfriday.cart.repository.CartRepository;
import org.springframework.transaction.annotation.Transactional;

@Service//서비스 쪽이라는 걸 명시적으로 표시
public class CartServiceImpl implements CartService {
   
   //repository - serviceimp / 의존성
   
   private final CartRepository cartRepository;
   
   @Autowired
   public CartServiceImpl(CartRepository cartRepository) {
      this.cartRepository = cartRepository;
   }
   
   @Override
   @Transactional
   public List<CartDTO> getAllCarts(){
      List<CartDTO> response = cartRepository.findAll();
      return response;
   }
   
//   @Override
//   @Transactional
//   public List<CartItemDTO> getCartsByUserId(int user_id){
//      List<CartItemDTO> response = cartRepository.findAllByUserId(user_id);
//      return response;
//   }
   
   @Override
   @Transactional
   public CartDTO getCartByCode(int cart_product_code) {
      return cartRepository.findByCode(cart_product_code);
   }
   
   @Override
   @Transactional
   public void insert(CartDTO cart) {
      cartRepository.insert(cart);
   }
   
//   @Override
//   @Transactional
//   public void update(Map<String, Object> map) {
//      cartRepository.update(map);
//   }
   
   @Override
   @Transactional
   public void update(CartDTO cart) {
      cartRepository.update(cart);
   }
   
   @Override
   @Transactional
   public void delete(int cart_product_code) {
      cartRepository.delete(cart_product_code);
   }

   @Override
   @Transactional
   public void saveImgProcess(CartimgDTO dto) {
      cartRepository.saveImg(dto);
   }
   
   @Override
   @Transactional
   public CartimgDTO contentImgProcess(int product_code) {
      return cartRepository.contentImg(product_code);
   }
//   
   @Override
   @Transactional
   public List<CartItemDTO> searchCartList(int user_id){
      return cartRepository.searchCartList(user_id);
   }

}//end class