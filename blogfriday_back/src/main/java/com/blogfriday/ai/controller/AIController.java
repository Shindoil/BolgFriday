//package com.blogfriday.ai.controller;
//
//import com.blogfriday.ai.dto.PredictRequestDTO;
//import com.blogfriday.ai.dto.PredictResponseDTO;
//import com.blogfriday.ai.service.AIService;
//import com.blogfriday.product.dto.ProductDTO;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@Slf4j
//@CrossOrigin("*")
//@RestController
//@RequestMapping("/api/ai")
//public class AIController {
//
//    @Autowired
//    private AIService aiService;
//
//    @PostMapping("/predict")
//    public ResponseEntity<PredictResponseDTO> predict(@RequestBody PredictRequestDTO requestDto) {
//        log.info("Predict text: {}", requestDto.getText());
//
//        List<String> productNames = aiService.getProductNames();
//        String predictedProductName = aiService.predict(requestDto.getText(), productNames);
//
//        List<ProductDTO> products = aiService.searchProductsByName(predictedProductName);
//        if (products.isEmpty()) {
//            List<ProductDTO> similarProducts = aiService.findSimilarProductNames(predictedProductName);
//            if (!similarProducts.isEmpty()) {
//                ProductDTO product = similarProducts.get(0);
//                PredictResponseDTO responseDto = new PredictResponseDTO();
//                responseDto.setPredictedProductName(predictedProductName);
//                responseDto.setProductName(product.getProduct_name());
//                responseDto.setProductPrice(product.getProduct_price());
//                return ResponseEntity.ok(responseDto);
//            } else {
//                PredictResponseDTO responseDto = new PredictResponseDTO();
//                responseDto.setPredictedProductName(predictedProductName);
//                responseDto.setProductName("찾으시는 상품이 없습니다.");
//                return ResponseEntity.ok(responseDto);
//            }
//        } else {
//            ProductDTO product = products.get(0);
//            PredictResponseDTO responseDto = new PredictResponseDTO();
//            responseDto.setPredictedProductName(predictedProductName);
//            responseDto.setProductName(product.getProduct_name());
//            responseDto.setProductPrice(product.getProduct_price());
//            return ResponseEntity.ok(responseDto);
//        }
//    }
//}
package com.blogfriday.ai.controller;

import com.blogfriday.ai.dto.PredictRequestDTO;
import com.blogfriday.ai.dto.PredictResponseDTO;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/ai")
public class AIController {

   @PostMapping("/predict/{text}")
   public ResponseEntity<PredictResponseDTO> predict(@PathVariable("text") String text) {
        RestTemplate restTemplate = new RestTemplate();
        String flaskUrl = "http://localhost:5000/predict";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        PredictRequestDTO requestDTO = new PredictRequestDTO();
        requestDTO.setText(text);

        HttpEntity<PredictRequestDTO> request = new HttpEntity<>(requestDTO, headers);
        ResponseEntity<PredictResponseDTO> response = restTemplate.postForEntity(flaskUrl, request, PredictResponseDTO.class);

        
        PredictResponseDTO responseDTO = response.getBody();
        
        if (responseDTO != null && responseDTO.getPredictedProductName() != null && !responseDTO.getPredictedProductName().isEmpty()) {
            // 예측 결과가 있는 경우
            return ResponseEntity.ok(responseDTO);
        } else {
            // 예측 결과가 없는 경우 기본 검색 URL 반환
            PredictResponseDTO defaultResponseDTO = new PredictResponseDTO();
            defaultResponseDTO.setPredictedProductName(text);
            return ResponseEntity.ok(defaultResponseDTO);
        }
    }
   
}

