package org.heyjiobum.fintrackbackend.app.controller;

import org.heyjiobum.fintrackbackend.app.error.ApplicationError;
import org.springframework.context.MessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.validation.method.ParameterErrors;
import org.springframework.validation.method.ParameterValidationResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.method.annotation.HandlerMethodValidationException;

import java.util.*;

@ControllerAdvice
public class ControllerExceptionHandler {
    @ExceptionHandler
    @ResponseBody
    public ResponseEntity<?> catchMethodValidationException(HandlerMethodValidationException e) {
        List<String> errors = e
                .getAllErrors()
                .stream()
                .map(messageSourceResolvable -> {
                    String parameterValue;
                    if (messageSourceResolvable instanceof ObjectError objectError) {
                        parameterValue = objectError.getObjectName();
                    } else {
                        parameterValue = ((MessageSourceResolvable) Objects.requireNonNull(messageSourceResolvable.getArguments())[0]).getDefaultMessage();
                    }

                    String parameter = "In parameter " + parameterValue;
                    String error = messageSourceResolvable.getDefaultMessage();

                    return parameter + ": " + error;
                }).toList();
        return new ResponseEntity<>(
                new ApplicationError(HttpStatus.NOT_FOUND.value(), String.join("\n", errors)),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler
    @ResponseBody
    public ResponseEntity<?> catchMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        List<String> errors = e
                .getAllErrors()
                .stream()
                .map(err -> {
                    String field = "In field " + ((FieldError) err).getField();
                    String error = err.getDefaultMessage();

                    return field + ": " + error;
                }).toList();

        return new ResponseEntity<>(
                new ApplicationError(HttpStatus.NOT_FOUND.value(), String.join("\n", errors)),
                HttpStatus.BAD_REQUEST
        );
    }
}
