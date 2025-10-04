import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProfileContextType {
  profilePhoto: string | null;
  setProfilePhoto: (photo: string | null) => void;
  userInfo: {
    name?: string;
    email?: string;
    username?: string;
  };
  updateUserInfo: (info: Partial<ProfileContextType["userInfo"]>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    username: "",
  });

  const updateUserInfo = (info: Partial<ProfileContextType["userInfo"]>) => {
    setUserInfo((prev) => ({ ...prev, ...info }));
  };

  const value = {
    profilePhoto,
    setProfilePhoto,
    userInfo,
    updateUserInfo,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;
