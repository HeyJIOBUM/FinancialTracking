package org.heyjiobum.fintrackbackend.security.model;

import lombok.Getter;

@Getter
public enum Role {
    User("USER"),
    Admin("ADMIN");

    private final String name;

    Role(final String name) {
        this.name = name;
    }
}
