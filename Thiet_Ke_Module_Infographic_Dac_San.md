# Thiết Kế Module Infographic Đặc Sản Có Thể Chỉnh Sửa Bởi Editor Và Lưu Database

Tôi đang xây dựng website giới thiệu đặc sản Việt Nam bằng ASP.NET Core Web API + React.

Mỗi đặc sản sẽ có một trang trình bày dạng infographic dài, bao gồm các nội dung như:

- Hero
- Giới thiệu
- Nguồn gốc
- Quy trình chế biến
- Thành phần
- Giá trị dinh dưỡng
- Hình ảnh
- Timeline
- FAQ
- CTA

## Mục tiêu

Tôi không muốn xây dựng hệ thống kéo thả tự do như Elementor, UX Builder hoặc Canva vì:

- Quá phức tạp
- Khó quản lý dữ liệu
- Khó tối ưu SEO
- Không phù hợp quy mô đồ án

Tôi muốn xây dựng mô hình Hybrid CMS.

Editor không được thiết kế tự do mà chỉ được chọn các bố cục (layout) được định nghĩa sẵn bởi hệ thống.

Ví dụ:

- Image Left + Text Right
- Image Right + Text Left
- Image Top + Text Bottom
- Text Top + Image Bottom
- Gallery
- Quote
- Statistics
- Timeline
- Feature Cards
- CTA

Sau khi chọn layout, editor chỉ cần nhập nội dung tương ứng.

Ví dụ:

**Layout:** Image Left + Text Right

**Content:**

- Title: Giới thiệu
- Text: Phở là món ăn phổ biến khắp Việt Nam
- Image: pho.jpg

## Kiến trúc mong muốn

Tôi muốn xây dựng theo mô hình:

`Product -> Infographic -> Blocks`

Trong đó mỗi block đại diện cho một phần nội dung.

Ví dụ:

- Infographic Block 1 (Hero)
- Block 2 (Intro)
- Block 3 (Story)
- Block 4 (Gallery)
- Block 5 (FAQ)

Editor có thể:

- Thêm block
- Xóa block
- Đổi thứ tự block
- Chọn layout cho block
- Nhập nội dung cho block

Nhưng không được kéo thả tự do như Elementor.

## Thiết kế Database

Tôi muốn lưu dữ liệu trong database thay vì localStorage.

Không muốn tạo quá nhiều bảng quan hệ phức tạp.

Ưu tiên:

- Dễ mở rộng
- Dễ query
- Dễ render frontend
- Hiệu năng tốt

Ý tưởng hiện tại:

### Table: InfographicBlocks

- Id
- ProductId
- SectionId
- LayoutId
- SortOrder
- DataJson
- CreatedAt
- UpdatedAt

Trong đó:

### SectionId

- 1 = Hero
- 2 = Intro
- 3 = Story
- 4 = Gallery
- 5 = FAQ

### LayoutId

- 1 = ImageLeftTextRight
- 2 = ImageRightTextLeft
- 3 = ImageTopTextBottom
- 4 = TextTopImageBottom
- 5 = Gallery
- 6 = Timeline
- 7 = Statistics

DataJson lưu nội dung thực tế.

Ví dụ:

```json
{
  "title": "Giới thiệu",
  "text": "Phở là món ăn phổ biến khắp Việt Nam",
  "image": "/uploads/pho.jpg"
}
```

## Luồng hoạt động mong muốn

### Khi editor chỉnh sửa

Frontend:

- Chọn section
- Chọn layout
- Nhập nội dung

↓

Gửi dữ liệu lên API

↓

Backend validate

↓

Lưu block vào database

### Khi hiển thị trang infographic

Frontend mở trang

↓

Backend lấy danh sách block theo ProductId

↓

Database trả về toàn bộ block

↓

Frontend render theo LayoutId

Ví dụ:

LayoutId = 1

↓

Render component

LayoutId = 2

↓

Render component

Không query nhiều lần cho từng layout.

Không xây dựng hệ thống render động quá phức tạp.

## Yêu cầu tư vấn

Hãy phân tích kiến trúc trên và đề xuất:

1. Thiết kế Entity Framework Core phù hợp.
2. Thiết kế Database tối ưu.
3. Có nên dùng enum hay bảng Layouts / Sections riêng.
4. Thiết kế API CRUD cho editor.
5. Thiết kế React Editor UI.
6. Thiết kế cơ chế Preview trước khi Publish.
7. Thiết kế render frontend tối ưu SEO.
8. Đánh giá hiệu năng khi có hàng trăm đặc sản và hàng nghìn block.
9. Đề xuất các layout mặc định phù hợp cho infographic đặc sản.
10. Đề xuất kiến trúc đủ mạnh cho đồ án tốt nghiệp nhưng không phức tạp như Elementor hoặc Canva.
