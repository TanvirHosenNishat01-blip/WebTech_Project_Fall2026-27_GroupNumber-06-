# 🩸 LifeFlow: Real-Time Blood Link & Emergency Network
A static web project for a Web Technologies course. Donors, patients, hospitals, and admins share one network so an emergency blood request can be posted, accepted, stocked, and verified in the same place.

The site uses only HTML, CSS, and JavaScript. There is no server and no database.

## How to open

Open `index.html` in a browser. That page is the entry point for every user.

If the browser blocks local files, start a small server from this folder and open `http://127.0.0.1:8766/index.html`:

```bash
python -m http.server 8766
```

## Homepage

The home page states the objective in one line, then shows the four steps:

1. A patient posts the blood need.
2. A donor accepts and gives blood.
3. A hospital keeps the bags ready.
4. An admin verifies the request.

Each step highlights the matching portal. **Open** enters that role.

## Roles

| Role | Starts at | What they do |
| --- | --- | --- |
| Admin | `Admin/Pages/AdminRegistration.html` | Register, see dashboard counts, verify or delete requests, suspend users, add or remove hospitals |
| Donor | `Volunteer/Pages/VolunteerHome.html` | Register, log in, accept a pending request, view donation history |
| Patient | `Patient/Pages/PatientRegistration.html` | Register, post a blood request, search donors, see request history |
| Hospital | `Blood Bank/Pages/HospitalRegistration.html` | Register the hospital, update bag stock, send a requisition, broadcast an emergency |

Each role has its own pages, stylesheet, and scripts:

```
index.html
Admin/        Pages, Design/Style.css, JS
Volunteer/    Pages, Design/Style.css, JS, Images
Patient/      Pages, Design/Style.css, JS
Blood Bank/   Pages, Design/Style.css, JS
```

Pages load CSS and JS from the folder above them (`../Design`, `../JS`). Links back to the home page use `../../index.html`.

## How the roles connect

All four portals read and write the same browser storage keys:

A patient request appears on the donor page while it is pending. When a donor accepts it, the status becomes Accepted for the admin and for the patient. A hospital registration and added bags show up in the admin hospital list. The admin can mark a request Verified or remove it.

The first visit to an admin page fills sample donors, hospitals, and requests only when those keys are still empty. Later saves are not overwritten.

## Forms

Registration and request forms use a table layout. Each page checks the fields in JavaScript before it saves. Admin id format is `ADM-` followed by four digits, for example `ADM-1001`.
