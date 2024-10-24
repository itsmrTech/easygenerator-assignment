// src/hooks/useUserProfile.ts
import { useEffect, useState } from "react";
import * as userService from "../services/user.service";
import { UserProfile } from "../types/user";

const useUserProfile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await userService.getUserProfile();
        if (response) {
          const { user } = response.data.data;
          setUser({
            name: user.name,
            email: user.email,
            id: user.id,
          });
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return user;
};

export default useUserProfile;
