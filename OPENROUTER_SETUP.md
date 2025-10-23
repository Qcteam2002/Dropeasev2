# OpenRouter API Integration Setup

## Cấu hình OpenRouter API cho Virtual Try-On Widget

### 1. Lấy API Key từ OpenRouter

1. Truy cập [OpenRouter.ai](https://openrouter.ai/)
2. Đăng ký tài khoản hoặc đăng nhập
3. Vào phần "Keys" để tạo API key mới
4. Copy API key của bạn

### 2. Cập nhật Environment Variables

Mở file `local.env` và cập nhật các giá trị sau:

```env
# OpenRouter API Configuration
OPENROUTER_API_KEY=your_actual_openrouter_api_key_here
SITE_URL=https://your-shopify-app.com
SITE_NAME=Virtual Try-On App
```

**Lưu ý:** Thay `your_actual_openrouter_api_key_here` bằng API key thực tế của bạn.

### 3. Model được sử dụng

Widget hiện tại sử dụng model `google/gemini-2.5-flash-image-preview` từ OpenRouter, model này có khả năng:
- Phân tích hình ảnh
- Tạo mô tả chi tiết
- Xử lý nhiều hình ảnh cùng lúc

### 4. Cách hoạt động

1. Người dùng upload ảnh của họ
2. Widget lấy ảnh sản phẩm từ trang
3. Gửi cả 2 ảnh đến OpenRouter API với prompt yêu cầu tạo virtual try-on
4. API trả về kết quả (có thể là mô tả hoặc URL ảnh tạo ra)
5. Widget hiển thị kết quả cho người dùng

### 5. Test Widget

1. Khởi động app: `shopify app dev`
2. Mở trang sản phẩm có widget try-on
3. Click vào nút "Virtual Try-On"
4. Upload ảnh và test chức năng

### 6. Troubleshooting

**Lỗi "OPENROUTER_API_KEY not configured":**
- Kiểm tra file `local.env` có đúng API key không
- Restart server sau khi thay đổi environment variables

**Lỗi API call:**
- Kiểm tra API key có hợp lệ không
- Kiểm tra kết nối internet
- Xem console log để biết chi tiết lỗi

**Widget không hiển thị:**
- Kiểm tra config trong Shopify admin
- Đảm bảo widget được enable
- Kiểm tra console browser để xem lỗi JavaScript

### 7. Customization

Bạn có thể tùy chỉnh:
- Prompt trong function `callOpenRouterAPI()` để thay đổi cách AI xử lý
- Model khác trong OpenRouter nếu muốn
- UI của widget trong file `tryon-widget.js`
