package com.namtrung.store.imports;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/imports")
public class ImportOrderController {

    private final ImportOrderService service;

    public ImportOrderController(ImportOrderService service) {
        this.service = service;
    }

    @GetMapping
    public List<ImportOrder> getAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public ImportOrder getById(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    public ImportOrder create(@RequestBody ImportOrder o) { return service.save(o); }

    @PutMapping("/{id}")
    public ImportOrder update(@PathVariable Long id, @RequestBody ImportOrder o) {
        return service.update(id, o);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
