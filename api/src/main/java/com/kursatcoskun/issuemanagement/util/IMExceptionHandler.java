package com.kursatcoskun.issuemanagement.util;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.EntityNotFoundException;

@ControllerAdvice
@RestController
@Slf4j
public class IMExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(Exception.class)
    public final ResponseEntity<UtilResponse<?>> handleExceptions(Exception ex, WebRequest request) {
        log.error("ERROR LOG -> ExceptionHandler -> " , ex ,request);
        return ResponseEntity.badRequest().body(new UtilResponse<>(null, new ProcessResult("400",ResponseMessage.ERROR)));
    }
}
