# Instagram Clone App

This project is an **Instagram clone** built with **React Native** using **Expo**, fully compatible with **Android and iOS** devices.  
It follows a **Clean Architecture + Feature-Based + Atomic Design** approach, ensuring modularity, scalability, and maintainability.

---

## **Features**

- A **feed** displaying posts fetched from a mock API.
- Ability to:
  - **Like** posts.
  - **Save** posts.
  - **Add and view comments**.
- **Global state management** using **Redux Toolkit**.
- **Persistent state** with **Async Storage**.
- **Axios** for API requests.
- **Moment.js** for post date formatting.

---

## **Project Architecture**

The app follows:

- **Clean Architecture** to separate concerns between UI, domain, and data layers.
- **Feature-Based structure** to group related files and functionalities.
- **Atomic Design** principles for UI components (atoms, molecules, organisms, templates, pages).

---

## **Technologies Used**

- **React Native (Expo)**
- **Redux Toolkit**
- **Async Storage**
- **Axios**
- **Moment.js**
- **TypeScript**
- **React Native SVG**
- **React Navigation**
- **React Native Dotenv**
- **React Native Size Matters**

---

## **Setup Instructions**

Follow the steps below to run the project locally:

1. **Clone the repository**:

   ```bash
   git clone <repository_url>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create an `.env` file** at the root of the project and add the following variable:

   ```env
   BASE_URL=https://662029f13bf790e070af2cd8.mockapi.io/api/v1
   ```

4. **Start the Metro bundler**:

   ```bash
   npm start
   ```

5. **Run the app**:
   - **On an emulator**: Choose **Android** or **iOS** when prompted by Expo.
   - **On a physical device**:
     - Download the **Expo Go** app from **Google Play Store** or **App Store**.
     - Scan the QR code generated by Expo in the terminal.
     - The app will run on your device.

---

## **Folder Structure**

The project uses a well-defined structure for scalability:

```
src/
 ├── core/            # Shared logic, constants, hooks, store, utilities
 ├── data/            # API calls and repositories
 ├── domain/          # Business logic (models, repositories, use cases)
 ├── features/        # App features (Posts, Settings)
 ├── navigation/      # App navigation
 ├── ui/              # Global UI components and providers
 └── App.tsx          # Root component
```
