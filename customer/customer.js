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
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const ageGroup = document.querySelector('input[name="age-group"]:checked').value;

  // Create a new customer object
  const customer = {
    fullName,
    email,
    phone,
    address,
    gender,
    ageGroup
  };

  // Add the customer to the array
  customers.push(customer);

  // Clear form fields
  document.getElementById('full-name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('address').value = '';
  document.getElementById('male').checked = false;
  document.getElementById('female').checked = false;
  document.getElementById('other').checked = false;
  document.getElementById('age-group-1').checked = false;
  document.getElementById('age-group-2').checked = false;
  document.getElementById('age-group-3').checked = false;
  document.getElementById('age-group-4').checked = false;

  console.log('Customer added successfully:', customer);

  // Update the table to display the new customer
  displayCustomers();
}

// Function to display all customers in a table
function displayCustomers() {
  const customerTableBody = document.getElementById('customer-table-body');
  customerTableBody.innerHTML = ''; // Clear previous content

  customers.forEach(function (customer, index) {
    const row = document.createElement('tr');

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
    genderCell.textContent = customer.gender;
    row.appendChild(genderCell);

    const ageGroupCell = document.createElement('td');
    ageGroupCell.textContent = customer.ageGroup;
    row.appendChild(ageGroupCell);

    const actionsCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
      showConfirmationDialog('delete', index);
    });
    actionsCell.appendChild(deleteButton);

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
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
  console.log('Customer deleted successfully:', deletedCustomer[0]);

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
  document.getElementById('age-group-' + customer.ageGroup).checked = true;

  // Remove the customer from the array (optional)
  // customers.splice(index, 1);
  // console.log('Customer to update:', customer);
}

// Event listener for form submission to add a customer
document.getElementById('customer-form').addEventListener('submit', addCustomer);

// Display customers on page load (if any)
displayCustomers();
