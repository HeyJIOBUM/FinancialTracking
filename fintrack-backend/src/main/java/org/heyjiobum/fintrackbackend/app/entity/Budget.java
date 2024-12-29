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

    @Column(columnDefinition = "DECIMAL(10,2)")
    private BigDecimal remainingAmount;

    private Date fromDate;

    private Date toDate;
}
