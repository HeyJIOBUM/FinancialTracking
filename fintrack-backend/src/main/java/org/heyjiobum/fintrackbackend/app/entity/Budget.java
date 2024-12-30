package org.heyjiobum.fintrackbackend.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.heyjiobum.fintrackbackend.app.entity.validation.ValidateDateRange;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ValidateDateRange(start = "fromDate", end = "toDate", message = "fromDate is after toDate")
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany
    private List<Category> categories;

    @NotNull(message = "amount can't be null")
    @Positive(message = "amount must be positive")
    @Column(columnDefinition = "DECIMAL(10,2)")
    private BigDecimal amount;

    @NotNull(message = "fromDate can't be null")
    @Temporal(TemporalType.DATE)
    private Date fromDate;

    @NotNull(message = "toDate can't be null")
    @Temporal(TemporalType.DATE)
    private Date toDate;

    String description;

    public Budget(long id){
        this.id = id;
    }

    public Budget(List<Category> categories,
                  BigDecimal amount,
                  Date fromDate,
                  Date toDate,
                  String description) {
        this.categories = categories;
        this.amount = amount;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.description = description;
    }

    public void updateBudget(Budget budget){
        this.categories = budget.categories;
        this.amount = budget.amount;
        this.fromDate = budget.fromDate;
        this.toDate = budget.toDate;
        this.description = budget.description;
    }
}
