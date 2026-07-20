// ===========================================================
// File: editPayment.js
// Project: School Management System
// Purpose:
// Load Payment Details and Update Payment
// ===========================================================

const API = "http://localhost:5000/api";

// ===========================================================
// GET PAYMENT ID
// ===========================================================

const params = new URLSearchParams(window.location.search);

const paymentId = params.get("id");

// ===========================================================
// LOAD STUDENTS
// ===========================================================

async function loadStudents(selected = "") {

    const select = document.getElementById("student_id");

    select.innerHTML = `
        <option value="">
            Loading Students...
        </option>
    `;

    try {

        const response = await fetch(`${API}/students`);

        const result = await response.json();

        let html = `
            <option value="">
                Select Student
            </option>
        `;

        if (result.success && result.students.length > 0) {

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

        else {

            html += `
                <option value="">
                    No Students Found
                </option>
            `;

        }

        select.innerHTML = html;

    }

    catch (error) {

        console.error(error);

        select.innerHTML = `
            <option value="">
                Unable to load students
            </option>
        `;

    }

}

// ===========================================================
// LOAD FEES
// ===========================================================

async function loadFees(selected = "") {

    const select = document.getElementById("fee_id");

    select.innerHTML = `
        <option value="">
            Loading Fees...
        </option>
    `;

    try {

        const response = await fetch(`${API}/fees`);

        const result = await response.json();

        let html = `
            <option value="">
                Select Fee
            </option>
        `;

        if (result.success && result.data.length > 0) {

            result.data.forEach(fee => {

                html += `

                    <option
                        value="${fee.id}"
                        ${selected == fee.id ? "selected" : ""}>

                        ${fee.fee_name}
                        -
                        ₦${Number(fee.amount).toLocaleString()}

                    </option>

                `;

            });

        }

        else {

            html += `
                <option value="">
                    No Fees Found
                </option>
            `;

        }

        select.innerHTML = html;

    }

    catch (error) {

        console.error(error);

        select.innerHTML = `
            <option value="">
                Unable to load fees
            </option>
        `;

    }

}

// ===========================================================
// LOAD PAYMENT
// ===========================================================

async function loadPayment() {

    if (!paymentId) {

        alert("Payment ID not found.");

        window.location.href = "payments.html";

        return;

    }

    try {

        const response = await fetch(`${API}/payments/${paymentId}`);

        const result = await response.json();

        if (!result.success) {

            alert(result.message);

            return;

        }

        const payment = result.data;

        await loadStudents(payment.student_id);

        await loadFees(payment.fee_id);

        document.getElementById("amount_paid").value =
            payment.amount_paid;

        document.getElementById("payment_method").value =
            payment.payment_method;

        document.getElementById("payment_date").value =
            payment.payment_date.split("T")[0];

    }

    catch (error) {

        console.error(error);

        alert("Unable to load payment.");

    }

}

// ===========================================================
// UPDATE PAYMENT
// ===========================================================

document.getElementById("paymentForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const payment = {

        student_id: document.getElementById("student_id").value,

        fee_id: document.getElementById("fee_id").value,

        amount_paid: document.getElementById("amount_paid").value,

        payment_method: document.getElementById("payment_method").value,

        payment_date: document.getElementById("payment_date").value

    };

    if (

        !payment.student_id ||
        !payment.fee_id ||
        !payment.amount_paid ||
        !payment.payment_method ||
        !payment.payment_date

    ) {

        alert("Please fill in all fields.");

        return;

    }

    try {

        const response = await fetch(`${API}/payments/${paymentId}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(payment)

        });

        const result = await response.json();

        if (result.success) {

            alert(result.message);

            window.location.href = "payments.html";

        }

        else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to update payment.");

    }

});

// ===========================================================
// INITIALIZE PAGE
// ===========================================================

loadPayment();