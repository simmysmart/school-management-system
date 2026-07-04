// =========================================
// Activity Logger
// Records important user activities
// =========================================

const db = require("../db");

const logActivity = (userId, action, ipAddress) => {

    db.query(
        "INSERT INTO activity_logs (user_id, action, ip_address) VALUES (?, ?, ?)",
        [userId, action, ipAddress],
        (err) => {
            if (err) {
                console.error("Activity Log Error:", err);
            } else {
                console.log("Activity logged successfully.");
            }
        }
    );

};

module.exports = logActivity;