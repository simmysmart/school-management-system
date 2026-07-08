const API_URL = "http://localhost:5000/api/fees";

// =======================================
// Load Fees
// =======================================

async function loadFees() {

    const table = document.getElementById("feeTable");

    try {

        const response = await fetch(API_URL);

        const result = await response.json();

        if (!result.success) {

            table.innerHTML = `
                <tr>
                    <td colspan="5">Unable to load fees.</td>
                </tr>
            `;

            return;

        }

        if (result.data.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="5">No fees found.</td>
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

                    <td>${fee.class_name}</td>

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
                <td colspan="5">Server connection failed.</td>
            </tr>
        `;

    }

}

// =======================================
// Edit Fee
// =======================================

function editFee(id) {

    window.location.href = `editFee.html?id=${id}`;

}

// =======================================
// Delete Fee
// =======================================

async function deleteFee(id) {

    if (!confirm("Delete this fee?")) return;

    try {

        const response = await fetch(API_URL + "/" + id, {

            method: "DELETE"

        });

        const result = await response.json();

        alert(result.message);

        loadFees();

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete fee.");

    }

}

// Load data

loadFees();