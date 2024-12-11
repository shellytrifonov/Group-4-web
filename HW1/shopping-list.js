document.addEventListener('DOMContentLoaded', () => {
    // Select all necessary DOM elements for interaction
    const createListButton = document.getElementById('createListButton');
    const modal = document.getElementById('modal');
    const deleteModal = document.getElementById('deleteModal');
    const createButton = document.getElementById('createButton');
    const cancelButton = document.getElementById('cancelButton');
    const deleteConfirmButton = document.getElementById('deleteConfirmButton');
    const deleteCancelButton = document.getElementById('deleteCancelButton');
    const deleteConfirmText = document.getElementById('deleteConfirmText');
    const listNameInput = document.getElementById('listNameInput');
    const listsContainer = document.getElementById('listsContainer');
    const itemValueInput = document.getElementById('itemValue');
    const form = document.getElementById('form');
    const shoppingListTitle = document.getElementById('shoppingListTitle');
    const addItemButton = document.getElementById('addItemButton');
    const deleteItemsButton = document.getElementById('deleteItemsButton');

    // Initialize lists from local storage or create a default list
    let lists = JSON.parse(localStorage.getItem('shoppingLists')) || [{
        id: 'default',
        name: 'Shopping List',
        items: []
    }];
    
    // Track the currently selected list
    let currentList = lists[0];
    let selectedListElement = null;

    // Function to save lists to local storage
    function saveLists() {
        localStorage.setItem('shoppingLists', JSON.stringify(lists));
    }

    // Create a list element in the DOM that can be clicked and selected
    function createListElement(list) {
        const listElement = document.createElement('div');
        listElement.classList.add(
            'list', 
            'cursor-pointer', 
            'hover:bg-orange-100', 
            'p-2', 
            'rounded', 
            'flex', 
            'justify-between', 
            'items-center',
            'transition-colors',
            'duration-200',
            'mb-2' // Added margin bottom for spacing between lists
        );
        listElement.setAttribute('data-id', list.id);

        // Create a container for the title
        const titleContainer = document.createElement('div');
        titleContainer.classList.add('flex-grow');

        const listTitle = document.createElement('h3');
        listTitle.textContent = list.name;
        listTitle.classList.add('list-title', 'text-lg', 'font-medium');

        // New click handler
        listElement.addEventListener('click', () => {
            // Remove highlight from previously selected list
            const allLists = document.querySelectorAll('.list');
            allLists.forEach(l => {
                l.classList.remove('bg-orange-200', 'border-l-4', 'border-orange-400');
            });
            
            // Add highlight to newly selected list
            listElement.classList.add('bg-orange-200', 'border-l-4', 'border-orange-400');
            selectedListElement = listElement;
            
            selectList(list);
        });

        titleContainer.appendChild(listTitle);

        // Create delete button if not default list
        if (list.id !== 'default') {
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>`;
            deleteButton.classList.add('p-1', 'text-gray-500', 'hover:text-red-500', 'transition-colors');
            
            // Add delete functionality
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent list selection when clicking delete
                deleteConfirmText.textContent = `Are you sure you want to delete "${list.name}"?`;
                deleteModal.classList.remove('hidden');
                
                // Set up one-time click handler for confirm button
                const confirmHandler = () => {
                    lists = lists.filter(l => l.id !== list.id);
                    saveLists();
                    
                    // If the deleted list was selected, switch to default list
                    if (currentList.id === list.id) {
                        const defaultList = lists.find(l => l.id === 'default');
                        selectList(defaultList);
                    }
                    
                    initializeLists();
                    deleteModal.classList.add('hidden');
                    deleteConfirmButton.removeEventListener('click', confirmHandler);
                };
                
                // Set up one-time click handler for cancel button
                const cancelHandler = () => {
                    deleteModal.classList.add('hidden');
                    deleteConfirmButton.removeEventListener('click', confirmHandler);
                    deleteCancelButton.removeEventListener('click', cancelHandler);
                };
                
                deleteConfirmButton.addEventListener('click', confirmHandler);
                deleteCancelButton.addEventListener('click', cancelHandler);
            });
            
            listElement.appendChild(titleContainer);
            listElement.appendChild(deleteButton);
        } else {
            listElement.appendChild(titleContainer);
        }

        // If this is the current list, highlight it
        if (currentList && list.id === currentList.id) {
            listElement.classList.add('bg-orange-200', 'border-l-4', 'border-orange-400');
            selectedListElement = listElement;
        }

        listsContainer.appendChild(listElement);
    }

    function toggleEmptyState() {
        const emptyStateImage = document.getElementById('emptyStateImage');
        const currentListIndex = lists.findIndex(list => list.id === currentList.id);
        if(lists[currentListIndex].items.length === 0){
            emptyStateImage.classList.remove('hidden');
        }
        else{
            emptyStateImage.classList.add('hidden');
        }
    }

    // Render all lists
    function initializeLists() {
        listsContainer.innerHTML = '';
        lists.forEach(list => {
            createListElement(list);
        });
    }

    // Select a specific list and prepare it for item management
    function selectList(list) {
        currentList = list;
        shoppingListTitle.textContent = ` ${list.name}`;
        form.classList.remove('hidden');
        renderListItems(list);
        itemValueInput.value = '';
    }

    // Render items for the currently selected list with checkboxes
    function renderListItems(list) {
        let itemsContainer = document.getElementById('itemsContainer');
        if (!itemsContainer) {
            itemsContainer = document.createElement('div');
            itemsContainer.id = 'itemsContainer';
            form.appendChild(itemsContainer);
        }
    
        itemsContainer.innerHTML = '';
    
        list.items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item', 'flex', 'space-x-4', 'items-center', 'mb-2');
    
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('item-checkbox');
            checkbox.dataset.index = index;
            checkbox.checked = item.checked;
    
            // Add transition effect when checking/unchecking
            checkbox.addEventListener('change', (e) => {
                const currentListIndex = lists.findIndex(l => l.id === currentList.id);
                lists[currentListIndex].items[index].checked = e.target.checked;
                
                // Add visual feedback
                if (e.target.checked) {
                    itemText.style.textDecoration = 'line-through';
                    itemText.style.color = '#666';
                } else {
                    itemText.style.textDecoration = 'none';
                    itemText.style.color = '#000';
                }
                
                toggleClearButtonVisibility();
                saveLists();
            });
    
            const itemText = document.createElement('span');
            itemText.textContent = item.text;
            itemText.classList.add('item-text');
            
            // Set initial text style based on checked state
            if (item.checked) {
                itemText.style.textDecoration = 'line-through';
                itemText.style.color = '#666';
            }
    
            itemElement.appendChild(checkbox);
            itemElement.appendChild(itemText);
    
            itemsContainer.appendChild(itemElement);
        });
        toggleEmptyState();
    }

    // Add new item to the current list
    addItemButton.addEventListener('click', (e) => {
        e.preventDefault();
        const itemName = itemValueInput.value.trim();
        if (itemName) {
            const currentListIndex = lists.findIndex(list => list.id === currentList.id);
            lists[currentListIndex].items.push({ 
                text: itemName, 
                checked: false 
            });
            
            itemValueInput.value = '';
            renderListItems(currentList);
            saveLists();
        }
    });

    // Delete selected items from the current list
    deleteItemsButton.addEventListener('click', (e) => {
        e.preventDefault();
        const currentListIndex = lists.findIndex(list => list.id === currentList.id);
        lists[currentListIndex].items = lists[currentListIndex].items.filter(item => !item.checked);
        saveLists();
        renderListItems(lists[currentListIndex]);
        deleteItemsButton.classList.add('hidden');
    });

    // Show/hide the "Clear Selected Items" button based on checkbox selection
    function toggleClearButtonVisibility() {
        const checkboxes = document.querySelectorAll('.item-checkbox');
        const isAnyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
        deleteItemsButton.classList.toggle('hidden', !isAnyChecked);
    }

    // Create new list via modal
    createListButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    // Confirm list creation
    createButton.addEventListener('click', () => {
        const listName = listNameInput.value.trim();
        if (listName) {
            const newList = {
                id: Date.now().toString(),
                name: listName,
                items: []
            };
            lists.push(newList);
            createListElement(newList);
            modal.classList.add('hidden');
            listNameInput.value = '';
            saveLists();
        } else {
            alert('Please enter a valid list name.');
        }
    });

    // Cancel list creation
    cancelButton.addEventListener('click', () => {
        modal.classList.add('hidden');
        listNameInput.value = '';
    });

    // Delete modal cancel button
    deleteCancelButton.addEventListener('click', () => {
        deleteModal.classList.add('hidden');
    });

    // Close modals if clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            listNameInput.value = '';
        }
    });
    
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
            deleteModal.classList.add('hidden');
        }
    });

    // Initial setup
    initializeLists();
    selectList(lists[0]);
    deleteItemsButton.classList.add('hidden');
});