package com.namtrung.store.invoice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceService service;

    public InvoiceController(InvoiceService service) {
        this.service = service;
    }

    @GetMapping
    public List<Invoice> getAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public Invoice getById(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    public Invoice create(@RequestBody Invoice inv) { return service.save(inv); }

    @PutMapping("/{id}")
    public Invoice update(@PathVariable Long id, @RequestBody Invoice inv) {
        return service.update(id, inv);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
