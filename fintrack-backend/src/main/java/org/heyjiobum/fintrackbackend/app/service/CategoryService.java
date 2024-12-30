package org.heyjiobum.fintrackbackend.app.service;

import lombok.AllArgsConstructor;
import org.heyjiobum.fintrackbackend.app.entity.Category;
import org.heyjiobum.fintrackbackend.app.entity.MyUser;
import org.heyjiobum.fintrackbackend.app.repository.CategoryRepository;
import org.heyjiobum.fintrackbackend.app.repository.MyUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final MyUserRepository userRepository;

    public List<Category> findCategoriesByUsername(String username) {
        return userRepository.findCategoriesByUsername(username);
    }

    public List<Category> addCategoriesToUserByUsername(List<Category> categories, String username) {
        Optional<MyUser> myUser = userRepository.findByUsername(username);
        if (myUser.isPresent()) {
            List<Category> userCategories = myUser.get().getCategories();
            userCategories.addAll(categories);
            return userRepository.save(myUser.get()).getCategories();
        }
        return null;
    }

    public void deleteCategoryByCategoryId(long categoryId, String username) {
        Optional<MyUser> myUser = userRepository.findByUsername(username);
        if (myUser.isPresent()) {
            MyUser user = myUser.get();
            user.getCategories().removeIf(category -> category.getId() == categoryId);
            userRepository.save(user);
        }
    }

    public void updateCategoryByCategoryId(long categoryId, Category category, String username) {
        Optional<MyUser> myUser = userRepository.findByUsername(username);
        if (myUser.isPresent()) {
            MyUser user = myUser.get();
            List<Category> userCategories = user.getCategories();
            Optional<Category> categoryToUpdateOptional = userCategories.stream()
                    .filter(category1 -> category1.getId() == categoryId)
                    .findFirst();
            if (categoryToUpdateOptional.isPresent()) {
                Category categoryToUpdate = categoryToUpdateOptional.get();

                categoryToUpdate.updateCategory(category);

                categoryRepository.save(categoryToUpdate);
            }
        }
    }
}
