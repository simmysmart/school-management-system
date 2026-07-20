// ===========================================================
// File: results.js
// Project: School Management System
// Purpose:
// Load, Edit and Delete Results
// ===========================================================

// ===========================================================
// LOAD RESULTS
// ===========================================================

async function loadResults() {

    const table = document.getElementById("resultTable");

    table.innerHTML = `
        <tr>
            <td colspan="10">
                Loading results...
            </td>
        </tr>
    `;

    try {

        const result = await API.get("results");

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
                    <td colspan="10">
                        Failed to load results.
                    </td>
                </tr>
            `;

            return;

        }

        // ===========================================
        // No Results
        // ===========================================

        if (result.data.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="10">
                        No results found.
                    </td>
                </tr>
            `;

            return;

        }

        let rows = "";

        result.data.forEach(item => {

            rows += `

                <tr>

                    <td>${item.first_name} ${item.last_name}</td>

                    <td>${item.subject_name}</td>

                    <td>${item.term}</td>

                    <td>${item.session}</td>

                    <td>${item.ca_score}</td>

                    <td>${item.exam_score}</td>

                    <td>${item.total}</td>

                    <td>${item.grade}</td>

                    <td>${item.remark}</td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick="editResult(${item.id})">

                            Edit

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteResult(${item.id})">

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
                <td colspan="10">
                    Unable to connect to the server.
                </td>
            </tr>
        `;

    }

}

// ===========================================================
// EDIT RESULT
// ===========================================================

function editResult(id) {

    window.location.href = `editResult.html?id=${id}`;

}

// ===========================================================
// DELETE RESULT
// ===========================================================

async function deleteResult(id) {

    if (!confirm("Delete this result?")) return;

    try {

        const result = await API.delete(`results/${id}`);

        alert(result.message);

        if (result.success) {

            loadResults();

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete result.");

    }

}

// ===========================================================
// LOAD PAGE
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    loadResults();

});