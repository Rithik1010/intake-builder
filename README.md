# Frontend Project - Request Type Management UI

This project is a frontend web application built with Next.js and Tailwind CSS, providing a user interface for managing request types. It interacts with a [FastAPI backend](https://github.com/Rithik1010/intake-backend) to perform CRUD operations on request types.

## Important Notes

-   **Login Credentials:** You can log in using the email ID `a@a.com`.
-   **Backend Response Time:** Please note that the backend API is deployed on a free-tier web service on Render, which has limited resources. The initial response might take some time, with a typical wait time being around 30 seconds.

## Requirements

-   Node.js 18+
-   npm
-   Next.js
-   Tailwind CSS

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Rithik1010/intake-builder.git
    cd intake-builder
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up the environment variables:

    ```bash
    export NEXT_PUBLIC_BACKEND_URL="http://localhost:8000"
    ```

4. Run the application:

    ```bash
    npm run dev
    ```

## Project Features

-   **Dark Mode Toggle:** Users can switch between light and dark themes.
-   **Request Type Management:** Create, edit, and delete request types.
-   **Form Validation:** Real-time form validation for better user experience.
-   **Dynamic UI:** Responsive and modern UI built with shadcn/ui.
