//package com.blogfriday.chat.controller;
//
//import com.blogfriday.chat.dto.ChatDTO;
//import com.blogfriday.chat.dto.PredictRequestDTO;
//import com.blogfriday.chat.dto.PredictResponseDTO;
//import com.blogfriday.chat.service.ChatService;
//import com.blogfriday.chat.service.PredictService;
//import com.blogfriday.product.dto.ProductDTO;
//import com.blogfriday.product.service.ProductService;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.io.BufferedReader;
//import java.io.File;
//import java.io.IOException;
//import java.io.InputStreamReader;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Slf4j
//@CrossOrigin("*")
//@RestController
//@RequestMapping("/api/chat")
//public class ChatController {
//
//    @Autowired
//    private ChatService chatService;
//    
//    @Autowired
//    private PredictService predictService;
//    
//    @Autowired
//    private ProductService productService;
//
//    public ChatController() {
//    }
//
//    @PostMapping("/friendinsert")
//    public ResponseEntity<String> friendInsert(@RequestBody ChatDTO chatDTO) {
//        ChatDTO data = chatDTO;
//        if (chatService.notSameFriendProcess(chatDTO) == 0) {
//            chatService.insertFriendProcess(chatDTO);
//            return ResponseEntity.ok("친구추가 완료");
//        } else {
//            return ResponseEntity.ok("이미 등록된 친구입니다");
//        }
//    }
//
//    @GetMapping("/friendlist/{user_code1}")
//    public ResponseEntity<Map<String, Object>> friendlist(@PathVariable("user_code1") String user_code1) {
//        Map<String, Object> map = new HashMap<>();
//        log.info("조회유저코드:{}", user_code1);
//        List<ChatDTO> chatDTOs = chatService.friendListProcess(user_code1);
//        map.put("friendList", chatDTOs);
//        log.info("조회 결과:{}", map.get("friendList"));
//        return ResponseEntity.ok(map);
//    }
//
//    @PostMapping("/nlpsearch")
//    public ResponseEntity<PredictResponseDTO> NLPsearch(@RequestBody PredictRequestDTO requestDto) {
//        log.info("NLPsearch_text: {}", requestDto.getText());
//
//        List<String> productNames = productService.getProductNames();
//        String predictedProductName = predictService.predict(requestDto.getText(), productNames);
//
//
//        List<ProductDTO> products = productService.searchlistProcess(predictedProductName);
//        if (products.isEmpty()) {
//            int productCode = productService.findProductCodeByName(predictedProductName);
//            if (productCode != -1) {
//                ProductDTO product = productService.contentProcess(productCode);
//                PredictResponseDTO responseDto = new PredictResponseDTO();
//                responseDto.setPredictedProductName(predictedProductName);
//                responseDto.setProductName(product.getProduct_name());
//                responseDto.setProductPrice(product.getProduct_price());
//                return ResponseEntity.ok(responseDto);
//            } else {
//            	 // 제품이 없는 경우 처리 로직
//                PredictResponseDTO responseDto = new PredictResponseDTO();
//                responseDto.setPredictedProductName(predictedProductName);
//                responseDto.setProductName("찾으시는 상품이 없습니다.");
//                return ResponseEntity.ok(responseDto);
//            }
//        } 
//
//        return ResponseEntity.ok(new PredictResponseDTO());
//    }
//
//}
package com.blogfriday.chat.controller;

import com.blogfriday.chat.dto.ChatDTO;
import com.blogfriday.chat.dto.ChatUserDTO;
import com.blogfriday.chat.dto.MessageDto;
import com.blogfriday.chat.dto.PredictRequestDTO;
import com.blogfriday.chat.dto.PredictResponseDTO;
import com.blogfriday.chat.service.ChatService;
import com.blogfriday.chat.service.MessageStoreService;
import com.blogfriday.chat.service.PredictService;
import com.blogfriday.product.dto.ProductDTO;
import com.blogfriday.product.service.ProductService;
import lombok.extern.slf4j.Slf4j;

import org.apache.ibatis.annotations.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private MessageStoreService messageStoreService;

    public ChatController() {
    }

    @PostMapping("/friendinsert")
    public ResponseEntity<String> friendInsert(@RequestBody ChatDTO chatDTO) {
        ChatDTO data = chatDTO;
        // 실제로 유저가 있는지 확인 //존재하면1 없으면 0
        if(chatService.checkUserCodeExistProcess(data.getUser_code2())==1) {
        	
        	// 이미 친구추가 되어있는지 //존재하면1 없으면 0
            if (chatService.notSameFriendProcess(chatDTO) == 0) {
                chatService.insertFriendProcess(chatDTO);
                return ResponseEntity.ok("친구추가 완료");
            } else {
                return ResponseEntity.ok("이미 등록된 친구입니다");
            }
        }else {
			return ResponseEntity.ok("존재하지 않는 사용자 입니다");
		}
        
        
        
    }

    @GetMapping("/friendlist/{user_code1}")
    public ResponseEntity<Map<String, Object>> friendlist(@PathVariable("user_code1") String user_code1) {
        Map<String, Object> map = new HashMap<>();
        log.info("조회유저코드:{}", user_code1);
        //List<ChatDTO> chatDTOs = chatService.friendListProcess(user_code1);
        List<ChatUserDTO> chatUserDTOs =chatService.selectFriendsByUserCodeProcess(user_code1);
        log.info("여기가 문젠가:{}");
        map.put("friendList", chatUserDTOs);
        log.info("조회 결과:{}", map.get("friendList"));
        return ResponseEntity.ok(map);
    }

    @DeleteMapping("/deletemessage/{timestamp}")
    public ResponseEntity<Object> deleteMessage(@PathVariable("timestamp") String timestamp) {
    	
    	messageStoreService.deleteMessageByDateProcess(timestamp);
    	
    	return ResponseEntity.ok(null);
    }
    
    @PostMapping("/readmessages")
    public ResponseEntity<?> markMessagesAsRead(@RequestBody MessageDto messageDto) {
        
    	System.out.println("Received messageDto: " + messageDto);
        messageStoreService.isreadProcess(messageDto.getRecipient_id(), messageDto.getSender_id());
        return ResponseEntity.ok(null);
    }
    
    
}