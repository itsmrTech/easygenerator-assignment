import { Button, Card, CardActionArea, CardActions, CardContent, Container } from "@mui/material";
import React from "react";

type PanelProps = {
  name: string;
  profilePicture: string;
  onSignout: () => void;
};
const Panel = (props: PanelProps) => {
  const genGreetings = (name: string) => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return `Good Morning, ${name}`;
    } else if (hours < 18) {
      return `Good Afternoon, ${name}`;
    } else if (hours < 22) {
      return `Good Evening, ${name}`;
    } else {
      return `Good Night, ${name}`;
    }
  };
  return (
    <Card className="panel-container">
      <CardContent >
        <img className="profile-img" src={props.profilePicture} alt="Profile" />
        <h1>{genGreetings(props.name)}</h1>
        <h2>Welcome to the application.</h2>
      </CardContent>
      <CardActions>
        <Button size="small" color="error" onClick={()=>{
            console.log("cl")
            props.onSignout();
        }} > Sign Out </Button>
      </CardActions>
    </Card>
  );
};

export default Panel;
