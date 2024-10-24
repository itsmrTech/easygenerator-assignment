import { Container } from "@mui/material";
import React, { useState } from "react";
import Panel from "../components/Panel";
import InteractiveBackground from "../components/InteractiveBackground";
import { FormStatusEnum } from "../types/enums";

const AppPage: React.FC = () => {


  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <InteractiveBackground
        formStatus={FormStatusEnum.Idle}
        followCursor={true}
      />
      <Panel name={"Mohammad"} profilePicture={"profile.png"} />
    </Container>
  );
};

export default AppPage;
