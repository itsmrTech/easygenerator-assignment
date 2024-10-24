import * as authService from "../services/auth.service";

export const signoutUser = async () => {
  try {
    await authService.signout();
    console.log("User signed out");
  } catch (error) {
    console.error("Signout error:", error);
  }
};
