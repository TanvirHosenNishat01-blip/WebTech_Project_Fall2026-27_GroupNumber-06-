function submitRequisition() {
    let msg = document.getElementById("Message");
    let aPlus = parseInt(document.getElementById("BagAPlus").value) || 0;
    let aMinus = parseInt(document.getElementById("BagAMinus").value) || 0;
    let bPlus = parseInt(document.getElementById("BagBPlus").value) || 0;
    let bMinus = parseInt(document.getElementById("BagBMinus").value) || 0;
    let abPlus = parseInt(document.getElementById("BagABPlus").value) || 0;
    let abMinus = parseInt(document.getElementById("BagABMinus").value) || 0;
    let oPlus = parseInt(document.getElementById("BagOPlus").value) || 0;
    let oMinus = parseInt(document.getElementById("BagOMinus").value) || 0;

    let totalBags = aPlus + aMinus + bPlus + bMinus + abPlus + abMinus + oPlus + oMinus;

    if (totalBags <= 0) {
        msg.style.color = "red";
        msg.textContent = "Please request at least one blood bag.";
        return;
    }

    let isEmergency = document.getElementById("EmergencyRequest").checked;
    let urgency = isEmergency ? "Urgent" : "Normal";
    let bloodSummary = [];

    if (aPlus > 0) bloodSummary.push(`A+: ${aPlus}`);
    if (aMinus > 0) bloodSummary.push(`A-: ${aMinus}`);
    if (bPlus > 0) bloodSummary.push(`B+: ${bPlus}`);
    if (bMinus > 0) bloodSummary.push(`B-: ${bMinus}`);
    if (abPlus > 0) bloodSummary.push(`AB+: ${abPlus}`);
    if (abMinus > 0) bloodSummary.push(`AB-: ${abMinus}`);
    if (oPlus > 0) bloodSummary.push(`O+: ${oPlus}`);
    if (oMinus > 0) bloodSummary.push(`O-: ${oMinus}`);

    let tableBody = document.getElementById("requisitionTableBody");
    let newRow = document.createElement("tr");
    let reqId = "REQ-00" + (tableBody.rows.length + 1);

    newRow.innerHTML = `
        <td>${reqId}</td>
        <td>${bloodSummary.join(", ")}</td>
        <td>${urgency}</td>
        <td>Pending</td>
        <td><input type="button" class="btn btn-danger btn-sm" value="Delete" onclick="deleteRequisition(this)"></td>
    `;

    tableBody.appendChild(newRow);
    saveHospitalRequest(reqId, bloodSummary.join(", "), totalBags, isEmergency);
    msg.style.color = "green";
    msg.textContent = "Requisition submitted successfully!";
    resetRequisition();
}

// Hospital blood need is sent to the shared request list
function saveHospitalRequest(reqId, summary, totalBags, isEmergency) {
    let requests = JSON.parse(localStorage.getItem("lf_requests")) || [];
    let group = summary.split(":")[0];
    requests.push({
        id: reqId,
        patient: "Hospital requisition",
        hospital: "Blood bank",
        bloodGroup: group,
        units: totalBags,
        urgency: isEmergency ? "Critical" : "Scheduled",
        status: "Pending"
    });
    localStorage.setItem("lf_requests", JSON.stringify(requests));
}

function resetRequisition() {
    document.getElementById("EmergencyRequest").checked = false;
    let inputs = document.querySelectorAll("input[type='number']");
    inputs.forEach(input => input.value = "0");
    document.getElementById("Message").textContent = "";
}

function deleteRequisition(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}