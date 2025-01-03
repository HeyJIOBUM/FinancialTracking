package org.heyjiobum.fintrackbackend.app.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.entity.Income;
import org.heyjiobum.fintrackbackend.app.service.IncomeService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class IncomesController {
    private final IncomeService incomeService;
    
    @GetMapping("/me/incomes")
    public List<Income> getUserIncomes() {
        String username = this.getCurrentlyAuthenticatedUsername();
        return incomeService.findIncomesByUsername(username);
    }

    @PostMapping("/me/incomes")
    public List<Income> addUserIncomes(@Valid @RequestBody Income income) {
        String username = this.getCurrentlyAuthenticatedUsername();
        return incomeService.addIncomeToUserByUsername(income, username);
    }

    @DeleteMapping("/me/incomes/{incomeId}")
    public void deleteUserIncome(@PathVariable long incomeId) {
        String username = this.getCurrentlyAuthenticatedUsername();
        incomeService.deleteIncomeByIncomeId(incomeId, username);
    }

    @PutMapping("/me/incomes/{incomeId}")
    public void updateUserIncome(@PathVariable long incomeId, @Valid @RequestBody Income income) {
        String username = this.getCurrentlyAuthenticatedUsername();
        incomeService.updateIncomeByIncomeId(incomeId, income, username);
    }
    
    private String getCurrentlyAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
