# User Approval Workflow Implementation

## Overview
The user approval workflow ensures that Editor accounts are reviewed and approved by Admins before they can access the system. This adds a layer of quality control for content creators.

---

## Features Implemented

### 1. **Registration with Approval Status**
- **Location**: `/register`
- **Behavior**:
  - Customers & Sellers: Automatically approved on registration
  - Editors: Created with `IsApproved = false`, must wait for Admin approval
  - Success message shows approval status for Editors

### 2. **Login with Approval Check**
- **Location**: `/login`
- **Validation**:
  - Editors cannot login if `IsApproved = false`
  - Error message: "Tài khoản của bạn đang chờ Admin phê duyệt"
  - Other roles can login regardless of approval status

### 3. **Admin Approval Dashboard**
- **Location**: `/admin/users`
- **Features**:
  - KPI Cards showing:
	- Total users
	- Approved users (green)
	- Pending users (orange)
	- Admin/Editor count
  - Filter by approval status: "Đã phê duyệt" / "Chờ phê duyệt"
  - Filter by role: Admin, Editor, Seller, Customer
  - Status badge on each user row
  - **NEW**: Approve/Reject buttons for pending users

### 4. **Quick Approval Actions**
- **Location**: User list table
- **Buttons** (appear only for unapproved users):
  - ✓ **Phê duyệt** (Approve): Green button, immediately approves the user
  - ✕ **Từ chối** (Reject): Red button, requires confirmation before rejecting
- **Real-time updates**: List refreshes immediately after action

### 5. **Admin User Edit Page**
- **Location**: `/admin/users/{id}/edit`
- **Approval Status Display**:
  - Highlighted card showing approval status
  - Green background if approved: "✓ Tài khoản đã được phê duyệt"
  - Orange background if pending: "⚠ Tài khoản đang chờ phê duyệt"
  - Checkbox toggle for manual approval

### 6. **Approval Email Notifications**
**When a user is approved**:
- Email sent to: User's email address
- Subject: "Tài khoản của bạn đã được phê duyệt"
- Body: Informs user they can now login and use the system

**When a user registers as Editor**:
- Email sent to: User's email address
- Subject: "Tài khoản đang chờ duyệt"
- Body: Informs user their account is pending Admin approval

---

## User Flow Diagrams

### Registration Flow
```
User fills Register Form
	↓
[Select Role]
	├─→ Customer/Seller → IsApproved = true → Auto-approved ✅
	└─→ Editor → IsApproved = false → Needs approval ⏳
		↓
	Success message shown
	"Tài khoản đang chờ Admin phê duyệt"
	↓
	Redirect to Login
	↓
	Email sent: "Account pending review"
```

### Editor Login Flow
```
Editor enters credentials
	↓
[Check IsApproved]
	├─→ IsApproved = true → Login success ✅
	└─→ IsApproved = false → Login blocked ❌
		Error: "Tài khoản đang chờ Admin phê duyệt"
```

### Admin Approval Flow
```
Admin Dashboard (/admin/users)
	↓
[View pending users - orange badge]
	↓
[Click "✓ Phê duyệt" button]
	↓
Backend: UserService.UpdateAsync()
	├─→ Set IsApproved = true
	├─→ Save to database
	└─→ Send approval email
		↓
	List refreshes automatically
	↓
	Success message: "✅ Đã phê duyệt tài khoản [Name]"
```

---

## Technical Implementation

### Backend Changes

#### 1. AuthResponseDto.cs
```csharp
public class AuthResponseDto
{
	public Guid UserId { get; set; }
	public string FullName { get; set; }
	public string Email { get; set; }
	public UserRole Role { get; set; }
	public bool IsApproved { get; set; }  // NEW
	public string AccessToken { get; set; }
	public DateTime ExpiresAt { get; set; }
}
```

#### 2. AuthService.cs
- **RegisterAsync()**: Sets `IsApproved = false` for Editors only
- **LoginAsync()**: Blocks login if role is Editor and `IsApproved = false`
- **CreateAuthResponse()**: Includes `IsApproved` in response
- **Email notifications**: Sends appropriate messages on registration and approval

#### 3. UserService.cs
- **UpdateAsync()**: Already sends approval email when `IsApproved` changes from false to true

#### 4. UsersController.cs
- **PUT /api/users/{id}**: Accepts `UserAdminUpdateDto` with `IsApproved` field

---

### Frontend Changes

#### 1. userApi.js
```javascript
approve: (id) => axiosClient.put(`/api/users/${id}`, { isApproved: true }),
reject: (id) => axiosClient.put(`/api/users/${id}`, { isApproved: false })
```

#### 2. AdminUsersDashboard.jsx
- **New handlers**:
  - `handleApprove(id, user)`: Updates user and shows success message
  - `handleReject(id, user)`: Requires confirmation before rejecting
- **New buttons**: ✓ Approve and ✕ Reject appear for pending users only
- **Real-time updates**: List refreshes after each action

#### 3. AdminUserEdit.jsx
- **Enhanced approval status display**: Card with color-coded background
- **Clear visual indicators**: Shows current status at a glance

#### 4. RegisterPage.jsx
- **Success message**: Shows approval status for Editors
- **Feedback**: "Tài khoản của bạn đang chờ Admin phê duyệt"

#### 5. LoginPage.jsx
- **Approval check**: Blocks unapproved Editors from logging in
- **Error message**: "Tài khoản của bạn đang chờ Admin phê duyệt"

---

## API Endpoints

### Check Approval Status
```
GET /api/auth/login
POST {
  "email": "user@example.com",
  "password": "password"
}

Response (success):
{
  "userId": "guid",
  "fullName": "Name",
  "email": "user@example.com",
  "role": 1,          // Editor
  "isApproved": false // ← Check this
  "accessToken": "...",
  "expiresAt": "2025-..."
}

Error (if Editor not approved):
{
  "message": "Chưa được xác nhận tài khoản bởi admin."
}
```

### Approve User
```
PUT /api/users/{id}
Authorization: Bearer {token}

Payload:
{
  "fullName": "Name",
  "email": "user@example.com",
  "role": 1,
  "isApproved": true  // ← Set to true
}

Response:
{
  "id": "guid",
  "fullName": "Name",
  "email": "user@example.com",
  "role": 1,
  "isApproved": true
}
```

---

## User Role Approval Rules

| Role | Default Approved | Can Login While Unapproved | Requires Approval |
|------|-----------------|--------------------------|-------------------|
| Admin | true | - | - |
| Editor | false | ❌ No | ✅ Yes |
| Seller | true | ✅ Yes | ❌ No |
| Customer | true | ✅ Yes | ❌ No |

---

## Email Templates

### 1. Account Pending Approval (Registration)
**Subject**: Tài khoản đang chờ duyệt

**Body**:
```
Xin chào [FullName],

Tài khoản Editor của bạn đã được tạo và đang chờ Admin phê duyệt.
Bạn sẽ được thông báo qua email khi tài khoản được phê duyệt.

Cảm ơn bạn đã đăng ký!
```

### 2. Account Approved
**Subject**: Tài khoản của bạn đã được phê duyệt

**Body**:
```
Xin chào [FullName],

Tài khoản của bạn đã được Admin phê duyệt.
Bạn có thể đăng nhập để sử dụng hệ thống.

Link đăng nhập: [App URL]/login
```

---

## Testing Checklist

- [ ] Register as Editor → Should show pending message
- [ ] Register as Customer → Should show approved message
- [ ] Editor login (unapproved) → Should fail with approval message
- [ ] Editor login (approved) → Should succeed
- [ ] Admin approve Editor → Should update immediately
- [ ] Admin reject Editor → Should update immediately
- [ ] Approval email → Should be sent to user
- [ ] Edit user → Should allow toggling IsApproved
- [ ] Filters → Should show correct pending/approved counts

---

## Future Enhancements

1. **Bulk Approval**: Approve multiple users at once
2. **Rejection Reasons**: Allow admin to provide feedback when rejecting
3. **Auto-Approval**: Time-based auto-approval after a certain period
4. **Approval History**: Track who approved/rejected and when
5. **Approval Deadline**: Require admins to act within X days
6. **Role-based Email**: Different templates for different roles
7. **SMS Notifications**: Send approval status via SMS as well
8. **Dashboard Widget**: Show pending approvals on admin dashboard

