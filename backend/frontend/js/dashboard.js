// ===========================================================
// File: dashboard.js
// ===========================================================

// ==========================================
// Load Dashboard Statistics
// ==========================================

async function loadDashboardStats() {

    try {

        const result = await API.get("dashboard/stats");

        if (!result.success) {

            console.error(result.message);
            return;

        }

        const stats = result.stats;

        const totalStudents = document.getElementById("totalStudents");
        const totalTeachers = document.getElementById("totalTeachers");
        const totalClasses = document.getElementById("totalClasses");
        const totalSubjects = document.getElementById("totalSubjects");
        const totalPayments = document.getElementById("totalPayments");
        const attendanceRate = document.getElementById("attendanceRate");

        if (totalStudents)
            totalStudents.textContent = stats.students || 0;

        if (totalTeachers)
            totalTeachers.textContent = stats.teachers || 0;

        if (totalClasses)
            totalClasses.textContent = stats.classes || 0;

        if (totalSubjects)
            totalSubjects.textContent = stats.subjects || 0;

        if (totalPayments)
            totalPayments.textContent =
                "₦" + Number(stats.payments || 0).toLocaleString();

        if (attendanceRate)
            attendanceRate.textContent =
                (stats.attendance || 0) + "%";

    }

    catch (error) {

        console.error("Dashboard Error:", error);

    }

}

// ==========================================
// Start Dashboard
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    if (
        document.getElementById("totalStudents") ||
        document.getElementById("totalTeachers") ||
        document.getElementById("totalClasses") ||
        document.getElementById("totalSubjects") ||
        document.getElementById("totalPayments") ||
        document.getElementById("attendanceRate")
    ) {

        loadDashboardStats();

    }

});