package org.heyjiobum.fintrackbackend.app.entity.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.lang.reflect.Field;
import java.time.Instant;
import java.util.Date;

public class DateRangeValidator implements ConstraintValidator<ValidateDateRange, Object> {
    private String startDateFieldName;
    private String endDateFieldName;

    @Override
    public void initialize(ValidateDateRange constraintAnnotation) {
        startDateFieldName = constraintAnnotation.start();
        endDateFieldName = constraintAnnotation.end();
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context) {
        if (obj == null) {
            return false;
        }

        try {
            Field startField = obj.getClass().getDeclaredField(startDateFieldName);
            Field endField = obj.getClass().getDeclaredField(endDateFieldName);
            startField.setAccessible(true);
            endField.setAccessible(true);

            Date startDate = parseDate(startField.get(obj));
            Date endDate = parseDate(endField.get(obj));

            if (startDate != null && endDate != null)
                return !startDate.after(endDate);
            else
                return false;
        } catch (NoSuchFieldException | IllegalAccessException e) {
            return false;
        }
    }

    private Date parseDate(Object dateObject) {
        if (dateObject instanceof Date date) {
            return date;
        }
        else if (dateObject instanceof String dateString) {
            return Date.from(Instant.parse(dateString));
        }
        return null;
    }
}
