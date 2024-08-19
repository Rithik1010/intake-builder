# Thought Process - Request Type Management UI

## 1. Login Flow for User Management

**Decision**: I implemented a login flow to ensure that only authenticated users can view, create, update, or delete request types.

**Justification**: Given that we only want users to manage request types that they own, it was essential to create a layer of authentication. This approach not only adds security but also ensures that users can only interact with their own data, thereby preventing unauthorized access and data breaches.

**Tradeoff**: Introducing authentication requires additional backend handling, but the tradeoff is justified for security and personalized user experience.

## 2. Skeleton, Empty State, and Validations

**Decision**: I added skeletons, empty state displays, and real-time form validations.

**Justification**: Handling edge cases gracefully is crucial for creating a robust user experience. Skeletons provide visual feedback when data is loading, while empty states give users clear guidance when no data is present. Real-time form validation prevents incorrect data submission and improves user interaction by providing immediate feedback.

**Tradeoff**: The tradeoff here involves additional complexity in the UI layer, but the enhanced user experience and the ability to handle edge cases effectively make this a worthwhile investment.

## 3. Use of Floating Action Button (FAB) for Request Type Creation

**Decision**: I chose to implement a Floating Action Button (FAB) for creating new request types.

**Justification**: The FAB is an intuitive and commonly recognized UI element that is well-suited for actions that are central to the application, such as creating new content. In this case, the primary action for users on the dashboard is to create new request types. The FAB is positioned in a way that is easily accessible and doesn't clutter the interface, making it a perfect fit for this purpose.

**Tradeoff**: While FABs are not always appropriate for all actions due to their prominence, in this case, the tradeoff is justified as the FAB makes it clear and easy for users to create new request types, which is a core feature of the application.

## 4. Dashboard Access Restriction

**Decision**: I restricted access to the dashboard page for users who are not logged in.

**Justification**: Ensuring that only authenticated users can access the dashboard is critical for maintaining the integrity and security of the application. It prevents unauthorized users from viewing or manipulating request types.

**Tradeoff**: This adds an additional step for users to log in before accessing the dashboard, but it is a necessary security measure to ensure that only legitimate users have access to sensitive data.

## 5. Implementation of Dark Mode

**Decision**: I added a dark mode to the UI, allowing users to switch between light and dark themes.

**Justification**: Dark mode has become a popular feature in modern applications as it reduces eye strain in low-light environments and can improve battery life on OLED screens. Moreover, I was not entirely satisfied with the initial color choices in light mode, so dark mode provided an additional customization option for users who prefer a different visual aesthetic.

**Tradeoff**: Implementing dark mode requires maintaining two sets of color schemes and ensuring that all UI components are properly styled in both modes. However, the tradeoff is justified by the accessibility it provides.

## 6. Deletion Validation for Request Types

**Decision**: I added a warning dialog that requires users to re-enter the request type name to confirm deletion.

**Justification**: Accidental deletion of request types can lead to data loss and user frustration. By requiring users to re-enter the request type name, we add an extra layer of validation that ensures the deletion is intentional. This feature reduces the likelihood of mistakes and helps protect the integrity of user data.

**Tradeoff**: This approach adds a slight inconvenience to the user by requiring an additional step during deletion. However, the security and data integrity benefits far outweigh this minor inconvenience, making it a necessary tradeoff.
