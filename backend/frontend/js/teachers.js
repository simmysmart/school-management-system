async function loadTeachers() {

    try {

        const response = await fetch("http://localhost:5000/api/teachers");

        const result = await response.json();

        let rows = "";

        result.teachers.forEach((teacher) => {

            rows += `
// ===========================================================
// File: teachers.js
// Project: School Management System
// Purpose:
// Load, Edit and Delete Teachers
// ===========================================================


// ===========================================================
// LOAD TEACHERS
// ===========================================================

async function loadTeachers() {

    const table = document.getElementById("teacherTable");

    table.innerHTML = `
        <tr>
            <td colspan="7">
                Loading teachers...
            </td>
        </tr>
    `;

    try {

        const result = await API.get("teachers");

        // ===========================================
        // Token Expired
        // ===========================================

        if (
            result.message === "Invalid token" ||
            result.message === "Access denied"
        ) {

            localStorage.removeItem("token");

            window.location.href = "login.html";

            return;

        }

        // ===========================================
        // Failed Request
        // ===========================================

        if (!result.success) {

            table.innerHTML = `
                <tr>
                    <td colspan="7">
                        Failed to load teachers.
                    </td>
                </tr>
            `;

            return;

        }

        // ===========================================
        // No Teachers
        // ===========================================

        if (!result.teachers || result.teachers.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="7">
                        No teachers found.
                    </td>
                </tr>
            `;

            return;

        }

        let rows = "";

        result.teachers.forEach((teacher) => {

            rows += `

                <tr>

                    <td>${teacher.staff_id}</td>

                    <td>${teacher.first_name} ${teacher.last_name}</td>

                    <td>${teacher.gender}</td>

                    <td>${teacher.phone || ""}</td>

                    <td>${teacher.email || ""}</td>

                    <td>${teacher.qualification || ""}</td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick="editTeacher(${teacher.id})">

                            Edit

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteTeacher(${teacher.id})">

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
                <td colspan="7">
                    Unable to connect to the server.
                </td>
            </tr>
        `;

    }

}


// ===========================================================
// EDIT TEACHER
// ===========================================================

function editTeacher(id) {

    window.location.href = `editTeacher.html?id=${id}`;

}


// ===========================================================
// DELETE TEACHER
// ===========================================================

async function deleteTeacher(id) {

    const confirmDelete = confirm(

        "Are you sure you want to delete this teacher?"

    );

    if (!confirmDelete) return;

    try {

        const result = await API.delete(`teachers/${id}`);

        if (result.success) {

            alert(result.message);

            loadTeachers();

        } else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete teacher.");

    }

}


// ===========================================================
// LOAD PAGE
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    loadTeachers();

});
            <tr>

                <td>${teacher.staff_id}</td>

                <td>${teacher.first_name} ${teacher.last_name}</td>

                <td>${teacher.gender}</td>

                <td>${teacher.phone}</td>

                <td>${teacher.email}</td>

                <td>${teacher.qualification}</td>

                <td>

    <button class="edit-btn" onclick="editTeacher(${teacher.id})">
        Edit
    </button>

    <button class="delete-btn" onclick="deleteTeacher(${teacher.id})">
        Delete
    </button>

</td>

            `;

        });

        document.getElementById("teacherTable").innerHTML = rows;

    } catch (error) {

        console.error(error);

    }

}

function editTeacher(id) {

    window.location.href = `editTeacher.html?id=${id}`;

}

async function deleteTeacher(id) {

    if (!confirm("Delete this teacher?")) return;

    const response = await fetch(`http://localhost:5000/api/teachers/${id}`, {

        method: "DELETE"

    });

    const result = await response.json();

    alert(result.message);

    loadTeachers();

}

loadTeachers();