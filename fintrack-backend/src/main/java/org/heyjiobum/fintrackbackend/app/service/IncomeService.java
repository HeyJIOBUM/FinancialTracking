package org.heyjiobum.fintrackbackend.app.service;

import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.repository.IncomeRepository;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class IncomeService {
    private final IncomeRepository incomeRepository;
}
