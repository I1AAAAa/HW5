/**
 * View Transition API Support for MPA (Multi-Page Application)
 * Provides smooth transitions between pages when navigating
 * 
 * This implements MPA-style view transitions using the View Transition API.
 * The CSS @view-transition rule with navigation: auto handles automatic
 * transitions, and this script enhances the experience for browsers that
 * support it.
 */

(function() {
  'use strict';

  // Check if View Transition API is supported
  if (!document.startViewTransition) {
    // Fallback for browsers without View Transition API support
    console.log('View Transition API not supported in this browser');
    return;
  }

  // Enhanced navigation with view transitions for internal links
  function enhanceNavigation() {
    // Get all internal navigation links
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"]):not([href^="mailto:"]):not([href^="tel:"])');
    
    links.forEach(link => {
      // Skip if link has target or download attribute
      if (link.target || link.hasAttribute('download')) {
        return;
      }

      link.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        
        // Only handle same-origin navigation
        if (!href || href.startsWith('http') && !href.startsWith(window.location.origin)) {
          return;
        }

        // Use view transition for navigation
        // Note: For MPA, the browser's native view transition with CSS
        // @view-transition { navigation: auto; } handles most cases.
        // This provides additional control if needed.
        
        // Allow default navigation - CSS handles the transition
        // The meta tag view-transition="same-origin" enables automatic transitions
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceNavigation);
  } else {
    enhanceNavigation();
  }

  // Log that view transitions are enabled
  console.log('View Transition API enabled for MPA navigation');
})();

