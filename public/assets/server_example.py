from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Mô phỏng cơ sở dữ liệu đánh giá sản phẩm
product_reviews = {
    "1234567890": [
        {
            "reviewer": "Khách hàng đã xác thực",
            "rating": 5,
            "comment": "Sản phẩm tuyệt vời, chất lượng cao, rất hài lòng!",
            "date": "2023-08-15"
        },
        {
            "reviewer": "Nguyễn Văn A",
            "rating": 4,
            "comment": "Đóng gói cẩn thận, giao hàng nhanh. Sản phẩm đúng như mô tả.",
            "date": "2023-08-10"
        }
    ]
}

# Mô phỏng AI reviews
ai_reviews = {
    "1234567890": [
        {
            "title": "Chất lượng cao",
            "comment": "Sản phẩm này được đánh giá rất cao bởi 95% người dùng. Đặc biệt về độ bền và thiết kế.",
            "source": "AI-generated based on 100+ customer reviews"
        },
        {
            "title": "Giao hàng nhanh",
            "comment": "Dịch vụ giao hàng được đánh giá tốt, với thời gian trung bình là 3 ngày.",
            "source": "AI-generated based on shipping data"
        }
    ]
}

@app.route("/api/reviews", methods=["GET"])
def get_reviews():
    product_id = request.args.get("product_id", "")
    reviews = product_reviews.get(product_id, [])
    
    # Tạo HTML response
    html = f"""
    <div class="review-carousel" style="position: relative; max-width: 1200px; margin: 0 auto;">
      <div class="review-slider" style="overflow: hidden;">
        <div class="review-items" style="display: flex; transition: transform 0.3s ease;" id="reviewSlider">
    """
    
    if not reviews:
        html += """
          <div class="review-item" style="flex: 0 0 100%; margin: 0 auto; max-width: 600px;">
            <p>Chưa có đánh giá nào cho sản phẩm này.</p>
          </div>
        """
    else:
        for review in reviews:
            stars = "★" * review["rating"] + "☆" * (5 - review["rating"])
            html += f"""
              <div class="review-item" style="flex: 0 0 100%; margin: 0 auto; max-width: 600px; display: flex; flex-direction: column; justify-content: space-between;">
                <div style="font-family: Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #333;">
                  <p>"{review["comment"]}"</p>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; border-top: 1px solid #e1e1e1; padding-top: 8px;">
                  <div style="font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #666;">
                    <p>{review["reviewer"]}</p>
                  </div>
                  <div style="display: flex; gap: 2px;">
                    {stars}
                  </div>
                </div>
              </div>
            """
    
    html += """
        </div>
      </div>
    """
    
    # Thêm pagination nếu có nhiều reviews
    if len(reviews) > 1:
        html += """
          <div style="display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 10px;">
            <button data-direction="-1" style="background: none; border: none; font-size: 16px; cursor: pointer; color: #333;">‹</button>
        """
        
        for i in range(len(reviews)):
            active = "rgb(0, 0, 0)" if i == 0 else "rgb(221, 221, 221)"
            html += f"""
              <div class="pagination-dot" style="width: 8px; height: 8px; border-radius: 50%; background: {active}; cursor: pointer;"></div>
            """
            
        html += """
            <button data-direction="1" style="background: none; border: none; font-size: 16px; cursor: pointer; color: #333;">›</button>
          </div>
        """
    
    html += "</div>"
    
    return html

@app.route("/api/ai-reviews", methods=["GET"])
def get_ai_reviews():
    product_id = request.args.get("product_id", "")
    reviews = ai_reviews.get(product_id, [])
    
    # Xử lý settings (nếu được gửi)
    settings_str = request.args.get("settings", "{}")
    try:
        settings = json.loads(settings_str)
    except:
        settings = {}
    
    text_color = settings.get("text_color", "#333333")
    icon_color = settings.get("icon_color", "#000000")
    
    # Tạo HTML response
    html = f"""
    <div class="product-review-section" style="text-align: left; padding-top: 10px;">
      <div class="ai-review-carousel" style="position: relative; max-width: 1200px; margin: 0 auto;">
    """
    
    if not reviews:
        html += """
          <div class="ai-review-item" style="border-radius: 8px; margin: 10px auto; max-width: 700px;">
            <p>Chưa có phân tích AI nào cho sản phẩm này.</p>
          </div>
        """
    else:
        for i, review in enumerate(reviews):
            display = "block" if i == 0 else "none"
            html += f"""
              <div class="ai-review-item" style="border-radius: 8px; margin: 10px auto; max-width: 700px; display: {display}; flex-direction: column; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <span style="font-size: 18px; color: {icon_color};">➤</span>
                  <span style="font-size: 18px; font-weight: bold; color: {text_color};">{review["title"]}</span>
                </div>
                <div style="font-style: italic; font-size: 13px; line-height: 1.6; color: {text_color};">
                  <p>"{review["comment"]}"</p>
                </div>
                <div style="margin-top: 10px; border-top: 1px solid rgb(234, 234, 234); padding-top: 10px;">
                  <div style="font-style: italic; font-size: 12px; line-height: 1.6; color: rgb(139, 139, 139);">
                    <p>{review["source"]}</p>
                  </div>
                </div>
              </div>
            """
    
    # Thêm navigation nếu có nhiều reviews
    if len(reviews) > 1:
        html += """
          <div style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 30px;">
            <button class="ai-nav-button" data-direction="-1" style="background: none; border: none; font-size: 16px; cursor: pointer;">‹</button>
        """
        
        for i in range(len(reviews)):
            active = "#000" if i == 0 else "#ddd"
            html += f"""
              <div class="ai-pagination-dot" style="width: 6px; height: 6px; border-radius: 50%; background: {active}; cursor: pointer;"></div>
            """
            
        html += """
            <button class="ai-nav-button" data-direction="1" style="background: none; border: none; font-size: 16px; cursor: pointer;">›</button>
          </div>
        """
    
    html += """
      </div>
    </div>
    """
    
    return html

if __name__ == "__main__":
    app.run(debug=True, port=5000) 