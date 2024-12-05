// Initialize items when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("Page loaded, loading items...");
    loadItems();  // Load items when page loads
});

// Open modal for adding a new item
function openModal() {
    console.log("Opening modal...");
    document.getElementById("modal").classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Disable scroll when modal is open
}

// Close modal
function closeModal() {
    console.log("Closing modal...");
    document.getElementById("modal").classList.add("hidden");
    document.body.style.overflow = "auto"; // Enable scroll after modal is closed
    document.getElementById("itemForm").reset(); // Reset the form fields
}

// Save new item to localStorage
function saveItem(event) {
    event.preventDefault(); // Prevent form default behavior

    const itemName = document.getElementById("name").value;
    const itemDescription = document.getElementById("description").value;

    // Validate form data
    if (!itemName || !itemDescription) {
        alert("Please fill in both fields.");
        return;
    }

    const newItem = {
        name: itemName,
        description: itemDescription,
        id: new Date().getTime() // Unique ID using timestamp
    };

    // Get the current items from localStorage and add the new item
    let items = JSON.parse(localStorage.getItem("items")) || [];
    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));

    console.log("New item saved:", newItem);

    // Close modal and reset form
    closeModal();
    
    // Reload item list
    loadItems();
}

// Load items from localStorage and display them
function loadItems() {
    console.log("Loading items from localStorage...");
    const itemsList = document.getElementById("itemsList");
    itemsList.innerHTML = '';  // Clear existing items

    // Retrieve items from localStorage
    const items = JSON.parse(localStorage.getItem("items")) || [];
    console.log("Items found in localStorage:", items);

    if (items.length === 0) {
        console.log("No items found.");
    }

    // Loop through items and create item cards
    items.forEach(item => {
        const itemCard = document.createElement("div");
        itemCard.classList.add("item-card", "p-6", "border", "border-gray-300", "rounded-xl", "cursor-pointer", "hover:shadow-xl", "transition-shadow", "transform", "hover:scale-105");
        itemCard.onclick = () => viewItem(item.id);

        itemCard.innerHTML = `
            <h2 class="text-lg font-semibold text-gray-800 mb-3">${item.name}</h2>
            <p class="text-gray-600 text-sm">${item.description}</p>
        `;
        
        itemsList.appendChild(itemCard);
    });
}

// Display details of a clicked item
function viewItem(itemId) {
    console.log("Viewing item with ID:", itemId);
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const item = items.find(i => i.id === itemId);

    if (item) {
        alert(`Viewing item: ${item.name}\n\nDescription: ${item.description}`);
    } else {
        console.log("Item not found");
    }
}

// Handle search functionality
function searchItems() {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    console.log("Searching for:", searchQuery);
    
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchQuery) || item.description.toLowerCase().includes(searchQuery));

    console.log("Filtered items:", filteredItems);

    // Reload item list with filtered items
    const itemsList = document.getElementById("itemsList");
    itemsList.innerHTML = '';

    filteredItems.forEach(item => {
        const itemCard = document.createElement("div");
        itemCard.classList.add("item-card", "p-6", "border", "border-gray-300", "rounded-xl", "cursor-pointer", "hover:shadow-xl", "transition-shadow", "transform", "hover:scale-105");
        itemCard.onclick = () => viewItem(item.id);

        itemCard.innerHTML = `
            <h2 class="text-lg font-semibold text-gray-800 mb-3">${item.name}</h2>
            <p class="text-gray-600 text-sm">${item.description}</p>
        `;
        
        itemsList.appendChild(itemCard);
    });
}

// Pagination Functions (Optional)
let currentPage = 1;
const itemsPerPage = 6;

function loadPaginatedItems() {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Determine which items to display on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = items.slice(startIndex, endIndex);

    // Update item cards on the page
    const itemsList = document.getElementById("itemsList");
    itemsList.innerHTML = '';
    itemsToDisplay.forEach(item => {
        const itemCard = document.createElement("div");
        itemCard.classList.add("item-card", "p-6", "border", "border-gray-300", "rounded-xl", "cursor-pointer", "hover:shadow-xl", "transition-shadow", "transform", "hover:scale-105");
        itemCard.onclick = () => viewItem(item.id);

        itemCard.innerHTML = `
            <h2 class="text-lg font-semibold text-gray-800 mb-3">${item.name}</h2>
            <p class="text-gray-600 text-sm">${item.description}</p>
        `;
        
        itemsList.appendChild(itemCard);
    });

    // Update pagination buttons
    document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;
}

// Pagination button functions
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        loadPaginatedItems();
    }
}

function nextPage() {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        loadPaginatedItems();
    }
}




function loadItems() {
    console.log("Loading items from localStorage...");
    const itemsList = document.getElementById("itemsList");
    itemsList.innerHTML = '';

    
    const items = JSON.parse(localStorage.getItem("items")) || [];
    console.log("Items found in localStorage:", items);

    if (items.length === 0) {
        console.log("No items found.");
    }

    
    items.forEach(item => {
        const itemCard = document.createElement("div");
        itemCard.classList.add("item-card", "p-4", "border", "border-gray-300", "rounded-md", "cursor-pointer", "hover:shadow-lg");
        itemCard.onclick = () => viewItem(item.id);

        
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteItem(item.id);

        
        itemCard.innerHTML = `
            <div>
                <h2 class="text-lg font-medium text-gray-800 mb-2">${item.name}</h2>
                <p class="text-gray-600">${item.description}</p>
            </div>
        `;
        itemCard.appendChild(deleteButton);

        itemsList.appendChild(itemCard);
    });
}


function deleteItem(itemId) {
    console.log("Deleting item with ID:", itemId);

   
    let items = JSON.parse(localStorage.getItem("items")) || [];

    
    const itemIndex = items.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        items.splice(itemIndex, 1);

        
        localStorage.setItem("items", JSON.stringify(items));

        
        loadItems();
    } else {
        console.log("Item not found.");
    }
}

