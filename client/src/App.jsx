import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { client } from "./client";

import Header from "./components/Header";
import Footer from "./components/Footer";

import SignUpForm from "./components/forms/user/SignUpForm";
import LogInForm from "./components/forms/user/LogInForm";
import HomePage from "./components/HomePage";

import TaskList from "./components/forms/task/TaskList";
import TaskForm from "./components/forms/task/TaskForm";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
          <Header />
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/login" element={<LogInForm />} />
              <Route path="/tasklist" element={<TaskList />} />
              <Route path="/task_form" element={<TaskForm />} />
              <Route path="/task_form/:taskId" element={<TaskForm />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;