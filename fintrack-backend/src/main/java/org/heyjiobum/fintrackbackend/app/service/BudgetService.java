package org.heyjiobum.fintrackbackend.app.service;

import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.entity.Budget;
import org.heyjiobum.fintrackbackend.app.entity.MyUser;
import org.heyjiobum.fintrackbackend.app.repository.BudgetRepository;
import org.heyjiobum.fintrackbackend.app.repository.MyUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BudgetService {
    private BudgetRepository budgetRepository;
    private MyUserRepository userRepository;

    public List<Budget> findBudgetsByUsername(String username) {
        return userRepository.findBudgetsByUsername(username);
    }

    public List<Budget> addBudgetsToUserByUsername(Budget budget, String username) {
        Optional<MyUser> myUser = userRepository.findByUsername(username);
        if (myUser.isPresent()) {
            List<Budget> userBudgets = myUser.get().getBudgets();
            userBudgets.add(budget);
            return userRepository.save(myUser.get()).getBudgets();
        }
        return null;
    }

    public void deleteBudgetByBudgetId(long budgetId, String username) {
        Optional<MyUser> myUser = userRepository.findByUsername(username);
        if (myUser.isPresent()) {
            MyUser user = myUser.get();
            user.getBudgets().removeIf(budget -> budget.getId() == budgetId);
            userRepository.save(user);
        }
    }

    public void updateBudgetByBudgetId(long budgetId, Budget budget, String username) {
        Optional<MyUser> myUser = userRepository.findByUsername(username);
        if (myUser.isPresent()) {
            MyUser user = myUser.get();
            List<Budget> userBudgets = user.getBudgets();
            Optional<Budget> budgetToUpdateOptional = userBudgets.stream()
                    .filter(budget1 -> budget1.getId() == budgetId)
                    .findFirst();
            if (budgetToUpdateOptional.isPresent()) {
                Budget budgetToUpdate = budgetToUpdateOptional.get();

                budgetToUpdate.setCategories(budget.getCategories());
                budgetToUpdate.setAmount(budget.getAmount());
                budgetToUpdate.setFromDate(budget.getFromDate());
                budgetToUpdate.setToDate(budget.getToDate());

                budgetRepository.save(budgetToUpdate);
            }
        }
    }
}
