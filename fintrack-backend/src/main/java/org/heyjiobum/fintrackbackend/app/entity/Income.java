package org.heyjiobum.fintrackbackend.app.entity;

import jakarta.persistence.*;
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
public class Income {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Category category;

    @Positive(message = "amount must be positive")
    @Column(columnDefinition = "DECIMAL(10,2)")
    private BigDecimal amount;

    @Temporal(TemporalType.DATE)
    private Date date;

    String description;

    public Income(long id){
        this.id = id;
    }

    public Income(Category category, BigDecimal amount, Date date, String description) {
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.description = description;
    }

    public void updateIncome(Income income) {
        this.category = income.category;
        this.amount = income.amount;
        this.date = income.date;
        this.description = income.description;
    }
}
