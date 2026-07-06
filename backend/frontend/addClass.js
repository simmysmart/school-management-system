// =========================================
// API URLs
// =========================================

const TEACHER_API = "http://localhost:5000/api/teachers";
const CLASS_API = "http://localhost:5000/api/classes";

// =========================================
// Load Teachers into Dropdown
// =========================================
async function loadTeachers() {

    const dropdown = document.getElementById("class_teacher");

    try {

        const response = await fetch("http://localhost:5000/api/teachers");

        const result = await response.json();

        console.log(result);

        dropdown.innerHTML = "";

        dropdown.innerHTML += `<option value="">Select Class Teacher</option>`;

        result.teachers.forEach((teacher) => {

            dropdown.innerHTML += `
                <option value="${teacher.id}">
                    ${teacher.first_name} ${teacher.last_name}
                </option>
            `;

        });

    } catch (error) {

        console.error("Teacher Loading Error:", error);

        dropdown.innerHTML = `
            <option>Unable to load teachers</option>
        `;

    }

}
// =========================================
// Save Class
// =========================================

document.getElementById("classForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const message = document.getElementById("message");

    const data = {

        class_name: document.getElementById("class_name").value,

        class_teacher_id: document.getElementById("class_teacher").value

    };

    try{

        const response = await fetch(CLASS_API,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

        const result = await response.json();

        if(result.success){

            message.innerHTML = `
                <p class="success-message">
                    ${result.message}
                </p>
            `;

            setTimeout(function(){

                window.location.href="classes.html";

            },1500);

        }

        else{

            message.innerHTML = `
                <p class="error-message">
                    ${result.message}
                </p>
            `;

        }

    }

    catch(error){

        console.error(error);

        message.innerHTML = `
            <p class="error-message">
                Server Error
            </p>
        `;

    }

});

//=========================================
// Initialize
// =========================================

loadTeachers();