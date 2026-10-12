# Ngôi Sao Nhỏ – Ngàn Lời Yêu Thương 🌸

> **Sản phẩm dự thi Hội thi Sáng tạo Sản phẩm số “Chạm công nghệ – Chạm trái tim”**  
> **Trường THCS Thuận Kiều**  
> *Dành tặng mẹ, cô giáo và những người phụ nữ tuyệt vời nhân ngày 20/10.*

---

## 📖 1. Giới thiệu sản phẩm

**“Ngôi sao nhỏ – Ngàn lời yêu thương”** là một trang thiệp điện tử (Web Greeting Card) tương tác giàu cảm xúc, kết hợp hài hòa giữa nét hoài niệm ấm áp của phong cách **Scrapbook** và trải nghiệm chạm vuốt hiện đại trên thiết bị di động.

- **Thông điệp cốt lõi:**  
  *“Có những yêu thương con chưa từng nói, nhưng con luôn muốn gửi đến mẹ và những người phụ nữ tuyệt vời nhất.”*
- **Đối tượng hướng đến:**  
  Ban giám khảo hội thi (quét trực tiếp qua mã QR in trên poster hội thi), quý phụ huynh, quý thầy cô giáo và bạn bè.
- **Tính chất kỹ thuật:**  
  100% Static Website thuần túy (**HTML5, CSS3, JavaScript**), không backend, không lưu trữ dữ liệu cá nhân, không thu phí, tải nhanh tức thì và sẵn sàng triển khai trên **GitHub Pages**.

---

## 🎨 2. Điểm nổi bật & Trải nghiệm người dùng

1. **Màn hình 1: Phong bì yêu thương**
   - Phong bì vintage 3D trang trí tem thư bưu chính và con dấu sáp trái tim nổi bật.
   - Hiệu ứng mở cánh phong bì và nhô bức thư bên trong khi người dùng chạm vào nút hoặc con dấu.
2. **Màn hình 2: Thiệp chúc mừng 20/10**
   - Tiêu đề viết tay mềm mại *“Con yêu Mẹ ♡”* cùng biểu tượng trái tim đập nhịp nhàng.
   - Hình ảnh trung tâm: Cô bé học sinh trường Thuận Kiều cầm ngôi sao đỏ rực rỡ mang ngàn lời yêu thương gửi mẹ và cô giáo.
   - Mảnh giấy ghi chú scrapbook đính kèm băng dính washi tape và dải ruy băng hồng lan tỏa.
3. **Màn hình 3: Lời chúc chân thành**
   - Thư gửi mẹ thiết kế trên nền giấy kem ấm viền hồng san hô.
   - Chế độ tự động hiện từng dòng/đoạn cảm xúc tuần tự khi cuộn tới nơi.
   - Tích hợp nút **“⚡ Hiển thị toàn bộ nội dung”** cho phép xem ngay lập tức mà không gây bất tiện cho ban giám khảo.
4. **Màn hình 4: Chạm để gửi yêu thương**
   - 3 thẻ tương tác scrapbook đính ghim giấy:
     - 🌸 *Gửi mẹ một lời yêu thương*
     - 📚 *Tri ân cô giáo*
     - 💐 *Lan tỏa yêu thương*
   - Cửa sổ pop-up lời chúc chuẩn Accessibility (đóng bằng phím `Escape`, nút đóng hoặc chạm ra ngoài).
   - Nút **“📋 Sao chép lời chúc này”** giúp người dùng dễ dàng dán vào Zalo/SMS gửi ngay cho người thân.
   - Nút **“🔗 Gửi lời chúc cho người bạn yêu quý”** tự động sử dụng **Web Share API** khi trên smartphone, hoặc tự động copy liên kết kèm thông báo Toast.
5. **Màn hình 5: Lời nhắn kết thúc**
   - Thông điệp bế mạc: *“Một chạm nhỏ – Ngàn yêu thương lớn.”*
   - Nút **“Xem lại thiệp”** đưa người xem trở lại từ đầu một cách mượt mà.
6. **Âm thanh & Hiệu ứng cánh hoa bay**
   - Không tự động phát âm thanh khi tải trang (tuân thủ trải nghiệm người dùng).
   - Nút bật/tắt nhạc nền có equalizer động. Tích hợp sẵn bộ tổng hợp giai điệu hộp âm nhạc (Music Box Lullaby) êm dịu nếu chưa có file MP3, hoặc tự động phát file `assets/music.mp3` nếu có.
   - Hiệu ứng cánh hoa mẫu đơn và trái tim bay lơ lửng bằng Canvas hiệu năng cao (tự động tắt khi kích hoạt chế độ `prefers-reduced-motion` hoặc qua nút điều khiển).

---

## 📁 3. Cấu trúc mã nguồn

```
├── index.html          # Khung trang semantic HTML5, tối ưu SEO, Open Graph & Favicon SVG
├── style.css           # Toàn bộ thiết kế scrapbook, bảng màu 20/10, animation & responsive
├── script.js           # Xử lý tương tác phong bì, canvas cánh hoa, modal, chia sẻ & âm thanh
├── assets/
│   ├── girl.png        # Ảnh cô bé cầm ngôi sao tách nền trong suốt 100% tự nhiên
│   └── music.mp3       # File nhạc nền tùy chọn (có thể thêm vào bất cứ lúc nào)
└── README.md           # Tài liệu hướng dẫn sử dụng & triển khai GitHub Pages
```

---

## 🚀 4. Hướng dẫn chạy thử trên máy tính (Local)

Vì đây là website tĩnh thuần túy, bạn có thể chạy thử cực kỳ đơn giản:

### Cách 1: Mở trực tiếp
- Nhấp đúp vào file `index.html` để mở trong trình duyệt (Chrome, Cốc Cốc, Edge, Firefox, Safari).

### Cách 2: Sử dụng Live Server hoặc Node.js (Khuyên dùng)
- Nếu dùng VS Code: Cài extension **Live Server** và nhấn **Go Live**.
- Hoặc dùng lệnh dòng lệnh có sẵn:
  ```bash
  # Nếu có Node.js:
  npx serve .
  # Hoặc với Python:
  python -m http.server 3000
  ```
- Truy cập địa chỉ `http://localhost:3000` trên trình duyệt.

---

## 🌐 5. Hướng dẫn triển khai lên GitHub Pages (Từng bước chi tiết)

Để đưa website lên Internet miễn phí và lấy đường dẫn tạo mã QR cho poster, hãy thực hiện theo 7 bước sau:

### Bước 1: Tạo GitHub Repository
1. Đăng nhập vào tài khoản [GitHub](https://github.com/).
2. Nhấn vào dấu **`+`** ở góc trên bên phải → chọn **New repository**.
3. Đặt tên Repository (ví dụ: `ngoi-sao-nho-20-10` hoặc `chamtraitim-2010`).
4. Chọn chế độ **Public** (Bắt buộc để dùng GitHub Pages miễn phí).
5. Không cần tích chọn "Add a README" nếu đã có sẵn file README này trong thư mục.
6. Nhấn nút **Create repository**.

### Bước 2: Tải mã nguồn lên GitHub
- **Cách qua giao diện web:**
  1. Trong trang repository vừa tạo, chọn liên kết **“uploading an existing file”**.
  2. Kéo thả toàn bộ các file (`index.html`, `style.css`, `script.js`, `README.md`) và thư mục `assets/` (chứa `girl.png`) vào trình duyệt.
  3. Nhập ghi chú commit (ví dụ: `Initial commit - Website thiệp 20/10`) và nhấn **Commit changes**.
- **Cách dùng Git dòng lệnh:**
  ```bash
  git init
  git add .
  git commit -m "Thiệp điện tử 20/10 - Ngôi sao nhỏ ngàn lời yêu thương"
  git branch -M main
  git remote add origin https://github.com/<tai-khoan-cua-ban>/<ten-repo>.git
  git push -u origin main
  ```

### Bước 3: Vào cài đặt Pages
1. Tại trang chính của repository, nhấp vào tab **Settings** (biểu tượng bánh răng ở thanh menu trên cùng).
2. Ở thanh bên trái, cuộn xuống mục **Code and automation** → chọn **Pages**.

### Bước 4: Cấu hình nguồn phát hành (Build and deployment)
1. Trong mục **Source**, chọn **Deploy from a branch**.

### Bước 5: Chọn nhánh xuất bản
1. Dưới mục **Branch**, chọn nhánh **`main`**.
2. Ở ô chọn thư mục bên cạnh, giữ nguyên **`/(root)`**.
3. Nhấn **Save**.

### Bước 6: Chờ GitHub Pages hoàn tất triển khai
1. Chờ khoảng 1 – 2 phút để GitHub Actions hoàn tất việc xuất bản.
2. Tải lại trang (F5). Bạn sẽ thấy một khung thông báo màu xanh hiển thị:
   > **“Your site is live at https://&lt;tai-khoan&gt;.github.io/&lt;ten-repo&gt;/”**

### Bước 7: Mở kiểm tra trên điện thoại
1. Mở liên kết HTTPS vừa nhận được trên trình duyệt điện thoại để kiểm tra trực tiếp.

---

## 📱 6. Hướng dẫn tạo mã QR Code cho Poster Hội Thi

> [!IMPORTANT]
> **LƯU Ý CỰC KỲ QUAN TRỌNG KHI TẠO MÃ QR:**  
> Mã QR in trên poster dự thi phải trỏ đến **URL HTTPS cuối cùng của website trên GitHub Pages** (ví dụ: `https://username.github.io/ngoi-sao-nho-20-10/`).  
> **TUYỆT ĐỐI KHÔNG** dùng:
> - Link repository mã nguồn (ví dụ: `https://github.com/username/repo`).
> - Link máy tính cá nhân (`file:///C:/...` hoặc `http://localhost:...`).

### Cách tạo mã QR chất lượng cao:
1. Sao chép địa chỉ website đã hoạt động: `https://<ten-user>.github.io/<ten-repo>/`.
2. Truy cập một trang tạo QR uy tín miễn phí (như [me-qr.com](https://me-qr.com), [qr-code-generator.com](https://www.qr-code-generator.com/) hoặc Canva).
3. Dán URL vào ô liên kết trang web.
4. Tải file mã QR dưới dạng hình ảnh chất lượng cao (PNG hoặc SVG) để dán vào góc poster dự thi.
5. Quét thử bằng camera điện thoại của bạn để đảm bảo mã QR mở ngay vào website thiệp.

---

## ✅ 7. Checklist kiểm tra sau khi Deploy

Trước khi in ấn poster nộp ban giám khảo, hãy đối chiếu danh sách kiểm tra sau:

- [x] **Tải trang:** Trang web mở nhanh chóng qua giao diện HTTPS, không có cảnh báo bảo mật.
- [x] **Hình ảnh nhân vật:** Ảnh cô bé cầm ngôi sao hiển thị sắc nét, nền trong suốt hòa quyện với giấy scrapbook, không bị bóp méo, không bị che mất khuôn mặt hay ngôi sao.
- [x] **Mở phong bì:** Nhấn nút *“Chạm để mở thiệp ♡”* hoặc chạm vào con dấu sáp phong bì hoạt động mượt mà, chuyển cảnh sang màn hình thiệp chính.
- [x] **Hiển thị lời chúc:** Thư hiển thị tuần tự, nút *“Hiển thị toàn bộ nội dung”* mở ngay tất cả lời chúc khi cần xem nhanh.
- [x] **3 Thẻ tương tác:** Mở thử lần lượt từng thẻ (Mẹ, Cô giáo, Lan tỏa) để kiểm tra nội dung và đóng lại bằng nút hoặc phím ESC.
- [x] **Sao chép & Chia sẻ:** Nút sao chép hiển thị thông báo Toast xác nhận; nút chia sẻ kích hoạt Web Share API trên di động hoặc sao chép liên kết trên máy tính.
- [x] **Âm thanh:** Mặc định không tự phát tiếng; khi nhấn nút nhạc trên góc phải, âm thanh phát êm dịu và nút hiển thị hiệu ứng sóng nhạc.
- [x] **Khả năng hiển thị di động:** Kiểm tra trên màn hình điện thoại từ 360px trở lên đảm bảo chữ to rõ, nút bấm vừa vặn ngón tay, không vỡ khung.
- [x] **Mã QR:** Dùng điện thoại quét mã QR từ khoảng cách 30cm để xác nhận mở trúng trang web thiệp.

---

*Chúc tác phẩm “Ngôi sao nhỏ – Ngàn lời yêu thương” đạt kết quả cao nhất tại Hội thi Sáng tạo Sản phẩm số “Chạm công nghệ – Chạm trái tim”!* 🌟
#   b u i t r a n t h i n g a n 2 0 - 1 0  
 