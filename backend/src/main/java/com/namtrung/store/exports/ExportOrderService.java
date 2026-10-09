package com.namtrung.store.exports;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExportOrderService {

    private final ExportOrderRepository repo;

    public ExportOrderService(ExportOrderRepository repo) {
        this.repo = repo;
    }

    public List<ExportOrder> findAll() { return repo.findAll(); }

    public ExportOrder findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("ExportOrder not found: " + id));
    }

    public ExportOrder save(ExportOrder o) { return repo.save(o); }

    public ExportOrder update(Long id, ExportOrder data) {
        ExportOrder o = findById(id);
        o.setCustomerName(data.getCustomerName());
        o.setExportDate(data.getExportDate());
        o.setProductName(data.getProductName());
        o.setQuantity(data.getQuantity());
        o.setTotalAmount(data.getTotalAmount());
        return repo.save(o);
    }

    public void delete(Long id) { repo.deleteById(id); }
}
