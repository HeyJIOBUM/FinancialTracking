package org.heyjiobum.fintrackbackend.app.repository;

import org.heyjiobum.fintrackbackend.app.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeRepository extends JpaRepository<Income, Long> {
}
