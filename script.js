document.addEventListener('DOMContentLoaded', () => {
    const themeCards = document.querySelectorAll('.theme-preview-card');
    const body = document.body;
    const THEME_STORAGE_KEY = 'selected_theme';

    // Function to apply a theme
    const applyTheme = (themeName) => {
        // Create a copy of the class list to iterate over, avoiding modification issues
        for (const className of [...body.classList]) {
            if (className.startsWith('theme-')) {
                body.classList.remove(className);
            }
        }

        // Add the new theme class
        if (themeName) {
            body.classList.add(`theme-${themeName}`);
        }
        
        // Save the theme to localStorage
        localStorage.setItem(THEME_STORAGE_KEY, themeName);

        // Update active card state
        themeCards.forEach(card => {
            if (card.getAttribute('data-theme') === themeName) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    };

    // Add click event listeners to all theme cards
    themeCards.forEach(card => {
        card.addEventListener('click', () => {
            const themeName = card.getAttribute('data-theme');
            applyTheme(themeName);
        });
    });

    // On page load, check for a saved theme in localStorage
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Apply a default theme if none is saved
        applyTheme('classic-dark'); 
    }
});