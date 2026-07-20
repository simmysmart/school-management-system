const API = "http://localhost:5000/api";

// ======================================
// Get URL Parameters
// ======================================

const params = new URLSearchParams(window.location.search);

const studentId = params.get("student");
const term = params.get("term");
const session = params.get("session");

// ======================================
// Load Report Card
// ======================================

async function loadReport() {

    try {

        const response = await fetch(`${API}/results`);

        const result = await response.json();

        if (!result.success) {

            alert("Unable to load report.");

            return;

        }

        // Filter Results
        const results = result.data.filter(item =>

            item.student_id == studentId &&
            item.term == term &&
            item.session == session

        );

        if (results.length === 0) {

            document.getElementById("reportTable").innerHTML = `

                <tr>

                    <td colspan="6">

                        No Result Found

                    </td>

                </tr>

            `;

            return;

        }

        // Student Information
        document.getElementById("studentName").innerHTML =
            results[0].first_name + " " + results[0].last_name;

        document.getElementById("admissionNumber").innerHTML =
            results[0].admission_number;

        document.getElementById("term").innerHTML = term;

        document.getElementById("session").innerHTML = session;

        // NOTE:
        // Replace this later with the actual class from your database.
        document.getElementById("studentClass").innerHTML = "SS3";

        let totalScore = 0;

        let html = "";

        results.forEach(result => {

            totalScore += Number(result.total);

            html += `

                <tr>

                    <td>${result.subject_name}</td>

                    <td>${result.ca_score}</td>

                    <td>${result.exam_score}</td>

                    <td>${result.total}</td>

                    <td>${result.grade}</td>

                    <td>${result.remark}</td>

                </tr>

            `;

        });

        document.getElementById("reportTable").innerHTML = html;

        // ======================================
        // Calculate Average
        // ======================================

        const average = (
            totalScore / results.length
        ).toFixed(2);

        document.getElementById("totalScore").innerHTML =
            totalScore;

        document.getElementById("averageScore").innerHTML =
            average;

        // ======================================
        // Position
        // ======================================

        document.getElementById("position").innerHTML =
            "Pending";

        // ======================================
        // Teacher Comment
        // ======================================

        let teacherComment = "";

        if (average >= 70) {

            teacherComment =
                "Excellent performance. Keep it up.";

        }

        else if (average >= 60) {

            teacherComment =
                "Very Good performance.";

        }

        else if (average >= 50) {

            teacherComment =
                "Good performance.";

        }

        else if (average >= 40) {

            teacherComment =
                "Fair performance. Work harder.";

        }

        else {

            teacherComment =
                "Poor performance. Serious improvement needed.";

        }

        document.getElementById("teacherComment").innerHTML =
            teacherComment;

        // ======================================
        // Principal Comment
        // ======================================

        document.getElementById("principalComment").innerHTML =
            "Promoted to the next class.";

    }

    catch (error) {

        console.log(error);

    }

}

loadReport();