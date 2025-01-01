package org.heyjiobum.fintrackbackend.app.service;

import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.configuration.DefaultCategoriesSupplier;
import org.heyjiobum.fintrackbackend.app.entity.MyUser;
import org.heyjiobum.fintrackbackend.app.entity.dto.PasswordChangeDto;
import org.heyjiobum.fintrackbackend.app.repository.MyUserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final MyUserRepository userRepository;
    private final DefaultCategoriesSupplier defaultCategoriesSupplier;

    public void tryToRegister(MyUser myUser) {
        Optional<MyUser> userInDb = userRepository.findByUsername(myUser.getUsername());
        if (userInDb.isPresent())
            throw new BadCredentialsException("Username already exists");


        MyUser savedUser = new MyUser(myUser.getUsername(), passwordEncoder.encode(myUser.getPassword()));
        savedUser.setCategories(defaultCategoriesSupplier.get());
        userRepository.save(savedUser);
    }

    public void tryToLogin(MyUser myUser) {
        Optional<MyUser> userInDb = userRepository.findByUsername(myUser.getUsername());
        if (userInDb.isEmpty())
            throw new BadCredentialsException("Username or password is invalid");

        MyUser savedUser = userInDb.get();
        if (!passwordEncoder.matches(myUser.getPassword(), savedUser.getPassword()))
            throw new BadCredentialsException("Username or password is invalid");
    }

    public void tryToChangePassword(String username, PasswordChangeDto passwordChangeDto) {
        Optional<MyUser> userInDb = userRepository.findByUsername(username);
        if (userInDb.isPresent()){
            MyUser savedUser = userInDb.get();

            if (!passwordEncoder.matches(passwordChangeDto.getOldPassword(), savedUser.getPassword()))
                throw new BadCredentialsException("Invalid old password");

            savedUser.setPassword(passwordEncoder.encode(passwordChangeDto.getNewPassword()));
            userRepository.save(savedUser);
        }
    }
}
