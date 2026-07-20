// ===========================================================
// File: attendance.js
// Project: School Management System
// Purpose:
// Load, Edit and Delete Attendance
// ===========================================================

// ===========================================================
// LOAD ATTENDANCE
// ===========================================================

async function loadAttendance() {

    const table = document.getElementById("attendanceTable");

    table.innerHTML = `
        <tr>
            <td colspan="6">
                Loading attendance...
            </td>
        </tr>
    `;

    try {

        const result = await API.get("attendance");

        if (
            result.message === "Invalid token" ||
            result.message === "Access denied"
        ) {

            localStorage.removeItem("token");

            window.location.href = "login.html";

            return;

        }

        if (!result.success) {

            table.innerHTML = `
                <tr>
                    <td colspan="6">
                        ${result.message}
                    </td>
                </tr>
            `;

            return;

        }

        if (result.data.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="6">
                        No attendance records found.
                    </td>
                </tr>
            `;

            return;

        }

        let rows = "";

        result.data.forEach(record => {

            rows += `
                <tr>

                    <td>${record.admission_number}</td>

                    <td>
                        ${record.first_name}
                        ${record.last_name}
                    </td>

                    <td>
                        ${new Date(record.attendance_date).toLocaleDateString()}
                    </td>

                    <td>${record.status}</td>

                    <td>${record.remarks || "-"}</td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick="editAttendance(${record.id})">

                            Edit

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteAttendance(${record.id})">

                            Delete

                        </button>

                    </td>

                </tr>
            `;

        });

        table.innerHTML = rows;

    }

    catch (error) {

        console.error(error);

        table.innerHTML = `
            <tr>
                <td colspan="6">
                    Unable to connect to server.
                </td>
            </tr>
        `;

    }

}

// ===========================================================
// EDIT ATTENDANCE
// ===========================================================

function editAttendance(id) {

    window.location.href = `editAttendance.html?id=${id}`;

}

// ===========================================================
// DELETE ATTENDANCE
// ===========================================================

async function deleteAttendance(id) {

    if (!confirm("Delete this attendance record?")) return;

    try {

        const result = await API.delete(`attendance/${id}`);

        alert(result.message);

        if (result.success) {

            loadAttendance();

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete attendance.");

    }

}

// ===========================================================
// INITIALIZE PAGE
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    loadAttendance();

});