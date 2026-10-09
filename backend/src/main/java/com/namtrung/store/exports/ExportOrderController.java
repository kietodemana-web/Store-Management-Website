package com.namtrung.store.exports;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/exports")
public class ExportOrderController {

    private final ExportOrderService service;

    public ExportOrderController(ExportOrderService service) {
        this.service = service;
    }

    @GetMapping
    public List<ExportOrder> getAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public ExportOrder getById(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    public ExportOrder create(@RequestBody ExportOrder o) { return service.save(o); }

    @PutMapping("/{id}")
    public ExportOrder update(@PathVariable Long id, @RequestBody ExportOrder o) {
        return service.update(id, o);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
