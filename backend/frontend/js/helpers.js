// ======================================
// SUCCESS ALERT
// ======================================

function showSuccess(message) {

    alert(message);

}

// ======================================
// ERROR ALERT
// ======================================

function showError(message) {

    alert(message);

}

// ======================================
// CONFIRM DELETE
// ======================================

function confirmDelete(message = "Are you sure you want to delete this record?") {

    return confirm(message);

}

// ======================================
// FORMAT NAIRA
// ======================================

function formatCurrency(amount) {

    return "₦" + Number(amount).toLocaleString();

}

// ======================================
// FORMAT DATE
// ======================================

function formatDate(date) {

    return new Date(date).toLocaleDateString();

}

// ======================================
// TABLE LOADING
// ======================================

function showLoading(tableId, colspan = 5) {

    document.getElementById(tableId).innerHTML = `

        <tr>

            <td colspan="${colspan}">

                Loading...

            </td>

        </tr>

    `;

}

// ======================================
// EMPTY TABLE
// ======================================

function showEmpty(tableId, message = "No Data Found", colspan = 5) {

    document.getElementById(tableId).innerHTML = `

        <tr>

            <td colspan="${colspan}">

                ${message}

            </td>

        </tr>

    `;

}

// ======================================
// PAGE LOADER
// ======================================

function showLoader() {

    document.body.style.cursor = "wait";

}

// ======================================
// HIDE LOADER
// ======================================

function hideLoader() {

    document.body.style.cursor = "default";

}