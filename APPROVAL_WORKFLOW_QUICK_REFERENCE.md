# User Approval Workflow - Quick Reference

## What Changed?

### ✅ Frontend Features
1. **Register Page** (`/register`)
   - Shows status message after registration
   - Editors see: "Tài khoản đang chờ Admin phê duyệt"

2. **Login Page** (`/login`)
   - Blocks unapproved Editors with error message
   - Shows: "Tài khoản của bạn đang chờ Admin phê duyệt"

3. **Admin Users Dashboard** (`/admin/users`)
   - **New Buttons**: "✓ Phê duyệt" and "✕ Từ chối" for pending users
   - **Status Colors**: 
	 - Green badge: "Đã phê duyệt" ✅
	 - Orange badge: "Chờ phê duyệt" ⏳
   - **Filters**: Can filter by "Đã phê duyệt" or "Chờ phê duyệt"

4. **Admin User Edit Page** (`/admin/users/{id}/edit`)
   - **Approval Card**: Prominently displays approval status
   - Toggle checkbox to change approval status
   - Success message shows after save

### ✅ Backend Features
1. **Registration**
   - Editors: `IsApproved = false` by default
   - Customers/Sellers: `IsApproved = true` by default
   - Sends email about pending approval

2. **Login Validation**
   - Blocks unapproved Editors
   - Allows other roles
   - Returns `isApproved` flag in response

3. **User Update**
   - Sends approval email when `IsApproved` changes to true
   - Logs the change for audit trail

---

## Step-by-Step User Stories

### Story 1: Editor Registration & Approval
```
1. User visits /register
2. Selects role "Editor (cần admin duyệt)"
3. Fills form and submits
4. Gets message: "✅ Đăng ký thành công! Tài khoản của bạn đang chờ Admin phê duyệt."
5. Email received: "Tài khoản đang chờ duyệt"
6. User tries to login → Gets error: "❌ Tài khoản đang chờ Admin phê duyệt"
7. Admin approves at /admin/users → User receives approval email
8. User can now login successfully
```

### Story 2: Admin Quick Approval
```
1. Admin visits /admin/users
2. Sees orange badge "Chờ phê duyệt" on user
3. Clicks green button "✓ Phê duyệt"
4. Gets message: "✅ Đã phê duyệt tài khoản [Name]"
5. User list updates immediately
6. User receives approval email
```

### Story 3: Admin Detailed Approval
```
1. Admin clicks "Sửa" on pending user
2. Visits /admin/users/{id}/edit
3. Sees orange card: "⚠ Tài khoản đang chờ phê duyệt"
4. Toggles checkbox to "✓ Tài khoản đã được phê duyệt"
5. Clicks "Lưu thay đổi"
6. Gets message: "✅ Cập nhật user thành công!"
7. Redirected back to user list
```

---

## Database Schema (No Changes)

The `User` entity already has the field:
```csharp
public bool IsApproved { get; set; } = true;
```

Default value:
- `true` for Admin, Customer, Seller roles
- `false` for Editor role (set in registration logic)

---

## API Calls Changed

### 1. Login Response - NEW FIELD
```diff
GET /api/auth/login
- Before: { userId, fullName, email, role, accessToken, expiresAt }
+ After:  { userId, fullName, email, role, isApproved, accessToken, expiresAt }
```

### 2. User Approval - NEW METHODS
```javascript
userApi.approve(id)      // PUT /api/users/{id} with { isApproved: true }
userApi.reject(id)       // PUT /api/users/{id} with { isApproved: false }
```

---

## Configuration Notes

**No new configuration needed!** Everything uses existing:
- JWT settings (expiration, key, etc.)
- Email SMTP settings
- Database connection

---

## Role & Permission Matrix

| User Type | Register | Approve Needed? | Can Access Admin | Can Create Content |
|-----------|----------|----------------|------------------|-------------------|
| Admin | Manual | No | ✅ Yes | N/A |
| Editor | Self | ✅ Yes | ✅ Yes (if approved) | ✅ Yes (if approved) |
| Seller | Self | No | ❌ No | ✅ Yes |
| Customer | Self | No | ❌ No | ❌ No |

---

## Troubleshooting

### Problem: Editor can login without approval
**Solution**: Check that login validation is in place:
```csharp
if (user.Role == UserRole.Editor && !user.IsApproved)
	throw new InvalidOperationException("Chưa được xác nhận...");
```

### Problem: Approval email not sent
**Solution**: Check SMTP settings in `appsettings.json`:
```json
"Email": {
  "Smtp": {
	"Host": "smtp.gmail.com",
	"Port": 587,
	"FromEmail": "your-email@gmail.com",
	"FromName": "Vietnam Identity",
	"EnableSsl": true,
	"Username": "...",
	"Password": "..."
  }
}
```

### Problem: Buttons don't appear in user list
**Solution**: Verify buttons only show if `!user.isApproved`:
```jsx
{!user.isApproved && (
  <>
	<button onClick={() => handleApprove(user.id, user)}>✓ Phê duyệt</button>
	<button onClick={() => handleReject(user.id, user)}>✕ Từ chối</button>
  </>
)}
```

---

## Files Modified

### Backend
- `Application/DTOs/AuthDTOs/AuthResponseDto.cs` - Added `IsApproved`
- `Application/Services/AuthService.cs` - Added validation & email logic

### Frontend
- `frontend/src/api/userApi.js` - Added `approve()` and `reject()` methods
- `frontend/src/pages/RegisterPage.jsx` - Added success message & feedback
- `frontend/src/pages/LoginPage.jsx` - Added approval check
- `frontend/src/pages/AdminUsersDashboard.jsx` - Added approve/reject buttons
- `frontend/src/pages/AdminUserEdit.jsx` - Enhanced approval status display

---

## Performance Considerations

- ✅ Approval check happens at login (one-time per session)
- ✅ Email sending is async (non-blocking)
- ✅ Frontend updates are immediate (optimistic UI)
- ✅ No additional database queries needed

---

## Security Notes

- ✅ Editors cannot bypass approval by manipulating JWT
- ✅ Approval check happens server-side on every login
- ✅ Only Admins can modify approval status (controller has [Authorize(Roles="0,Admin")])
- ✅ Email verification sends to verified SMTP

---

## Summary of Changes

| Feature | Before | After |
|---------|--------|-------|
| Editor Registration | Auto-approved | Pending approval ⏳ |
| Editor Login (unapproved) | Allowed | Blocked ❌ |
| Admin Dashboard | View only | + Approve/Reject buttons ✅ |
| Email on Registration | Generic | Role-specific |
| Email on Approval | None | Sent ✅ |
| User Status Display | Simple checkbox | Color-coded card |

