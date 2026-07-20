// ===========================================================
// File: api.js
// Project: School Management System
// Purpose:
// Centralized API helper.
// Automatically sends the JWT token with every request.
// ===========================================================

const API = {

    async request(endpoint, method = "GET", data = null) {

        // Get JWT token from browser storage
        const token = localStorage.getItem("token");

        const options = {

            method,

            headers: {

                "Content-Type": "application/json",

                "Authorization": token ? `Bearer ${token}` : ""

            }

        };

        if (data) {

            options.body = JSON.stringify(data);

        }

        const response = await fetch(

            `${CONFIG.API_URL}/${endpoint}`,

            options

        );

        return await response.json();

    },

    get(endpoint) {

        return this.request(endpoint);

    },

    post(endpoint, data) {

        return this.request(endpoint, "POST", data);

    },

    put(endpoint, data) {

        return this.request(endpoint, "PUT", data);

    },

    delete(endpoint) {

        return this.request(endpoint, "DELETE");

    }

};