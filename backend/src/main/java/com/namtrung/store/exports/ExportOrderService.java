package com.namtrung.store.exports;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

@Service
public class ExportOrderService {

    private final ExportOrderRepository repo;

    public ExportOrderService(ExportOrderRepository repo) {
        this.repo = repo;
    }

    public List<ExportOrder> findAll() { return repo.findAll(); }

    public ExportOrder findById(Long id) {
        return repo.findById(Objects.requireNonNull(id, "ExportOrder id must not be null"))
                .orElseThrow(() -> new RuntimeException("ExportOrder not found: " + id));
    }

    public ExportOrder save(ExportOrder o) {
        return repo.save(Objects.requireNonNull(o, "ExportOrder must not be null"));
    }

    public ExportOrder update(Long id, ExportOrder data) {
        ExportOrder o = findById(id);
        o.setCustomerName(data.getCustomerName());
        o.setExportDate(data.getExportDate());
        o.setProductName(data.getProductName());
        o.setQuantity(data.getQuantity());
        o.setTotalAmount(data.getTotalAmount());
        return repo.save(o);
    }

    public void delete(Long id) {
        if (id == null) throw new IllegalArgumentException("ExportOrder id must not be null");
        repo.deleteById(id);
    }
}
