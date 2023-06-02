// Array to store product data
let products = [];

// Function to add a new product
function addProduct(event) {
  event.preventDefault();

  // Get form input values
  const productName = document.getElementById('product-name').value;
  const productQuantity = document.getElementById('product-quantity').value;
  const productImportDate = document.getElementById('product-import-date').value;
  const productPrice = document.getElementById('product-price').value;
  const productManufacturer = document.getElementById('product-manufacturer').value;
  const productCategory = document.getElementById('product-category').value;
  const productReleaseDate = document.getElementById('product-release-date').value;
  const productLanguage = document.getElementById('product-language').value;
  const productPlatform = document.getElementById('product-platform').value;
  const productDescription = document.getElementById('product-description').value;

  // Create a new product object
  const product = {
    productName,
    productQuantity,
    productImportDate,
    productPrice,
    productManufacturer,
    productCategory,
    productReleaseDate,
    productLanguage,
    productPlatform,
    productDescription,
  };

  // Add the product to the array
  products.push(product);

  // Clear form fields
  document.getElementById('product-name').value = '';
  document.getElementById('product-quantity').value = '';
  document.getElementById('product-import-date').value = '';
  document.getElementById('product-price').value = '';
  document.getElementById('product-manufacturer').value = '';
  document.getElementById('product-category').value = '';
  document.getElementById('product-release-date').value = '';
  document.getElementById('product-language').value = '';
  document.getElementById('product-platform').value = '';
  document.getElementById('product-description').value = '';

  // Update the table to display the new product
  displayProducts();
}

// Function to display all products in a table
function displayProducts() {
  const productTableBody = document.getElementById('product-table-body');
  productTableBody.innerHTML = ''; // Clear previous content

  products.forEach(function (product, index) {
    const row = document.createElement('tr');

    const sttCell = document.createElement('td');
    sttCell.textContent = index + 1; // Add 1 to index for the serial number
    row.appendChild(sttCell);

    const productNameCell = document.createElement('td');
    productNameCell.textContent = product.productName;
    row.appendChild(productNameCell);

    const productQuantityCell = document.createElement('td');
    productQuantityCell.textContent = product.productQuantity;
    row.appendChild(productQuantityCell);

    const productImportDateCell = document.createElement('td');
    productImportDateCell.textContent = product.productImportDate;
    row.appendChild(productImportDateCell);

    const productPriceCell = document.createElement('td');
    productPriceCell.textContent = product.productPrice;
    row.appendChild(productPriceCell);

    const productManufacturerCell = document.createElement('td');
    productManufacturerCell.textContent = product.productManufacturer;
    row.appendChild(productManufacturerCell);

    const productCategoryCell = document.createElement('td');
    productCategoryCell.textContent = product.productCategory;
    row.appendChild(productCategoryCell);

    const productReleaseDateCell = document.createElement('td');
    productReleaseDateCell.textContent = product.productReleaseDate;
    row.appendChild(productReleaseDateCell);

    const productLanguageCell = document.createElement('td');
    productLanguageCell.textContent = product.productLanguage;
    row.appendChild(productLanguageCell);

    const productPlatformCell = document.createElement('td');
    productPlatformCell.textContent = product.productPlatform;
    row.appendChild(productPlatformCell);

    const productDescriptionCell = document.createElement('td');
    productDescriptionCell.textContent = product.productDescription;
    row.appendChild(productDescriptionCell);

    const actionsCell = document.createElement('td');
    const detailButton = document.createElement('button');
    detailButton.textContent = 'Chi tiết';
    detailButton.addEventListener('click', function () {
      showProductDetails(index);
    });
    actionsCell.appendChild(detailButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Xóa';
    deleteButton.addEventListener('click', function () {
      showConfirmationDialog('delete', index);
    });
    actionsCell.appendChild(deleteButton);

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Cập nhật';
    updateButton.addEventListener('click', function () {
      showConfirmationDialog('update', index);
    });
    actionsCell.appendChild(updateButton);

    row.appendChild(actionsCell);

    productTableBody.appendChild(row);
  });
}

// Function to show the detailed information of a product
function showProductDetails(index) {
  const product = products[index];

  // Create a new element to display the additional information
  const detailDiv = document.createElement('div');

  // Add the necessary HTML content for the additional information
  detailDiv.innerHTML = `
    <p>Manufacturer: ${product.productManufacturer}</p>
    <p>Category: ${product.productCategory}</p>
    <p>Language: ${product.productLanguage}</p>
    <p>Platform: ${product.productPlatform}</p>
    <p>Description: ${product.productDescription}</p>
  `;

  // Append the detailDiv to the row in the table
  const productTableBody = document.getElementById('product-table-body');
  const row = productTableBody.children[index];
  const actionsCell = row.lastElementChild;
  row.insertBefore(detailDiv, actionsCell);
}

// Function to show the confirmation dialog
function showConfirmationDialog(action, index) {
  const confirmation = confirm(`Are you sure you want to ${action} this product?`);
  if (confirmation) {
    if (action === 'delete') {
      deleteProduct(index);
    } else if (action === 'update') {
      updateProduct(index);
    }
  }
}

// Function to delete a product
function deleteProduct(index) {
  // Remove the product at the given index from the array
  const deletedProduct = products.splice(index, 1);
  console.log('Xóa thông tin sản phẩm thành công.', deletedProduct[0]);

  // Update the table to reflect the changes
  displayProducts();
}

// Function to update a product
function updateProduct(index) {
  // Get the product at the given index
  const product = products[index];

  // Update the form fields with the product's information
  document.getElementById('product-name').value = product.productName;
  document.getElementById('product-quantity').value = product.productQuantity;
  document.getElementById('product-import-date').value = product.productImportDate;
  document.getElementById('product-price').value = product.productPrice;
  document.getElementById('product-manufacturer').value = product.productManufacturer;
  document.getElementById('product-category').value = product.productCategory;
  document.getElementById('product-release-date').value = product.productReleaseDate;
  document.getElementById('product-language').value = product.productLanguage;
  document.getElementById('product-platform').value = product.productPlatform;
  document.getElementById('product-description').value = product.productDescription;

  // Remove the product from the array (optional)
  // products.splice(index, 1);
  // console.log('Product to update:', product);
}

// Event listener for form submission to add a product
document.getElementById('product-form').addEventListener('submit', addProduct);

// Display products on page load (if any)
displayProducts();
