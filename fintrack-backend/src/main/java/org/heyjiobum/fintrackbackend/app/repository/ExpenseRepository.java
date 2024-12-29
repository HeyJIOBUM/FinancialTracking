package org.heyjiobum.fintrackbackend.app.repository;

import org.heyjiobum.fintrackbackend.app.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
