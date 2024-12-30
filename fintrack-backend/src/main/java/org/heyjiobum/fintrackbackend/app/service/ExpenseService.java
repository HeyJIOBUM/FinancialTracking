package org.heyjiobum.fintrackbackend.app.service;

import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.entity.Expense;
import org.heyjiobum.fintrackbackend.app.entity.MyUser;
import org.heyjiobum.fintrackbackend.app.repository.ExpenseRepository;
import org.heyjiobum.fintrackbackend.app.repository.MyUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final MyUserRepository userRepository;

    public List<Expense> findExpensesByUsername(String username) {
        return userRepository.findExpenseByUsername(username);
    }

    public List<Expense> addExpensesToUserByUsername(Expense expense, String username) {
        Optional<MyUser> myUser = userRepository.findByUsername(username);
        if (myUser.isPresent()) {
            List<Expense> userExpenses = myUser.get().getExpenses();
            userExpenses.add(expense);
            return userRepository.save(myUser.get()).getExpenses();
        }
        return null;
    }

    public void deleteExpenseByExpenseId(long expenseId, String username) {
        Optional<MyUser> myUser = userRepository.findByUsername(username);
        if (myUser.isPresent()) {
            MyUser user = myUser.get();
            user.getExpenses().removeIf(expense -> expense.getId() == expenseId);
            userRepository.save(user);
        }
    }

    public void updateExpenseByExpenseId(long expenseId, Expense expense, String username) {
        Optional<MyUser> myUser = userRepository.findByUsername(username);
        if (myUser.isPresent()) {
            MyUser user = myUser.get();
            List<Expense> userExpenses = user.getExpenses();
            Optional<Expense> expenseToUpdateOptional = userExpenses.stream()
                    .filter(expense1 -> expense1.getId() == expenseId)
                    .findFirst();
            if (expenseToUpdateOptional.isPresent()) {
                Expense expenseToUpdate = expenseToUpdateOptional.get();

                expenseToUpdate.setAmount(expense.getAmount());
                expenseToUpdate.setDate(expense.getDate());
                expenseToUpdate.setCategory(expense.getCategory());

                expenseRepository.save(expenseToUpdate);
            }
        }
    }
}
