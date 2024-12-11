// Week display
document.addEventListener("DOMContentLoaded", () => {
    const weekDisplay = document.querySelector(".week-display");
    const prevWeekBtn = document.querySelector(".week-nav-btn.prev-week");
    const nextWeekBtn = document.querySelector(".week-nav-btn.next-week");
    // Calculate the start of the current week
    function getStartOfCurrentWeek(date) {
        const currentDay = date.getDay();
        const daysToMonday = (currentDay === 0 ? -6 : 1) - currentDay // Adjust for Monday
        const monday = new Date(date);
        monday.setDate(monday.getDate() + daysToMonday);
        return monday;
    }
    // Initialize to the start of the current week
    let currentWeekStart = getStartOfCurrentWeek(new Date());
    function updateWeekDisplay() {
        const endOfWeek = new Date(currentWeekStart);
        endOfWeek.setDate(currentWeekStart.getDate() + 6);
        weekDisplay.textContent = `${currentWeekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
    }
    prevWeekBtn.addEventListener("click", () => {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7); // Moveback one week
        updateWeekDisplay();
    });
    nextWeekBtn.addEventListener("click", () => {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7); // Move forward one week
        updateWeekDisplay();
    });
    updateWeekDisplay();
});
// Add button
document.addEventListener("DOMContentLoaded", () => {
    // Select all add buttons
    const addButtons = document.querySelectorAll(".add-btn");
    
    addButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent the event from bubbling
            
            // Find this button's dropdown
            const dropdown = button.nextElementSibling;
            
            // Close all other dropdowns first
            document.querySelectorAll(".dropdown").forEach((d) => {
                if (d !== dropdown) {
                    d.classList.add("hidden");
                }
            });
            
            // Toggle this dropdown
            dropdown.classList.toggle("hidden");
        });
    });
    
    // Close all dropdowns when clicking anywhere else on the page
    document.addEventListener("click", () => {
        document.querySelectorAll(".dropdown").forEach((dropdown) => {
            dropdown.classList.add("hidden");
        });
    });
});