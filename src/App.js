import React from "react";
import { Routes, Route } from "react-router-dom";
import StepForm from "./components/StepForm";
import List from "./components/List";
import ProgressPage from "./components/ProgressPage";
import keycloak from "./keycloack";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import Navbar from "./components/Navbar";
import ServiceList from "./components/service letters/ServiceList";
import WorkflowList from "./components/workFlow/WorkflowList";

function App() {
  return (
    <>
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: "login-required"}}         
      >
        <Navbar />
        <Routes >
          <Route exact path="/" element={<StepForm />} />
          <Route exact path="/list" element={<List />} />
          <Route exact path="/progress" element={<ProgressPage />} />
          <Route exact path="/serviceList" element={<ServiceList />} />
          <Route exact path="/workflowList" element={< WorkflowList/>}/>
        </Routes>
      </ReactKeycloakProvider>
    </>
  );
}

export default App;
