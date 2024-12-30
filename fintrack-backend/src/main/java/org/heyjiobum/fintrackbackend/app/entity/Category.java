package org.heyjiobum.fintrackbackend.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.heyjiobum.fintrackbackend.app.entity.converter.OperationTypeConverter;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull(message = "operationType can't be null")
    @Convert(converter = OperationTypeConverter.class)
    private OperationType operationType;

    @NotBlank(message = "name can't be blank")
    private String name;

    public Category(long id){
        this.id = id;
    }

    public Category(OperationType operationType, String name) {
        this.operationType = operationType;
        this.name = name;
    }

    public void updateCategory(Category category){
        this.operationType = category.operationType;
        this.name = category.name;
    }
}
