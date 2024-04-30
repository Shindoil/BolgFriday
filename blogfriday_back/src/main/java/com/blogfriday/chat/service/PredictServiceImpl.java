package com.blogfriday.chat.service;

import org.python.util.PythonInterpreter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

@Service
public class PredictServiceImpl implements PredictService {
	
	@Autowired
    private PythonInterpreter pythonInterpreter;

	@Override
	public String predict(String inputText, List<String> productNames) {
        String pythonScriptPath = "src/main/resources/python/predict.py";
        String virtualEnvPythonPath = "venv/Scripts/python.exe";

        ProcessBuilder pb = new ProcessBuilder(virtualEnvPythonPath, pythonScriptPath, inputText);
        pb.command().addAll(productNames);
        pb.directory(new File("D:/ai_chat/springboot-workspace/blogfriday"));
        Process p;
        try {
            p = pb.start();
            BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream()));
            return stdInput.readLine();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}