const API = "http://localhost:5000/api";

// ========================================
// Load Classes
// ========================================

async function loadClasses() {

    const select = document.getElementById("class_id");

    try {

        const response = await fetch(API + "/classes");

        const result = await response.json();

        let html = '<option value="">Select Class</option>';

        if (result.success) {

            result.data.forEach(cls => {

                html += `
                    <option value="${cls.id}">
                        ${cls.class_name}
                    </option>
                `;

            });

        }

        select.innerHTML = html;

    }

    catch (error) {

        console.error(error);

        select.innerHTML = `
            <option value="">
                Unable to load classes
            </option>
        `;

    }

}

// ========================================
// Save Fee
// ========================================

document.getElementById("feeForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const fee = {

        fee_name: document.getElementById("fee_name").value,

        amount: document.getElementById("amount").value,

        class_id: document.getElementById("class_id").value

    };

    try {

        const response = await fetch(API + "/fees", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(fee)

        });

        const result = await response.json();

        if (result.success) {

            alert("Fee added successfully!");

            window.location.href = "fees.html";

        } else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to save fee.");

    }

});

// ========================================
// Initialize
// ========================================

loadClasses();