(function () {
  function loadAIReview(productId, containerId, settings) {
    console.log(`Loading AI reviews for product ${productId}`);
    
    const encodedSettings = encodeURIComponent(settings || "{}");
    
    fetch(`https://your-app.com/api/ai-reviews?product_id=${productId}&settings=${encodedSettings}`)
      .then(res => res.text())
      .then(html => {
        const el = document.getElementById(containerId);
        if (el) {
          el.innerHTML = html;
          
          // Khởi tạo carousel nếu cần
          initializeAIReviewCarousel();
        }
      })
      .catch(err => {
        console.error("Error loading AI reviews:", err);
      });
  }

  function initializeAIReviewCarousel() {
    // Kiểm tra xem có carousel không
    const carousel = document.querySelector('.ai-review-carousel');
    if (!carousel) return;
    
    let currentIndex = 0;
    const reviewItems = carousel.querySelectorAll('.ai-review-item');
    const dots = carousel.querySelectorAll('.ai-pagination-dot');
    const totalItems = reviewItems.length;
    
    if (totalItems <= 1) return; // Không cần carousel nếu chỉ có 1 item

    function updateCarousel() {
      reviewItems.forEach((item, index) => {
        item.style.display = index === currentIndex ? 'block' : 'none';
      });
      
      dots.forEach((dot, index) => {
        dot.style.background = index === currentIndex ? '#000' : '#ddd';
      });
    }

    // Gắn sự kiện click cho nút điều hướng
    carousel.querySelectorAll('.ai-nav-button').forEach(btn => {
      btn.addEventListener('click', function() {
        const direction = parseInt(this.dataset.direction);
        currentIndex += direction;
        if (currentIndex < 0) currentIndex = totalItems - 1;
        if (currentIndex >= totalItems) currentIndex = 0;
        updateCarousel();
      });
    });

    // Gắn sự kiện click cho dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        currentIndex = index;
        updateCarousel();
      });
    });

    // Khởi tạo carousel
    updateCarousel();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[id^='ai-review-']").forEach(el => {
      const productId = el.dataset.productId;
      const settings = el.dataset.settings;
      loadAIReview(productId, el.id, settings);
    });
  });
})(); 