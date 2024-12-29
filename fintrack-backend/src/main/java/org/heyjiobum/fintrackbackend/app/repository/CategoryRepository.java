package org.heyjiobum.fintrackbackend.app.repository;

import org.heyjiobum.fintrackbackend.app.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
