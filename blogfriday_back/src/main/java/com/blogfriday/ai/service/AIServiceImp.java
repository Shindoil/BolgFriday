package com.blogfriday.ai.service;

import com.blogfriday.ai.repository.AIRepository;
import com.blogfriday.product.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

@Service
public class AIServiceImp implements AIService {

    @Autowired
    private AIRepository aiRepository;

    @Override
    public String predict(String text, List<String> productNames) {
        // 파이썬 스크립트 경로와 인터프리터 경로 설정
        String pythonScriptPath = "src/main/resources/python/predict.py";
        String pythonInterpreterPath = "C:/Users/username/AppData/Local/Programs/Python/Python39/python.exe";

        // 명령 실행을 위한 ProcessBuilder 생성
        ProcessBuilder pb = new ProcessBuilder(pythonInterpreterPath, pythonScriptPath, text);
        pb.redirectErrorStream(true);

        try {
            // 명령 실행
            Process process = pb.start();

            // 출력 결과 읽기
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            StringBuilder result = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                result.append(line);
            }

            // 프로세스 종료 대기
            int exitCode = process.waitFor();
            if (exitCode == 0) {
                // 예측 결과 파싱
                String predictedProductName = parsePredictionResult(result.toString());
                return predictedProductName;
            } else {
                // 오류 발생 시 처리
                System.err.println("Python script execution failed with exit code: " + exitCode);
                return null;
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return null;
        }
    }

    private String parsePredictionResult(String result) {
        // 예측 결과 파싱 로직 구현
        // 예측 결과 문자열을 파싱하여 예측된 상품명 추출
        // 예시: [("상품명1", 0.8), ("상품명2", 0.6), ("상품명3", 0.4)]
        String[] predictions = result.substring(1, result.length() - 1).split(",");
        String predictedProductName = predictions[0].trim().split("'")[1];
        return predictedProductName;
    }

    @Override
    public List<String> getProductNames() {
        return aiRepository.getProductNames();
    }

    @Override
    public List<ProductDTO> searchProductsByName(String productName) {
        return aiRepository.searchProductsByName(productName);
    }

    @Override
    public List<ProductDTO> findSimilarProductNames(String productName) {
        return aiRepository.findSimilarProductNames(productName);
    }
}