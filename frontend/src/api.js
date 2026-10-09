const JSON_HEADERS = { 'Content-Type': 'application/json' };

const parse = async (r) => {
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  const text = await r.text();
  return text ? JSON.parse(text) : null;
};

const get = (url) => fetch(url).then(parse);
const post = (url, data) => fetch(url, { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify(data) }).then(parse);
const put = (url, data) => fetch(url, { method: 'PUT', headers: JSON_HEADERS, body: JSON.stringify(data) }).then(parse);
const del = (url) => fetch(url, { method: 'DELETE' }).then(parse);

export const api = {
  // Products
  getProducts:   ()         => get('/api/products'),
  createProduct: (data)     => post('/api/products', data),
  updateProduct: (id, data)  => put(`/api/products/${id}`, data),
  deleteProduct: (id)        => del(`/api/products/${id}`),

  // Imports
  getImports:   ()          => get('/api/imports'),
  createImport: (data)      => post('/api/imports', data),
  updateImport: (id, data)  => put(`/api/imports/${id}`, data),
  deleteImport: (id)        => del(`/api/imports/${id}`),

  // Exports
  getExports:   ()          => get('/api/exports'),
  createExport: (data)      => post('/api/exports', data),
  updateExport: (id, data)  => put(`/api/exports/${id}`, data),
  deleteExport: (id)        => del(`/api/exports/${id}`),

  // Invoices
  getInvoices:   ()         => get('/api/invoices'),
  createInvoice: (data)     => post('/api/invoices', data),
  updateInvoice: (id, data) => put(`/api/invoices/${id}`, data),
  deleteInvoice: (id)       => del(`/api/invoices/${id}`),
};
