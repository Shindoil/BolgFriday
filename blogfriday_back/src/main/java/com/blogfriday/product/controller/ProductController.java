//package com.blogfriday.product.controller;
//
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.ResponseEntity;
//import org.springframework.util.FileCopyUtils;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.blogfriday.product.dto.ProductAndImgDTO;
//import com.blogfriday.product.dto.ProductDTO;
//import com.blogfriday.product.dto.ProductimgDTO;
//import com.blogfriday.product.service.ProductService;
//
//import lombok.extern.slf4j.Slf4j;
//
//@Slf4j
//@CrossOrigin("*")
//@RestController
//@RequestMapping("/api/product")
//public class ProductController {
//
//	@Autowired
//	private ProductService productService;
//
//	// 기존 규연님꺼///////////////////////
//	@Value("${spring.servlet.multipart.location}")
//	private String filePath;
//	//////////////////////////////////////////////
//
//	// 은주 수정 규연님꺼
////	@Value("${spring.servlet.multipart.location-shopimg}")	
////	private String filePath;
//
//	public ProductController() {
//	}
//
//	@PostMapping("/save")
//	public ResponseEntity<String> saveProduct(@ModelAttribute ProductAndImgDTO productAndImgDTO) {
//		log.info("물품등록메소드: {}", productAndImgDTO);
//		ProductDTO productDTO = new ProductDTO();
//		ProductimgDTO productImgDTO = new ProductimgDTO();
//		MultipartFile file = productAndImgDTO.getFilename();
//		MultipartFile secondFile = productAndImgDTO.getSecondFile();
//		
//
//		productDTO.setUser_id(productAndImgDTO.getUser_id());
//		productDTO.setCategory_code(productAndImgDTO.getCategory_code());
//		productDTO.setProduct_name(productAndImgDTO.getProduct_name());
//		productDTO.setProduct_price(productAndImgDTO.getProduct_price());
//		productDTO.setProduct_count(productAndImgDTO.getProduct_count());
//		productDTO.setProduct_content_text(productAndImgDTO.getProduct_content_text());
//
//		productService.saveProcess(productDTO); // 할때 productdto에 프라이머리키를 집어넣는다
//
//		log.info("물품등록확인: {}", productDTO.getProduct_code());
//
//		if (file != null && !file.isEmpty()) {
//
//			File filedownload = new File(filePath, productDTO.getProduct_code() + "_" + "product_img0" + ".png");
//
//			// 임시기억장치 걸 가져와서 로컬에 저장
//
//			try {
//				FileCopyUtils.copy(file.getInputStream(), new FileOutputStream(filedownload));
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//			productImgDTO.setProduct_img0(productDTO.getProduct_code() + "_" + "product_img0" + ".png");
////			
//		}
//
//		if (secondFile != null && !secondFile.isEmpty()) {
//			log.info("두 번째 파일이 존재합니다.");
//			File secondfiledownload = new File(filePath, productDTO.getProduct_code() + "_" + "product_img1" + ".png");
//			
//			// 임시기억장치 걸 가져와서 로컬에 저장
//
//			try {
//				FileCopyUtils.copy(secondFile.getInputStream(), new FileOutputStream(secondfiledownload));
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//			
//			productImgDTO.setProduct_img1(productDTO.getProduct_code() + "_" + "product_img1" + ".png");
////			
//		}
////	    
//		productImgDTO.setProduct_code(productDTO.getProduct_code());
//		log.info("물품이미지확인: {}", productImgDTO.getProduct_img0());
//
//		log.info("product_code확인: {}", productDTO);
//		productService.saveImgProcess(productImgDTO);
//
//		return ResponseEntity.ok(null);
//	}
//
//	@PutMapping("/update")
//	public ResponseEntity<String> updateProduct(@RequestBody ProductDTO productDTO) {
//
//		log.info("물품수정확인: {}", productDTO);
//		productService.updateProcess(productDTO);
//		return ResponseEntity.ok(null);
//	}
//
//	@DeleteMapping("/delete/{product_code}")
//	public ResponseEntity<Object> deleteProduct(@PathVariable("product_code") int product_code) {
//		log.info("물품삭제확인: {}", product_code);
//		ProductimgDTO productImgDTO = new ProductimgDTO();
//
//		productImgDTO = productService.contentImgProcess(product_code);
//		log.info("이미지0: {}", productImgDTO.getProduct_img0());
//
//		String filename = product_code + "_" + "product_img0" + ".png";
//		File fileDownload = new File(filePath, filename);
//		log.info(filename);
//
//		if (fileDownload.exists()) {
//
//			productService.deleteProductImgProcess(product_code);
//			if (!fileDownload.delete()) {
//				log.error("Failed to delete existing file.");
//			}
//		}
//
//		productService.deleteProcess(product_code);
//
//		return ResponseEntity.ok(null);
//	}
//
//	@GetMapping("/content/{product_code}")
//	public ResponseEntity<ProductDTO> productcontent(@PathVariable("product_code") int product_code) {
//		ProductDTO Dto = productService.contentProcess(product_code);
//		log.info("물품조회확인: {}", Dto);
//		return ResponseEntity.ok(Dto);
//	}
//
//	@GetMapping("/content/img/{product_code}")
//	public ResponseEntity<ProductimgDTO> productimgcontent(@PathVariable("product_code") int product_code) {
//		ProductimgDTO Dto = productService.contentImgProcess(product_code);
//		log.info("물품이미지조회확인: {}", Dto);
//		return ResponseEntity.ok(Dto);
//	}
//
//	// 물품 이름으로 리스트 가져오기
//	@GetMapping("/list/{product_name}")
//	public ResponseEntity<Map<String, Object>> searchlist(@PathVariable("product_name") String product_name) {
//		Map<String, Object> map = new HashMap<>();
//		log.info("들어온 제품명:{}", product_name);
//		List<ProductDTO> productList = productService.searchlistProcess(product_name);
//
//		List<Integer> productCodes = productList.stream().map(ProductDTO::getProduct_code).collect(Collectors.toList());
//
//		Map<Integer, Object> productImagesResults = new HashMap<>();
//		for (Integer productCode : productCodes) {
//			Object imgResult = productService.contentImgProcess(productCode);
//			productImagesResults.put(productCode, imgResult);
//		}
//
//		map.put("productList", productList);
//		map.put("productImages", productImagesResults);
//
//		log.info("productList-get:{}", map.get("productList"));
//		// 객체map에 put한 리스트 출력
//		return ResponseEntity.ok(map);
//	}
//
//	// 물품 이름으로 리스트 가져오기
////		@GetMapping("/list/{product_name}")
////		public ResponseEntity<Map<String, Object>> searchlist(@PathVariable("product_name") String product_name) {
////			Map<String, Object> map = new HashMap<>();
////			log.info("들어온 제품명:{}", product_name);
////			List<ProductDTO> productList = productService.searchlistProcess(product_name);
////			
////			List<Integer> productCodes = productList.stream()
////	                .map(ProductDTO::getProduct_code)
////	                .collect(Collectors.toList());
////			
////			
////			
////			Map<Integer, Object> productImagesResults = new HashMap<>();
////		    for (Integer productCode : productCodes) {
////		        Object imgResult = productService.contentImgProcess(productCode);
////		        productImagesResults.put(productCode, imgResult);
////		    }
////			
////			
////		    
////			
////			
////			map.put("productList", productList);	
////			map.put("productImages", productImagesResults);
////			
////			log.info("productList-get:{}", map.get("productList"));
////			// 객체map에 put한 리스트 출력
////			return ResponseEntity.ok(map);
////		}
//
//	// 판매자
//	@GetMapping("/seller/{user_id}")
//	public ResponseEntity<Map<String, Object>> sellerlist(@PathVariable("user_id") int user_id) {
//		Map<String, Object> map = new HashMap<>();
//		log.info("들어온 제품명:{}", user_id);
//		List<ProductDTO> productList = productService.sellerlistProcess(user_id);
//
//		List<Integer> productCodes = productList.stream().map(ProductDTO::getProduct_code).collect(Collectors.toList());
//
//		Map<Integer, Object> productImagesResults = new HashMap<>();
//		for (Integer productCode : productCodes) {
//			Object imgResult = productService.contentImgProcess(productCode);
//			productImagesResults.put(productCode, imgResult);
//		}
//
//		map.put("productList", productList);
//		map.put("productImages", productImagesResults);
//
//		log.info("productList-get:{}", map.get("productList"));
//		// 객체map에 put한 리스트 출력
//		return ResponseEntity.ok(map);
//	}
//
//}
package com.blogfriday.product.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blogfriday.chat.controller.WebSocketChatHandler;
import com.blogfriday.chat.dto.ChatUserDTO;
import com.blogfriday.chat.service.ChatService;
import com.blogfriday.payment.dto.OrderDetailsDTO;
import com.blogfriday.product.dto.ProductAndImgDTO;
import com.blogfriday.product.dto.ProductDTO;
import com.blogfriday.product.dto.ProducthistoryDTO;
import com.blogfriday.product.dto.ProductimgDTO;
import com.blogfriday.product.service.ProductService;
import com.blogfriday.user.dto.BlogFridayUserDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;
    
    @Autowired
    private ChatService chatService;

    @Autowired
    private WebSocketChatHandler webSocketChatHandler;
    
    @Value("${spring.servlet.multipart.location}")
    private String filePath;

    public ProductController() {
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveProduct(@ModelAttribute ProductAndImgDTO productAndImgDTO) {
        log.info("물품등록메소드: {}", productAndImgDTO);
        ProductDTO productDTO = new ProductDTO();
        ProductimgDTO productImgDTO = new ProductimgDTO();
        MultipartFile file = productAndImgDTO.getFilename();
        MultipartFile secondFile = productAndImgDTO.getSecondFile();

        productDTO.setUser_id(productAndImgDTO.getUser_id());
        productDTO.setCategory_code(productAndImgDTO.getCategory_code());
        productDTO.setProduct_name(productAndImgDTO.getProduct_name());
        productDTO.setProduct_price(productAndImgDTO.getProduct_price());
        productDTO.setProduct_count(productAndImgDTO.getProduct_count());
        productDTO.setProduct_content_text(productAndImgDTO.getProduct_content_text());

        productService.saveProcess(productDTO);

        log.info("물품등록확인: {}", productDTO.getProduct_code());

        if (file != null && !file.isEmpty()) {
            File filedownload = new File(filePath, productDTO.getProduct_code() + "_" + "product_img0" + ".png");

            try {
                FileCopyUtils.copy(file.getInputStream(), new FileOutputStream(filedownload));
            } catch (IOException e) {
                e.printStackTrace();
            }
            productImgDTO.setProduct_img0(productDTO.getProduct_code() + "_" + "product_img0" + ".png");
        }

        if (secondFile != null && !secondFile.isEmpty()) {
            log.info("두 번째 파일이 존재합니다.");
            File secondfiledownload = new File(filePath, productDTO.getProduct_code() + "_" + "product_img1" + ".png");

            try {
                FileCopyUtils.copy(secondFile.getInputStream(), new FileOutputStream(secondfiledownload));
            } catch (IOException e) {
                e.printStackTrace();
            }

            productImgDTO.setProduct_img1(productDTO.getProduct_code() + "_" + "product_img1" + ".png");
        }

        productImgDTO.setProduct_code(productDTO.getProduct_code());
        log.info("물품이미지확인: {}", productImgDTO.getProduct_img0());

        log.info("product_code확인: {}", productDTO);
        productService.saveImgProcess(productImgDTO);

        return ResponseEntity.ok(null);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateProduct(@RequestBody ProductDTO productDTO) {
        log.info("물품수정확인: {}", productDTO);
        productService.updateProcess(productDTO);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/delete/{product_code}")
    public ResponseEntity<Object> deleteProduct(@PathVariable("product_code") int product_code) {
        log.info("물품삭제확인: {}", product_code);
        ProductimgDTO productImgDTO = new ProductimgDTO();

        productImgDTO = productService.contentImgProcess(product_code);
        log.info("이미지0: {}", productImgDTO.getProduct_img0());

        String filename = product_code + "_" + "product_img0" + ".png";
        File fileDownload = new File(filePath, filename);
        log.info(filename);

        if (fileDownload.exists()) {
            productService.deleteProductImgProcess(product_code);
            if (!fileDownload.delete()) {
                log.error("Failed to delete existing file.");
            }
        }

        productService.deleteProcess(product_code);

        return ResponseEntity.ok(null);
    }
    
    //한번에 삭제하기 
    @DeleteMapping("/deletenumlist")
    public ResponseEntity<Object> deleteNumListProducts(@RequestBody List<Integer> productCodes) {
        for (Integer productCode : productCodes) {
            log.info("물품삭제확인: {}", productCode);
            ProductimgDTO productImgDTO = productService.contentImgProcess(productCode);
            log.info("이미지0: {}", productImgDTO.getProduct_img0());

            String filename = productCode + "_product_img0.png";
            File fileDownload = new File(filePath, filename);
            log.info(filename);

            if (fileDownload.exists()) {
                productService.deleteProductImgProcess(productCode);
                if (!fileDownload.delete()) {
                    log.error("Failed to delete existing file.");
                }
            }

            productService.deleteProcess(productCode);
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/content/{product_code}")
    public ResponseEntity<ProductDTO> productcontent(@PathVariable("product_code") int product_code) {
        ProductDTO dto = productService.contentProcess(product_code);
        log.info("물품조회확인: {}", dto);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/content/img/{product_code}")
    public ResponseEntity<ProductimgDTO> productimgcontent(@PathVariable("product_code") int product_code) {
        ProductimgDTO dto = productService.contentImgProcess(product_code);
        log.info("물품이미지조회확인: {}", dto);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/categorylist/{category_name}")
    public ResponseEntity<Map<String, Object>> searchlist(@PathVariable("category_name") String category_name) {
        Map<String, Object> map = new HashMap<>();
        log.info("들어온 카테고리명:{}", category_name);
        List<ProductDTO> productList = productService.searchcategorylistProcess(category_name);

        List<Integer> productCodes = productList.stream().map(ProductDTO::getProduct_code).collect(Collectors.toList());

        Map<Integer, Object> productImagesResults = new HashMap<>();
        for (Integer productCode : productCodes) {
            Object imgResult = productService.contentImgProcess(productCode);
            productImagesResults.put(productCode, imgResult);
        }

        map.put("productList", productList);
        map.put("productImages", productImagesResults);

        log.info("productList-get:{}", map.get("productList"));

        return ResponseEntity.ok(map);
    }
    
    @GetMapping("/list/{product_name}")
    public ResponseEntity<Map<String, Object>> searchcategorylist(@PathVariable("product_name") String product_name) {
        Map<String, Object> map = new HashMap<>();
        log.info("들어온 제품명:{}", product_name);
        List<ProductDTO> productList = productService.searchlistProcess(product_name);

        List<Integer> productCodes = productList.stream().map(ProductDTO::getProduct_code).collect(Collectors.toList());

        Map<Integer, Object> productImagesResults = new HashMap<>();
        for (Integer productCode : productCodes) {
            Object imgResult = productService.contentImgProcess(productCode);
            productImagesResults.put(productCode, imgResult);
        }

        map.put("productList", productList);
        map.put("productImages", productImagesResults);

        log.info("productList-get:{}", map.get("productList"));

        return ResponseEntity.ok(map);
    }

    @GetMapping("/seller/{user_id}")
    public ResponseEntity<Map<String, Object>> sellerlist(@PathVariable("user_id") int user_id) {
        Map<String, Object> map = new HashMap<>();
        log.info("들어온 제품명:{}", user_id);
        List<ProductDTO> productList = productService.sellerlistProcess(user_id);

        List<Integer> productCodes = productList.stream().map(ProductDTO::getProduct_code).collect(Collectors.toList());

        Map<Integer, Object> productImagesResults = new HashMap<>();
        for (Integer productCode : productCodes) {
            Object imgResult = productService.contentImgProcess(productCode);
            productImagesResults.put(productCode, imgResult);
        }

        map.put("productList", productList);
        map.put("productImages", productImagesResults);

        log.info("productList-get:{}", map.get("productList"));

        return ResponseEntity.ok(map);
    }
    
    //메인 이미지 
    @GetMapping("/mainlist")
    public ResponseEntity<Map<String, Object>> searchmainlist() {
        log.info("여기까지 오나?1");
        List<Integer> randomCodes = generateRandomProductCodes(11, 20, 3); // 임의의 상품 코드 생성
        log.info("여기까지 오나?2");
        Map<String, Object> map = new HashMap<>();
        List<ProductDTO> products = new ArrayList<>();
        Map<Integer, ProductimgDTO> productImgsMap = new HashMap<>(); // product_code를 키로 사용하는 Map
        
        for (int randomCode : randomCodes) {
            ProductDTO product = productService.findByProductCodeProcess(randomCode); // 상품 정보 조회
            ProductimgDTO productImg = productService.findByImgProductCodeProcess(randomCode); // 이미지 정보 조회
            products.add(product);
            productImgsMap.put(randomCode, productImg); // Map에 이미지 정보 추가
            log.info("여기까지 오나?3 - 처리중인 product_code: " + randomCode);
        }

        map.put("productList", products);
        map.put("productImages", productImgsMap); // 변경된 Map을 응답에 추가
        
        log.info("여기까지 오나? - 최종 응답 준비 완료");
        
        return ResponseEntity.ok(map);
    }
    
  //메인 이미지 
    @GetMapping("/mainlist2")
    public ResponseEntity<Map<String, Object>> searchmainlist2() {
        log.info("여기까지 오나?1");
        List<Integer> randomCodes = generateRandomProductCodes(21, 30, 3); // 임의의 상품 코드 생성
        log.info("여기까지 오나?2");
        Map<String, Object> map = new HashMap<>();
        List<ProductDTO> products = new ArrayList<>();
        Map<Integer, ProductimgDTO> productImgsMap = new HashMap<>(); // product_code를 키로 사용하는 Map
        
        for (int randomCode : randomCodes) {
            ProductDTO product = productService.findByProductCodeProcess(randomCode); // 상품 정보 조회
            ProductimgDTO productImg = productService.findByImgProductCodeProcess(randomCode); // 이미지 정보 조회
            products.add(product);
            productImgsMap.put(randomCode, productImg); // Map에 이미지 정보 추가
            log.info("여기까지 오나?3 - 처리중인 product_code: " + randomCode);
        }

        map.put("productList", products);
        map.put("productImages", productImgsMap); // 변경된 Map을 응답에 추가
        
        log.info("여기까지 오나? - 최종 응답 준비 완료");
        
        return ResponseEntity.ok(map);
    }
    
    
    //랜덤 숫자
    private List<Integer> generateRandomProductCodes(int min, int max, int count) {
        Random random = new Random();
        Set<Integer> productCodes = new HashSet<>();
        while (productCodes.size() < count) {
            int randomCode = random.nextInt(max - min + 1) + min;
            productCodes.add(randomCode);
        }
        return new ArrayList<>(productCodes);
    }
    
    // 판매내역
    @GetMapping("/producthistory/seller/{user_id1}")
    public ResponseEntity<Map<String, Object>> findBySellerCodeProcess(@PathVariable("user_id1") int user_id1) {
        
        Map<String, Object> map = new HashMap<>();
        List<ProducthistoryDTO> producthistory = productService.findBySellerCodeProcess(user_id1);
        

        map.put("producthistory", producthistory);
        
        
        log.info("판매내역");
        
        return ResponseEntity.ok(map);
    }
    
    // 구매내역
    
    @GetMapping("/producthistory/buyer/{user_id2}")
    public ResponseEntity<Map<String, Object>> findByBuyerCodeProcess(@PathVariable("user_id2") int user_id2) {
        
        Map<String, Object> map = new HashMap<>();
        List<ProducthistoryDTO> producthistory = productService.findByBuyerCodeProcess(user_id2);
        

        map.put("producthistory", producthistory);
        
        
        log.info("구매내역");
        
        return ResponseEntity.ok(map);
    }
    
    //내역넣기(임시)
    @PostMapping("/producthistory/{user_id2}")
    public ResponseEntity<String> saveProduct(@RequestBody OrderDetailsDTO orderDetailsDTO, @PathVariable("user_id2") String user_id2) {
        
    	// 디테일에서 물품코드, 구매유저, 개수 추출
    	ProducthistoryDTO producthistoryDTO = new ProducthistoryDTO();
    	producthistoryDTO.setProduct_code(orderDetailsDTO.getProductCode());
    	
    	producthistoryDTO.setUser_id2(Integer.parseInt(user_id2));
    	
    	producthistoryDTO.setProduct_count(orderDetailsDTO.getProductQuantity());
    	
    	
    	// 물품코드로 물품 이름, 카테고리, 가격 추출 ,판매유저
    	ProductDTO productDTO = productService.contentProcess(orderDetailsDTO.getProductCode());
    	
    	producthistoryDTO.setProduct_name(productDTO.getProduct_name());
    	producthistoryDTO.setCategory_code(productDTO.getCategory_code());
    	producthistoryDTO.setProduct_price(productDTO.getProduct_price());
    	producthistoryDTO.setUser_id1(productDTO.getUser_id());    	 
    	// 판매유저로 유저코드1 유저코드2 추출
    	//판매유저 Integer.toString(productDTO.getUser_id())
    	ChatUserDTO chatUserDTO1 = chatService.selecthistoryuserProcess(Integer.toString(productDTO.getUser_id()));
    	producthistoryDTO.setUser_code1(chatUserDTO1.getUser_code());
    	//구매유저
    	ChatUserDTO chatUserDTO2 = chatService.selecthistoryuserProcess(user_id2);
    	producthistoryDTO.setUser_code2(chatUserDTO2.getUser_code());
    	
    	productService.saveProducthistoryProcess(producthistoryDTO);
    	
    	//판매 메세지
    	webSocketChatHandler.sendMessageToseller(chatUserDTO1.getUser_code(), productDTO.getProduct_name(), orderDetailsDTO.getProductQuantity(), productDTO.getProduct_price());
    	//구매 메세지
    	webSocketChatHandler.sendMessageTobuyer(chatUserDTO2.getUser_code(), productDTO.getProduct_name(), orderDetailsDTO.getProductQuantity(), productDTO.getProduct_price());
    	
        return  ResponseEntity.ok(null);
    }
    
    
    
}