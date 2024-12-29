package org.heyjiobum.fintrackbackend.app.service;

import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.entity.MyUser;
import org.heyjiobum.fintrackbackend.app.repository.MyUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final MyUserRepository myUserRepository;

    public boolean tryToRegister(MyUser myUser) {
        Optional<MyUser> userInDb = myUserRepository.findByUsername(myUser.getUsername());
        if (userInDb.isPresent())
            return false;

        MyUser savedUser = new MyUser(myUser.getUsername(), passwordEncoder.encode(myUser.getPassword()));
        myUserRepository.save(savedUser);
        return true;
    }

    public boolean tryToLogin(MyUser myUser) {
        Optional<MyUser> userInDb = myUserRepository.findByUsername(myUser.getUsername());
        if (userInDb.isEmpty())
            return false;

        MyUser savedUser = userInDb.get();
        return passwordEncoder.matches(myUser.getPassword(), savedUser.getPassword());
    }
}
