package org.heyjiobum.fintrackbackend.app.controller;

import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.service.BudgetService;
import org.heyjiobum.fintrackbackend.app.service.CategoryService;
import org.heyjiobum.fintrackbackend.app.service.ExpenseService;
import org.heyjiobum.fintrackbackend.app.service.IncomeService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class UserController {
    private final CategoryService categoryService;
    private final ExpenseService expenseService;
    private final IncomeService incomeService;
    private final BudgetService budgetService;

    @GetMapping("/user/categories")
    public void getUserCategories() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();


    }

    @GetMapping("/user/expenses")
    public void getUserExpenses() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();


    }

    @GetMapping("/user/incomes")
    public void getUserIncomes() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();


    }

    @GetMapping("/user/budgets")
    public void getUserBudgets() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();


    }
}
