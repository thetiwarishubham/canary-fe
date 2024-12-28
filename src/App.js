import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Link
// import HomePage from './components/HomePage';
// import TransactionPage from './components/TransactionPage';
// import TransactionsListPage from './components/TransactionsListPage';
import './styles/App.css';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ChatbotPage from './components/ChatbotPage';
import ChatPage from './components/ChatPage';
import ContextPage from './components/ContextPage';
import RolesPage from './components/RolesPage';
import UserPage from './components/UserPage';
import CreateContextPage from './components/CreateContextPage';


// import TransactionsListPage from './components/TransactionsListPage';

function App() {
  const isAuthenticated = localStorage.getItem('authToken');
  console.log('isAuthenticated', isAuthenticated);
  const logout = () => {
    console.log('logout', logout);
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };
  

  return (
    <Router>
      <div className="App">
        <header className="main-header">
          <h1>Canary</h1>
          <nav className="navigation">
            <ul>
              {isAuthenticated && (
              <><li><a href="/chatbot">Chatbot</a></li><li><a href="/context">Context</a></li><li><a href="/roles">Roles & Permissions</a></li><li><a href="/user">User</a></li><li>
                  <button onClick={logout} className="logout-btn">Logout</button>
                </li></>
              )}
            </ul>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            {!isAuthenticated ? (
              // Redirect unauthenticated users to the login page
              <Route path="*" element={<Navigate to="/login" />} />
            ) : (
              <>
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/chatbot" element={<ChatbotPage />} />
                <Route path="/context" element={<ContextPage />} /> 
                <Route path="/create-context" element={<CreateContextPage />} /> 
                <Route path="/user" element={<UserPage />} /> 
                <Route path="/roles" element={<RolesPage />} />
              </>
            )}
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
