// ===========================================================
// File: addResult.js
// Project: School Management System
// Purpose:
// Load students and subjects, then add a new result.
// ===========================================================

// ===========================================================
// Load Students
// ===========================================================

async function loadStudents() {

    const select = document.getElementById("student_id");

    try {

        const result = await API.get("students");

        let html = '<option value="">Select Student</option>';

        if (result.success) {

            const students = result.students || result.data || [];

            students.forEach(student => {

                html += `
                    <option value="${student.id}">
                        ${student.admission_number} - ${student.first_name} ${student.last_name}
                    </option>
                `;

            });

        } else {

            html = '<option value="">No Students Found</option>';

        }

        select.innerHTML = html;

    }

    catch (error) {

        console.error("Students Error:", error);

        select.innerHTML =
            '<option value="">Unable to load students</option>';

    }

}

// ===========================================================
// Load Subjects
// ===========================================================

async function loadSubjects() {

    const select = document.getElementById("subject_id");

    try {

        const result = await API.get("subjects");

        let html = '<option value="">Select Subject</option>';

        if (result.success) {

            const subjects = result.subjects || result.data || [];

            subjects.forEach(subject => {

                html += `
                    <option value="${subject.id}">
                        ${subject.subject_name}
                    </option>
                `;

            });

        } else {

            html = '<option value="">No Subjects Found</option>';

        }

        select.innerHTML = html;

    }

    catch (error) {

        console.error("Subjects Error:", error);

        select.innerHTML =
            '<option value="">Unable to load subjects</option>';

    }

}

// ===========================================================
// Save Result
// ===========================================================

const resultForm = document.getElementById("resultForm");

resultForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const resultData = {

        student_id: document.getElementById("student_id").value,

        subject_id: document.getElementById("subject_id").value,

        term: document.getElementById("term").value,

        session: document.getElementById("session").value.trim(),

        ca_score: document.getElementById("ca_score").value,

        exam_score: document.getElementById("exam_score").value

    };

    if (

        !resultData.student_id ||
        !resultData.subject_id ||
        !resultData.term ||
        !resultData.session ||
        resultData.ca_score === "" ||
        resultData.exam_score === ""

    ) {

        alert("Please complete all fields.");

        return;

    }

    try {

        const result = await API.post("results", resultData);

        if (result.success) {

            alert(result.message);

            resultForm.reset();

            document.getElementById("session").value = "2025/2026";

            loadStudents();

            loadSubjects();

            setTimeout(() => {

                window.location.href = "results.html";

            }, 1000);

        } else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error("Save Error:", error);

        alert("Unable to connect to the server.");

    }

});

// ===========================================================
// Initialize Page
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    loadStudents();

    loadSubjects();

});