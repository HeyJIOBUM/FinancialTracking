package org.heyjiobum.fintrackbackend.app.service;

import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.entity.Income;
import org.heyjiobum.fintrackbackend.app.entity.MyUser;
import org.heyjiobum.fintrackbackend.app.repository.IncomeRepository;
import org.heyjiobum.fintrackbackend.app.repository.MyUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class IncomeService {
    private final IncomeRepository incomeRepository;
    private final MyUserRepository userRepository;

    public List<Income> findIncomesByUsername(String username) {
        return userRepository.findIncomesByUsername(username);
    }

    public List<Income> addIncomesToUserByUsername(Income income, String username) {
        Optional<MyUser> myUser = userRepository.findByUsername(username);
        if (myUser.isPresent()) {
            List<Income> userIncomes = myUser.get().getIncomes();
            userIncomes.add(income);
            return userRepository.save(myUser.get()).getIncomes();
        }
        return null;
    }

    public void deleteIncomeByIncomeId(long incomeId, String username) {
        Optional<MyUser> myUser = userRepository.findByUsername(username);
        if (myUser.isPresent()) {
            MyUser user = myUser.get();
            user.getIncomes().removeIf(income -> income.getId() == incomeId);
            userRepository.save(user);
        }
    }

    public void updateIncomeByIncomeId(long incomeId, Income income, String username) {
        Optional<MyUser> myUser = userRepository.findByUsername(username);
        if (myUser.isPresent()) {
            MyUser user = myUser.get();
            List<Income> userIncomes = user.getIncomes();
            Optional<Income> incomeToUpdateOptional = userIncomes.stream()
                    .filter(income1 -> income1.getId() == incomeId)
                    .findFirst();
            if (incomeToUpdateOptional.isPresent()) {
                Income incomeToUpdate = incomeToUpdateOptional.get();

                incomeToUpdate.setAmount(income.getAmount());
                incomeToUpdate.setDate(income.getDate());
                incomeToUpdate.setCategory(income.getCategory());

                incomeRepository.save(incomeToUpdate);
            }
        }
    }
}
