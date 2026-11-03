
/* ==================================================
   PATIENT REGISTRATION
================================================== */

function saveProfile() {
    console.log("Save button clicked");

    var valid = registrationCollectData();

    if (valid == true) {
        document.getElementById("Message").innerHTML =
            "Profile saved successfully!";
    }

    return false;
}

function signUp() {
    console.log("Sign Up button clicked");

    var valid = registrationCollectData();

    if (valid == true) {
        window.location.href = "PatientDashboard.html";
    }

    return false;
}

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
        document.getElementById("Message").innerHTML = "";
    }

    return valid;
}

function validName() {
    var name = document.getElementById("PatientName").value;

    if (name.trim().length < 6) {
        document.getElementById("NameError").innerHTML =
            "Name must have at least 6 characters.";
        return false;
    } else {
        document.getElementById("NameError").innerHTML = "";
        return true;
    }
}

function validAge() {
    var age = document.getElementById("PatientAge").value;

    if (age == "" || age <= 1 || age >= 150) {
        document.getElementById("AgeError").innerHTML =
            "Age must be greater than 1 and less than 150.";
        return false;
    } else {
        document.getElementById("AgeError").innerHTML = "";
        return true;
    }
}

function validateEmail() {
    var email = document.getElementById("PatientEmail").value;

    if (email == "" || !email.includes("@") || !email.includes(".")) {
        document.getElementById("EmailError").innerHTML =
            "Enter a valid email.";
        return false;
    } else {
        document.getElementById("EmailError").innerHTML = "";
        return true;
    }
}

function ValidateGender() {
    var male = document.getElementById("Male").checked;
    var female = document.getElementById("Female").checked;

    if (male == false && female == false) {
        document.getElementById("GenderError").innerHTML =
            "Please select your gender.";
        return false;
    } else {
        document.getElementById("GenderError").innerHTML = "";
        return true;
    }
}

function validatePhone() {
    var phone = document.getElementById("Phone").value;

    if (!/^\d{11}$/.test(phone)) {
        document.getElementById("PhoneError").innerHTML =
            "Phone number must contain exactly 11 digits.";
        return false;
    } else {
        document.getElementById("PhoneError").innerHTML = "";
        return true;
    }
}

function validateAddress() {
    var address = document.getElementById("Address").value;

    if (address.trim() == "") {
        document.getElementById("AddressError").innerHTML =
            "Address cannot be empty.";
        return false;
    } else {
        document.getElementById("AddressError").innerHTML = "";
        return true;
    }
}

function validateCitizenship() {
    var citizenship = document.getElementById("Citizenship").value;

    if (citizenship == "") {
        document.getElementById("CitizenshipError").innerHTML =
            "Please select your citizenship.";
        return false;
    } else {
        document.getElementById("CitizenshipError").innerHTML = "";
        return true;
    }
}

function validateUsername() {
    var username = document.getElementById("Username").value;

    if (username.trim() == "") {
        document.getElementById("UsernameError").innerHTML =
            "Username cannot be empty.";
        return false;
    } else {
        document.getElementById("UsernameError").innerHTML = "";
        return true;
    }
}

function validatePassword() {
    var password = document.getElementById("Password").value;

    if (password.trim() == "") {
        document.getElementById("PasswordError").innerHTML =
            "Password cannot be empty.";
        return false;
    } else {
        document.getElementById("PasswordError").innerHTML = "";
        return true;
    }
}

function validateConfirmPassword() {
    var password = document.getElementById("Password").value;
    var confirmPassword =
        document.getElementById("ConfirmPassword").value;

    if (confirmPassword == "") {
        document.getElementById("ConfirmPasswordError").innerHTML =
            "Please confirm your password.";
        return false;
    } else if (password != confirmPassword) {
        document.getElementById("ConfirmPasswordError").innerHTML =
            "Passwords do not match.";
        return false;
    } else {
        document.getElementById("ConfirmPasswordError").innerHTML = "";
        return true;
    }
}

function resetProfile() {
    var errorIds = [
        "NameError", "AgeError", "EmailError", "GenderError",
        "PhoneError", "AddressError", "CitizenshipError",
        "UsernameError", "PasswordError", "ConfirmPasswordError",
        "Message"
    ];

    for (var i = 0; i < errorIds.length; i++) {
        document.getElementById(errorIds[i]).innerHTML = "";
    }

    document.getElementById("PatientName").value = "";
    document.getElementById("PatientAge").value = "";
    document.getElementById("PatientEmail").value = "";
    document.getElementById("Male").checked = false;
    document.getElementById("Female").checked = false;
    document.getElementById("Phone").value = "";
    document.getElementById("Address").value = "";
    document.getElementById("Citizenship").value = "";
    document.getElementById("Username").value = "";
    document.getElementById("Password").value = "";
    document.getElementById("ConfirmPassword").value = "";
}


/* ==================================================
   PATIENT DASHBOARD
================================================== */

var allRequests = [];

function loadDashboard() {
    var data = localStorage.getItem("myRequests");

    if (data == null) {
        allRequests = [];
    } else {
        allRequests = JSON.parse(data);
    }

    var total = allRequests.length;
    var pending = 0;
    var fulfilled = 0;

    for (var i = 0; i < allRequests.length; i++) {
        if (allRequests[i].status == "Pending") {
            pending++;
        }

        if (allRequests[i].status == "Fulfilled") {
            fulfilled++;
        }
    }

    document.getElementById("TotalRequests").innerHTML = total;
    document.getElementById("PendingRequests").innerHTML = pending;
    document.getElementById("FulfilledRequests").innerHTML = fulfilled;

    showRecentRequests();
}

function showRecentRequests() {
    var table = document.getElementById("RecentRequests");

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
            } else if (request.status == "Fulfilled") {
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

function viewRequest(index) {
    var request = allRequests[index];

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

function dashboardSearchDonors() {
    var bloodGroup = document.getElementById("DonorSearch").value;

    window.location.href =
        "PatientSearchDonors.html?bloodGroup=" +
        encodeURIComponent(bloodGroup);

    return false;
}

function showNotifications() {
    document.getElementById("DashboardMessage").innerHTML =
        "You can check your latest request status in My Requests.";
}


/* ==================================================
   SEARCH DONORS
================================================== */

function searchCollectData() {
    var valid = true;

    if (searchValidateBloodGroup() == false) valid = false;
    if (searchValidateDistrict() == false) valid = false;
    if (searchValidateThana() == false) valid = false;
    if (searchValidateBloodBank() == false) valid = false;
    if (searchValidateAvailability() == false) valid = false;

    return valid;
}

function searchValidateBloodGroup() {
    var blood = document.querySelector('input[name="bloodGroup"]:checked');

    if (blood == null) {
        document.getElementById("BloodError").innerHTML =
            "Please select a blood group.";
        return false;
    } else {
        document.getElementById("BloodError").innerHTML = "";
        return true;
    }
}

function searchValidateDistrict() {
    var district = document.getElementById("district").value;

    if (district == "") {
        document.getElementById("DistrictError").innerHTML =
            "Please select a district.";
        return false;
    } else {
        document.getElementById("DistrictError").innerHTML = "";
        return true;
    }
}

function searchValidateThana() {
    var thana = document.getElementById("thana").value;

    if (thana == "") {
        document.getElementById("ThanaError").innerHTML =
            "Please select a thana.";
        return false;
    } else {
        document.getElementById("ThanaError").innerHTML = "";
        return true;
    }
}

function searchValidateBloodBank() {
    var bank = document.getElementById("bloodBank").value;

    if (bank == "") {
        document.getElementById("BankError").innerHTML =
            "Please select a blood bank.";
        return false;
    } else {
        document.getElementById("BankError").innerHTML = "";
        return true;
    }
}

function searchValidateAvailability() {
    var availability = document.getElementById("availability").value;

    if (availability == "") {
        document.getElementById("AvailabilityError").innerHTML =
            "Please select donor availability.";
        return false;
    } else {
        document.getElementById("AvailabilityError").innerHTML = "";
        return true;
    }
}

function loadThana() {
    var district = document.getElementById("district").value;
    var thana = document.getElementById("thana");

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

    document.getElementById("ThanaError").innerHTML = "";
    document.getElementById("DistrictError").innerHTML = "";
}

function resetFilters() {
    document.getElementById("filterForm").reset();

    document.getElementById("BloodError").innerHTML = "";
    document.getElementById("DistrictError").innerHTML = "";
    document.getElementById("ThanaError").innerHTML = "";
    document.getElementById("BankError").innerHTML = "";
    document.getElementById("AvailabilityError").innerHTML = "";

    document.getElementById("thana").innerHTML =
        '<option value="">All Thanas</option>';
}

function searchDonors() {
    if (document.getElementById("DonorSearch") != null) {
        return dashboardSearchDonors();
    }

    return false;
}


/* ==================================================
   POST BLOOD REQUEST
================================================== */

function submitRequest() {
    console.log("Submit Request button clicked");

    var valid = requestCollectData();

    if (valid == true) {
        document.getElementById("Message").innerHTML =
            "Blood request submitted successfully!";
    }

    return false;
}

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
        document.getElementById("Message").innerHTML = "";
    }

    return valid;
}

function requestValidateName() {
    var name = document.getElementById("PatientName").value;

    if (name.trim().length < 6) {
        document.getElementById("NameError").innerHTML =
            "Patient name must have at least 6 characters.";
        return false;
    } else {
        document.getElementById("NameError").innerHTML = "";
        return true;
    }
}

function requestValidatePhone() {
    var phone = document.getElementById("Phone").value;

    if (!/^\d{11}$/.test(phone)) {
        document.getElementById("PhoneError").innerHTML =
            "Phone number must contain exactly 11 digits.";
        return false;
    } else {
        document.getElementById("PhoneError").innerHTML = "";
        return true;
    }
}

function requestValidateBloodGroup() {
    var blood = document.getElementById("BloodGroup").value;

    if (blood == "") {
        document.getElementById("BloodError").innerHTML =
            "Please select a blood group.";
        return false;
    } else {
        document.getElementById("BloodError").innerHTML = "";
        return true;
    }
}

function validateUnits() {
    var units = document.getElementById("Units").value;

    if (units == "" || units < 1 || units > 20 || units % 1 != 0) {
        document.getElementById("UnitsError").innerHTML =
            "Units must be a whole number between 1 and 20.";
        return false;
    } else {
        document.getElementById("UnitsError").innerHTML = "";
        return true;
    }
}

function validateHospital() {
    var hospital = document.getElementById("Hospital").value;

    if (hospital.trim().length < 3) {
        document.getElementById("HospitalError").innerHTML =
            "Hospital name must have at least 3 characters.";
        return false;
    } else {
        document.getElementById("HospitalError").innerHTML = "";
        return true;
    }
}

function requestValidateDistrict() {
    var district = document.getElementById("District").value;

    if (district == "") {
        document.getElementById("DistrictError").innerHTML =
            "Please select a district.";
        return false;
    } else {
        document.getElementById("DistrictError").innerHTML = "";
        return true;
    }
}

function requestValidateAddress() {
    var address = document.getElementById("Address").value;

    if (address.trim().length < 5) {
        document.getElementById("AddressError").innerHTML =
            "Address must have at least 5 characters.";
        return false;
    } else {
        document.getElementById("AddressError").innerHTML = "";
        return true;
    }
}

function validateDate() {
    var date = document.getElementById("RequiredDate").value;

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var todayDate = year + "-" + month + "-" + day;

    if (date == "" || date < todayDate) {
        document.getElementById("DateError").innerHTML =
            "Please select today or a future date.";
        return false;
    } else {
        document.getElementById("DateError").innerHTML = "";
        return true;
    }
}

function validateUrgency() {
    var urgency = document.getElementById("Urgency").value;

    if (urgency == "") {
        document.getElementById("UrgencyError").innerHTML =
            "Please select the urgency level.";
        return false;
    } else {
        document.getElementById("UrgencyError").innerHTML = "";
        return true;
    }
}

function resetRequest() {
    var errorIds = [
        "NameError", "PhoneError", "BloodError", "UnitsError",
        "HospitalError", "DistrictError", "AddressError",
        "DateError", "UrgencyError", "Message"
    ];

    for (var i = 0; i < errorIds.length; i++) {
        document.getElementById(errorIds[i]).innerHTML = "";
    }

    document.getElementById("PatientName").value = "";
    document.getElementById("Phone").value = "";
    document.getElementById("BloodGroup").value = "";
    document.getElementById("Units").value = "";
    document.getElementById("Hospital").value = "";
    document.getElementById("District").value = "";
    document.getElementById("Address").value = "";
    document.getElementById("RequiredDate").value = "";
    document.getElementById("Urgency").value = "";
    document.getElementById("Information").value = "";
}


/* ==================================================
   MY REQUESTS
================================================== */

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

    document.getElementById("totalCount").innerHTML = total;
    document.getElementById("pendingCount").innerHTML = pending;
    document.getElementById("completedCount").innerHTML = completed;
}


/* ==================================================
   PAGE INITIALIZATION
================================================== */

// Dashboard
if (document.getElementById("TotalRequests") != null) {
    loadDashboard();
}

// My Requests
if (document.getElementById("requestTableBody") != null) {
    displayBloodRequests();
}

// Search Donors
if (document.getElementById("applyButton") != null) {
    document.getElementById("applyButton").onclick = searchCollectData;
}

if (document.getElementById("resetButton") != null) {
    document.getElementById("resetButton").onclick = resetFilters;
}

if (document.getElementById("district") != null) {
    document.getElementById("district").onchange = loadThana;
}
