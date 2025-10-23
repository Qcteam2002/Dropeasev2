(function () {
  function loadProductReview(productId, containerId) {
    console.log(`Loading reviews for product ${productId}`);
    fetch(`https://your-app.com/api/reviews?product_id=${productId}`)
      .then(res => res.text())
      .then(html => {
        const el = document.getElementById(containerId);
        if (el) {
          el.innerHTML = html;
          
          // Khởi tạo slider nếu cần
          initializeReviewSlider();
        }
      })
      .catch(err => {
        console.error("Error loading product reviews:", err);
      });
  }

  function initializeReviewSlider() {
    // Kiểm tra xem có slider không
    const slider = document.getElementById('reviewSlider');
    if (!slider) return;
    
    let currentReviewIndex = 0;
    const reviewItems = document.querySelectorAll('.review-item');
    const dots = document.querySelectorAll('.pagination-dot');
    const totalReviews = reviewItems.length;

    function updateSlider() {
      slider.style.transform = `translateX(-${currentReviewIndex * 100}%)`;
      dots.forEach((dot, index) => {
        dot.style.background = index === currentReviewIndex ? 'rgb(0, 0, 0)' : 'rgb(221, 221, 221)';
      });
    }

    // Gắn sự kiện click cho nút điều hướng
    document.querySelectorAll('[data-direction]').forEach(btn => {
      btn.addEventListener('click', function() {
        const direction = parseInt(this.dataset.direction);
        currentReviewIndex += direction;
        if (currentReviewIndex < 0) currentReviewIndex = totalReviews - 1;
        if (currentReviewIndex >= totalReviews) currentReviewIndex = 0;
        updateSlider();
      });
    });

    // Gắn sự kiện click cho dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        currentReviewIndex = index;
        updateSlider();
      });
    });

    // Khởi tạo slider
    updateSlider();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[id^='product-review-']").forEach(el => {
      const productId = el.dataset.productId;
      loadProductReview(productId, el.id);
    });
  });
})(); 