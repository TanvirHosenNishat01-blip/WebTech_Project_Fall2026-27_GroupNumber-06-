
/* COMMON HELPER FUNCTIONS */

function showError(id, message) {
    var element = document.getElementById(id);

    if (element != null) {
        element.innerHTML = message;
    }
}

function getValue(id) {
    var element = document.getElementById(id);

    if (element != null) {
        return element.value;
    }

    return "";
}


/* 1. PATIENT REGISTRATION */

// Save button
function saveProfile() {

    // Registration page
    if (document.getElementById("ConfirmPassword") != null) {

        var valid = registrationCollectData();

        if (valid == true) {
            showError("Message", "Profile saved successfully!");
        }

        return false;
    }

    // Post Blood Request page
    if (document.getElementById("RequiredDate") != null) {

        var valid = requestCollectData();

        if (valid == true) {
            showError("Message", "Blood request submitted successfully!");
        }

        return false;
    }

    // Search Donors page
    if (document.getElementById("district") != null) {

        return searchCollectData();
    }

    return false;
}


// Sign Up button
function signUp() {

    var valid = registrationCollectData();

    if (valid == true) {
        window.location.href = "PatientDashboard.html";
    }

    return false;
}


// Registration validation collection
function registrationCollectData() {

    var valid = true;

    if (validName() == false) valid = false;
    if (validAge() == false) valid = false;
    if (validateEmail() == false) valid = false;
    if (ValidateGender() == false) valid = false;
    if (validatePhone() == false) valid = false;
    if (validateAddress() == false) valid = false;
    if (validateCitizenship() == false) valid = false;
    if (validateUsername() == false) valid = false;
    if (validatePassword() == false) valid = false;
    if (validateConfirmPassword() == false) valid = false;

    if (valid == false) {
        showError("Message", "");
    }

    return valid;
}


// Patient Name
function validName() {

    var name = getValue("PatientName");

    if (name.trim().length < 6) {
        showError("NameError", "Name must have at least 6 characters.");
        return false;
    }

    showError("NameError", "");
    return true;
}


// Patient Age
function validAge() {

    var age = getValue("PatientAge");

    if (age == "" || age <= 1 || age >= 150) {
        showError("AgeError", "Age must be greater than 1 and less than 150.");
        return false;
    }

    showError("AgeError", "");
    return true;
}


// Email
function validateEmail() {

    var email = getValue("PatientEmail");

    if (email == "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("EmailError", "Enter a valid email.");
        return false;
    }

    showError("EmailError", "");
    return true;
}


// Gender
function ValidateGender() {

    var male = document.getElementById("Male");
    var female = document.getElementById("Female");

    if (male == null || female == null) {
        return true;
    }

    if (male.checked == false && female.checked == false) {
        showError("GenderError", "Please select your gender.");
        return false;
    }

    showError("GenderError", "");
    return true;
}


// Phone
function validatePhone() {

    var phone = getValue("Phone");

    if (!/^\d{11}$/.test(phone)) {
        showError("PhoneError", "Phone number must contain exactly 11 digits.");
        return false;
    }

    showError("PhoneError", "");
    return true;
}


// Address
function validateAddress() {

    var address = getValue("Address");

    if (address.trim() == "") {
        showError("AddressError", "Address cannot be empty.");
        return false;
    }

    showError("AddressError", "");
    return true;
}


// Citizenship
function validateCitizenship() {

    var citizenship = getValue("Citizenship");

    if (citizenship == "") {
        showError("CitizenshipError", "Please select your citizenship.");
        return false;
    }

    showError("CitizenshipError", "");
    return true;
}


// Username
function validateUsername() {

    var username = getValue("Username");

    if (username.trim() == "") {
        showError("UsernameError", "Username cannot be empty.");
        return false;
    }

    showError("UsernameError", "");
    return true;
}


// Password
function validatePassword() {

    var password = getValue("Password");

    if (password.trim() == "") {
        showError("PasswordError", "Password cannot be empty.");
        return false;
    }

    showError("PasswordError", "");
    return true;
}


// Confirm Password
function validateConfirmPassword() {

    var password = getValue("Password");
    var confirmPassword = getValue("ConfirmPassword");

    if (confirmPassword == "") {
        showError("ConfirmPasswordError", "Please confirm your password.");
        return false;
    }

    if (password != confirmPassword) {
        showError("ConfirmPasswordError", "Passwords do not match.");
        return false;
    }

    showError("ConfirmPasswordError", "");
    return true;
}


// Reset Registration Form
function resetProfile() {

    var errorIds = [
        "NameError", "AgeError", "EmailError", "GenderError",
        "PhoneError", "AddressError", "CitizenshipError",
        "UsernameError", "PasswordError", "ConfirmPasswordError",
        "Message"
    ];

    for (var i = 0; i < errorIds.length; i++) {
        showError(errorIds[i], "");
    }

    var form = document.querySelector("form");

    if (form != null) {
        form.reset();
    }
}


/* 2. PATIENT DASHBOARD */

var allRequests = [];


// Load Dashboard
function loadPatientDashboard() {
    loadDashboard();
}


// Dashboard data
function loadDashboard() {

    var data = localStorage.getItem("myRequests");

    if (data == null) {
        allRequests = [];
    } else {
        try {
            allRequests = JSON.parse(data);

            if (!Array.isArray(allRequests)) {
                allRequests = [];
            }
        } catch (error) {
            allRequests = [];
        }
    }

    var total = allRequests.length;
    var pending = 0;
    var approved = 0;

    for (var i = 0; i < allRequests.length; i++) {

        if (allRequests[i].status == "Pending") {
            pending++;
        }

        if (
            allRequests[i].status == "Approved" ||
            allRequests[i].status == "Fulfilled"
        ) {
            approved++;
        }
    }

    // Support both old and current Dashboard IDs
    setDashboardValue("metric_totalRequests", total);
    setDashboardValue("metric_pendingRequests", pending);
    setDashboardValue("metric_approvedRequests", approved);

    setDashboardValue("TotalRequests", total);
    setDashboardValue("PendingRequests", pending);
    setDashboardValue("FulfilledRequests", approved);

    showRecentRequests();
}


// Update Dashboard metric
function setDashboardValue(id, value) {

    var element = document.getElementById(id);

    if (element != null) {
        element.innerHTML = value;
    }
}


// Recent Requests
function showRecentRequests() {

    var table = document.getElementById("RecentRequests");

    if (table == null) {
        return;
    }

    table.innerHTML = "";

    if (allRequests.length == 0) {

        table.innerHTML =
            "<tr><td colspan='6' class='empty-message'>" +
            "No blood requests found. Please post a request." +
            "</td></tr>";

    } else {

        var count = 0;

        for (var i = allRequests.length - 1; i >= 0; i--) {

            if (count == 5) {
                break;
            }

            var request = allRequests[i];
            var statusClass = "status-cancelled";

            if (request.status == "Pending") {
                statusClass = "status-pending";
            } else if (
                request.status == "Fulfilled" ||
                request.status == "Approved"
            ) {
                statusClass = "status-fulfilled";
            }

            table.innerHTML +=
                "<tr>" +
                "<td>" + (request.date || "-") + "</td>" +
                "<td>" + (request.bloodGroup || "-") + "</td>" +
                "<td>" + (request.units || "-") + "</td>" +
                "<td>" + (request.hospital || "-") + "</td>" +
                "<td><span class='status " + statusClass + "'>" +
                (request.status || "Pending") + "</span></td>" +
                "<td><button type='button' class='request-view-button' " +
                "onclick='viewRequest(" + i + ")'>View</button></td>" +
                "</tr>";

            count++;
        }
    }
}


// View Request Details
function viewRequest(index) {

    var request = allRequests[index];

    if (request == null) {
        return;
    }

    alert(
        "Blood Request Details\n\n" +
        "Patient: " + (request.name || "-") + "\n" +
        "Blood Group: " + (request.bloodGroup || "-") + "\n" +
        "Units: " + (request.units || "-") + "\n" +
        "Hospital: " + (request.hospital || "-") + "\n" +
        "Address: " + (request.address || "-") + "\n" +
        "Contact: " + (request.phone || "-") + "\n" +
        "Required Date: " + (request.date || "-") + "\n" +
        "Status: " + (request.status || "Pending")
    );
}


// Dashboard Donor Search
function dashboardSearchDonors() {

    var bloodGroup = getValue("DonorSearch");

    window.location.href =
        "SearchDonors.html?bloodGroup=" +
        encodeURIComponent(bloodGroup);

    return false;
}


// Dashboard Notification
function showNotifications() {

    showError(
        "DashboardMessage",
        "You can check your latest request status in My Requests."
    );
}


/* 3. SEARCH DONORS */


// Search Validation Collection
function searchCollectData() {

    var valid = true;

    if (searchValidateBloodGroup() == false) valid = false;
    if (searchValidateDistrict() == false) valid = false;
    if (searchValidateThana() == false) valid = false;
    if (searchValidateBloodBank() == false) valid = false;
    if (searchValidateAvailability() == false) valid = false;

    return valid;
}


// Blood Group
function searchValidateBloodGroup() {

    var blood = document.querySelector(
        'input[name="bloodGroup"]:checked'
    );

    if (blood == null) {
        showError("BloodError", "Please select a blood group.");
        return false;
    }

    showError("BloodError", "");
    return true;
}


// District
function searchValidateDistrict() {

    var district = getValue("district");

    if (district == "") {
        showError("DistrictError", "Please select a district.");
        return false;
    }

    showError("DistrictError", "");
    return true;
}


// Thana
function searchValidateThana() {

    var thana = getValue("thana");

    if (thana == "") {
        showError("ThanaError", "Please select a thana.");
        return false;
    }

    showError("ThanaError", "");
    return true;
}


// Blood Bank
function searchValidateBloodBank() {

    var bank = getValue("bloodBank");

    if (bank == "") {
        showError("BankError", "Please select a blood bank.");
        return false;
    }

    showError("BankError", "");
    return true;
}


// Availability
function searchValidateAvailability() {

    var availability = getValue("availability");

    if (availability == "") {
        showError("AvailabilityError", "Please select donor availability.");
        return false;
    }

    showError("AvailabilityError", "");
    return true;
}


// Load Thana Based on District
function loadThana() {

    var district = getValue("district");
    var thana = document.getElementById("thana");

    if (thana == null) {
        return;
    }

    thana.innerHTML = '<option value="">All Thanas</option>';

    if (district == "Dhaka") {

        thana.innerHTML += '<option value="Dhanmondi">Dhanmondi</option>';
        thana.innerHTML += '<option value="Mirpur">Mirpur</option>';

    } else if (district == "Chattogram") {

        thana.innerHTML += '<option value="Pahartali">Pahartali</option>';

    } else if (district == "Cumilla") {

        thana.innerHTML += '<option value="Kotwali">Kotwali</option>';

    } else if (district == "Gazipur") {

        thana.innerHTML += '<option value="Tongi">Tongi</option>';
    }

    showError("ThanaError", "");
    showError("DistrictError", "");
}


// Reset Search Filters
function resetFilters() {

    var form = document.getElementById("filterForm");

    if (form != null) {
        form.reset();
    }

    showError("BloodError", "");
    showError("DistrictError", "");
    showError("ThanaError", "");
    showError("BankError", "");
    showError("AvailabilityError", "");

    var thana = document.getElementById("thana");

    if (thana != null) {
        thana.innerHTML = '<option value="">All Thanas</option>';
    }
}


// Search Donors Button
function searchDonors() {

    if (document.getElementById("DonorSearch") != null) {
        return dashboardSearchDonors();
    }

    return searchCollectData();
}


/*  4. POST BLOOD REQUEST */


// Submit Request
function submitRequest() {

    var valid = requestCollectData();

    if (valid == true) {
        showError("Message", "Blood request submitted successfully!");
    }

    return false;
}


// Request Validation Collection
function requestCollectData() {

    var valid = true;

    if (requestValidateName() == false) valid = false;
    if (requestValidatePhone() == false) valid = false;
    if (requestValidateBloodGroup() == false) valid = false;
    if (validateUnits() == false) valid = false;
    if (validateHospital() == false) valid = false;
    if (requestValidateDistrict() == false) valid = false;
    if (requestValidateAddress() == false) valid = false;
    if (validateDate() == false) valid = false;
    if (validateUrgency() == false) valid = false;

    if (valid == false) {
        showError("Message", "");
    }

    return valid;
}


// Patient Name
function requestValidateName() {

    var name = getValue("PatientName");

    if (name.trim().length < 6) {
        showError("NameError", "Patient name must have at least 6 characters.");
        return false;
    }

    showError("NameError", "");
    return true;
}


// Phone
function requestValidatePhone() {

    var phone = getValue("Phone");

    if (!/^\d{11}$/.test(phone)) {
        showError("PhoneError", "Phone number must contain exactly 11 digits.");
        return false;
    }

    showError("PhoneError", "");
    return true;
}


// Blood Group
function requestValidateBloodGroup() {

    var blood = getValue("BloodGroup");

    if (blood == "") {
        showError("BloodError", "Please select a blood group.");
        return false;
    }

    showError("BloodError", "");
    return true;
}


// Units
function validateUnits() {

    var units = getValue("Units");

    if (
        units == "" ||
        units < 1 ||
        units > 20 ||
        units % 1 != 0
    ) {
        showError("UnitsError", "Units must be a whole number between 1 and 20.");
        return false;
    }

    showError("UnitsError", "");
    return true;
}


// Hospital
function validateHospital() {

    var hospital = getValue("Hospital");

    if (hospital.trim().length < 3) {
        showError("HospitalError", "Hospital name must have at least 3 characters.");
        return false;
    }

    showError("HospitalError", "");
    return true;
}


// District
function requestValidateDistrict() {

    var district = getValue("District");

    if (district == "") {
        showError("DistrictError", "Please select a district.");
        return false;
    }

    showError("DistrictError", "");
    return true;
}


// Address
function requestValidateAddress() {

    var address = getValue("Address");

    if (address.trim().length < 5) {
        showError("AddressError", "Address must have at least 5 characters.");
        return false;
    }

    showError("AddressError", "");
    return true;
}


// Required Date
function validateDate() {

    var date = getValue("RequiredDate");

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var todayDate = year + "-" + month + "-" + day;

    if (date == "" || date < todayDate) {
        showError("DateError", "Please select today or a future date.");
        return false;
    }

    showError("DateError", "");
    return true;
}


// Urgency
function validateUrgency() {

    var urgency = getValue("Urgency");

    if (urgency == "") {
        showError("UrgencyError", "Please select the urgency level.");
        return false;
    }

    showError("UrgencyError", "");
    return true;
}


// Reset Request Form
function resetRequest() {

    var errorIds = [
        "NameError", "PhoneError", "BloodError", "UnitsError",
        "HospitalError", "DistrictError", "AddressError",
        "DateError", "UrgencyError", "Message"
    ];

    for (var i = 0; i < errorIds.length; i++) {
        showError(errorIds[i], "");
    }

    var form = document.getElementById("RequestForm");

    if (form != null) {
        form.reset();
    }
}


/* 5. PATIENT REQUEST HISTORY */


// Sample Request Data
var bloodRequests = [
    {
        id: "LF1024",
        blood: "A+",
        units: "2 bags",
        hospital: "Dhaka Medical College",
        date: "05 Nov 2026",
        status: "Pending"
    },
    {
        id: "LF1021",
        blood: "O+",
        units: "1 bag",
        hospital: "Square Hospital",
        date: "02 Nov 2026",
        status: "Active"
    }
];


// Display Blood Requests
function displayBloodRequests() {

    var tableBody = document.getElementById("requestTableBody");

    if (tableBody == null) {
        return;
    }

    var total = bloodRequests.length;
    var pending = 0;
    var completed = 0;

    tableBody.innerHTML = "";

    for (var i = 0; i < bloodRequests.length; i++) {

        var request = bloodRequests[i];

        if (request.status == "Pending") {
            pending++;
        }

        if (request.status == "Completed") {
            completed++;
        }

        tableBody.innerHTML +=
            "<tr>" +
            "<td>" + request.id + "</td>" +
            "<td>" + request.blood + "</td>" +
            "<td>" + request.units + "</td>" +
            "<td>" + request.hospital + "</td>" +
            "<td>" + request.date + "</td>" +
            "<td>" + request.status + "</td>" +
            "<td>-</td>" +
            "</tr>";
    }

    showError("totalCount", total);
    showError("pendingCount", pending);
    showError("completedCount", completed);
}


/* ==================================================
   6. PAGE INITIALIZATION
================================================== */


// Dashboard Initialization
if (
    document.getElementById("metric_totalRequests") != null ||
    document.getElementById("TotalRequests") != null
) {
    loadPatientDashboard();
}


// Request History Initialization
if (document.getElementById("requestTableBody") != null) {
    displayBloodRequests();
}


// Search Donors - District Change
if (document.getElementById("district") != null) {

    document.getElementById("district").onchange = loadThana;
}


// Search Donors - Apply Button (if present)
if (document.getElementById("applyButton") != null) {

    document.getElementById("applyButton").onclick = searchCollectData;
}


// Search Donors - Reset Button (if present)
if (document.getElementById("resetButton") != null) {

    document.getElementById("resetButton").onclick = resetFilters;
}
