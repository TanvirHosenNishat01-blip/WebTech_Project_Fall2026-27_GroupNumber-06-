function loadDashboardMetrics() {
    const emergencyCount = document.getElementById("card_emergency");
    const bloodBagsCount = document.getElementById("card_blood_bags");
    const hospitalsCount = document.getElementById("card_hospitals");
    const requisitionsCount = document.getElementById("card_requisitions");

    if (emergencyCount) emergencyCount.textContent = "0";
    if (bloodBagsCount) bloodBagsCount.textContent = "17";
    if (hospitalsCount) hospitalsCount.textContent = "1";
    if (requisitionsCount) requisitionsCount.textContent = "3";
}

window.onload = function() {
    loadDashboardMetrics();
};