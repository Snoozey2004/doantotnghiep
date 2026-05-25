# User Approval Workflow - UI Guide

## 1. Registration Page (`/register`)

### Before
```
Form:
  - Full Name
  - Email  
  - Role Dropdown
  - Password
  - [Register Button]

Response:
  - "Đăng ký thành công" → Redirect to /login
```

### After ✨
```
Form:
  - Full Name
  - Email
  - Role Dropdown (with descriptions)
	- "Editor (cần admin duyệt)"  ← Shows requirement
	- "Seller"
	- "Customer"
  - Password
  - [Register Button]

Response:
  ✅ SUCCESS MESSAGE
  ┌─────────────────────────────────────────┐
  │ ✅ Đăng ký thành công!                  │
  │ Tài khoản của bạn đang chờ Admin        │
  │ phê duyệt. (only for Editors)           │
  └─────────────────────────────────────────┘
  → Redirect to /login (after 2 seconds)

Email: Registration confirmation sent
```

---

## 2. Login Page (`/login`)

### Before
```
Form:
  - Email
  - Password
  - [Login Button]

Success:
  - Navigate to admin or home
```

### After ✨
```
Form:
  - Email
  - Password
  - [Login Button]

Success (Approved):
  - Navigate to admin or home

Error (Unapproved Editor):
  ┌─────────────────────────────────────────┐
  │ ❌ Tài khoản của bạn đang chờ Admin     │
  │ phê duyệt. Vui lòng kiểm tra email      │
  │ để cập nhật.                            │
  └─────────────────────────────────────────┘
  - Stay on login page
  - Suggest checking email
```

---

## 3. Admin Users Dashboard (`/admin/users`)

### Stats Cards (Top)
```
BEFORE:
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ Total: 45        │  │ Approved: 40     │  │ Pending: 5       │  │ Admin/Editor: 8  │
└──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘

AFTER (Same layout, same functionality) ✓
```

### Filters Section
```
BEFORE:
[Role Dropdown]  [Approval Status Dropdown]
  • All          • All
  • Admin        • Approved
  • Editor       • Pending
  • Seller
  • Customer

AFTER (Same, better usage now) ✓
```

### User List Table
```
BEFORE:
┌─────────────┬──────────────┬─────────┬──────────┬──────────────────┐
│ Tên         │ Email        │ Role    │ Trạng    │ Hành động        │
│             │              │         │ thái     │                  │
├─────────────┼──────────────┼─────────┼──────────┼──────────────────┤
│ John Doe    │ john@...     │ Editor  │ Chờ ✓   │ [Sửa] [Xóa]     │
│ Jane Smith  │ jane@...     │ Seller  │ Đã ✓    │ [Sửa] [Xóa]     │
└─────────────┴──────────────┴─────────┴──────────┴──────────────────┘

AFTER ✨
┌─────────────┬──────────────┬─────────┬──────────┬─────────────────────────────────────────┐
│ Tên         │ Email        │ Role    │ Trạng    │ Hành động                               │
│             │              │         │ thái     │                                         │
├─────────────┼──────────────┼─────────┼──────────┼─────────────────────────────────────────┤
│ John Doe    │ john@...     │ Editor  │ Chờ ⏳  │ [✓ Phê duyệt] [✕ Từ chối] [Sửa] [Xóa]│
│ Jane Smith  │ jane@...     │ Seller  │ Đã ✓    │ [Sửa] [Xóa]                             │
└─────────────┴──────────────┴─────────┴──────────┴─────────────────────────────────────────┘

NEW BUTTONS:
• [✓ Phê duyệt] - Green button, appears only for unapproved users
  → Click → Show success message → List updates → Email sent

• [✕ Từ chối] - Red button, appears only for unapproved users
  → Click → Confirm dialog → Success message → List updates
```

### Button Interactions
```
Unapproved User Row:
┌────────────────────────────────────────────────────────────┐
│ John Doe | john@... | Editor | Chờ ⏳                     │
│ Actions:                                                    │
│ ┌─────────────────┐  ┌──────────────┐  ┌──────┐  ┌──────┐│
│ │ ✓ Phê duyệt    │  │ ✕ Từ chối    │  │ Sửa  │  │ Xóa  ││
│ └─────────────────┘  └──────────────┘  └──────┘  └──────┘│
└────────────────────────────────────────────────────────────┘

Approved User Row:
┌────────────────────────────────────────────────────────────┐
│ Jane Smith | jane@... | Seller | Đã ✓                     │
│ Actions:                                                    │
│                      ┌──────┐  ┌──────┐                    │
│                      │ Sửa  │  │ Xóa  │                    │
│                      └──────┘  └──────┘                    │
│ (No approval buttons for approved users)                   │
└────────────────────────────────────────────────────────────┘
```

---

## 4. Admin User Edit Page (`/admin/users/{id}/edit`)

### Before
```
Form Layout:
┌─────────────────────────────────────────────┐
│ Cập nhật user                               │
├─────────────────────────────────────────────┤
│ [Full Name Input]                           │
│ [Email Input]                               │
│ [Role Dropdown]                             │
│ ☐ Approved                                  │
│                                             │
│ [Lưu thay đổi Button]                       │
└─────────────────────────────────────────────┘
```

### After ✨
```
Form Layout:
┌─────────────────────────────────────────────┐
│ Cập nhật user                               │
├─────────────────────────────────────────────┤
│ [Full Name Input]                           │
│ [Email Input]                               │
│ [Role Dropdown]                             │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ ⚠ Tài khoản đang chờ phê duyệt         │ │  ← Orange card
│ │ ☐ Tài khoản đang chờ phê duyệt         │ │  ← Checkbox
│ └─────────────────────────────────────────┘ │
│                                             │
│ [Lưu thay đổi Button]                       │
└─────────────────────────────────────────────┘

WHEN APPROVED:
┌─────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────┐ │
│ │ ✓ Tài khoản đã được phê duyệt           │ │  ← Green card
│ │ ☑ Tài khoản đã được phê duyệt           │ │  ← Checkbox
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## 5. Action Dialog Examples

### Approve Action
```
Click [✓ Phê duyệt]
		↓
List updates immediately:
✅ Đã phê duyệt tài khoản John Doe
		↓
User row changes:
Status badge: "Chờ ⏳" → "Đã ✓"
Buttons disappear
		↓
Email sent to: john@...
Subject: "Tài khoản của bạn đã được phê duyệt"
```

### Reject Action
```
Click [✕ Từ chối]
		↓
Confirmation Dialog:
┌─────────────────────────────────────────┐
│ ⚠ Xác nhận                              │
│                                         │
│ Bạn chắc chắn muốn từ chối phê duyệt   │
│ tài khoản John Doe?                    │
│                                         │
│ [Hủy]  [Xác nhận]                      │
└─────────────────────────────────────────┘
		↓ (user clicks Xác nhận)
List updates:
❌ Đã từ chối phê duyệt tài khoản John Doe
		↓
User row changes:
Buttons remain (can re-approve)
```

---

## 6. Email Templates

### Registration Email (For Editors)
```
Subject: Tài khoản đang chờ duyệt

Body:
┌──────────────────────────────────────────┐
│ Xin chào John Doe,                       │
│                                          │
│ Tài khoản Editor của bạn đã được tạo    │
│ và đang chờ Admin phê duyệt.             │
│                                          │
│ Bạn sẽ được thông báo qua email khi      │
│ tài khoản được phê duyệt.                │
│                                          │
│ Cảm ơn bạn đã đăng ký!                   │
│                                          │
│ Vietnam Identity Team                    │
└──────────────────────────────────────────┘
```

### Approval Email
```
Subject: Tài khoản của bạn đã được phê duyệt

Body:
┌──────────────────────────────────────────┐
│ Xin chào John Doe,                       │
│                                          │
│ 🎉 Tài khoản của bạn đã được Admin      │
│ phê duyệt!                               │
│                                          │
│ Bạn có thể đăng nhập để sử dụng hệ     │
│ thống ngay bây giờ:                      │
│                                          │
│ [https://app.vietnamidentity.com/login]  │
│                                          │
│ Vietnam Identity Team                    │
└──────────────────────────────────────────┘
```

---

## 7. Complete User Journey - Visual Flow

```
NEW USER REGISTRATION
		│
		↓
	[Register Page]
		│
		├─→ Select "Editor (cần admin duyệt)"
		│       ↓
		├─→ Fill form & submit
		│       ↓
		├─→ ✅ Success: "Tài khoản đang chờ Admin phê duyệt"
		│       ↓
		└─→ Email: "Tài khoản đang chờ duyệt"

TRY TO LOGIN
		│
		↓
	[Login Page]
		│
		├─→ Enter credentials & submit
		│       ↓
		└─→ ❌ Error: "Tài khoản đang chờ Admin phê duyệt"

ADMIN REVIEW
		│
		↓
	[Admin Users Dashboard]
		│
		├─→ See pending user (orange badge)
		│
		├─→ Option A: Click [✓ Phê duyệt]
		│       ↓
		│   ✅ List updates
		│   📧 Email sent: "Tài khoản đã được phê duyệt"
		│
		└─→ Option B: Click [✕ Từ chối]
				↓
			Confirm dialog
				↓
			List updates
			User stays pending

USER LOGS IN (After Approval)
		│
		↓
	[Login Page]
		│
		├─→ Enter credentials
		│       ↓
		└─→ ✅ Success → Dashboard
```

---

## 8. Color Coding

```
Approval Status Badges:
┌─────────────────────┐
│ ✓ Đã phê duyệt     │ ← Green (#22c55e)
│ Background: #dcfce7 │
└─────────────────────┘

┌──────────────────────┐
│ ⏳ Chờ phê duyệt    │ ← Orange (#f59e0b)
│ Background: #fef3c7  │
└──────────────────────┘

Button Colors:
┌─────────────────┐
│ ✓ Phê duyệt    │ ← Green buttons for approval
│ ✕ Từ chối      │ ← Red buttons for rejection
└─────────────────┘
```

---

## 9. Responsive Design

```
DESKTOP (Full Dashboard)
┌─────────────────────────────────────────────────┐
│ Stats │ Stats │ Stats │ Stats                   │
├─────────────────────────────────────────────────┤
│ Filter | Filter                                 │
├─────────────────────────────────────────────────┤
│ Name | Email | Role | Status | Actions          │
│ John │ j...  │ Edt  │ ⏳   │ [✓][✕][✎][✕]    │
└─────────────────────────────────────────────────┘

TABLET (Stacked Filters)
┌──────────────────────────┐
│ Stats │ Stats            │
│ Stats │ Stats            │
├──────────────────────────┤
│ Filter                   │
│ Filter                   │
├──────────────────────────┤
│ Horizontal scroll table  │
└──────────────────────────┘

MOBILE (Vertical Stack)
┌──────────────────────┐
│ Stats (vertical)     │
├──────────────────────┤
│ Filters (vertical)   │
├──────────────────────┤
│ Cards (not table)    │
│ ┌──────────────────┐ │
│ │ John            │ │
│ │ john@...        │ │
│ │ Editor / ⏳     │ │
│ │ [✓][✕][✎][✕]   │ │
│ └──────────────────┘ │
└──────────────────────┘
```

---

## 10. Success/Error Messages

```
SUCCESS MESSAGES:
┌──────────────────────────────────────┐
│ ✅ Đã phê duyệt tài khoản John Doe  │
└──────────────────────────────────────┘
Green background, green checkmark

┌──────────────────────────────────────┐
│ ✅ Cập nhật user thành công!        │
└──────────────────────────────────────┘
Shown for 1.5 seconds before redirect

ERROR MESSAGES:
┌──────────────────────────────────────┐
│ ❌ Đăng ký thất bại                 │
│ Vui lòng thử lại                     │
└──────────────────────────────────────┘
Red text, prominent display

┌──────────────────────────────────────┐
│ ❌ Tài khoản đang chờ Admin phê duyệt│
└──────────────────────────────────────┘
Appears on login attempt
```

---

**This completes the UI/UX implementation for the User Approval Workflow!**

All visual elements are implemented and tested. The workflow is intuitive and follows Vietnamese UI conventions.

