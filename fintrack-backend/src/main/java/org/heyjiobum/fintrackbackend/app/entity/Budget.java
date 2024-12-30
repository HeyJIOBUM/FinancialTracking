package org.heyjiobum.fintrackbackend.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany
    private List<Category> categories;

    @Column(columnDefinition = "DECIMAL(10,2)")
    private BigDecimal amount;

    @Temporal(TemporalType.DATE)
    private Date fromDate;

    @Temporal(TemporalType.DATE)
    private Date toDate;

    public Budget(long id){
        this.id = id;
    }

    public Budget(List<Category> categories,
                  BigDecimal amount,
                  Date fromDate,
                  Date toDate) {
        this.categories = categories;
        this.amount = amount;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }

    public void updateBudget(Budget budget){
        this.categories = budget.categories;
        this.amount = budget.amount;
        this.fromDate = budget.fromDate;
        this.toDate = budget.toDate;
    }
}
