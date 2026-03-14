# Dynamic RBAC System — Full-Stack

A **role-based access control (RBAC)** system with **dynamic permissions**, where access is controlled **per permission atom**, not by static role labels.  
Admins and Managers can assign permissions dynamically, enforce grant ceilings, and view a full audit trail.

---

## 🚀 Features

### Auth System
- Login / Logout with **JWT & Refresh Tokens**  
- Session blacklist for logout  
- Brute-force rate limiting  

### User Management
- Full **CRUD**: create, update, read users  
- **Suspend / Ban / Activate** lifecycle  
- Role assignment  
- Custom user permissions  

### Permissions & Roles
- Create / Read **permissions**  
- Assign **permissions to roles**  
- Assign **permissions to users**  
- **Grant ceiling** enforcement (cannot assign more than your own permissions)  

### Dynamic UI Features
- **Visual permission editor**  
- **Dynamic routing** via Next.js middleware  
- **Dynamic sidebar** based on user’s resolved permissions  

### Core Modules
- Dashboard  
- Users  
- Leads  
- Tasks  
- Reports  
- Audit Log  
- Customer Portal  
- Settings  

---

## 🛠 Tech Stack

| Layer       | Technology                                   |
|------------|----------------------------------------------|
| Frontend   | Next.js 14 (App Router) + TypeScript        |
| Backend    | Node.js + Express.js + TypeScript + Mongoose |
| Database   | MongoDB                                      |
| Auth       | JWT (Access + Refresh Tokens)               |

---

## 📦 Project Setup

# Auth
Method	Endpoint	Description	Body / Query	Response Example
POST	/api/v1/auth/login	Login user, returns access & refresh tokens	{ "email": "user@example.com", "password": "123456" }	{ "accessToken": "...", "refreshToken": "..." }
POST	/api/v1/auth/refresh	Refresh access token	{ "refreshToken": "<token>" }	{ "accessToken": "..." }
POST	/api/v1/auth/logout	Logout / blacklist token	{ "refreshToken": "<token>" }	{ "success": true }


# Users
Method	Endpoint	Description	Body / Query	Response Example
POST	/api/v1/users	Create user	{ "name": "", "email": "", "password": "", "role": "<roleId>" }	{ "success": true, "data": { "_id": "...", "name": "...", "email": "...", "role": "...", "status": "active" } }
GET	/api/v1/users	Get all users	-	{ "success": true, "data": [ {...}, {...} ] }
GET	/api/v1/users/:id	Get single user	-	{ "success": true, "data": { "_id": "...", "name": "...", "email": "..."} }
PUT	/api/v1/users/:id	Update user	{ "name": "", "email": "", "password": "" }	{ "success": true, "data": { "_id": "...", "name": "...", "email": "..."} }
PATCH	/api/v1/users/:id/suspend	Suspend user	-	{ "success": true, "data": { "status": "suspended" } }
PATCH	/api/v1/users/:id/ban	Ban user	-	{ "success": true, "data": { "status": "banned" } }
PATCH	/api/v1/users/:id/activate	Activate user	-	{ "success": true, "data": { "status": "active" } }



# Permissions
Method	Endpoint	Description	Body / Query	Response Example
POST	/api/v1/permissions	Create new permission atom	{ "name": "users.create", "module": "Users", "description": "" }	{ "success": true, "data": { "_id": "...", "name": "users.create", "module": "Users" } }
GET	/api/v1/permissions	Get all permissions	-	{ "success": true, "data": [ {...}, {...} ] }
GET	/api/v1/permissions/:userId	Get a user’s resolved permissions	-	{ "success": true, "data": ["permissionId1","permissionId2"] }
PUT	/api/v1/permissions/:userId	Update user’s custom permissions	{ "permissions": ["permissionId1", "permissionId2"] }	{ "success": true, "data": { "_id": "...", "customPermissions": ["permissionId1"] } }


# Roles
Method	Endpoint	Description	Body / Query	Response Example
POST	/api/v1/roles	Create role	{ "name": "Manager", "permissions": ["permissionId"] }	{ "success": true, "data": { "_id": "...", "name": "Manager", "permissions": ["permissionId"] } }
GET	/api/v1/roles	Get all roles	-	{ "success": true, "data": [ {...}, {...} ] }
GET	/api/v1/roles/:id	Get single role	-	{ "success": true, "data": { "_id": "...", "name": "Manager" } }
PUT	/api/v1/roles/:id	Update role permissions	{ "permissions": ["permissionId1","permissionId2"] }	{ "success": true, "data": { "_id": "...", "permissions": ["permissionId1","permissionId2"] } }

### Clone repository
```bash
git clone <your-repo-url>
cd rbac-backend
