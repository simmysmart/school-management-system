const CLASS_API = "http://localhost:5000/api/classes";
const TEACHER_API = "http://localhost:5000/api/teachers";
const SUBJECT_API = "http://localhost:5000/api/subjects";

// =========================================
// Load Classes
// =========================================

async function loadClasses() {

    const select = document.getElementById("class_id");

    try {

        const response = await fetch(CLASS_API);

        const result = await response.json();

        select.innerHTML = '<option value="">Select Class</option>';

        if (result.success) {

            result.data.forEach(cls => {

                select.innerHTML += `
                    <option value="${cls.id}">
                        ${cls.class_name}
                    </option>
                `;

            });

        } else {

            select.innerHTML = '<option>Unable to load classes</option>';

        }

    }

    catch (error) {

        console.error(error);

        select.innerHTML = '<option>Unable to load classes</option>';

    }

}

// =========================================
// Load Teachers
// =========================================

async function loadTeachers() {

    const select = document.getElementById("teacher_id");

    try {

        const response = await fetch(TEACHER_API);

        const result = await response.json();

        select.innerHTML = '<option value="">Select Teacher</option>';

        if (result.success) {

            result.teachers.forEach(teacher => {

                select.innerHTML += `
                    <option value="${teacher.id}">
                        ${teacher.first_name} ${teacher.last_name}
                    </option>
                `;

            });

        } else {

            select.innerHTML = '<option>Unable to load teachers</option>';

        }

    }

    catch (error) {

        console.error(error);

        select.innerHTML = '<option>Unable to load teachers</option>';

    }

}

// =========================================
// Save Subject
// =========================================

document.getElementById("subjectForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const subject = {

        subject_name: document.getElementById("subject_name").value,

        subject_code: document.getElementById("subject_code").value,

        class_id: document.getElementById("class_id").value,

        teacher_id: document.getElementById("teacher_id").value || null

    };

    try {

        const response = await fetch(SUBJECT_API, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(subject)

        });

        const result = await response.json();

        if (result.success) {

            alert("Subject added successfully!");

            window.location.href = "subjects.html";

        } else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Server connection failed.");

    }

});

// =========================================
// Initialize
// =========================================

loadClasses();

loadTeachers();