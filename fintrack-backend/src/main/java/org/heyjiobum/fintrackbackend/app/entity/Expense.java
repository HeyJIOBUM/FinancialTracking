package org.heyjiobum.fintrackbackend.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Category category;

    @Column(columnDefinition = "DECIMAL(10,2)")
    private BigDecimal amount;

    @Temporal(TemporalType.DATE)
    private Date date;

    String description;

    public Expense(long id) {
        this.id = id;
    }

    public Expense(Category category, BigDecimal amount, Date date, String description) {
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.description = description;
    }

    public void updateExpense(Expense expense){
        this.category = expense.category;
        this.amount = expense.amount;
        this.date = expense.date;
        this.description = expense.description;
    }
}