package com.blogfriday.ai.config;

import org.python.util.PythonInterpreter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PythonConfig {
    @Bean
    public PythonInterpreter pythonInterpreter() {
        PythonInterpreter pythonInterpreter = new PythonInterpreter();
        pythonInterpreter.exec("import sys");
        pythonInterpreter.exec("sys.path.append('src/main/resources/python')");
        return pythonInterpreter;
    }
}