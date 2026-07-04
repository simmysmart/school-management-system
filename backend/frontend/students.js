// =========================================
// Load All Students
// =========================================

async function loadStudents() {

    try {

        const response = await fetch("http://localhost:5000/api/students");

        const result = await response.json();

        const table = document.getElementById("studentTable");

        table.innerHTML = "";

        if (!result.success) {
            table.innerHTML = `
                <tr>
                    <td colspan="6">Failed to load students.</td>
                </tr>
            `;
            return;
        }

        if (result.students.length === 0) {
            table.innerHTML = `
                <tr>
                    <td colspan="6">No students found.</td>
                </tr>
            `;
            return;
        }

        result.students.forEach(student => {

            const row = `
                <tr>
                    <td>${student.admission_number}</td>
                    <td>${student.first_name} ${student.last_name}</td>
                    <td>${student.gender}</td>
                    <td>${student.class}</td>
                    <td>${student.phone || ""}</td>
                    <td>
                        <button class="edit-btn" onclick="editStudent(${student.id})">Edit</button>
                        <button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                </tr>
            `;

            table.innerHTML += row;

        });

    } catch (error) {

        console.error(error);

        document.getElementById("studentTable").innerHTML = `
            <tr>
                <td colspan="6">Error connecting to server.</td>
            </tr>
        `;

    }

}

// =========================================
// Edit Student
// =========================================

function editStudent(id) {

    window.location.href = `editStudent.html?id=${id}`;

}

// =========================================
// Delete Student
// =========================================
async function deleteStudent(id) {

    const confirmDelete = confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(`http://localhost:5000/api/students/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        alert(result.message);

        // Reload table after delete
        loadStudents();

    } catch (error) {

        console.error(error);
        alert("Error deleting student");

    }

}

// Load students when page opens
loadStudents();