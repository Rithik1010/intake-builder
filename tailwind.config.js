/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", // Ensure Tailwind processes all files in your src directory
    ],
    theme: {
        extend: {
            // You can extend the default theme here, if needed
        },
    },
    plugins: [
        require("@tailwindcss/forms"), // Optional: adds better styling for form elements
    ],
};
