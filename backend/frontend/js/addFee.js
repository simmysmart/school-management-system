// ===========================================================
// File: addFee.js
// Project: School Management System
// Purpose:
// Load Classes and Add New Fee
// ===========================================================

// ===========================================================
// LOAD CLASSES
// ===========================================================

async function loadClasses() {

    const select = document.getElementById("class_id");

    select.innerHTML = `
        <option value="">Loading Classes...</option>
    `;

    try {

        const result = await API.get("classes");

        // Token expired
        if (
            result.message === "Invalid token" ||
            result.message === "Access denied"
        ) {

            localStorage.removeItem("token");

            window.location.href = "login.html";

            return;

        }

        let html = `
            <option value="">Select Class</option>
        `;

        if (result.success && result.data.length > 0) {

            result.data.forEach(cls => {

                html += `
                    <option value="${cls.id}">
                        ${cls.class_name}
                    </option>
                `;

            });

        } else {

            html = `
                <option value="">No Classes Found</option>
            `;

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

// ===========================================================
// SAVE FEE
// ===========================================================

document.getElementById("feeForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const fee = {

        fee_name: document.getElementById("fee_name").value.trim(),

        amount: document.getElementById("amount").value,

        class_id: document.getElementById("class_id").value

    };

    try {

        const result = await API.post("fees", fee);

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

// ===========================================================
// LOAD PAGE
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    loadClasses();

});