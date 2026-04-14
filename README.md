# ORAM Database Project

A full-stack application implementing Oblivious RAM (ORAM) for secure and private database operations. This project combines a Node.js/Express backend with a React frontend to provide an intuitive interface for encrypted data scanning and logging.

## Features

- 🔒 **Encrypted Data Operations** - Secure data handling using ORAM techniques
- 📊 **Real-time Scanning** - Efficient data scanning with privacy guarantees
- 📋 **Activity Logging** - Comprehensive logging system for audit trails
- 🎨 **Responsive UI** - Modern React-based frontend with Vite
- 🌳 **Tree Visualization** - Visual representation of data structures
- 🔍 **Advanced Search** - Search and filter operations with encryption support

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQL
- **Encryption:** Custom encryption utilities
- **Logging:** Custom logger

### Frontend
- **Framework:** React 18+
- **Build Tool:** Vite
- **Styling:** CSS3
- **HTTP Client:** Axios (API service)

## Project Structure

```
oram-db-project/
├── backend/
│   ├── config/              # Database configuration
│   ├── controllers/         # Route controllers
│   ├── db/                  # Database schemas
│   ├── models/              # Data models
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   ├── public/              # Static files
│   ├── server.js            # Express server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   ├── pages/           # Page components
    │   ├── services/        # API service layer
    │   ├── assets/          # Static assets
    │   ├── App.jsx          # Main App component
    │   └── main.jsx         # React entry point
    ├── public/              # Public assets
    ├── vite.config.js       # Vite configuration
    └── package.json
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd frontend
npm install
```

## Usage

### Starting the Backend Server

```bash
cd backend
npm start
# or
node server.js
```

The server will start on the configured port (check `backend/config/db.js` for details).

### Starting the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` (default Vite port).

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
Ensure all dependencies are installed and the environment is configured.

## API Endpoints

### Data Operations
- `GET /api/data` - Retrieve data
- `POST /api/data` - Create new data entry
- Other data-related endpoints (see `/backend/routes/dataRoutes.js`)

### Logging
- `GET /api/logs` - Retrieve activity logs
- `POST /api/logs` - Create log entry
- Other log-related endpoints (see `/backend/routes/logRoutes.js`)

## Key Components

### Frontend Components
- **ScanBox** - Interface for data scanning operations
- **ResultCard** - Display scan results
- **LogsPanel** - View activity logs
- **Tree** - Hierarchical data visualization
- **Navbar** - Navigation bar

### Backend Services
- **oramService** - Core ORAM implementation
- **dataModel** - Data persistence layer
- **encryption** - Encryption utilities
- **logger** - Activity logging

## Configuration

Database connection and other configurations can be found in:
- `backend/config/db.js` - Database settings
- `backend/utils/logger.js` - Logging configuration
- `frontend/vite.config.js` - Frontend build configuration

## Security

This project implements ORAM principles to provide:
- Access pattern privacy
- Encrypted data storage
- Secure query processing
- Comprehensive audit logging

## Development

### Code Style
- Follow ESLint configuration (`frontend/eslint.config.js`)
- Maintain consistent naming conventions

### Contributing
1. Create a feature branch
2. Commit changes with clear messages
3. Push to your branch
4. Submit a pull request

## License

[Add your license information here]

## Support

For issues, questions, or contributions, please open an issue or contact the project maintainers.

---

**Last Updated:** April 2026
