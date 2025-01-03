package org.heyjiobum.fintrackbackend.app.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.entity.Expense;
import org.heyjiobum.fintrackbackend.app.service.ExpenseService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class ExpensesController {
    private final ExpenseService expenseService;
    
    @GetMapping("/me/expenses")
    public List<Expense> getUserExpenses() {
        String username = this.getCurrentlyAuthenticatedUsername();
        return expenseService.findExpensesByUsername(username);
    }

    @PostMapping("/me/expenses")
    public List<Expense> addUserExpenses(@Valid @RequestBody Expense expense) {
        String username = this.getCurrentlyAuthenticatedUsername();
        return expenseService.addExpenseToUserByUsername(expense, username);
    }

    @DeleteMapping("/me/expenses/{expenseId}")
    public void deleteUserExpense(@PathVariable long expenseId) {
        String username = this.getCurrentlyAuthenticatedUsername();
        expenseService.deleteExpenseByExpenseId(expenseId, username);
    }

    @PutMapping("/me/expenses/{expenseId}")
    public void updateUserExpense(@PathVariable long expenseId, @Valid @RequestBody Expense expense) {
        String username = this.getCurrentlyAuthenticatedUsername();
        expenseService.updateExpenseByExpenseId(expenseId, expense, username);
    }
    
    private String getCurrentlyAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
