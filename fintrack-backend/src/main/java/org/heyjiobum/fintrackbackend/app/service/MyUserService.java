package org.heyjiobum.fintrackbackend.app.service;

import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.entity.MyUser;
import org.heyjiobum.fintrackbackend.app.repository.MyUserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MyUserService {
    private final MyUserRepository userRepository;

    public Optional<MyUser> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
