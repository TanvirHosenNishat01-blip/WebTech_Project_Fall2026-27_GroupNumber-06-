// Clear old field messages before a new check
function cleanAllErrors() {
    let errors = document.querySelectorAll(".error-msg");
    errors.forEach(function (item) {
        item.textContent = "";
    });
}

function saveProfile() {
    let name = document.getElementById("HospitalName").value.trim();
    let regNo = document.getElementById("RegistrationNumber").value.trim();
    let facility = document.getElementById("FacilityType").value;
    let contact = document.getElementById("PrimaryContact").value.trim();
    let dept = document.getElementById("DepartmentNumber").value.trim();
    let address = document.getElementById("HospitalAddress").value.trim();
    let username = document.getElementById("HospitalUsername").value.trim();
    let password = document.getElementById("Password").value.trim();
    let confirmPass = document.getElementById("ConfirmPassword").value.trim();
    let msg = document.getElementById("Message");

    cleanAllErrors();

    if (name === "" || regNo === "" || facility === "" || contact === "" || dept === "" || address === "" || username === "" || password === "" || confirmPass === "") {
        msg.style.color = "red";
        msg.textContent = "Please fill out all fields.";
        return false;
    }

    if (password !== confirmPass) {
        msg.style.color = "red";
        msg.textContent = "Passwords do not match.";
        return false;
    }

    msg.style.color = "green";
    msg.textContent = "Registration details validated successfully!";
    saveHospitalRecord(name, facility, address);
    return false;
}

// A registered hospital is added to the admin hospital list
function saveHospitalRecord(name, facility, address) {
    let hospitals = JSON.parse(localStorage.getItem("lf_hospitals")) || [];
    let i;

    for (i = 0; i < hospitals.length; i++) {
        if (hospitals[i].name === name) {
            return;
        }
    }

    hospitals.push({
        id: "HOSP-0" + (hospitals.length + 1),
        name: name,
        district: address,
        thana: facility,
        stockUnits: 0,
        status: "Approved"
    });
    localStorage.setItem("lf_hospitals", JSON.stringify(hospitals));
}

function resetProfile() {
    document.querySelector("form").reset();
    document.getElementById("Message").textContent = "";
    cleanAllErrors();
}