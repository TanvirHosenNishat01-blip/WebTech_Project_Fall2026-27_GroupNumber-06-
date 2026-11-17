// 1. Admin registration form validation and submission
function validateAdminRegistration() {
    let isValid = true;

    // Read input values from DOM
    const fullName = document.getElementById("fullName").value.trim();
    const adminId = document.getElementById("adminId").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const adminRole = document.getElementById("adminRole").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Clear previous error messages
    cleanAllErrors();

    // Check full name
    if (fullName === "") {
        document.getElementById("err_fullName").textContent = "Full name is required.";
        isValid = false;
    }

    // Check admin ID pattern: ADM-XXXX
    const idRegex = /^ADM-\d{4}$/;
    if (!idRegex.test(adminId)) {
        document.getElementById("err_adminId").textContent = "ID must be in format ADM-1234.";
        isValid = false;
    }

    // Check email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("err_email").textContent = "Enter a valid email address.";
        isValid = false;
    }

    // Check Bangladeshi 11-digit phone number
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById("err_phone").textContent = "Enter valid 11-digit phone number.";
        isValid = false;
    }

    // Check role selection
    if (adminRole === "") {
        document.getElementById("err_adminRole").textContent = "Please select an admin role.";
        isValid = false;
    }

    // Check password minimum length
    if (password.length < 6) {
        document.getElementById("err_password").textContent = "Password must be at least 6 characters.";
        isValid = false;
    }

    // Check password confirmation
    if (password !== confirmPassword) {
        document.getElementById("err_confirmPassword").textContent = "Passwords do not match.";
        isValid = false;
    }

    // Store admin and redirect on success
    if (isValid) {
        const newAdmin = { fullName, adminId, email, phone, adminRole };
        localStorage.setItem("lf_active_admin", JSON.stringify(newAdmin));
        alert("Registration Successful! Redirecting to Admin Dashboard.");
        window.location.href = "AdminDashboard.html";
    }

    return false;
}

// Clear all error message spans
function cleanAllErrors() {
    const errorSpans = document.querySelectorAll(".error-msg");
    errorSpans.forEach(span => span.textContent = "");
}

// 2. Load metrics data for Admin Dashboard
function loadAdminDashboard() {
    const requests = JSON.parse(localStorage.getItem("lf_requests")) || [];
    const users = JSON.parse(localStorage.getItem("lf_users")) || [];
    const hospitals = JSON.parse(localStorage.getItem("lf_hospitals")) || [];

    // Calculate metric counters
    const totalDonors = users.filter(u => u.role === "Donor").length;
    const pendingReqs = requests.filter(r => r.status === "Pending").length;
    const verifiedReqs = requests.filter(r => r.status === "Verified").length;

    // Render metrics to the DOM
    if (document.getElementById("metric_donors")) {
        document.getElementById("metric_donors").textContent = totalDonors;
        document.getElementById("metric_hospitals").textContent = hospitals.length;
        document.getElementById("metric_pending").textContent = pendingReqs;
        document.getElementById("metric_verified").textContent = verifiedReqs;
    }
}

// 3. Render and handle requests table in Verify Requests page
function loadRequestsTable() {
    const tableBody = document.getElementById("requestTableBody");
    if (!tableBody) return;

    const requests = JSON.parse(localStorage.getItem("lf_requests")) || [];
    tableBody.innerHTML = "";

    requests.forEach((req, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${req.id}</td>
            <td>${req.patient}</td>
            <td>${req.hospital}</td>
            <td><strong>${req.bloodGroup}</strong></td>
            <td>${req.units}</td>
            <td>${req.urgency === "Critical" ? '<span style="color:red; font-weight:bold;">Critical</span>' : 'Scheduled'}</td>
            <td><span class="badge ${req.status === 'Verified' ? 'badge-verified' : 'badge-pending'}">${req.status}</span></td>
            <td>
                ${req.status === "Pending" ? `<button class="btn btn-sm btn-success" onclick="verifyRequest(${index})">Verify</button>` : 'Verified'}
                <button class="btn btn-sm btn-danger" onclick="deleteRequest(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Update request status to Verified
function verifyRequest(index) {
    const requests = JSON.parse(localStorage.getItem("lf_requests")) || [];
    requests[index].status = "Verified";
    localStorage.setItem("lf_requests", JSON.stringify(requests));
    loadRequestsTable();
}

// Remove request from storage and re-render
function deleteRequest(index) {
    const requests = JSON.parse(localStorage.getItem("lf_requests")) || [];
    requests.splice(index, 1);
    localStorage.setItem("lf_requests", JSON.stringify(requests));
    loadRequestsTable();
}

// 4. Render and handle user list in Manage Users page
function loadUsersTable() {
    const tableBody = document.getElementById("userTableBody");
    if (!tableBody) return;

    const users = JSON.parse(localStorage.getItem("lf_users")) || [];
    tableBody.innerHTML = "";

    users.forEach((u, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${u.id}</td>
            <td>${u.name}</td>
            <td>${u.role}</td>
            <td>${u.bloodGroup}</td>
            <td>${u.contact}</td>
            <td><span class="badge ${u.status === 'Active' ? 'badge-active' : 'badge-suspended'}">${u.status}</span></td>
            <td>
                <button class="btn btn-sm ${u.status === 'Active' ? 'btn-danger' : 'btn-success'}" onclick="toggleUserStatus(${index})">
                    ${u.status === 'Active' ? 'Suspend' : 'Activate'}
                </button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Toggle user status between Active and Suspended
function toggleUserStatus(index) {
    const users = JSON.parse(localStorage.getItem("lf_users")) || [];
    users[index].status = users[index].status === "Active" ? "Suspended" : "Active";
    localStorage.setItem("lf_users", JSON.stringify(users));
    loadUsersTable();
}

// 5. Render and handle hospitals table in Manage Hospitals page
function loadHospitalsTable() {
    const tableBody = document.getElementById("hospitalTableBody");
    if (!tableBody) return;

    const hospitals = JSON.parse(localStorage.getItem("lf_hospitals")) || [];
    tableBody.innerHTML = "";

    hospitals.forEach(h => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${h.id}</td>
            <td>${h.name}</td>
            <td>${h.district}</td>
            <td>${h.thana}</td>
            <td>${h.stockUnits} Bags</td>
            <td><span class="badge badge-verified">${h.status}</span></td>
        `;
        tableBody.appendChild(tr);
    });
}

// Add a new hospital record to localStorage and re-render
function addHospital() {
    const name = document.getElementById("hospName").value.trim();
    const district = document.getElementById("hospDistrict").value.trim();
    const thana = document.getElementById("hospThana").value.trim();
    const stockUnits = parseInt(document.getElementById("hospStock").value.trim());

    // Validate inputs
    if (!name || !district || !thana || isNaN(stockUnits)) {
        alert("Please fill all hospital fields correctly.");
        return;
    }

    const hospitals = JSON.parse(localStorage.getItem("lf_hospitals")) || [];
    const newHospital = {
        id: "HOSP-0" + (hospitals.length + 1),
        name,
        district,
        thana,
        stockUnits,
        status: "Approved"
    };

    hospitals.push(newHospital);
    localStorage.setItem("lf_hospitals", JSON.stringify(hospitals));
    loadHospitalsTable();

    // Clear form inputs
    document.getElementById("hospName").value = "";
    document.getElementById("hospDistrict").value = "";
    document.getElementById("hospThana").value = "";
    document.getElementById("hospStock").value = "";
}
