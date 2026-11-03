// Initialize default dummy data into browser localStorage if not already present
function initializeMockData() {
    // 1. Setup emergency transfusion requests
    if (!localStorage.getItem("lf_requests")) {
        const dummyRequests = [
            { id: "REQ-101", patient: "Kamal Uddin", hospital: "Dhaka Medical College", bloodGroup: "O+", units: 2, urgency: "Critical", status: "Pending" },
            { id: "REQ-102", patient: "Sadia Sultana", hospital: "Kurmitola General Hospital", bloodGroup: "A+", units: 1, urgency: "Scheduled", status: "Pending" },
            { id: "REQ-103", patient: "Tanvir Ahmed", hospital: "Evercare Hospital", bloodGroup: "B-", units: 3, urgency: "Critical", status: "Verified" }
        ];
        localStorage.setItem("lf_requests", JSON.stringify(dummyRequests));
    }

    // 2. Setup registered donors and users
    if (!localStorage.getItem("lf_users")) {
        const dummyUsers = [
            { id: "DON-01", name: "Fahim Hasan", role: "Donor", bloodGroup: "O+", contact: "01711112233", status: "Active" },
            { id: "DON-02", name: "Sumaiya Akter", role: "Donor", bloodGroup: "B+", contact: "01822334455", status: "Active" },
            { id: "REQ-01", name: "Rahim Chowdhury", role: "Requester", bloodGroup: "A-", contact: "01933445566", status: "Active" }
        ];
        localStorage.setItem("lf_users", JSON.stringify(dummyUsers));
    }

    // 3. Setup partner hospitals and inventory
    if (!localStorage.getItem("lf_hospitals")) {
        const dummyHospitals = [
            { id: "HOSP-01", name: "Popular Blood Bank", district: "Dhaka", thana: "Dhanmondi", stockUnits: 45, status: "Approved" },
            { id: "HOSP-02", name: "Central Hospital", district: "Dhaka", thana: "Green Road", stockUnits: 18, status: "Approved" }
        ];
        localStorage.setItem("lf_hospitals", JSON.stringify(dummyHospitals));
    }
}

// Execute initial storage setup on script load
initializeMockData();
