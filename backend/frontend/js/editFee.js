// ===========================================================
// File: editFee.js
// Project: School Management System
// Purpose:
// Load Fee Details and Update Fee
// ===========================================================

// ===========================================================
// GET FEE ID FROM URL
// ===========================================================

const params = new URLSearchParams(window.location.search);

const feeId = params.get("id");

// ===========================================================
// LOAD CLASSES
// ===========================================================

async function loadClasses(selectedClass = "") {

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
                    <option
                        value="${cls.id}"
                        ${selectedClass == cls.id ? "selected" : ""}
                    >
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
// LOAD FEE DETAILS
// ===========================================================

async function loadFee() {

    if (!feeId) {

        alert("Fee ID not found.");

        window.location.href = "fees.html";

        return;

    }

    try {

        const result = await API.get(`fees/${feeId}`);

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

// ===========================================================
// UPDATE FEE
// ===========================================================

document.getElementById("editFeeForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const fee = {

        fee_name: document.getElementById("fee_name").value.trim(),

        amount: document.getElementById("amount").value,

        class_id: document.getElementById("class_id").value

    };

    try {

        const result = await API.put(`fees/${feeId}`, fee);

        if (result.success) {

            alert("Fee updated successfully.");

            window.location.href = "fees.html";

        } else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to update fee.");

    }

});

// ===========================================================
// LOAD PAGE
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    loadFee();

});