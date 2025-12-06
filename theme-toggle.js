/**
 * Theme Toggle Functionality
 * Simple light/dark toggle button
 * Uses localStorage to persist theme preference across all pages
 * Works alongside theme-picker.js - both use the same "theme" localStorage key
 */

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

  // Theme toggle functionality
  function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return; // Exit if toggle button doesn't exist on this page
    
    const html = document.documentElement;
    
    // Get saved theme from localStorage (use same key as theme-picker)
    // Default to 'light' if not set
    // Note: Theme may already be applied by the immediate function above,
    // but we still need to update the icon
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Ensure theme is applied (may already be applied, but this ensures consistency)
    html.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);

    // Theme toggle button click handler
    // Toggles between light and dark only (simplified toggle)
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme') || 'light';
      // Toggle between light and dark
      // If current theme is sunset or forest, treat as dark
      const isDark = currentTheme === 'dark' || currentTheme === 'sunset' || currentTheme === 'forest';
      const newTheme = isDark ? 'light' : 'dark';
      
      // Update theme
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeToggleIcon(newTheme);
      
      // Also update theme picker select if it exists on this page
      const themeSelect = document.getElementById('theme-select');
      if (themeSelect) {
        themeSelect.value = newTheme;
      }
    });
  }

  // Update theme toggle icon based on current theme
  function updateThemeToggleIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      // Determine if theme is dark (dark, sunset, or forest)
      const isDark = theme === 'dark' || theme === 'sunset' || theme === 'forest';
      // Use sun/moon emoji
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
      themeToggle.setAttribute('title', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
  } else {
    initThemeToggle();
  }
})();







