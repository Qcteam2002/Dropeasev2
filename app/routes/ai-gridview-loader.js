// Check if we're in a browser environment
if (typeof window !== 'undefined') {
  (function () {
    function loadGridView(productId, containerId) {
      fetch(`/api/gridview-html?id=${productId}`)
        .then((res) => res.text())
        .then((html) => {
          const container = document.getElementById(containerId);
          if (container) container.innerHTML = html;
        })
        .catch((error) => console.error('Error loading gridview:', error));
    }
  
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initGridView);
    } else {
      initGridView();
    }

    function initGridView() {
      document.querySelectorAll("[id^='ai-gridview-']").forEach(function (el) {
        const productId = el.dataset.productId;
        if (productId) {
          loadGridView(productId, el.id);
        }
      });
    }
  })();
}

// Export for server-side
export default function GridViewLoader() {
  return null;
}
  