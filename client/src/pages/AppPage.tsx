import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Panel from "../components/Panel";
import InteractiveBackground from "../components/InteractiveBackground";
import { FormStatusEnum } from "../types/enums";
import * as userService from "../services/userService";
import { UserProfile } from "../types/user";
import { profile } from "console";
import * as authService from "../services/authService";

const AppPage: React.FC = () => {
  const [user, setUser] = useState<UserProfile|null>(null);

  useEffect(() => {
    userService
      .getUserProfile()
      .then((response) => {
        if (!response) return;
        const { user } = response.data.data;
        setUser({
            name: user.name,
            email: user.email,
            id: user.id,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  const onSignout=()=>{
    console.log("clicked")
    authService.signout().catch(e=>{
        console.error(e);
    })
  }
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
      <Panel name={user?.name??"User"} profilePicture={"profile.png"} onSignout={onSignout} />
    </Container>
  );
};

export default AppPage;
