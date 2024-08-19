# Thought Process - Frontend Project

## Objective

The goal of this frontend project was to create an intuitive and user-friendly interface for managing request types, which interacts with a backend API.

## Tradeoffs and Considerations

1. **Complexity vs. Usability**: I aimed for a balance between feature richness and ease of use. For instance, the form validations are simple yet effective, ensuring data integrity without overwhelming the user.
2. **Performance**: While Zustand is efficient for this project, more complex state management might benefit from tools like Redux if the application scales.

## UI Design

-   **Dark Mode**: Implemented a toggle for light and dark modes using the `next-themes` library. This enhances user experience by providing a choice between themes.
-   **Form Design**: The form was designed to be dynamic, allowing users to add and remove fields easily. Error messages are shown inline to guide users.
-   **Responsive Layout**: The UI is fully responsive, ensuring usability across different screen sizes, from mobile to desktop.
