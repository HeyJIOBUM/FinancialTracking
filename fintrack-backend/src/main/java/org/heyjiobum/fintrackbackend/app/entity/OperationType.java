package org.heyjiobum.fintrackbackend.app.entity;

import lombok.Getter;

@Getter
public enum OperationType {
    Income("Income"), Expense("Expense");

    private final String name;

    OperationType(String name) {
        this.name = name;
    }
}
