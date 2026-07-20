// ===========================================================
// File: classes.js
// Project: School Management System
// Purpose:
// Load, Edit and Delete Classes
// ===========================================================


// ===========================================================
// LOAD CLASSES
// ===========================================================

async function loadClasses() {

    const table = document.getElementById("classTable");

    table.innerHTML = `
        <tr>
            <td colspan="4">
                Loading classes...
            </td>
        </tr>
    `;

    try {

        const result = await API.get("classes");

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
                    <td colspan="4">
                        Failed to load classes.
                    </td>
                </tr>
            `;

            return;

        }

        // ===========================================
        // No Records
        // ===========================================

        if (!result.data || result.data.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="4">
                        No classes found.
                    </td>
                </tr>
            `;

            return;

        }

        let rows = "";

        result.data.forEach(cls => {

            rows += `

                <tr>

                    <td>${cls.class_name}</td>

                    <td>

                        ${cls.first_name
                            ? cls.first_name + " " + cls.last_name
                            : "Not Assigned"}

                    </td>

                    <td>

                        ${new Date(cls.created_at).toLocaleDateString()}

                    </td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick="editClass(${cls.id})">

                            Edit

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteClass(${cls.id})">

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
                <td colspan="4">
                    Unable to connect to server.
                </td>
            </tr>
        `;

    }

}


// ===========================================================
// EDIT CLASS
// ===========================================================

function editClass(id) {

    window.location.href = `editClass.html?id=${id}`;

}


// ===========================================================
// DELETE CLASS
// ===========================================================

async function deleteClass(id) {

    const confirmDelete = confirm(

        "Are you sure you want to delete this class?"

    );

    if (!confirmDelete) return;

    try {

        const result = await API.delete(`classes/${id}`);

        if (result.success) {

            alert(result.message);

            loadClasses();

        }

        else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete class.");

    }

}


// ===========================================================
// LOAD PAGE
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    loadClasses();

});