package org.heyjiobum.fintrackbackend.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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

    @NotNull(message = "category can't be null")
    @ManyToOne
    private Category category;

    @NotNull(message = "amount can't be null")
    @Positive(message = "amount must be positive")
    @Column(columnDefinition = "DECIMAL(10,2)")
    private BigDecimal amount;

    @NotNull(message = "date can't be null")
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