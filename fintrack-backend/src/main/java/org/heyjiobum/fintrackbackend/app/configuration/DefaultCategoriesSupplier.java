package org.heyjiobum.fintrackbackend.app.configuration;

import org.heyjiobum.fintrackbackend.app.entity.Category;
import org.heyjiobum.fintrackbackend.app.entity.OperationType;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Supplier;

@Component
public class DefaultCategoriesSupplier implements Supplier<List<Category>> {
    @Override
    public List<Category> get() {
        return List.of(
                new Category(OperationType.Expense, "Transport"),
                new Category(OperationType.Expense, "Food"),
                new Category(OperationType.Expense, "House"),
                new Category(OperationType.Expense, "Taxes"),
                new Category(OperationType.Expense, "Education"),
                new Category(OperationType.Expense, "Sport"),

                new Category(OperationType.Income, "Salary"),
                new Category(OperationType.Income, "Investments"),
                new Category(OperationType.Income, "Rental Income"),
                new Category(OperationType.Income, "Gifts")
        );
    }
}
