package org.heyjiobum.fintrackbackend.app.configuration;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.heyjiobum.fintrackbackend.app.entity.OperationType;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class OperationTypeConverter implements AttributeConverter<OperationType, String> {
    @Override
    public String convertToDatabaseColumn(OperationType operationType) {
        if (operationType == null) {
            return null;
        }

        return operationType.getName();
    }

    @Override
    public OperationType convertToEntityAttribute(String operationTypeString) {
        if (operationTypeString == null) {
            return null;
        }

        return Stream.of(OperationType.values())
                .filter(c -> c.getName().equals(operationTypeString))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
