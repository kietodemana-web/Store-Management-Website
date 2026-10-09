const BASE = 'http://localhost:8080/api';

export const api = {
  // Products
  getProducts:    () => fetch(`${BASE}/products`).then(r => r.json()),
  createProduct:  (data) => fetch(`${BASE}/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  updateProduct:  (id, data) => fetch(`${BASE}/products/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  deleteProduct:  (id) => fetch(`${BASE}/products/${id}`, { method: 'DELETE' }),

  // Imports
  getImports:     () => fetch(`${BASE}/imports`).then(r => r.json()),
  createImport:   (data) => fetch(`${BASE}/imports`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  updateImport:   (id, data) => fetch(`${BASE}/imports/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  deleteImport:   (id) => fetch(`${BASE}/imports/${id}`, { method: 'DELETE' }),

  // Exports
  getExports:     () => fetch(`${BASE}/exports`).then(r => r.json()),
  createExport:   (data) => fetch(`${BASE}/exports`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  updateExport:   (id, data) => fetch(`${BASE}/exports/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  deleteExport:   (id) => fetch(`${BASE}/exports/${id}`, { method: 'DELETE' }),

  // Invoices
  getInvoices:    () => fetch(`${BASE}/invoices`).then(r => r.json()),
  createInvoice:  (data) => fetch(`${BASE}/invoices`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  updateInvoice:  (id, data) => fetch(`${BASE}/invoices/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  deleteInvoice:  (id) => fetch(`${BASE}/invoices/${id}`, { method: 'DELETE' }),
};
