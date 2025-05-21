# Spring Boot and React Application

This project is a full-stack application that combines a Spring Boot backend with a React frontend. Below are the instructions for setting up and running both parts of the application.

## Backend Setup

1. **Prerequisites**: Ensure you have Java (JDK 11 or higher) and Maven installed on your machine.

2. **Navigate to the backend directory**:
   ```
   cd backend
   ```

3. **Build the project**:
   ```
   mvn clean install
   ```

4. **Run the application**:
   ```
   mvn spring-boot:run
   ```

5. **Access the API**: The backend will be running on `http://localhost:8080`.

## Frontend Setup

1. **Prerequisites**: Ensure you have Node.js and npm installed on your machine.

2. **Navigate to the frontend directory**:
   ```
   cd frontend
   ```

3. **Install dependencies**:
   ```
   npm install
   ```

4. **Run the application**:
   ```
   npm start
   ```

5. **Access the application**: The frontend will be running on `http://localhost:3000`.

## Project Structure

- **backend**: Contains the Spring Boot application.
  - `src/main/java/com/example/Application.java`: Main entry point of the Spring Boot application.
  - `src/main/resources/application.properties`: Configuration properties for the Spring Boot application.
  - `pom.xml`: Maven configuration file for the backend.
  - `README.md`: Documentation for the backend.

- **frontend**: Contains the React application.
  - `src/App.js`: Main component of the React application.
  - `src/index.js`: Entry point for the React application.
  - `package.json`: Configuration file for npm.
  - `README.md`: Documentation for the frontend.

## License

This project is licensed under the MIT License.