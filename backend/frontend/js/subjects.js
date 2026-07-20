// ===========================================================
// File: subjects.js
// Project: School Management System
// Purpose:
// Load, Edit and Delete Subjects
// ===========================================================

// ===========================================================
// LOAD SUBJECTS
// ===========================================================

async function loadSubjects() {

    const table = document.getElementById("subjectTable");

    table.innerHTML = `
        <tr>
            <td colspan="6">
                Loading subjects...
            </td>
        </tr>
    `;

    try {

        const result = await API.get("subjects");

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
        // Failed Request
        // ==========================================

        if (!result.success) {

            table.innerHTML = `
                <tr>
                    <td colspan="6">
                        Unable to load subjects.
                    </td>
                </tr>
            `;

            return;

        }

        // ==========================================
        // No Subjects
        // ==========================================

        if (!result.data || result.data.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="6">
                        No subjects found.
                    </td>
                </tr>
            `;

            return;

        }

        let rows = "";

        result.data.forEach(subject => {

            rows += `

                <tr>

                    <td>${subject.subject_name}</td>

                    <td>${subject.subject_code}</td>

                    <td>${subject.class_name || ""}</td>

                    <td>

                        ${
                            subject.first_name
                                ? subject.first_name + " " + subject.last_name
                                : "Not Assigned"
                        }

                    </td>

                    <td>

                        ${new Date(subject.created_at).toLocaleDateString()}

                    </td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick="editSubject(${subject.id})">

                            Edit

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteSubject(${subject.id})">

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
// EDIT SUBJECT
// ===========================================================

function editSubject(id) {

    window.location.href = `editSubject.html?id=${id}`;

}

// ===========================================================
// DELETE SUBJECT
// ===========================================================

async function deleteSubject(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this subject?"
    );

    if (!confirmDelete) return;

    try {

        const result = await API.delete(`subjects/${id}`);

        if (result.success) {

            alert(result.message);

            loadSubjects();

        } else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete subject.");

    }

}

// ===========================================================
// PAGE LOAD
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    loadSubjects();

});