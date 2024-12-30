package org.heyjiobum.fintrackbackend.app.controller;

import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.configuration.DefaultCategoriesSupplier;
import org.heyjiobum.fintrackbackend.app.entity.Category;
import org.heyjiobum.fintrackbackend.app.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class CategoriesController {
    private final CategoryService categoryService;

    @GetMapping("/default/categories")
    public List<Category> getDefaultCategories(@Autowired DefaultCategoriesSupplier defaultCategoriesSupplier) {
        return defaultCategoriesSupplier.get();
    }

    @GetMapping("/me/categories")
    public List<Category> getUserCategories() {
        String username = this.getCurrentlyAuthenticatedUsername();
        return categoryService.findCategoriesByUsername(username);
    }

    @PostMapping("/me/categories")
    public List<Category> addUserCategories(@RequestBody List<Category> categories) {
        String username = this.getCurrentlyAuthenticatedUsername();
        return categoryService.addCategoriesToUserByUsername(categories, username);
    }

    @DeleteMapping("/me/categories/{categoryId}")
    public void deleteUserCategory(@PathVariable long categoryId) {
        String username = this.getCurrentlyAuthenticatedUsername();
        categoryService.deleteCategoryByCategoryId(categoryId, username);
    }

    @PutMapping("/me/categories/{categoryId}")
    public void updateUserCategory(@PathVariable long categoryId, @RequestBody Category category) {
        String username = this.getCurrentlyAuthenticatedUsername();
        categoryService.updateCategoryByCategoryId(categoryId, category, username);
    }

    private String getCurrentlyAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
