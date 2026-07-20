// ===========================================================
// File: fees.js
// Project: School Management System
// Purpose:
// Load, Edit and Delete Fees
// ===========================================================

// ===========================================================
// LOAD FEES
// ===========================================================

async function loadFees() {

    const table = document.getElementById("feeTable");

    table.innerHTML = `
        <tr>
            <td colspan="5">Loading fees...</td>
        </tr>
    `;

    try {

        const result = await API.get("fees");

        // Token expired
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
                    <td colspan="5">
                        Failed to load fees.
                    </td>
                </tr>
            `;

            return;

        }

        if (result.data.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="5">
                        No fees found.
                    </td>
                </tr>
            `;

            return;

        }

        let rows = "";

        result.data.forEach(fee => {

            rows += `
                <tr>

                    <td>${fee.fee_name}</td>

                    <td>₦${Number(fee.amount).toLocaleString()}</td>

                    <td>${fee.class_name || "Not Assigned"}</td>

                    <td>${new Date(fee.created_at).toLocaleDateString()}</td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick="editFee(${fee.id})">

                            Edit

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteFee(${fee.id})">

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
                <td colspan="5">
                    Unable to connect to server.
                </td>
            </tr>
        `;

    }

}

// ===========================================================
// EDIT FEE
// ===========================================================

function editFee(id) {

    window.location.href = `editFee.html?id=${id}`;

}

// ===========================================================
// DELETE FEE
// ===========================================================

async function deleteFee(id) {

    if (!confirm("Delete this fee?")) return;

    try {

        const result = await API.delete(`fees/${id}`);

        alert(result.message);

        loadFees();

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete fee.");

    }

}

// ===========================================================
// LOAD PAGE
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    loadFees();

});