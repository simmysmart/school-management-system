// ===========================================================
// File: js/editStudent.js
// Project: School Management System
// ===========================================================

// Get Student ID
const params = new URLSearchParams(window.location.search);
const studentId = params.get("id");

if (!studentId) {

    alert("Student ID not found.");

    window.location.href = "students.html";

}

// ===========================================================
// LOAD STUDENT
// ===========================================================

async function loadStudent() {

    try {

        const result = await API.get(`students/${studentId}`);

        if (!result.success) {

            alert(result.message);

            window.location.href = "students.html";

            return;

        }

        const student = result.student;

        document.getElementById("admission_number").value = student.admission_number;
        document.getElementById("first_name").value = student.first_name;
        document.getElementById("last_name").value = student.last_name;
        document.getElementById("gender").value = student.gender;
        document.getElementById("date_of_birth").value = student.date_of_birth.split("T")[0];
        document.getElementById("student_class").value = student.class;
        document.getElementById("phone").value = student.phone;
        document.getElementById("email").value = student.email;
        document.getElementById("address").value = student.address;

    }

    catch (error) {

        console.error(error);

        alert("Unable to load student.");

    }

}

// ===========================================================
// UPDATE STUDENT
// ===========================================================

document.getElementById("editForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const student = {

        admission_number: document.getElementById("admission_number").value,
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        gender: document.getElementById("gender").value,
        date_of_birth: document.getElementById("date_of_birth").value,
        student_class: document.getElementById("student_class").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value

    };

    try {

        const result = await API.put(`students/${studentId}`, student);

        document.getElementById("message").innerHTML = result.message;

        if (result.success) {

            document.getElementById("message").style.color = "green";

            setTimeout(() => {

                window.location.href = "students.html";

            }, 1000);

        } else {

            document.getElementById("message").style.color = "red";

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to update student.");

    }

});

// ===========================================================
// START PAGE
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    loadStudent();

});