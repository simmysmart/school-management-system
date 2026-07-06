// ==========================================
// Load All Classes
// ==========================================

const API_URL = "http://localhost:5000/api/classes";

async function loadClasses() {

    const table = document.getElementById("classTable");

    try {

        const response = await fetch(API_URL);

        const result = await response.json();

        if (!result.success) {

            table.innerHTML = `
                <tr>
                    <td colspan="4">Unable to load classes.</td>
                </tr>
            `;

            return;
        }

        // No classes found
        if (result.data.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="4">No classes found.</td>
                </tr>
            `;

            return;
        }

        let output = "";

        result.data.forEach(cls => {

            output += `
                <tr>

                    <td>${cls.class_name}</td>

                    <td>
                        ${cls.first_name ? cls.first_name + " " + cls.last_name : "Not Assigned"}
                    </td>

                    <td>
                        ${new Date(cls.created_at).toLocaleDateString()}
                    </td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick="editClass(${cls.id})">

                            Edit

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteClass(${cls.id})">

                            Delete

                        </button>

                    </td>

                </tr>
            `;

        });

        table.innerHTML = output;

    }

    catch (error) {

        console.error(error);

        table.innerHTML = `
            <tr>
                <td colspan="4">
                    Server connection failed.
                </td>
            </tr>
        `;

    }

}

// ==========================================
// Placeholder Functions
// ==========================================

function editClass(id) {

    window.location.href = `editClass.html?id=${id}`;

}

function deleteClass(id) {

    alert("Delete Class ID: " + id);

}

// ==========================================
// Load Data
// ==========================================

loadClasses();