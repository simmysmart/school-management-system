// ===========================================================
// File: students.js
// Project: School Management System
// Purpose:
// Load, Edit and Delete Students
// ===========================================================

// ===========================================================
// LOAD STUDENTS
// ===========================================================

async function loadStudents() {

    const table = document.getElementById("studentTable");

    table.innerHTML = `
        <tr>
            <td colspan="6">
                Loading students...
            </td>
        </tr>
    `;

    try {

        const result = await API.get("students");

        // ==========================================
        // Token Expired
        // ==========================================

        if (
            result.message === "Invalid token" ||
            result.message === "Access denied" ||
            result.message === "Unauthorized"
        ) {

            localStorage.removeItem("token");

            window.location.href = "login.html";

            return;

        }

        // ==========================================
        // Request Failed
        // ==========================================

        if (!result.success) {

            table.innerHTML = `
                <tr>
                    <td colspan="6">
                        Failed to load students.
                    </td>
                </tr>
            `;

            return;

        }

        // ==========================================
        // No Students Found
        // ==========================================

        if (!result.students || result.students.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="6">
                        No students found.
                    </td>
                </tr>
            `;

            return;

        }

        let rows = "";

        result.students.forEach(student => {

            rows += `

                <tr>

                    <td>${student.admission_number}</td>

                    <td>${student.first_name} ${student.last_name}</td>

                    <td>${student.gender}</td>

                    <td>${student.class}</td>

                    <td>${student.phone || ""}</td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick="editStudent(${student.id})">

                            Edit

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteStudent(${student.id})">

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
                    Unable to connect to the server.
                </td>
            </tr>
        `;

    }

}

// ===========================================================
// EDIT STUDENT
// ===========================================================

function editStudent(id) {

    window.location.href = `editStudent.html?id=${id}`;

}

// ===========================================================
// DELETE STUDENT
// ===========================================================

async function deleteStudent(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {

        const result = await API.delete(`students/${id}`);

        if (result.success) {

            alert(result.message);

            loadStudents();

        } else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete student.");

    }

}

// ===========================================================
// PAGE LOAD
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    loadStudents();

});