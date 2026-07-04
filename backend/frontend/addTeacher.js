document.getElementById("teacherForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const teacher = {

        staff_id: document.getElementById("staff_id").value,
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        qualification: document.getElementById("qualification").value

    };

    try {

        const response = await fetch("http://localhost:5000/api/teachers/add", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(teacher)

        });

        const result = await response.json();

        document.getElementById("message").innerHTML = result.message;

        if (result.success) {

            document.getElementById("teacherForm").reset();

        }

    } catch (error) {

        console.error(error);

        document.getElementById("message").innerHTML = "Unable to save teacher.";

    }

});