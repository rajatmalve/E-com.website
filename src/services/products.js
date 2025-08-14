import { API_BASE_URL } from '../config/api.js';
import { products as localProducts } from '../data/products.js';

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getProducts(params = {}) {
  // Params: { q, category, sizes, colors, materials, priceMin, priceMax, inStock }
  if (API_BASE_URL) {
    const url = new URL(`${API_BASE_URL}/products`);
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '') return;
      if (Array.isArray(v)) v.forEach((item) => url.searchParams.append(k, item));
      else url.searchParams.set(k, v);
    });
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data;
  }

  // Fallback: simulate network and filter locally
  await sleep(400);
  let list = [...localProducts];
  const {
    q = '',
    category,
    sizes = [],
    colors = [],
    materials = [],
    priceMin,
    priceMax,
    inStock,
  } = params;

  const query = String(q).toLowerCase();
  if (query) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }
  if (category) list = list.filter((p) => p.category.toLowerCase() === String(category).toLowerCase());
  if (sizes.length) list = list.filter((p) => (p.sizes || []).some((s) => sizes.includes(s)));
  if (colors.length) list = list.filter((p) => (p.colors || []).some((c) => colors.includes(c)));
  if (materials.length) list = list.filter((p) => (p.materials || []).some((m) => materials.includes(m)));
  if (priceMin !== undefined) list = list.filter((p) => p.price >= Number(priceMin));
  if (priceMax !== undefined) list = list.filter((p) => p.price <= Number(priceMax));
  if (inStock) list = list.filter((p) => (p.stock ?? 0) > 0);

  return list;
}

export async function getProductById(id) {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  }
  await sleep(200);
  const prod = localProducts.find((p) => p.id === Number(id));
  if (!prod) throw new Error('Product not found');
  return prod;
}

export async function getSuggestions(q = '') {
  const query = String(q).trim();
  if (!query) return [];
  if (API_BASE_URL) {
    const url = new URL(`${API_BASE_URL}/products/suggestions`);
    url.searchParams.set('q', query);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Failed to fetch suggestions');
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  }
  await sleep(200);
  const ql = query.toLowerCase();
  const list = localProducts
    .filter(p => p.name.toLowerCase().includes(ql))
    .slice(0, 8)
    .map(p => ({ id: p.id, name: p.name }));
  return list;
}


