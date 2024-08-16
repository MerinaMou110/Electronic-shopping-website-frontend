const getAuthToken = () => localStorage.getItem('accessToken');
const getUserRole = () => localStorage.getItem('role');

const getAuthHeaders = () => {
    const token = getAuthToken();
    console.log('Authorization Token:', token); // Debug log
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const checkUserRole = () => {
    const role = getUserRole();
    const addButton = document.getElementById('add-product-btn');
    if (getAuthToken() && (role === 'admin' || role === 'superadmin')) {
        addButton.classList.remove('hidden');
    } else {
        addButton.classList.add('hidden');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    checkUserRole();
    loadProducts();
    loadCategories();
});

const baseURL = 'http://127.0.0.1:8000/api/';

const loadProducts = (search = '') => {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    document.getElementById('spinner').classList.remove('hidden');

    fetch(`${baseURL}products/?search=${search}`)
        .then((res) => res.json())
        .then((data) => {
            document.getElementById('spinner').classList.add('hidden');
            if (data.length > 0) {
                document.getElementById('nodata').classList.add('hidden');
                displayProducts(data);
            } else {
                document.getElementById('nodata').classList.remove('hidden');
            }
        })
        .catch((err) => console.error('Error:', err));
};

const displayProducts = (products) => {
    const parent = document.getElementById('products');
    parent.innerHTML = '';
    products.forEach((product) => {
        const div = document.createElement('div');
        div.classList.add('card', 'shadow-lg', 'bg-white', 'p-4');
        div.innerHTML = `
            <figure>
                <img class="product-image" src=${product.image} alt="Product Image" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${product.title}</h2>
                <p>${truncateWords(product.details, 20)}</p>
                <div class="action-buttons flex justify-center mt-3 gap-4">
                    <button class="btn btn-primary justify-center">
                        <a class="text-white" href="product_details.html?productId=${product.id}">Details</a>
                    </button>
                </div>
            </div>
        `;

        const role = localStorage.getItem('role');
        if (role === 'admin' || role === 'superadmin') {
            const actionDiv = div.querySelector('.action-buttons');

            const editButton = document.createElement('button');
            editButton.className = 'text-green-500 mr-2';
            editButton.innerHTML = '<i class="fas fa-edit"></i>';
            editButton.onclick = () => loadProductToForm(product);

            const deleteButton = document.createElement('button');
            deleteButton.className = 'text-red-500';
            deleteButton.innerHTML ='<i class="fas fa-trash"></i>';
            deleteButton.onclick = () => deleteProduct(product.id);

            actionDiv.appendChild(editButton);
            actionDiv.appendChild(deleteButton);
        }
        parent.appendChild(div);
    });
};

const truncateWords = (text, numWords) => {
    const words = text.split(' ');
    return words.length > numWords ? words.slice(0, numWords).join(' ') + '...' : text;
};

const handleSearch = () => {
    const value = document.getElementById('search').value;
    loadProducts(value);
};

const loadCategories = () => {
    const parent = document.getElementById('drop-cat');
    parent.innerHTML = '<li class="dropdown-item"><a class="block px-4 py-2 hover:bg-gray-200 cursor-pointer" onclick="loadProducts(\'\')">All</a></li>';

    fetch(`${baseURL}categories/`)
        .then((res) => res.json())
        .then((data) => {
            const categorySelect = document.getElementById('category');
            categorySelect.innerHTML = '';

            data.forEach((item) => {
                const li = document.createElement('li');
                li.classList.add('dropdown-item');
                li.innerHTML = `<a class="block px-4 py-2 hover:bg-gray-200 cursor-pointer" onclick="loadProducts('${item.name}')">${item.name}</a>`;
                parent.appendChild(li);

                const option = document.createElement('option');
                option.value = item.id;
                option.text = item.name;
                categorySelect.appendChild(option);
            });
        })
        .catch((err) => console.error('Error:', err));
};

const toggleProductForm = () => {
    const formModal = document.getElementById('product-form-modal');
    formModal.classList.toggle('hidden');
};

const loadProductToForm = (product) => {
    document.getElementById('product-id').value = product.id;
    document.getElementById('title').value = product.title;
    document.getElementById('price').value = product.price;
    document.getElementById('quantity').value = product.quantity;
    document.getElementById('category').value = product.category.id;
    document.getElementById('details').value = product.details;
    document.getElementById('form-title').innerText = 'Edit Product';
    toggleProductForm();
};

const handleProductFormSubmit = (event) => {
    event.preventDefault();

    const productId = document.getElementById('product-id').value;
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    const category = document.getElementById('category').value;
    const details = document.getElementById('details').value;
    const image = document.getElementById('image').files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('category', category);
    formData.append('details', details);
    if (image) formData.append('image', image);

    const url = productId ? `${baseURL}products/update-delete/${productId}/` : `${baseURL}products/create/`;
    const method = productId ? 'PUT' : 'POST';
    
    const headers = getAuthHeaders();
    console.log('Headers for form submit:', headers); // Debug log

    fetch(url, {
        method: method,
        headers: headers,
        body: formData
    })
    .then((res) => {
        if (res.ok) {
            toggleProductForm();
            loadProducts();
        } else {
            return res.json().then((data) => {
                console.error('Error:', res.statusText, data);
            });
        }
    })
    .catch((err) => console.error('Error:', err));
};

const deleteProduct = (id) => {
    const headers = getAuthHeaders();
    console.log('Headers for DELETE request:', headers); // Debug log

    fetch(`${baseURL}products/update-delete/${id}/`, {
        method: 'DELETE',
        headers: headers
    })
    .then((res) => {
        if (res.ok) {
            loadProducts();
        } else {
            console.error('Error:', res.statusText);
        }
    })
    .catch((err) => console.error('Error:', err));
};






