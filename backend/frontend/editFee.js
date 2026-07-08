const API = "http://localhost:5000/api";

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

// ========================================
// Load Classes
// ========================================

async function loadClasses(selected = "") {

    const select = document.getElementById("class_id");

    try {

        const response = await fetch(API + "/classes");

        const result = await response.json();

        let html = '<option value="">Select Class</option>';

        if (result.success) {

            result.data.forEach(cls => {

                html += `
                    <option value="${cls.id}"
                        ${selected == cls.id ? "selected" : ""}>
                        ${cls.class_name}
                    </option>
                `;

            });

        }

        select.innerHTML = html;

    }

    catch (error) {

        console.error(error);

    }

}

// ========================================
// Load Fee
// ========================================

async function loadFee() {

    try {

        const response = await fetch(API + "/fees/" + id);

        const result = await response.json();

        if (!result.success) {

            alert(result.message);

            return;

        }

        const fee = result.data;

        document.getElementById("fee_name").value = fee.fee_name;

        document.getElementById("amount").value = fee.amount;

        await loadClasses(fee.class_id);

    }

    catch (error) {

        console.error(error);

        alert("Unable to load fee.");

    }

}

// ========================================
// Update Fee
// ========================================

document.getElementById("editFeeForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const fee = {

        fee_name: document.getElementById("fee_name").value,

        amount: document.getElementById("amount").value,

        class_id: document.getElementById("class_id").value

    };

    try {

        const response = await fetch(API + "/fees/" + id, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(fee)

        });

        const result = await response.json();

        alert(result.message);

        if (result.success) {

            window.location.href = "fees.html";

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to update fee.");

    }

});

// ========================================

loadFee();