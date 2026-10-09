package com.namtrung.store.product;

import java.util.List;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> findAll() { return repo.findAll(); }

    public Product findById(Long id) {
        if (id == null) throw new IllegalArgumentException("Product id must not be null");
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));
    }

    public @NonNull Product save(@NonNull Product product) {
        return repo.save(product);
    }

    public Product update(Long id, Product data) {
        Product p = findById(id);
        p.setSku(data.getSku());
        p.setName(data.getName());
        p.setCategory(data.getCategory());
        p.setImportPrice(data.getImportPrice());
        p.setSalePrice(data.getSalePrice());
        p.setStock(data.getStock());
        return repo.save(p);
    }

    public void delete(Long id) {
        if (id == null) throw new IllegalArgumentException("Product id must not be null");
        repo.deleteById(id);
    }
}
