function addStock() {
    let bloodGroup = document.getElementById("BloodGroup").value;
    let bags = document.getElementById("NumberOfBags").value.trim();
    let msg = document.getElementById("Message");

    if (bloodGroup === "" || bags === "") {
        msg.style.color = "red";
        msg.textContent = "Please select a blood group and enter number of bags.";
        return;
    }

    if (parseInt(bags) <= 0) {
        msg.style.color = "red";
        msg.textContent = "Number of bags must be greater than zero.";
        return;
    }

    let tableBody = document.getElementById("inventoryTableBody");
    let newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${bloodGroup}</td>
        <td>${bags}</td>
        <td><input type="button" class="btn btn-danger btn-sm" value="Delete" onclick="deleteStock(this)"></td>
    `;

    tableBody.appendChild(newRow);
    addBagsToHospital(parseInt(bags));
    msg.style.color = "green";
    msg.textContent = "Stock added successfully!";
    resetStock();
}

// New bags are counted on the hospital record Admin can see
function addBagsToHospital(bags) {
    let hospitals = JSON.parse(localStorage.getItem("lf_hospitals")) || [];
    if (hospitals.length === 0) {
        return;
    }
    hospitals[0].stockUnits = Number(hospitals[0].stockUnits) + bags;
    localStorage.setItem("lf_hospitals", JSON.stringify(hospitals));
}

function resetStock() {
    document.getElementById("BloodGroup").selectedIndex = 0;
    document.getElementById("NumberOfBags").value = "";
    document.getElementById("Message").textContent = "";
}

function deleteStock(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}