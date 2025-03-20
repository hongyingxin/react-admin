import React from "react";
import { Avatar } from "antd";
import avatar from "@/assets/images/avatar.png";

const AvatarIcon: React.FC = () => {
  return (
    <React.Fragment>
      <Avatar className="avatar" size={42} src={avatar} />
    </React.Fragment>
  );
};

export default AvatarIcon;
