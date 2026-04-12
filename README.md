# 🚀 EchoRev

A full-stack web application designed to demonstrate real-time, bidirectional communication between a client and a server using WebSockets. 

## ✨ Features

- **Real-Time String Reversal:** Send a message from the client, and the WebSocket server responds instantly with the reversed version of that message.
- **Message History:** The application maintains and allows you to fetch a list of the last 5 messages sent to the server dynamically.

## 🛠️ Tech Stack 

- **Frontend (`/client`):** [React](https://reactjs.org/) powered by [Vite](https://vitejs.dev/) and styled with [Tailwind CSS](https://tailwindcss.com/) for a rapid, responsive, and modern user interface.
- **Backend Server (`/websocketserver`):** [Golang (Go)](https://go.dev/) WebSocket server handling concurrent connections, real-time message broadcasting, and history retention.
- **Containerization:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) used for seamless orchestration and zero-configuration setup across operating systems.

## 🚀 Getting Started 

Follow these simple steps to run the application securely inside Docker containers.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) (usually comes with Docker Desktop).

### Installation & Execution

1. **Clone the repository (if you haven't already):**
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Build and run the containers:**
   Run the following command in the root directory to start both the Vite development server and the Go WebSocket server.
   ```bash
   docker-compose up
   ```

3. **Access the application:**
   Open your browser and navigate to `http://localhost:5173`. Ensure the connection to the WebSocket is established.
   
   *(Note: You can reload the page at any time to initiate a fresh connection to the server).*

## 📸 Preview 
![image](https://github.com/user-attachments/assets/75a95457-208f-408c-a17d-9e4b54f36d1e)
