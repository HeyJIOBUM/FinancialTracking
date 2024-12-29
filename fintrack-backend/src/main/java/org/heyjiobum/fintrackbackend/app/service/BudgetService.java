package org.heyjiobum.fintrackbackend.app.service;

import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.repository.BudgetRepository;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BudgetService {
    private BudgetRepository budgetRepository;
}
