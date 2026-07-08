const API_URL = "http://localhost:5000/api/payments";

// ========================================
// Load Payments
// ========================================

async function loadPayments() {

    const table = document.getElementById("paymentTable");

    try {

        const response = await fetch(API_URL);

        const result = await response.json();

        if (!result.success) {

            table.innerHTML = `
                <tr>
                    <td colspan="6">
                        Unable to load payments.
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

        let rows = "";

        result.data.forEach(payment => {

            rows += `

                <tr>

                    <td>${payment.first_name} ${payment.last_name}</td>

                    <td>${payment.fee_name}</td>

                    <td>₦${Number(payment.amount_paid).toLocaleString()}</td>

                    <td>${payment.payment_method}</td>

                    <td>${new Date(payment.payment_date).toLocaleDateString()}</td>

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

        table.innerHTML = rows;

    }

    catch (error) {

        console.error(error);

        table.innerHTML = `
            <tr>
                <td colspan="6">
                    Server connection failed.
                </td>
            </tr>
        `;

    }

}

// ========================================
// Edit Payment
// ========================================

function editPayment(id) {

    window.location.href = `editPayment.html?id=${id}`;

}

// ========================================
// Delete Payment
// ========================================

async function deletePayment(id) {

    if (!confirm("Delete this payment?")) return;

    try {

        const response = await fetch(API_URL + "/" + id, {

            method: "DELETE"

        });

        const result = await response.json();

        alert(result.message);

        loadPayments();

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete payment.");

    }

}

// ========================================

loadPayments();