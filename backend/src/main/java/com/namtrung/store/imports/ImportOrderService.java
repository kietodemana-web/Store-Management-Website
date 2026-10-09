package com.namtrung.store.imports;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

@Service
public class ImportOrderService {

    private final ImportOrderRepository repo;

    public ImportOrderService(ImportOrderRepository repo) {
        this.repo = repo;
    }

    public List<ImportOrder> findAll() { return repo.findAll(); }

    public ImportOrder findById(Long id) {
        if (id == null) throw new IllegalArgumentException("ImportOrder id must not be null");
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("ImportOrder not found: " + id));
    }

    public ImportOrder save(ImportOrder o) { return repo.save(Objects.requireNonNull(o, "ImportOrder must not be null")); }

    public ImportOrder update(Long id, ImportOrder data) {
        ImportOrder o = findById(id);
        o.setSupplier(data.getSupplier());
        o.setImportDate(data.getImportDate());
        o.setProductName(data.getProductName());
        o.setQuantity(data.getQuantity());
        o.setTotalAmount(data.getTotalAmount());
        return repo.save(o);
    }

    public void delete(Long id) {
        if (id == null) throw new IllegalArgumentException("ImportOrder id must not be null");
        repo.deleteById(id);
    }
}
