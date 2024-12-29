package org.heyjiobum.fintrackbackend.app.service;

import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.entity.MyUser;
import org.heyjiobum.fintrackbackend.app.repository.MyUserRepository;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MyUserService {
    private final MyUserRepository myUserRepository;

    public MyUser loadUserByUsername(String username) {
        return myUserRepository.findByUsername(username).orElse(null);
    }

    public boolean isUsernameExist(String username) {
        return myUserRepository.findByUsername(username).isPresent();
    }
}
