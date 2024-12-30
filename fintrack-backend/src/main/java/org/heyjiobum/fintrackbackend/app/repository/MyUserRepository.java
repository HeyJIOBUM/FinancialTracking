package org.heyjiobum.fintrackbackend.app.repository;

import org.heyjiobum.fintrackbackend.app.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MyUserRepository extends JpaRepository<MyUser, Long> {
    Optional<MyUser> findByUsername(String username);

    @Query("select u.categories from MyUser u where u.username = :username")
    List<Category> findCategoriesByUsername(@Param("username") String username);

    @Query("select u.expenses from MyUser u where u.username = :username")
    List<Expense> findExpenseByUsername(@Param("username") String username);

    @Query("select u.budgets from MyUser u where u.username = :username")
    List<Budget> findBudgetsByUsername(@Param("username") String username);

    @Query("select u.incomes from MyUser u where u.username = :username")
    List<Income> findIncomesByUsername(@Param("username") String username);
}
