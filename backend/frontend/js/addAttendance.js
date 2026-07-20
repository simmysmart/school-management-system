// ===========================================================
// File: attendance.js
// Project: School Management System
// ===========================================================

// ==========================================
// Load Attendance
// ==========================================

async function loadAttendance() {

    const table = document.getElementById("attendanceTable");

    try {

        const result = await API.get("attendance");

        if (!result.success) {

            table.innerHTML = `
                <tr>
                    <td colspan="6">${result.message}</td>
                </tr>
            `;

            return;

        }

        if (result.attendance.length === 0) {

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

        result.attendance.forEach(record => {

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
                    Unable to load attendance.
                </td>
            </tr>
        `;

    }

}

// ==========================================
// Edit Attendance
// ==========================================

function editAttendance(id) {

    window.location.href = `editAttendance.html?id=${id}`;

}

// ==========================================
// Delete Attendance
// ==========================================

async function deleteAttendance(id) {

    if (!confirm("Delete this attendance record?")) return;

    try {

        const result = await API.delete(`attendance/${id}`);

        alert(result.message);

        loadAttendance();

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete attendance.");

    }

}

// ==========================================
// Logout
// ==========================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", logout);

}

// ==========================================
// Initialize
// ==========================================

loadAttendance();