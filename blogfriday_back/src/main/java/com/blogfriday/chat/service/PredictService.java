package com.blogfriday.chat.service;

import java.util.List;

public interface PredictService {
   public String predict(String inputText, List<String> productNames);
}