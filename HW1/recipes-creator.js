document.addEventListener("DOMContentLoaded", function () {
    const ingredientsContainer = document.getElementById("ingredientsContainer");
    const addIngredientButton = document.getElementById("addIngredient");

    const instructionsContainer = document.getElementById("instructionsContainer");
    const addInstructionButton = document.getElementById("addInstruction");

    const recipeForm = document.getElementById("recipeForm");
    const recipeCategory = document.getElementById("recipeCategory");

    // Add Ingredient
    addIngredientButton.addEventListener("click", function () {
        // Create a new ingredient row
        const newRow = document.createElement("div");
        newRow.classList.add("ingredient-row", "flex", "space-x-4", "items-center", "relative");

        // Create input for ingredient name
        const ingredientName = document.createElement("input");
        ingredientName.type = "text";
        ingredientName.className = "ingredient-name bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-2/4 h-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
        ingredientName.placeholder = "Ingredient Name";
        ingredientName.required = true;

        // Create input for ingredient amount
        const ingredientAmount = document.createElement("input");
        ingredientAmount.type = "number";
        ingredientAmount.className = "ingredient-amount bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/4 h-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
        ingredientAmount.placeholder = "Amount";
        ingredientAmount.required = true;
        ingredientAmount.min = 0;
        ingredientAmount.value = 0;

        // Create select for unit
        const ingredientUnit = document.createElement("select");
        ingredientUnit.className = "ingredient-unit bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/4 h-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
        const unitOptions = ["Unit", "grams", "cups", "tablespoon", "piece"];
        unitOptions.forEach((unit) => {
            const option = document.createElement("option");
            option.value = unit;
            option.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
            ingredientUnit.appendChild(option);
        });

        // Create remove button
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "remove-instruction absolute -right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 text-3xl";
        removeButton.innerHTML = "&times;";
        removeButton.addEventListener("click", function () {
            if (ingredientsContainer.children.length > 1) {
                newRow.remove();
            }
        });

        // Append elements to the new row
        newRow.appendChild(ingredientName);
        newRow.appendChild(ingredientAmount);
        newRow.appendChild(ingredientUnit);
        newRow.appendChild(removeButton);

        // Append new row to the container
        ingredientsContainer.appendChild(newRow);
    });
    
    // Remove Ingredient
    ingredientsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-ingredient")) {
            const row = event.target.closest(".ingredient-row");
            if (ingredientsContainer.children.length > 1) {
                row.remove();
            }
        }
    });

    // Add Instruction
    addInstructionButton.addEventListener("click", function () {
        const lastRow = instructionsContainer.lastElementChild;
        const textarea = lastRow.querySelector("textarea");
        if (textarea.value.trim() !== "") {
            const newRow = lastRow.cloneNode(true);
            const newTextarea = newRow.querySelector("textarea");

            // Reset textarea
            newTextarea.value = "";

            // Add event listener for remove button
            const removeButton = newRow.querySelector(".remove-instruction");
            removeButton.addEventListener("click", function () {
                if (instructionsContainer.children.length > 1) {
                    newRow.remove();
                }
            });

            instructionsContainer.appendChild(newRow);
        } else {
            alert("Please fill in the step description before adding a new step.");
        }
    });

    // Remove Instruction
    instructionsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-instruction")) {
            const row = event.target.closest(".instruction-row");
            if (instructionsContainer.children.length > 1) {
                row.remove();
            }
        }
    });

    // Validate category on form submission
    recipeForm.addEventListener("submit", function (event) {
        if (recipeCategory.value === "") {
            event.preventDefault();
            alert("Please select a valid category before submitting the recipe.");
        }
    });
});

document.getElementById("recipeForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const recipeName = document.getElementById("recipeName").value.trim();
    const recipeCategory = document.getElementById("recipeCategory").value.trim();
    const recipeImageInput = document.getElementById("recipeImage");

    // Validate the image file
    if (!recipeImageInput.files || recipeImageInput.files.length === 0) {
        alert("Please upload a recipe image.");
        return;
    }

    const recipeImageFile = recipeImageInput.files[0];
    const supportedFormats = ["image/jpeg", "image/png"];
    if (!supportedFormats.includes(recipeImageFile.type)) {
        alert("Unsupported image format. Please upload a JPG or PNG image.");
        return;
    }

  
    const imageReader = new FileReader();
    imageReader.onload = function (e) {
        console.log("Image data URL:", e.target.result);
    };
    imageReader.readAsDataURL(recipeImageFile);

    // Continue with other form data processing...
    console.log("Recipe Name:", recipeName);
    console.log("Recipe Category:", recipeCategory);

    // Show a success message
    alert("Recipe created successfully!");
});