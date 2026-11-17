function sendBroadcast() {
    let level = document.getElementById("EmergencyLevel").value;
    let bloodGroup = document.getElementById("BroadcastBloodGroup").value;
    let description = document.getElementById("MessageDescription").value.trim();
    let msg = document.getElementById("Message");

    if (level === "" || bloodGroup === "" || description === "") {
        msg.style.color = "red";
        msg.textContent = "Please fill out all broadcast fields.";
        return;
    }

    let tableBody = document.getElementById("broadcastTableBody");
    let newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${level}</td>
        <td>${bloodGroup}</td>
        <td>${description}</td>
        <td><input type="button" class="btn btn-danger btn-sm" value="Delete" onclick="deleteBroadcast(this)"></td>
    `;

    tableBody.appendChild(newRow);
    msg.style.color = "green";
    msg.textContent = "Emergency broadcast sent successfully!";
    resetBroadcast();
}

function resetBroadcast() {
    document.getElementById("EmergencyLevel").selectedIndex = 0;
    document.getElementById("BroadcastBloodGroup").selectedIndex = 0;
    document.getElementById("MessageDescription").value = "";
    document.getElementById("Message").textContent = "";
}

function deleteBroadcast(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}