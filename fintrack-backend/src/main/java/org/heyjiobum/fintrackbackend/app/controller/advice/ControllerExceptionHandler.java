package org.heyjiobum.fintrackbackend.app.controller.advice;

import org.heyjiobum.fintrackbackend.app.error.ApplicationError;
import org.springframework.context.MessageSourceResolvable;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.servlet.NoHandlerFoundException;
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
                .map(DefaultMessageSourceResolvable::getDefaultMessage).toList();

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
                .map(MessageSourceResolvable::getDefaultMessage).toList();

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
                new ApplicationError(HttpStatus.NOT_FOUND.value(), e.getMessage()),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler
    @ResponseBody
    public ResponseEntity<?> catchBadCredentialsException(BadCredentialsException e) {
        return new ResponseEntity<>(
                new ApplicationError(HttpStatus.BAD_REQUEST.value(), e.getMessage()),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler
    @ResponseBody
    public ResponseEntity<?> catchHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        StringBuilder messageBuilder = new StringBuilder();
        messageBuilder.append(e.getMethod());
        messageBuilder.append(" method is not supported for this request. Supported methods are ");
        Objects.requireNonNull(e.getSupportedHttpMethods()).forEach(t -> messageBuilder.append(t).append(" "));

        return new ResponseEntity<>(
                new ApplicationError(HttpStatus.NOT_FOUND.value(), messageBuilder.toString()),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler
    @ResponseBody
    public ResponseEntity<?> catchNoHandlerFoundException(NoHandlerFoundException e) {
        String message = "No handler found for " + e.getHttpMethod() + " " + e.getRequestURL();

        return new ResponseEntity<>(
                new ApplicationError(HttpStatus.NOT_FOUND.value(), message),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler
    @ResponseBody
    public ResponseEntity<?> catchHttpMediaTypeNotSupportedException(HttpMediaTypeNotSupportedException e) {
        StringBuilder builder = new StringBuilder();
        builder.append(e.getContentType());
        builder.append(" media type is not supported. Supported media types are ");
        e.getSupportedMediaTypes().forEach(t -> builder.append(t).append(", "));

        return new ResponseEntity<>(
                new ApplicationError(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(), builder.toString()),
                HttpStatus.UNSUPPORTED_MEDIA_TYPE
        );
    }

    @ExceptionHandler({ Exception.class })
    public ResponseEntity<Object> catchAll(Exception e) {
        return new ResponseEntity<>(
                new ApplicationError(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
