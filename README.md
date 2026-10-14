# 🩸 LifeFlow — Real-Time Blood Link & Emergency Network

LifeFlow is a centralized, privacy-focused, and role-based blood donation and emergency network developed using native PHP, MySQL, HTML5/CSS3, Vanilla JavaScript, and AJAX. The platform bridges the communication gap between voluntary blood donors, emergency patients, and clinical administrators into a unified, life-saving workflow.

---

## 🌟 Core System Highlights

- **Role-Based Access Control (RBAC):** Strict session-authenticated route protection for 3 distinct roles (Admin, Donor, and Requester).
- **Asynchronous Data Exchange (AJAX):** Dynamic District-to-Thana cascading dropdowns and instant donor filtration without full-page reloads.
- **Smart Automated Cooldown:** Automatic calculation using MySQL `DATEDIFF()` to enforce the mandatory 90-day cooldown interval for donors.
- **Privacy First Shield:** Configurable phone number masking to protect voluntary blood donors from public data harvesting and harassment.
- **Medical Urgency Classification:** Real-time flagging system distinguishing between immediate critical needs and scheduled transfusions.

---

## 👥 Module Architecture & Features

### 1. 🛡️ System Administrator Portal
- **System Overview:** High-level metrics tracking total registered donors, verified active cases, and fulfilled emergency blood requests.
- **Prescription & Ticket Verification:** Audit uploaded hospital documentation and issue official "Verified Request" badges to prevent fraudulent requests.
- **User & Donor Directory:** Monitor user activity, review donation logs, and maintain system integrity with account moderation controls.

### 2. ❤️ Voluntary Donor Portal
- **Donation Cooldown Tracker:** Automated status updates reflecting eligibility countdowns based on the latest recorded donation date.
- **Nearby Emergency Alerts:** View urgent, geocentered blood requests filtered specifically for the donor's district and compatible blood type.
- **Privacy Shield Controls:** Toggle phone number visibility on or off; manage inbound contact requests securely within the platform.

### 3. 🙋‍♂️ Requester / Patient Portal
- **Emergency Dispatch Ticket:** Post urgent transfusion requests specifying required blood group, units, hospital address, and urgency tier (Critical vs. Scheduled).
- **Real-Time Donor Discovery:** Search available donors dynamically using responsive blood group and location filters powered by AJAX.
- **One-Click Ticket Resolution:** Close active tickets instantly by marking them as "Fulfilled" once blood is secured, preventing unnecessary donor outreach.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | HTML, CSS (Responsive Flexbox/Grid Layouts), Vanilla JavaScript (Form Validation & Dynamic DOM) |
| **Client-Server Async** | Vanilla AJAX / Fetch API (Dependent Dropdowns & Cooldown Calculators) |
| **Backend** | Native PHP (Session Authentication, Role Guards, Parameterized Prepared Statements) |
| **Database** | MySQL (Relational Schema, Foreign Key Constraints, Date Logic via `DATEDIFF()`) |
| **Server Environment** | Apache HTTP Server (XAMPP) |

---

## 🗄️ Database Entity Overview

The system operates on a normalized relational schema (`lifeflow_db`):
- `users` — Unified credential storage and role allocation (admin, donor, requester).
- `donor_profiles` — Extended donor attributes including blood group, last donation timestamp, and privacy preferences.
- `blood_requests` — Patient emergency tickets with hospital credentials, required units, and urgency flags.
- `request_verifications` — Administrative verification records and uploaded medical document references.
- `districts` & `thanas` — Normalized administrative location hierarchy supporting asynchronous cascading lookups.

---

## 🚀 Local Installation & Setup Guide

### 1. Clone the Repository
```bash
git clone [https://github.com/TanvirHosenNishat01-blip/WebTech_Project_Fall2026-27_GroupNumber-06-.git](https://github.com/TanvirHosenNishat01-blip/WebTech_Project_Fall2026-27_GroupNumber-06-.git)
