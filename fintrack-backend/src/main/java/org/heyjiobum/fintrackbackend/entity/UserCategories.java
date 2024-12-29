package org.heyjiobum.fintrackbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.heyjiobum.fintrackbackend.security.model.MyUser;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCategories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    private MyUser user;

    @OneToMany(mappedBy = "userCategories", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Category> categories;
}
