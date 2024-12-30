package org.heyjiobum.fintrackbackend.app.entity.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target({ElementType.TYPE, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DateRangeValidator.class)
@Documented
public @interface ValidateDateRange  {
    String message() default "{org/heyjiobum/fintrackbackend/app/entity/validation/ValidateDateRange.message}";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };

    String start();

    String end();
}
