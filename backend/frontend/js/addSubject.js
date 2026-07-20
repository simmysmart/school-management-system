// ===========================================================
// File: addSubject.js
// Project: School Management System
// Purpose:
// Add New Subject
// ===========================================================

// ===========================================================
// LOAD CLASSES
// ===========================================================

async function loadClasses() {

    const select = document.getElementById("class_id");

    try {

        const result = await API.get("classes");

        if (
            result.message === "Invalid token" ||
            result.message === "Access denied" ||
            result.message === "Unauthorized"
        ) {

            localStorage.removeItem("token");

            window.location.href = "login.html";

            return;

        }

        select.innerHTML = `<option value="">Select Class</option>`;

        if (result.success && result.data) {

            result.data.forEach(cls => {

                select.innerHTML += `
                    <option value="${cls.id}">
                        ${cls.class_name}
                    </option>
                `;

            });

        }

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
// LOAD TEACHERS
// ===========================================================

async function loadTeachers() {

    const select = document.getElementById("teacher_id");

    try {

        const result = await API.get("teachers");

        select.innerHTML = `
            <option value="">
                Select Teacher
            </option>
        `;

        if (result.success && result.teachers) {

            result.teachers.forEach(teacher => {

                select.innerHTML += `
                    <option value="${teacher.id}">
                        ${teacher.first_name} ${teacher.last_name}
                    </option>
                `;

            });

        }

    }

    catch (error) {

        console.error(error);

        select.innerHTML = `
            <option value="">
                Unable to load teachers
            </option>
        `;

    }

}

// ===========================================================
// SAVE SUBJECT
// ===========================================================

document.getElementById("subjectForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const message = document.getElementById("message");

    message.innerHTML = "";

    const subject = {

        subject_name: document.getElementById("subject_name").value.trim(),

        subject_code: document.getElementById("subject_code").value.trim(),

        class_id: document.getElementById("class_id").value,

        teacher_id: document.getElementById("teacher_id").value || null

    };

    try {

        const result = await API.post("subjects", subject);

        if (result.success) {

            message.style.color = "green";

            message.innerHTML = result.message;

            document.getElementById("subjectForm").reset();

            setTimeout(() => {

                window.location.href = "subjects.html";

            }, 1500);

        }

        else {

            message.style.color = "red";

            message.innerHTML = result.message;

        }

    }

    catch (error) {

        console.error(error);

        message.style.color = "red";

        message.innerHTML = "Unable to connect to the server.";

    }

});

// ===========================================================
// PAGE LOAD
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    loadClasses();

    loadTeachers();

});