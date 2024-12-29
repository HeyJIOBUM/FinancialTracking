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
                new Category(0, OperationType.Expense, "Транспорт"),
                new Category(0, OperationType.Expense, "Еда"),
                new Category(0, OperationType.Expense, "Дом"),
                new Category(0, OperationType.Expense, "Досуг"),
                new Category(0, OperationType.Expense, "Налоги"),
                new Category(0, OperationType.Expense, "Образование"),
                new Category(0, OperationType.Expense, "Спорт"),

                new Category(0, OperationType.Income, "Зарплата"),
                new Category(0, OperationType.Income, "Получил от мамы")
        );
    }
}
