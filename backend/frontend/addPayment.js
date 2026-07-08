const API = "http://localhost:5000/api";

// ========================================
// Load Students
// ========================================

async function loadStudents() {

    const select = document.getElementById("student_id");

    try {

        const response = await fetch(`${API}/students`);
        const result = await response.json();

        let html = '<option value="">Select Student</option>';

        if (result.success && result.students.length > 0) {

            result.students.forEach(student => {

                html += `
                    <option value="${student.id}">
                        ${student.admission_number} - ${student.first_name} ${student.last_name}
                    </option>
                `;

            });

        } else {

            html += '<option value="">No Students Found</option>';

        }

        select.innerHTML = html;

    } catch (error) {

        console.error("Students Error:", error);

        select.innerHTML =
            '<option value="">Unable to load students</option>';

    }

}

// ========================================
// Load Fees
// ========================================

async function loadFees() {

    const select = document.getElementById("fee_id");

    try {

        const response = await fetch(`${API}/fees`);
        const result = await response.json();

        let html = '<option value="">Select Fee</option>';

        if (result.success && result.data.length > 0) {

            result.data.forEach(fee => {

                html += `
                    <option value="${fee.id}">
                        ${fee.fee_name} - ₦${Number(fee.amount).toLocaleString()}
                    </option>
                `;

            });

        } else {

            html += '<option value="">No Fees Found</option>';

        }

        select.innerHTML = html;

    } catch (error) {

        console.error("Fees Error:", error);

        select.innerHTML =
            '<option value="">Unable to load fees</option>';

    }

}

// ========================================
// Save Payment
// ========================================

const paymentForm = document.getElementById("paymentForm");

paymentForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const payment = {

        student_id: document.getElementById("student_id").value,

        fee_id: document.getElementById("fee_id").value,

        amount_paid: document.getElementById("amount_paid").value,

        payment_method: document.getElementById("payment_method").value,

        payment_date: document.getElementById("payment_date").value

    };

    try {

        const response = await fetch(`${API}/payments`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(payment)

        });

        const result = await response.json();

        if (result.success) {

    alert("Payment added successfully!");

    window.location.href = "payments.html";

} else {

            alert(result.message);

        }

    } catch (error) {

        console.error("Save Error:", error);

        alert("Unable to save payment.");

    }

});

// ========================================
// Initialize Page
// ========================================

window.onload = function () {

    loadStudents();

    loadFees();

    document.getElementById("payment_date").value =
        new Date().toISOString().split("T")[0];

};