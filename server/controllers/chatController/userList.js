const jwt = require("jsonwebtoken");
require("dotenv").config();

const userList = async (req, res) => {
  try {
    const cookie = req.get("authToken");
    const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);

    if (!claims) {
      return res.status(401).send({ message: "unauthenticated" });
    }

    const messages = await global.prisma.message.findMany({
      where: {
        OR: [{ senderId: claims.id }, { receiverId: claims.id }],
      },
      select: {
        senderId: true,
        receiverId: true,
      },
    });

    const userIds = messages.flatMap((message) => [
      message.senderId,
      message.receiverId,
    ]);
    const uniqueUserIds = [
      ...new Set(userIds.filter((id) => id !== claims.id)),
    ];

    const userList = await global.prisma.user.findMany({
      where: {
        id: {
          in: uniqueUserIds,
        },
      },
      select: {
        id: true,
        username: true,
        Profile: {
          select: {
            name: true,
            profileUrl: true,
          },
        },
        sentMessages: {
          select: {
            createdAt: true,
            text: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
        receivedMessages: {
          select: {
            createdAt: true,
            text: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

        messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const filterUserList = await Promise.all(
      userList.map(async (user) => {
        if (user.id !== claims.id) {
          const lastMessageTime =
            user.sentMessages.length > 0
              ? user.sentMessages[0].createdAt
              : user.receivedMessages.length > 0
              ? user.receivedMessages[0].createdAt
              : null;
          const lastMessage =
            user.sentMessages.length > 0
              ? user.sentMessages[0].text
              : user.receivedMessages.length > 0
              ? user.receivedMessages[0].text
              : null;
          const createdAt = new Date(lastMessageTime);
          const currentTime = new Date();
          const timeDiff = currentTime - createdAt;
          const seconds = Math.floor(timeDiff / 1000);
          const minutes = Math.floor(seconds / 60);
          const hours = Math.floor(minutes / 60);
          const days = Math.floor(hours / 24);
          let displayTime;
          if (days >= 7) {
            displayTime = `${Math.floor(days / 7)}w`;
          } else if (days >= 1) {
            displayTime = `${days}d`;
          } else if (hours >= 1) {
            displayTime = `${hours}h`;
          } else {
            displayTime = `${minutes}m`;
          }
          return {
            username: user.username,
            name: user.Profile.name,
            id: user.id,
            profileUrl: `/profileImages/${user.Profile.profileUrl}`,
            lastMessageTime: displayTime,
            lastMessage: lastMessage
          };
        }
      })
    );

    // console.log(filterUserList);
    res.status(200).send(filterUserList);
  } catch (e) {
    console.error("Error fetching user count:", e);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = userList;
