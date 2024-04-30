package com.blogfriday.page.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.blogfriday.page.dto.PageDTO;
import com.blogfriday.page.service.PageService;
import com.blogfriday.product.service.ProductService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin("*")
@RestController
public class PageController {

	
//	@Autowired
//	private PageService pageService;
//	@Autowired
//	private ProductService productService;
//	
//	@Autowired
//	private PageDTO pdto;
//	private int currentPage;
//	
//	public PageController() {
//	}
//	
//	// 페이지 입력받아서 페이지당 리스트 가져오기 3페이지 (0 5 10)
//	@GetMapping("/seller/list/{currentPage}")
//	public ResponseEntity<Map<String, Object>> listExecute(@PathVariable("currentPage") int currentPage) {
//		Map<String, Object> map = new HashMap<>();
//		// 전체 리스트갯수
//		int totalRecord = pageService.countProcess(); //필요한가
//		log.info("totalRecord:{}", totalRecord);
//		// 전체 리스트 갯수가 1보다크면(보유한 리스트가 있으면) 그걸 가져와서 map객체에 넣고
//		if (totalRecord >= 1) {
//			this.currentPage = currentPage;
//			//총페이지 수를 계산할때 사용
//			this.pdto = new PageDTO(this.currentPage,totalRecord);
//			
//			map.put("boardList", pageService.listProcess(pdto));
//			map.put("pv", this.pdto);
//
//		}
//		log.info("boardList:{}", map.get("boardList"));
//		// 객체map에 put한 리스트 출력
//		return ResponseEntity.ok(map);
//	}
	
}
