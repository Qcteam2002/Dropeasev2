console.log('🎉 Test script loaded successfully!');
console.log('📊 Current URL:', window.location.href);
console.log('🔍 Script loaded from:', document.currentScript?.src);

// Test if we can access the app
fetch('/api/highlights/content')
  .then(response => response.json())
  .then(data => {
    console.log('✅ API test successful:', data);
  })
  .catch(error => {
    console.error('❌ API test failed:', error);
  });












