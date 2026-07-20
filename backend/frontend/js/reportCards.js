const API = "http://localhost:5000/api";

// ======================================
// Load Students
// ======================================

async function loadStudents() {

    const studentSelect = document.getElementById("student_id");

    try {

        const response = await fetch(`${API}/students`);

        const result = await response.json();

        let html = `<option value="">Select Student</option>`;

        if (result.success) {

            result.students.forEach(student => {

                html += `
                    <option value="${student.id}">
                        ${student.admission_number} - ${student.first_name} ${student.last_name}
                    </option>
                `;

            });

        }

        studentSelect.innerHTML = html;

    }

    catch (error) {

        console.error(error);

        studentSelect.innerHTML =
            `<option value="">Unable to load students</option>`;

    }

}

// ======================================
// Generate Report
// ======================================

document.getElementById("reportForm").addEventListener("submit", function (e) {

    e.preventDefault();

    const student = document.getElementById("student_id").value;

    const term = document.getElementById("term").value;

    const session = document.getElementById("session").value;

    if (!student || !term || !session) {

        alert("Please complete all fields.");

        return;

    }

    window.location.href =
        `studentReport.html?student=${student}&term=${term}&session=${session}`;

});

// ======================================
// Initialize
// ======================================

loadStudents();