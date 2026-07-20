// ===========================================================
// File: payments.js
// Project: School Management System
// Purpose:
// Load, Edit and Delete Payments.
// ===========================================================

const API = "http://localhost:5000/api/payments";

// ===========================================================
// LOAD PAYMENTS
// ===========================================================

async function loadPayments() {

    const table = document.getElementById("paymentTable");

    table.innerHTML = `
        <tr>
            <td colspan="6">
                Loading payments...
            </td>
        </tr>
    `;

    try {

        const response = await fetch(API);

        const result = await response.json();

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
                        No payments found.
                    </td>
                </tr>
            `;

            return;

        }

        let html = "";

        result.data.forEach(payment => {

            html += `

                <tr>

                    <td>

                        ${payment.first_name}
                        ${payment.last_name}

                    </td>

                    <td>

                        ${payment.fee_name}

                    </td>

                    <td>

                        ₦${Number(payment.amount_paid).toLocaleString()}

                    </td>

                    <td>

                        ${payment.payment_method}

                    </td>

                    <td>

                        ${new Date(payment.payment_date).toLocaleDateString()}

                    </td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick="editPayment(${payment.id})">

                            Edit

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deletePayment(${payment.id})">

                            Delete

                        </button>

                    </td>

                </tr>

            `;

        });

        table.innerHTML = html;

    }

    catch (error) {

        console.error(error);

        table.innerHTML = `
            <tr>
                <td colspan="6">
                    Unable to load payments.
                </td>
            </tr>
        `;

    }

}

// ===========================================================
// EDIT PAYMENT
// ===========================================================

function editPayment(id) {

    window.location.href = `editPayment.html?id=${id}`;

}

// ===========================================================
// DELETE PAYMENT
// ===========================================================

async function deletePayment(id) {

    const confirmDelete = confirm(

        "Are you sure you want to delete this payment?"

    );

    if (!confirmDelete) {

        return;

    }

    try {

        const response = await fetch(

            `${API}/${id}`,

            {

                method: "DELETE"

            }

        );

        const result = await response.json();

        if (result.success) {

            alert(result.message);

            loadPayments();

        }

        else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete payment.");

    }

}

// ===========================================================
// LOAD PAGE
// ===========================================================

loadPayments();