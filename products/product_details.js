const baseURL = 'https://electronic-shopping-website-as07.onrender.com/api/';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    if (productId) {
        loadProductDetails(productId);
    } else {
        console.error('Product ID not found in URL');
    }
});

const loadProductDetails = (productId) => {
    fetch(`${baseURL}products/${productId}/`)
        .then(response => response.json())
        .then(product => displayProductDetails(product))
        .catch(err => console.error('Error fetching product details:', err));
};

const displayProductDetails = (product) => {
    if (!product) {
        console.error('Product data is null or undefined');
        return;
    }

    document.getElementById('productImage').src = product.image || 'placeholder-image-url.jpg';
    document.getElementById('productTitle').innerText = product.title || 'No Title';
    document.getElementById('productCategory').innerText = `Category: ${product.category.name || 'N/A'}`;
    document.getElementById('productPrice').innerText = `Price: $${product.price || 'N/A'}`;
    document.getElementById('productQuantity').innerText = `Quantity: ${product.quantity || 'N/A'}`;
    document.getElementById('productDetails').innerText = product.details || 'No Details';
};
