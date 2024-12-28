package org.heyjiobum.fintrackbackend.security.model;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MyUserService {
    private PasswordEncoder passwordEncoder;
    private final MyUserRepository myUserRepository;

    public void tryToSave(MyUser myUser) {
        if (myUserRepository.findByUsername(myUser.getUsername()).isPresent())
            return;

        MyUser savedUser = new MyUser(myUser.getUsername(), passwordEncoder.encode(myUser.getPassword()));
        myUserRepository.save(savedUser);
    }

    public boolean isUsernameExist(String username) {
        return myUserRepository.findByUsername(username).isPresent();
    }
}
