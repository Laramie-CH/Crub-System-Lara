// Import Firestore functions and db
import { db } from './firebase-config.js';
import { collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Helper to detect which page we're on
const isCreateProduct = document.querySelector('.product-form');
const isProductsPage = document.querySelector('.products-table');

// CREATE PRODUCT PAGE LOGIC
if (isCreateProduct) {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.product-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      // Get form values
      const name = form.name.value.trim();
      const price = parseFloat(form.price.value);
      const description = form.description.value.trim();
      const status = form.status.value;
      // Image is intentionally ignored
      if (!name || isNaN(price) || !description || !status) {
        alert('Please fill in all fields.');
        return;
      }
      try {
        await addDoc(collection(db, 'products'), {
          name,
          price,
          description,
          status,
          createdAt: new Date()
        });
        alert('Product created successfully!');
        form.reset();
      } catch (error) {
        alert('Error adding product: ' + error.message);
      }
    });
  });
}

// PRODUCTS PAGE LOGIC
if (isProductsPage) {
  document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('.products-table tbody');
    // Clear placeholder rows
    tableBody.innerHTML = '';
    // Listen to Firestore in real time
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      tableBody.innerHTML = '';
      if (snapshot.empty) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No products found.</td></tr>';
        return;
      }
      snapshot.forEach(doc => {
        const data = doc.data();
        tableBody.innerHTML += `
          <tr>
            <td><img src="https://via.placeholder.com/60" alt="Product Image"></td>
            <td>${data.name}</td>
            <td>$${Number(data.price).toFixed(2)}</td>
            <td>${data.description}</td>
            <td>${data.status.charAt(0).toUpperCase() + data.status.slice(1)}</td>
          </tr>
        `;
      });
    });
  });
}
