// Tuxedo Cat Coffee - menu interactions with quantity controls
const menuItems = [
  { id: 'latte', name: 'Latte', price: 4.5, desc: 'Smooth espresso with steamed milk' },
  { id: 'cappuccino', name: 'Cappuccino', price: 4.75, desc: 'Espresso, steamed milk, and foam' },
  { id: 'mocha', name: 'Mocha', price: 5.0, desc: 'Chocolate, espresso and steamed milk' },
  { id: 'americano', name: 'Americano', price: 3.25, desc: 'Espresso diluted with hot water' },
  { id: 'croissant', name: 'Croissant', price: 2.95, desc: 'Buttery flaky pastry' },
  { id: 'muffin', name: 'Muffin', price: 3.1, desc: 'Fresh baked muffin' }
];

// order: array of { id, name, price, qty }
const order = [];

function createInfoSVG(item) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' width='320' height='140' viewBox='0 0 320 140'>
    <rect width='100%' height='100%' rx='12' fill='#fff' stroke='#e6eefc' />
    <text x='50%' y='38%' font-size='20' text-anchor='middle' font-family='Segoe UI, Arial, sans-serif' fill='#0f172a' dominant-baseline='middle'>${item.name}</text>
    <text x='50%' y='72%' font-size='16' text-anchor='middle' font-family='Segoe UI, Arial, sans-serif' fill='#064e3b' dominant-baseline='middle'>Price: $${item.price.toFixed(2)}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function initMenu() {
  const thumbs = document.getElementById('thumbs');
  const preview = document.getElementById('preview');

  menuItems.forEach(item => {
    const img = document.createElement('img');
    img.id = item.id;
    img.src = createInfoSVG(item);
    img.alt = item.name;
    img.title = `${item.name} — $${item.price.toFixed(2)}`;

    img.addEventListener('mouseenter', () => {
      setPreviewToItem(item);
    });

    img.addEventListener('mouseleave', () => {
      // restore default preview (cat) or last added item
      resetPreview();
    });

    img.addEventListener('click', () => addToOrder(item));
    thumbs.appendChild(img);
  });
}

function addToOrder(item) {
  const found = order.find(o => o.id === item.id);
  if (found) {
    found.qty += 1;
  } else {
    order.push({ id: item.id, name: item.name, price: item.price, qty: 1, desc: item.desc });
  }
  renderOrder();
  // after adding an item, show its preview
  setPreviewToItem(item);
}

function renderOrder() {
  const list = document.getElementById('orderList');
  const totalEl = document.getElementById('orderTotal');
  list.innerHTML = '';
  let total = 0;

  order.forEach(it => {
    const li = document.createElement('li');
    li.innerHTML = `
      <button class="qty-btn minus" data-id="${it.id}">-</button>
      <span class="qty">${it.qty}</span>
      <span class="name">${it.name}</span>
      <span class="price">$${(it.price * it.qty).toFixed(2)}</span>
      <button class="qty-btn plus" data-id="${it.id}">+</button>
      <button class="remove" data-id="${it.id}">Remove</button>
    `;
    list.appendChild(li);
    total += it.price * it.qty;
  });

  totalEl.textContent = total.toFixed(2);
  // update preview to reflect current order state
  resetPreview();
}

function updateQty(id, delta) {
  const idx = order.findIndex(o => o.id === id);
  if (idx === -1) return;
  order[idx].qty += delta;
  if (order[idx].qty <= 0) {
    order.splice(idx, 1);
  }
  renderOrder();
}

function removeItem(id) {
  const idx = order.findIndex(o => o.id === id);
  if (idx === -1) return;
  order.splice(idx, 1);
  renderOrder();
}

function clearOrder() {
  order.length = 0;
  renderOrder();
}

function placeOrder() {
  if (order.length === 0) {
    alert('Your order is empty.');
    return;
  }
  sessionStorage.setItem('tuxedoOrder', JSON.stringify(order));
  window.location.href = 'checkout.html';
}

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  document.getElementById('clearOrder').addEventListener('click', clearOrder);
  document.getElementById('placeOrder').addEventListener('click', placeOrder);

  // Event delegation for order list controls
  const list = document.getElementById('orderList');
  list.addEventListener('click', (e) => {
    const id = e.target.dataset && e.target.dataset.id;
    if (!id) return;
    if (e.target.classList.contains('plus')) updateQty(id, 1);
    else if (e.target.classList.contains('minus')) updateQty(id, -1);
    else if (e.target.classList.contains('remove')) removeItem(id);
  });
  // initialize preview: show cat until an item is added
  resetPreview();
});

function setPreviewToCat() {
  const preview = document.getElementById('preview');
  preview.innerHTML = '';
  const photoPath = 'assets/tuxedo_cat.png';
  const img = document.createElement('img');
  img.src = photoPath;
  img.className = 'header-photo';
  img.alt = 'Tuxedo Cat';
  img.onerror = () => {
    // fallback to existing SVG if photo not found
    const catSvg = document.querySelector('.cat-illustration svg');
    preview.innerHTML = '';
    if (catSvg) preview.appendChild(catSvg.cloneNode(true));
    else preview.textContent = 'Tuxedo Cat';
  };
  preview.appendChild(img);
}

function setPreviewToItem(item) {
  const preview = document.getElementById('preview');
  preview.innerHTML = '';
  const pimg = document.createElement('img');
  pimg.src = createInfoSVG(item);
  pimg.style.maxWidth = '100%';
  pimg.style.maxHeight = '100%';
  pimg.style.display = 'block';
  pimg.style.margin = '0 auto';
  pimg.style.borderRadius = '10px';
  preview.appendChild(pimg);
  const desc = document.createElement('p');
  desc.className = 'desc';
  desc.textContent = item.desc || '';
  preview.appendChild(desc);
}

function resetPreview() {
  if (order.length === 0) setPreviewToCat();
  else {
    // show last added item
    const last = order[order.length - 1];
    setPreviewToItem(last);
  }
}
