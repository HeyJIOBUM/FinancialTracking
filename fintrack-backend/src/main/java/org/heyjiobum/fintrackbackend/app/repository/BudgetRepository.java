package org.heyjiobum.fintrackbackend.app.repository;

import org.heyjiobum.fintrackbackend.app.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
}
