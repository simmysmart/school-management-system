async function loadTeachers() {

    try {

        const response = await fetch("http://localhost:5000/api/teachers");

        const result = await response.json();

        let rows = "";

        result.teachers.forEach((teacher) => {

            rows += `

            <tr>

                <td>${teacher.staff_id}</td>

                <td>${teacher.first_name} ${teacher.last_name}</td>

                <td>${teacher.gender}</td>

                <td>${teacher.phone}</td>

                <td>${teacher.email}</td>

                <td>${teacher.qualification}</td>

                <td>

    <button class="edit-btn" onclick="editTeacher(${teacher.id})">
        Edit
    </button>

    <button class="delete-btn" onclick="deleteTeacher(${teacher.id})">
        Delete
    </button>

</td>

            `;

        });

        document.getElementById("teacherTable").innerHTML = rows;

    } catch (error) {

        console.error(error);

    }

}

function editTeacher(id) {

    window.location.href = `editTeacher.html?id=${id}`;

}

async function deleteTeacher(id) {

    if (!confirm("Delete this teacher?")) return;

    const response = await fetch(`http://localhost:5000/api/teachers/${id}`, {

        method: "DELETE"

    });

    const result = await response.json();

    alert(result.message);

    loadTeachers();

}

loadTeachers();