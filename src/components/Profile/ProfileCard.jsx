// ProfileCard.js

import { Card, Avatar, Typography } from "antd";
// import profileImage from "../../assets/images/Car.png";

const { Title, Text } = Typography;

const ProfileCard = ({ user }) => {
  const profileImage = "https://www.w3schools.com/howto/img_avatar.png";
  return (
    <Card className="bg-white text-black" align="center">
      <Avatar size={200} src={profileImage} />
      <div className="flex flex-col items-center gap-3">
        <Title level={4} style={{ margin: 0 }}>
          {user?.name || "User Name"}
        </Title>
        <Text type="secondary">{user?.email || "Email"}</Text>
        <Text type="secondary">{user?.phone || "Phone number"}</Text>
        <Text type="secondary">
          {user?.created_at
            ? `Joined ${new Date(user.created_at).toLocaleDateString()}`
            : "Joined date"}
        </Text>
      </div>
    </Card>
  );
};

export default ProfileCard;
