# 🚀 Real-Time Transaction Live Monitor

A modern, high-performance dashboard for monitoring financial transactions in real-time. Built with **React 18**, **Tailwind CSS v4**, and **SignalR**, this application provides a seamless experience for tracking transaction statuses with high-end UI/UX standards.

---

## ✨ Key Features

* **Real-Time Data Streaming**: Instant updates via SignalR integration with a backend ingestion engine.
* **Modern SaaS UI**: A clean, minimalist design using **Tailwind CSS v4** and the **Inter** font family.
* **Dynamic Filtering**: Instantly filter transactions by status (Pending, Completed, Failed) using a custom-designed dropdown.
* **Performance Optimized**: Utilizes `React.memo`, `useMemo`, and `useCallback` to ensure smooth rendering even with high data frequency.
* **Enhanced UX (Bonus)**: 
    * **Arrival Animations**: New transactions "slide and fade" into the table with a smooth spring effect.
    * **Status Indicators**: Live "pulsing" connection status and color-coded badges.
    * **New Row Highlight**: Subtle glow effect for newly arrived data to catch the user's eye.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React (TS)** | Frontend framework with TypeScript for type safety. |
| **Redux Toolkit** | Centralized state management for transaction logs. |
| **SignalR** | WebSockets communication for real-time updates. |
| **Tailwind CSS v4** | Modern utility-first styling with hardware-accelerated animations. |
| **Vite** | Lightning-fast build tool and development server. |

---

## 📦 Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone [your-repository-url]
    cd [repository-folder]
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Tailwind CSS v4**:
    Ensure your `index.css` includes the v4 directive:
    ```css
    @import "tailwindcss";
    ```

4.  **Run the application**:
    ```bash
    npm run dev
    ```

---

## 🎨 UI Architecture

The project follows a component-based architecture for maximum reusability:

* **`DataTable`**: A generic, memoized table component that handles data rendering and entry animations.
* **`StatusBadge`**: A specialized component for displaying statuses with specific color palettes and indicators.
* **`useSignalR`**: A custom hook managing the connection lifecycle and Redux integration.
* **Selectors**: Optimized Redux selectors for efficient filtering without unnecessary re-renders.

---

## 💎 Bonus Implementation: "Enhanced UI Experience"

To meet the requirements of a high-end dashboard, the following were implemented:
* **Custom Animation Keyframes**: Defined in CSS for a "spring-like" entry of new rows.
* **Glassmorphism**: Backdrop blur effects on the table header and filter sections.
* **Tabular Numbers**: CSS `font-variant-numeric: tabular-nums` to prevent horizontal "jumping" of amounts and IDs during updates.

---

## 📄 License

This project is developed for educational/professional evaluation purposes. All rights reserved.