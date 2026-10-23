# 🩸 LifeFlow: Real-Time Blood Link & Emergency Network
 
LifeFlow is a centralized, privacy-focused, and role-based blood donation and emergency network developed using native PHP, MySQL, HTML5/CSS3, Vanilla JavaScript, and AJAX. The platform bridges the communication gap between voluntary blood donors, emergency patients, hospital authorities, and clinical administrators into a unified, life-saving workflow.
 
---
 
🌟 **Core System Highlights**<br>
 
🔐 Role-Based Access Control (RBAC): Strict session-authenticated route protection for 4 distinct roles (System Administrator, Voluntary Donor, Patient/Requester, and Hospital/Blood Bank Authority).<br>
⚡ Asynchronous Data Exchange (AJAX): Dynamic District-to-Thana cascading dropdowns and instant donor filtration without full-page reloads.<br>
⏱️ Smart Automated Cooldown: Automated calculation using MySQL DATEDIFF() to enforce the mandatory 90-day cooldown interval for voluntary donors.<br>
🛡️ Privacy First Shield: Configurable phone number masking to safeguard voluntary blood donors against unauthorized data scraping and spam calls..<br>
💉 Institutional Blood Inventory: Dedicated hospital portal for monitoring reserve stock units, blood group availability, and verifying clinical requisitions..<br>
🚨 Medical Urgency Classification: Real-time visual tagging system distinguishing between immediate critical needs and scheduled transfusions..<br>
 
---
 
👥 **Module Architecture & Features**
 
🛡️ 1. **System Administrator Portal**<br>
📊 Telemetry & Analytics: High-level metrics tracking total registered donors, verified active cases, institutional blood banks, and fulfilled emergency blood requests..<br>
📑 Institutional & Prescription Audit: Review uploaded hospital documentation and verify registered blood bank credentials to mitigate fraud..<br>
👥 User & Donor Directory: Monitor user activity, inspect recorded donation logs, and maintain system integrity with account suspension controls.<br>
 
❤️ 2.**Voluntary Donor Portal**
<br>
⏳ Donation Cooldown Tracker: Automated status counter reflecting eligibility countdowns computed from the latest recorded donation date..<br>
📍 Geo-Matched Emergency Alerts: View urgent, location-filtered blood requests targeted specifically to the donor's district, thana, and compatible blood group..<br>
🔒 Privacy Shield Controls: Toggle direct contact number visibility on or off; manage incoming contact tickets securely within the portal..<br>
 
🙋‍♂️ 3. **Requester / Patient Portal**
🚑 Emergency Dispatch Ticket: Post urgent transfusion requests specifying required blood group, units, hospital address, contact details, and urgency tier (Critical vs. Scheduled)..<br>
🔍 Real-Time Donor Discovery: Search available donors dynamically using responsive blood group, district, and thana filters powered by AJAX..<br>
✅ One-Click Ticket Resolution: Mark active tickets as "Fulfilled" once blood is secured, instantly clearing the pipeline and preventing redundant donor outreach.
.<br>
🏥 4. **Hospital / Blood Bank Portal**
<br>
🩸 Reserve Stock Inventory: Maintain and update real-time blood stock counts across all categories (A+, A-, B+, B-, AB+, AB-, O+, O-)..<br>
📋 Direct Requisition Verification: Inspect patient blood demands directly, cross-reference internal stock availability, and validate urgent requisitions..<br>
📢 Emergency Stock Broadcasts: Dispatch critical shortage alerts to registered voluntary donors whenever blood bank reserves hit a low-threshold warning..<br>
 
---
 
🛠️ **Technology Stack**
 
🎨 Frontend Layout & Styling: HTML5 Semantic Markup, Custom CSS3 (Responsive Flexbox and Grid Layouts).<br>
⚙️ Client Scripting & Async: Vanilla JavaScript (ES6+), Fetch API / Vanilla AJAX (Dynamic Dropdowns, Validation & Cooldown Logic).<br>
🖥️ Backend Application Layer: Native PHP 8.x (MVC Architecture, Session Management, Parameterized Prepared Statements).<br>
🗄️ Relational Database: MySQL (Referential Integrity, Foreign Keys, Date Computations via DATEDIFF()).<br>
🚀 Deployment & Server Environment: Apache HTTP Server (XAMPP Development Environment).<br>
 
## 📂 Project Directory Structure

```text
├── Controller/
│   ├── AdminController.php
│   ├── ApiController.php
│   ├── AuthController.php
│   ├── DonorController.php
│   ├── HospitalController.php
│   └── RequesterController.php
├── Model/
│   ├── BloodRequestModel.php
│   ├── db.php
│   ├── DonorModel.php
│   ├── HospitalModel.php
│   ├── LocationModel.php
│   ├── VerificationModel.php
│   └── UserModel.php
├── View/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── donor.js
│   │   ├── hospital.js
│   │   ├── requester.js
│   │   └── validation.js
│   ├── admin_dashboard.php
│   ├── donor_dashboard.php
│   ├── hospital_dashboard.php
│   ├── requester_dashboard.php
│   ├── post_request.php
│   ├── search_donors.php
│   ├── login.php
│   ├── logout.php
│   └── register.php
├── config/
│   └── db_config.php
├── db/
│   └── lifeflow.sql
├── uploads/
├── .gitignore
├── README.md
└── index.php
 
```
 
---
 
## 🗄️Database Entity Overview
 
The system operates on a normalized relational schema (`lifeflow_db`):
 
* `users` — Unified credential storage and role allocation (`admin`, `donor`, `requester`, `hospital`).
* `donor_profiles` — Extended donor attributes including blood group, last donation timestamp, and privacy preferences.
* `hospital_inventory` — Real-time blood unit storage categorized by hospital reference and blood group.
* `blood_requests` — Patient emergency tickets with hospital credentials, required units, and urgency flags.
* `request_verifications` — Administrative verification records and uploaded medical document references.
* `districts` & `thanas` — Normalized administrative location hierarchy supporting asynchronous cascading lookups.
 
---
 
## 🚀 Local Installation & Setup Guide
 
### 1. Clone the Repository
 
```bash
git clone [https://github.com/TanvirHosenNishat01-blip/WebTech_Project_Fall2026-27_GroupNumber-06-.git](https://github.com/TanvirHosenNishat01-blip/WebTech_Project_Fall2026-27_GroupNumber-06-.git)
 
```
 
### 2. Move to Web Server Directory
 
Copy the repository into your local web server root:
 
* **XAMPP:** `C:/xampp/htdocs/lifeflow`
 
### 3. Database Import
 
1. Open **phpMyAdmin** (`http://localhost/phpmyadmin`).
2. Create a database named `lifeflow_db`.
3. Import the `db/lifeflow.sql` file.
 
### 4. Database Connection Setup
 
Check `config/db_config.php` and verify credentials:
 
```php
<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'lifeflow_db');
?>
 