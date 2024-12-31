package org.heyjiobum.fintrackbackend.app.controller.advice;

import org.heyjiobum.fintrackbackend.app.error.ApplicationError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.List;
import java.util.Objects;

@ControllerAdvice
public class ControllerExceptionHandler {
    @ExceptionHandler
    @ResponseBody
    public ResponseEntity<?> catchMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        List<String> errors = e
                .getAllErrors()
                .stream().filter(Objects::nonNull)
                .map(messageSourceResolvable -> {
                    String parameterValue;
                    parameterValue = messageSourceResolvable.getObjectName();

                    String parameter = "In parameter " + parameterValue;
                    String error = messageSourceResolvable.getDefaultMessage();

                    return parameter + ": " + error;
                }).toList();
        return new ResponseEntity<>(
                new ApplicationError(HttpStatus.BAD_REQUEST.value(), String.join("\n", errors)),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler
    @ResponseBody
    public ResponseEntity<?> catchMethodValidationException(HandlerMethodValidationException e) {
        List<String> errors = e
                .getAllErrors()
                .stream()
                .map(err -> {
                    String field = "In field " + ((FieldError) err).getField();
                    String error = err.getDefaultMessage();

                    return field + ": " + error;
                }).toList();

        return new ResponseEntity<>(
                new ApplicationError(HttpStatus.BAD_REQUEST.value(), String.join("\n", errors)),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler
    @ResponseBody
    public ResponseEntity<?> catchHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        return new ResponseEntity<>(
                new ApplicationError(HttpStatus.BAD_REQUEST.value(), e.getMessage()),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler
    @ResponseBody
    public ResponseEntity<?> catchNoResourceFoundException(NoResourceFoundException e) {
        return new ResponseEntity<>(
                new ApplicationError(HttpStatus.NOT_FOUND.value(),e.getMessage()),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler
    @ResponseBody
    public ResponseEntity<?> catchBadCredentialsException(BadCredentialsException e) {
        return new ResponseEntity<>(
                new ApplicationError(HttpStatus.BAD_REQUEST.value(),e.getMessage()),
                HttpStatus.BAD_REQUEST
        );
    }

}
