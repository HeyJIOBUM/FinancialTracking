package org.heyjiobum.fintrackbackend.security.model;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MyUserService {
    private final PasswordEncoder passwordEncoder;
    private final MyUserRepository myUserRepository;

    public Optional<UserDetails> loadUserDetailsByUsername(String username) {
        Optional<MyUser> user = myUserRepository.findByUsername(username);
        if (user.isPresent()) {
            var userObj = user.get();
            return Optional.of(User.builder()
                    .username(userObj.getUsername())
                    .password(userObj.getPassword())
                    .roles(userObj.getRoles().split(","))
                    .build());
        } else {
            return Optional.empty();
        }
    }

    public Optional<MyUser> loadUserByUsername(String username) {
        return myUserRepository.findByUsername(username);
    }

    public boolean tryToSave(MyUser myUser) {
        if (isUsernameExist(myUser.getUsername()))
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

    public boolean isUsernameExist(String username) {
        return myUserRepository.findByUsername(username).isPresent();
    }
}
