(function() {
  'use strict';
  
  // Get parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const shop = urlParams.get('shop') || new URLSearchParams(document.currentScript.src.split('?')[1]).get('shop');
  const appId = urlParams.get('app') || new URLSearchParams(document.currentScript.src.split('?')[1]).get('app');
  const sectionId = urlParams.get('section') || new URLSearchParams(document.currentScript.src.split('?')[1]).get('section');
  
  if (!shop || !appId || !sectionId) {
    console.error('Missing required parameters for GridView widget');
    return;
  }
  
  // Load widget configuration and render
  loadGridViewWidget(shop, appId, sectionId);
  
  async function loadGridViewWidget(shop, appId, sectionId) {
    console.log('🚀 Loading GridView widget:', { shop, appId, sectionId });
    
    try {
      // Get widget configuration from app
      console.log('📋 Fetching widget config...');
      const configResponse = await fetch(`/api/widgets/gridview/config?shop=${shop}`);
      const config = await configResponse.json();
      console.log('⚙️ Widget config:', config);
      
      // Get content from metafields
      console.log('📦 Fetching content from metafields...');
      const contentResponse = await fetch(`/api/highlights/content?shop=${shop}`);
      const contentData = await contentResponse.json();
      console.log('🎯 Content data:', contentData);
      
      // Get product data
      const productData = window.productData || window.meta?.product;
      console.log('🛍️ Product data:', productData);
      
      // Render widget with content
      console.log('🎨 Rendering widget...');
      renderGridViewWidget(sectionId, config, productData, contentData.content);
      
    } catch (error) {
      console.error('❌ Error loading GridView widget:', error);
      renderError(sectionId, 'Failed to load widget');
    }
  }
  
  function renderGridViewWidget(sectionId, config, productData, metafieldContent) {
    const container = document.getElementById(`gridview-widget-${sectionId}`);
    if (!container) return;
    
    const layoutType = config.layoutType || 'multirow';
    const maxItems = config.maxItems || 5;
    const spacing = config.spacing || 40;
    const bgColor = config.backgroundColor || '#ffffff';
    const textColor = config.textColor || '#333333';
    const titleSize = config.titleSize || 24;
    const descSize = config.descriptionSize || 16;
    const borderRadius = config.borderRadius || 10;
    const padding = config.padding || 20;
    
    // Use content from metafields if available, otherwise fallback to product data
    let gridItems;
    let actualLayoutType = layoutType;
    
    if (metafieldContent && metafieldContent.content) {
      console.log('🎉 Using content from metafields:', metafieldContent);
      gridItems = metafieldContent.content;
      actualLayoutType = metafieldContent.layout || layoutType;
    } else {
      console.log('📝 Using fallback content from product data');
      gridItems = productData?.metafields?.gridview?.configuration?.value || [];
    }
    
    if (!gridItems || gridItems.length === 0) {
      container.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">No grid items configured</div>';
      return;
    }
    
    // Render based on layout type
    let html = `<div class="grid-view grid-view-${actualLayoutType}" style="background-color: ${bgColor}; padding: ${padding}px; border-radius: ${borderRadius}px; max-width: 1470px; margin: 0 auto;">`;
    
    switch (actualLayoutType) {
      case 'multirow':
        html += renderMultirow(gridItems, maxItems, spacing, borderRadius, padding, titleSize, descSize, textColor);
        break;
      case 'grid-2x2':
        html += renderGrid2x2(gridItems, maxItems, spacing, borderRadius, padding, titleSize, descSize, textColor);
        break;
      case 'grid-3x1':
        html += renderGrid3x1(gridItems, maxItems, spacing, borderRadius, padding, titleSize, descSize, textColor);
        break;
      case 'stacked':
        html += renderStacked(gridItems, maxItems, spacing, borderRadius, padding, titleSize, descSize, textColor);
        break;
      default: // zigzag
        html += renderZigzag(gridItems, maxItems, spacing, borderRadius, padding, titleSize, descSize, textColor);
    }
    
    html += '</div>';
    html += getResponsiveCSS();
    
    container.innerHTML = html;
  }
  
  function renderMultirow(items, maxItems, spacing, borderRadius, padding, titleSize, descSize, textColor) {
    let html = '';
    const displayItems = items.slice(0, Math.min(3, maxItems)); // Show max 3 items for multirow
    
    displayItems.forEach((item, index) => {
      const isEven = index % 2 === 0; // Block 1 & 3: image left, text right
      const reverseClass = isEven ? '' : ' image-with-text__grid--reverse';
      
      html += `
        <div class="image-with-text isolate collapse-padding scroll-trigger animate--slide-in" style="margin-bottom: ${spacing}px;">
          <div class="image-with-text__grid grid grid--gapless grid--1-col grid--2-col-tablet${reverseClass}">
            <!-- Image/Icon Section -->
            <div class="image-with-text__media-item image-with-text__media-item--medium image-with-text__media-item--middle grid__item">
              <div class="image-with-text__media image-with-text__media--medium gradient color-scheme-1 global-media-settings" style="
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                border-radius: ${borderRadius}px;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 300px;
                position: relative;
                overflow: hidden;
              ">
                <div style="
                  font-size: 64px;
                  color: #6c757d;
                  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
                  z-index: 2;
                ">${item.icon || '⭐'}</div>
                <!-- Decorative elements -->
                <div style="
                  position: absolute;
                  top: 20px;
                  right: 20px;
                  width: 60px;
                  height: 60px;
                  background: rgba(255,255,255,0.3);
                  border-radius: 50%;
                  z-index: 1;
                "></div>
                <div style="
                  position: absolute;
                  bottom: 30px;
                  left: 30px;
                  width: 40px;
                  height: 40px;
                  background: rgba(255,255,255,0.2);
                  border-radius: 50%;
                  z-index: 1;
                "></div>
              </div>
            </div>
            
            <!-- Text Section -->
            <div class="image-with-text__text-item grid__item">
              <div class="image-with-text__content image-with-text__content--middle image-with-text__content--desktop-left image-with-text__content--mobile-left image-with-text__content--medium content-container background-transparent" style="padding: ${spacing}px;">
                <p class="image-with-text__text image-with-text__text--caption caption-with-letter-spacing caption-with-letter-spacing--medium" style="
                  font-size: 14px;
                  color: ${textColor};
                  opacity: 0.7;
                  margin: 0 0 8px 0;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                  font-weight: 500;
                ">Feature Highlight</p>
                
                <h2 class="image-with-text__heading h1 rte" style="
                  font-size: ${titleSize}px;
                  color: ${textColor};
                  margin: 0 0 16px 0;
                  font-weight: 600;
                  line-height: 1.2;
                ">${item.title}</h2>
                
                <div class="image-with-text__text rte body" style="
                  font-size: ${descSize}px;
                  color: ${textColor};
                  opacity: 0.8;
                  margin: 0 0 24px 0;
                  line-height: 1.6;
                ">
                  <p>${item.description}</p>
                </div>
                
                <a role="link" class="button button--secondary" style="
                  display: inline-block;
                  padding: 12px 24px;
                  background: transparent;
                  border: 2px solid ${textColor};
                  color: ${textColor};
                  text-decoration: none;
                  border-radius: 4px;
                  font-weight: 500;
                  transition: all 0.3s ease;
                  cursor: pointer;
                " onmouseover="this.style.background='${textColor}'; this.style.color='white';" onmouseout="this.style.background='transparent'; this.style.color='${textColor}';">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    
    return html;
  }
  
  function renderZigzag(items, maxItems, spacing, borderRadius, padding, titleSize, descSize, textColor) {
    let html = '';
    items.slice(0, maxItems).forEach((item, index) => {
      const isOdd = index % 2 === 0;
      const direction = isOdd ? 'row' : 'row-reverse';
      
      html += `
        <div style="display: flex; flex-wrap: wrap; gap: ${spacing}px; align-items: center; margin-bottom: ${spacing}px; flex-direction: ${direction};">
          <div style="flex: 1; min-width: 250px;">
            <img src="${item.image || '/assets/no-image.png'}" alt="${item.title}" style="width: 100%; height: auto; border-radius: ${borderRadius}px; object-fit: cover;">
          </div>
          <div style="flex: 1; padding: ${padding}px; min-width: 250px;">
            <h3 style="font-size: ${titleSize}px; font-weight: bold; margin-bottom: 15px; color: ${textColor};">${item.title}</h3>
            <p style="font-size: ${descSize}px; line-height: 1.6; color: ${textColor};">${item.description}</p>
          </div>
        </div>
      `;
    });
    return html;
  }
  
  function renderGrid2x2(items, maxItems, spacing, borderRadius, padding, titleSize, descSize, textColor) {
    let html = `<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: ${spacing}px;">`;
    items.slice(0, maxItems).forEach(item => {
      html += `
        <div style="background: white; border-radius: ${borderRadius}px; padding: ${padding}px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <img src="${item.image || '/assets/no-image.png'}" alt="${item.title}" style="width: 100%; height: 150px; border-radius: ${borderRadius}px; object-fit: cover; margin-bottom: 15px;">
          <h3 style="font-size: ${titleSize}px; font-weight: bold; margin-bottom: 10px; color: ${textColor};">${item.title}</h3>
          <p style="font-size: ${descSize}px; line-height: 1.5; color: ${textColor};">${item.description}</p>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }
  
  function renderGrid3x1(items, maxItems, spacing, borderRadius, padding, titleSize, descSize, textColor) {
    let html = `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: ${spacing}px;">`;
    items.slice(0, maxItems).forEach(item => {
      html += `
        <div style="background: white; border-radius: ${borderRadius}px; padding: ${padding}px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <img src="${item.image || '/assets/no-image.png'}" alt="${item.title}" style="width: 100%; height: 120px; border-radius: ${borderRadius}px; object-fit: cover; margin-bottom: 15px;">
          <h3 style="font-size: ${titleSize}px; font-weight: bold; margin-bottom: 10px; color: ${textColor};">${item.title}</h3>
          <p style="font-size: ${descSize}px; line-height: 1.5; color: ${textColor};">${item.description}</p>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }
  
  function renderStacked(items, maxItems, spacing, borderRadius, padding, titleSize, descSize, textColor) {
    let html = '';
    items.slice(0, maxItems).forEach(item => {
      html += `
        <div style="display: flex; gap: ${spacing}px; margin-bottom: ${spacing}px; background: white; border-radius: ${borderRadius}px; padding: ${padding}px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <img src="${item.image || '/assets/no-image.png'}" alt="${item.title}" style="width: 120px; height: 120px; border-radius: ${borderRadius}px; object-fit: cover; flex-shrink: 0;">
          <div style="flex: 1;">
            <h3 style="font-size: ${titleSize}px; font-weight: bold; margin-bottom: 10px; color: ${textColor};">${item.title}</h3>
            <p style="font-size: ${descSize}px; line-height: 1.5; color: ${textColor};">${item.description}</p>
          </div>
        </div>
      `;
    });
    return html;
  }
  
  function getResponsiveCSS() {
    return `
      <style>
        /* Shopify Grid System */
        .grid { display: grid; }
        .grid--gapless { gap: 0; }
        .grid--1-col { grid-template-columns: 1fr; }
        .grid--2-col-tablet { 
          grid-template-columns: 1fr; 
        }
        .grid__item { 
          display: flex; 
          flex-direction: column; 
        }
        
        /* Image with Text Styles */
        .image-with-text { 
          position: relative; 
          overflow: hidden; 
        }
        .image-with-text__grid { 
          display: grid; 
          grid-template-columns: 1fr; 
          gap: 0; 
        }
        .image-with-text__grid--reverse { 
          direction: rtl; 
        }
        .image-with-text__grid--reverse > * { 
          direction: ltr; 
        }
        .image-with-text__media-item { 
          position: relative; 
        }
        .image-with-text__media { 
          position: relative; 
          overflow: hidden; 
        }
        .image-with-text__text-item { 
          display: flex; 
          align-items: center; 
        }
        .image-with-text__content { 
          width: 100%; 
        }
        
        /* Responsive Design */
        @media (min-width: 750px) {
          .grid--2-col-tablet { 
            grid-template-columns: 1fr 1fr; 
          }
          .image-with-text__grid { 
            grid-template-columns: 1fr 1fr; 
          }
        }
        
        @media (max-width: 768px) {
          .product-grid-item, .stacked-item { flex-direction: column !important; text-align: center; }
          .grid-item-image, .grid-item-text { width: 100% !important; padding: 10px; }
          .grid-item-text h3 { font-size: 20px !important; }
          .grid-item-text p { font-size: 14px !important; }
          .grid-2x2-container, .grid-3x1-container { grid-template-columns: 1fr !important; gap: 20px !important; }
          .stacked-item img { width: 100% !important; height: 200px !important; margin-bottom: 15px; }
          .image-with-text__grid { grid-template-columns: 1fr !important; }
          .image-with-text__media { min-height: 200px !important; }
        }
        
        @media (max-width: 1024px) and (min-width: 769px) {
          .grid-3x1-container { grid-template-columns: repeat(2, 1fr) !important; }
        }
        
        /* Animations */
        .scroll-trigger { 
          opacity: 1; 
          transform: translateY(0); 
          transition: opacity 0.6s ease, transform 0.6s ease; 
        }
        .animate--slide-in { 
          animation: slideInUp 0.6s ease-out; 
        }
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .grid-item-card:hover { transform: translateY(-5px); transition: transform 0.3s ease; }
      </style>
    `;
  }
  
  function renderError(sectionId, message) {
    const container = document.getElementById(`gridview-widget-${sectionId}`);
    if (container) {
      container.innerHTML = `<div style="text-align: center; padding: 20px; color: #d32f2f;">${message}</div>`;
    }
  }
})();
