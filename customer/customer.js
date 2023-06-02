// Array to store customer data
let customers = [];

// Function to add a new customer
function addCustomer(event) {
  event.preventDefault();

  // Get form input values
  const fullName = document.getElementById('full-name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const genderSelect = document.getElementById('gender');
  const gender = genderSelect.options[genderSelect.selectedIndex].value;
  
  // Create a new customer object
  const customer = {
    fullName,
    email,
    phone,
    address,
    gender,
  };

  // Add the customer to the array
  customers.push(customer);

  // Clear form fields
  document.getElementById('full-name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('address').value = '';
  document.getElementById('gender').selectedIndex = 0;

  // Update the table to display the new customer
  displayCustomers();
}

// Rest of the code remains the same...


  // Update the table to display the new customer
  displayCustomers();

// Function to display all customers in a table
function displayCustomers() {
  const customerTableBody = document.getElementById('customer-table-body');
  customerTableBody.innerHTML = ''; // Clear previous content

  customers.forEach(function (customer, index) {
    const row = document.createElement('tr');

    const sttCell = document.createElement('td');
    sttCell.textContent = index + 1; // Add 1 to index for the serial number
    row.appendChild(sttCell);

    const fullNameCell = document.createElement('td');
    fullNameCell.textContent = customer.fullName;
    row.appendChild(fullNameCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = customer.email;
    row.appendChild(emailCell);

    const phoneCell = document.createElement('td');
    phoneCell.textContent = customer.phone;
    row.appendChild(phoneCell);

    const addressCell = document.createElement('td');
    addressCell.textContent = customer.address;
    row.appendChild(addressCell);

    const genderCell = document.createElement('td');
    // Map the gender value to the desired display text
    let genderText;
    switch (customer.gender) {
      case 'male':
        genderText = 'Nam';
        break;
      case 'female':
        genderText = 'Nữ';
        break;
      case 'other':
        genderText = 'Khác';
        break;
      default:
        genderText = '';
    }
    genderCell.textContent = genderText;
    row.appendChild(genderCell);

    const actionsCell = document.createElement('td');
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

    customerTableBody.appendChild(row);
  });
}

// Function to show the confirmation dialog
function showConfirmationDialog(action, index) {
  const confirmation = confirm(`Are you sure you want to ${action} this customer?`);
  if (confirmation) {
    if (action === 'delete') {
      deleteCustomer(index);
    } else if (action === 'update') {
      updateCustomer(index);
    }
  }
}

// Function to delete a customer
function deleteCustomer(index) {
  // Remove the customer at the given index from the array
  const deletedCustomer = customers.splice(index, 1);
  console.log('Xóa thông tin khách hàng thành công.', deletedCustomer[0]);

  // Update the table to reflect the changes
  displayCustomers();
}

// Function to update a customer
function updateCustomer(index) {
  // Get the customer at the given index
  const customer = customers[index];

  // Update the form fields with the customer's information
  document.getElementById('full-name').value = customer.fullName;
  document.getElementById('email').value = customer.email;
  document.getElementById('phone').value = customer.phone;
  document.getElementById('address').value = customer.address;
  document.getElementById(customer.gender).checked = true;

  // Remove the customer from the array (optional)
  // customers.splice(index, 1);
  // console.log('Customer to update:', customer);
}

// Event listener for form submission to add a customer
document.getElementById('customer-form').addEventListener('submit', addCustomer);

// Display customers on page load (if any)
displayCustomers();
