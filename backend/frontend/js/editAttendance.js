// ===========================================================
// File: editAttendance.js
// Project: School Management System
// ===========================================================

const API = "http://localhost:5000/api";

const params = new URLSearchParams(window.location.search);

const attendanceId = params.get("id");

// ===========================================================
// Load Students
// ===========================================================

async function loadStudents(selected = "") {

    const select = document.getElementById("student_id");

    try {

        const response = await fetch(`${API}/students`);

        const result = await response.json();

        let html = `<option value="">Select Student</option>`;

        if (result.success) {

            result.students.forEach(student => {

                html += `
                    <option
                        value="${student.id}"
                        ${selected == student.id ? "selected" : ""}>

                        ${student.admission_number}
                        -
                        ${student.first_name}
                        ${student.last_name}

                    </option>
                `;

            });

        }

        select.innerHTML = html;

    }

    catch (error) {

        console.error(error);

        select.innerHTML =
            `<option value="">Unable to load students</option>`;

    }

}

// ===========================================================
// Load Attendance Record
// ===========================================================

async function loadAttendance() {

    try {

        const response = await fetch(

            `${API}/attendance/${attendanceId}`

        );

        const result = await response.json();

        if (!result.success) {

            alert(result.message);

            window.location.href = "attendance.html";

            return;

        }

        const attendance = result.data;

        await loadStudents(attendance.student_id);

        document.getElementById("attendance_date").value =
            attendance.attendance_date.split("T")[0];

        document.getElementById("status").value =
            attendance.status;

        document.getElementById("remarks").value =
            attendance.remarks || "";

    }

    catch (error) {

        console.error(error);

        alert("Unable to load attendance record.");

    }

}

// ===========================================================
// Update Attendance
// ===========================================================

document.getElementById("attendanceForm").addEventListener(

    "submit",

    async function (e) {

        e.preventDefault();

        const attendance = {

            student_id:
                document.getElementById("student_id").value,

            attendance_date:
                document.getElementById("attendance_date").value,

            status:
                document.getElementById("status").value,

            remarks:
                document.getElementById("remarks").value

        };

        try {

            const response = await fetch(

                `${API}/attendance/${attendanceId}`,

                {

                    method: "PUT",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify(attendance)

                }

            );

            const result = await response.json();

            alert(result.message);

            if (result.success) {

                window.location.href = "attendance.html";

            }

        }

        catch (error) {

            console.error(error);

            alert("Unable to update attendance.");

        }

    }

);

// ===========================================================
// Initialize
// ===========================================================

loadAttendance();