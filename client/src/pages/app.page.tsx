// src/pages/AppPage.tsx

// External Imports
import React from "react";
import { Container } from "@mui/material";

// Internal Imports
import Panel from "../components/Panel";
import InteractiveBackground from "../components/InteractiveBackground";
import { FormStatusEnum } from "../types/enums";
import useUserProfile from "../hooks/useUserProfile";
import { signoutUser } from "../utils/auth.utils";

// Import CSS Styles
import "./app.page.css";

const AppPage: React.FC = () => {
  const user = useUserProfile(); // Using custom hook to fetch user

  const handleSignout = async () => {
    await signoutUser(); // Using utility function for signout
  };

  return (
    <Container className="app-container">
      {/* Interactive Background */}
      <InteractiveBackground
        formStatus={FormStatusEnum.Idle}
        followCursor={true}
      />

      {/* User Panel */}
      <Panel
        name={user?.name ?? "User"}
        profilePicture="profile.png"
        onSignout={handleSignout}
      />
    </Container>
  );
};

export default AppPage;
