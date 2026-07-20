// =========================================
// API URL
// =========================================

const API = "http://localhost:5000/api/classes";
const TEACHERS_API = "http://localhost:5000/api/teachers";

const params = new URLSearchParams(window.location.search);
const classId = params.get("id");

// =========================================
// Load Teachers
// =========================================

async function loadTeachers(selectedTeacher = "") {

    try {

        const response = await fetch(TEACHERS_API);

        const result = await response.json();

        const teacherSelect = document.getElementById("class_teacher");

        teacherSelect.innerHTML = `
            <option value="">Select Teacher</option>
        `;

        result.teachers.forEach((teacher) => {

            teacherSelect.innerHTML += `
                <option
                    value="${teacher.id}"
                    ${teacher.id == selectedTeacher ? "selected" : ""}>

                    ${teacher.first_name} ${teacher.last_name}

                </option>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =========================================
// Load Class Details
// =========================================

async function loadClass() {

    try {

        const response = await fetch(`${API}/${classId}`);

        const result = await response.json();

        document.getElementById("class_name").value =
            result.class.class_name;

        await loadTeachers(result.class.class_teacher_id);

    } catch (error) {

        console.error(error);

    }

}

// =========================================
// Update Class
// =========================================

document.getElementById("editClassForm")
.addEventListener("submit", async function (e) {

    e.preventDefault();

    const classData = {

        class_name:
            document.getElementById("class_name").value,

        class_teacher_id:
            document.getElementById("class_teacher").value

    };

    try {

        const response = await fetch(`${API}/${classId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(classData)

        });

        const result = await response.json();

        document.getElementById("message").innerHTML =
            result.message;

        if (result.success) {

            setTimeout(() => {

                window.location.href = "classes.html";

            }, 1500);

        }

    } catch (error) {

        console.error(error);

        document.getElementById("message").innerHTML =
            "Unable to update class.";

    }

});

// =========================================
// Start
// =========================================

loadClass();