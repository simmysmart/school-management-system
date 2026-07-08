const API = "http://localhost:5000/api";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// ===============================
// Load Classes
// ===============================

async function loadClasses(selected = "") {

    const select = document.getElementById("class_id");

    try {

        const res = await fetch(API + "/classes");

        const result = await res.json();

        const classes = result.data || result.classes || [];

        let html = '<option value="">Select Class</option>';

        classes.forEach(c => {

            html += `
                <option value="${c.id}"
                ${selected == c.id ? "selected" : ""}>
                    ${c.class_name}
                </option>
            `;

        });

        select.innerHTML = html;

    }

    catch (err) {

        console.log(err);

    }

}

// ===============================
// Load Teachers
// ===============================

async function loadTeachers(selected = "") {

    const select = document.getElementById("teacher_id");

    try {

        const res = await fetch(API + "/teachers");

        const result = await res.json();

        const teachers = result.data || result.teachers || [];

        let html = '<option value="">Select Teacher</option>';

        teachers.forEach(t => {

            html += `
                <option value="${t.id}"
                ${selected == t.id ? "selected" : ""}>
                    ${t.first_name} ${t.last_name}
                </option>
            `;

        });

        select.innerHTML = html;

    }

    catch (err) {

        console.log(err);

    }

}

// ===============================
// Load Subject
// ===============================

async function loadSubject() {

    try {

        const res = await fetch(API + "/subjects/" + id);

        const result = await res.json();

        if (!result.success) {

            alert(result.message);

            return;

        }

        const subject = result.data;

        document.getElementById("subject_name").value = subject.subject_name;
        document.getElementById("subject_code").value = subject.subject_code;

        await loadClasses(subject.class_id);

        await loadTeachers(subject.teacher_id);

    }

    catch (err) {

        console.log(err);

        alert("Unable to load subject.");

    }

}

// ===============================
// Update Subject
// ===============================

document.getElementById("editSubjectForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const data = {

        subject_name: document.getElementById("subject_name").value,

        subject_code: document.getElementById("subject_code").value,

        class_id: document.getElementById("class_id").value,

        teacher_id: document.getElementById("teacher_id").value || null

    };

    try {

        const res = await fetch(API + "/subjects/" + id, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(data)

        });

        const result = await res.json();

        alert(result.message);

        if (result.success) {

            window.location.href = "subjects.html";

        }

    }

    catch (err) {

        console.log(err);

        alert("Server Error");

    }

});

// ===============================
// Initialize
// ===============================

loadSubject();