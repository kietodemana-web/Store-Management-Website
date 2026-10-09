package com.namtrung.store.imports;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ImportOrderService {

    private final ImportOrderRepository repo;

    public ImportOrderService(ImportOrderRepository repo) {
        this.repo = repo;
    }

    public List<ImportOrder> findAll() { return repo.findAll(); }

    public ImportOrder findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("ImportOrder not found: " + id));
    }

    public ImportOrder save(ImportOrder o) { return repo.save(o); }

    public ImportOrder update(Long id, ImportOrder data) {
        ImportOrder o = findById(id);
        o.setSupplier(data.getSupplier());
        o.setImportDate(data.getImportDate());
        o.setProductName(data.getProductName());
        o.setQuantity(data.getQuantity());
        o.setTotalAmount(data.getTotalAmount());
        return repo.save(o);
    }

    public void delete(Long id) { repo.deleteById(id); }
}
