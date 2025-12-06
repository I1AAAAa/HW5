// Theme Picker - Multi-theme selector (light, dark, sunset, forest)
// Uses localStorage to persist theme preference across all pages

// Apply theme immediately to prevent flash (before DOM is ready)
(function() {
  'use strict';
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (document.documentElement) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
})();

(function() {
  'use strict';

  function initThemePicker() {
    const select = document.getElementById("theme-select");
    if (!select) return; // Exit if theme picker doesn't exist on this page

    // Function to apply theme consistently
    function applyTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      
      // Update select value if it exists
      if (select) {
        select.value = theme;
      }
      
      // Also update theme toggle button if it exists (for pages with both)
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
        // For theme toggle, we only support light/dark, so map other themes
        const toggleTheme = (theme === 'dark' || theme === 'sunset' || theme === 'forest') ? 'dark' : 'light';
        themeToggle.textContent = toggleTheme === 'light' ? '🌙' : '☀️';
      }
    }

    // Load saved theme from localStorage (use "theme" key consistently)
    // Note: Theme may already be applied by the immediate function above,
    // but we still need to set the select value and ensure consistency
    const saved = localStorage.getItem("theme") || "light";
    
    // Ensure theme is applied (may already be applied, but this ensures consistency)
    document.documentElement.setAttribute("data-theme", saved);
    select.value = saved;

    // Handle theme change
    select.addEventListener("change", () => {
      applyTheme(select.value);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemePicker);
  } else {
    initThemePicker();
  }
})();
