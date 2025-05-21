# Frontend Documentation for Spring Boot and React Application

## Overview
This project is a full-stack application that combines a Spring Boot backend with a React frontend. The backend is responsible for handling business logic and data management, while the frontend provides a user interface for interacting with the application.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- Java (version 11 or higher)
- Maven (for backend)

### Installation

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd spring-boot-react-app
   ```

2. **Navigate to the frontend directory**
   ```
   cd frontend
   ```

3. **Install dependencies**
   ```
   npm install
   ```

### Running the Application

1. **Start the backend server**
   - Navigate to the backend directory:
     ```
     cd ../backend
     ```
   - Run the Spring Boot application:
     ```
     mvn spring-boot:run
     ```

2. **Start the frontend application**
   - Navigate back to the frontend directory:
     ```
     cd ../frontend
     ```
   - Start the React application:
     ```
     npm start
     ```

### Accessing the Application
- The backend will typically run on `http://localhost:8080`.
- The frontend will typically run on `http://localhost:3000`.

## Folder Structure
- `src/`: Contains the source code for the React application.
- `package.json`: Contains metadata and dependencies for the React application.

## Contributing
Feel free to submit issues or pull requests for improvements or bug fixes.

## License
This project is licensed under the MIT License.