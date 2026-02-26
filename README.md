# Heimr

Heimr is a home dashboard that provides useful information about your household and local conditions.

![Screenshot of dashboard 01.12.23](doc/img/dash.png)

# Why Heimr

Heimr brings together all the information you need to start your day. 

With a focus on modularity, you can add or remove cards as you see fit.

Currently only supporting data from Norway and some cards are Oslo specific.

# Getting started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- docker

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/Heimr.git
   cd Heimr
   ```

2. **Install dependencies**

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `server` and `client`. See .env.example in their respective repositories

4. **Run local docker compose**
   Run docker-compose in infra/local for starting your postgres server.

5. **Start the development servers**

   Open two terminal windows:

   **Terminal 1 - Start the backend:**

   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Start the frontend:**

   ```bash
   cd client
   npm start
   ```

6. **Open web client and start building**
   Open browser in `http://localhost:3000`
