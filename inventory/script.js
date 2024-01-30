// Develop a user-friendly inventory management system where users can add items with a name, quantity, and date.
//  They should also be able to edit or remove items as needed. Additionally, the system should maintain a history 
//  of user actions such as adding, editing, or removing items. Utilize local storage to store the data for persistence.
//   Implement validation to ensure data integrity and a user-friendly UI for a seamless experience.

document.addEventListener('DOMContentLoaded', function() {
    // Load existing inventory from local storage
    loadInventory();

   
});

function addItem() {
    // Get form values
    var itemName = document.getElementById('itemName').value;
    var quantity = document.getElementById('quantity').value;
    var date = document.getElementById('date').value;

    // Validate form values
    if (!itemName || !quantity || !date || quantity <= 0) {
        alert('Please fill in all fields, and ensure quantity is greater than zero.');
        return;
    }
    // Create new inventory item
    var item = { name: itemName, quantity: quantity, date: date };

    // Get existing inventory from local storage
    var inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    // Add the new item to the inventory
    inventory.push(item);

    // Save the updated inventory to local storage
    localStorage.setItem('inventory', JSON.stringify(inventory));

    // Clear the form
    document.getElementById('inventoryForm').reset();

    // Reload the inventory table
    loadInventory();
    addToHistory('Added item: ' + itemName);
}

function loadInventory() {
    // Get existing inventory from local storage
    var inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    // Get the table body
    var tableBody = document.querySelector('#inventoryTable tbody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Populate the table with inventory items
    inventory.forEach(function(item, index) {
        var row = tableBody.insertRow();

        var nameCell = row.insertCell(0);
        var quantityCell = row.insertCell(1);
        var dateCell = row.insertCell(2);
        var actionCell = row.insertCell(3);

        nameCell.textContent = item.name;
        quantityCell.textContent = item.quantity;
        dateCell.textContent = item.date;
        actionCell.innerHTML = `<button onclick="editItem(${index})">Edit</button> | <button onclick="removeItem(${index})">Remove</button>`;
    });
}

function editItem(index) {
    // Get existing inventory from local storage
    var inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    var itemToEdit = inventory[index];
    // Populate form with selected item details
    document.getElementById('itemName').value =itemToEdit.name;
    document.getElementById('quantity').value = itemToEdit.quantity;
    document.getElementById('date').value = itemToEdit.date;

  // Remove the selected item from inventory
  inventory.splice(index, 1);

    // Save the updated inventory to local storage
    localStorage.setItem('inventory', JSON.stringify(inventory));
      
    
    // Reload the inventory table
    loadInventory();
    addToHistory('Edited item: ' + itemToEdit.name);
}

function removeItem(index) {
    // Get existing inventory from local storage
    var inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    // Remove the selected item from inventory
    var removedItem = inventory.splice(index, 1)[0];

    // Save the updated inventory to local storage
    localStorage.setItem('inventory', JSON.stringify(inventory));

    // Reload the inventory table
    loadInventory();
    addToHistory('Removed item: ' + removedItem.name);
}
function addToHistory(action) {
    var historyList = document.getElementById('historyList');
    var listItem = document.createElement('li');
    listItem.textContent = action;
    historyList.appendChild(listItem);
}