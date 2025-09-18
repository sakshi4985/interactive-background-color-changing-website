// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the buttons and color display element
    const colorChangeBtn = document.getElementById('colorChangeBtn');
    const resetBtn = document.getElementById('resetBtn');
    const currentColorElement = document.getElementById('currentColor');
    
    // Store the default background color
    const defaultBgColor = '#f9f9f9';
    
    // Function to generate a random hex color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        
        // Generate a random 6-digit hex color
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        
        return color;
    }
    
    // Function to calculate appropriate text color based on background
    function getTextColor(bgColor) {
        // Convert hex color to RGB
        const r = parseInt(bgColor.substr(1, 2), 16);
        const g = parseInt(bgColor.substr(3, 2), 16);
        const b = parseInt(bgColor.substr(5, 2), 16);
        
        // Calculate luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Return black for light colors, white for dark colors
        return luminance > 0.5 ? '#000000' : '#FFFFFF';
    }
    
    // Function to change the background color
    function changeBackgroundColor() {
        // Generate a random color
        const randomColor = getRandomColor();
        
        // Apply the color to the body background
        document.body.style.backgroundColor = randomColor;
        
        // Update the color display
        currentColorElement.textContent = randomColor;
        
        // Change text color for better contrast
        const textColor = getTextColor(randomColor);
        document.body.style.color = textColor;
        
        // Update button colors for better visibility
        const buttons = document.querySelectorAll('.interactive-button');
        buttons.forEach(button => {
            button.style.color = textColor;
            button.style.border = `2px solid ${textColor}`;
        });
    }
    
    // Function to reset to the default background color
    function resetBackgroundColor() {
        // Reset to default color
        document.body.style.backgroundColor = defaultBgColor;
        
        // Reset text color
        document.body.style.color = '#333';
        
        // Update the color display
        currentColorElement.textContent = defaultBgColor;
        
        // Reset button styles
        const buttons = document.querySelectorAll('.interactive-button');
        buttons.forEach(button => {
            button.style.color = 'white';
            button.style.border = 'none';
        });
    }
    
    // Add event listeners to the buttons
    colorChangeBtn.addEventListener('click', changeBackgroundColor);
    resetBtn.addEventListener('click', resetBackgroundColor);
    
    // Add keyboard shortcut (Spacebar) to change color
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            // Prevent spacebar from scrolling the page
            event.preventDefault();
            changeBackgroundColor();
        }
    });
    
    // Provide some user feedback when the page loads
    console.log('Interactive background color changer loaded!');
    console.log('Click the button or press Spacebar to change the background color.');
});
