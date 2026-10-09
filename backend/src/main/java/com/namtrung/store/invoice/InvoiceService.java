package com.namtrung.store.invoice;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InvoiceService {

    private final InvoiceRepository repo;

    public InvoiceService(InvoiceRepository repo) {
        this.repo = repo;
    }

    public List<Invoice> findAll() { return repo.findAll(); }

    public Invoice findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found: " + id));
    }

    public Invoice save(Invoice inv) { return repo.save(inv); }

    public Invoice update(Long id, Invoice data) {
        Invoice inv = findById(id);
        inv.setCustomerName(data.getCustomerName());
        inv.setInvoiceDate(data.getInvoiceDate());
        inv.setProductName(data.getProductName());
        inv.setTotalAmount(data.getTotalAmount());
        inv.setPaymentMethod(data.getPaymentMethod());
        inv.setStatus(data.getStatus());
        return repo.save(inv);
    }

    public void delete(Long id) { repo.deleteById(id); }
}
