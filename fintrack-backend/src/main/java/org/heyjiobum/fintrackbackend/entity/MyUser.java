package org.heyjiobum.fintrackbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.heyjiobum.fintrackbackend.security.Role;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique=true)
    private String username;

    private String password;

    private String roles = Role.User.getName();

    @OneToMany
    private List<Expense> expenses;

    @OneToMany
    private List<Income> incomes;

    public MyUser(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
