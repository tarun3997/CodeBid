const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllUserProject = async (req, res) => {
  try {
    const cookie = req.get("authToken");
    const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
    if (!claims) {
      return res.status(401).send({ message: "unauthenticated" });
    }
    const { username } = req.params;
    let user;
    if (username) {
      user = await global.prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
    } else {
      user = await global.prisma.user.findUnique({
        where: {
          id: claims.id,
        },
      });
    }
    const userProjects = await global.prisma.project.findMany({
      where: {
        creatorId: user.id,
      },
      include: {
        creator: {
          select: {
            username: true,
            Profile: {
              select: {
                name: true,
                location: true,
                profileUrl: true,
              },
            },
          },
        },
        likes: true,
        comments: {
          select: {
            content: true,
          },
        },
        ratings: true,
        PostImage: true,
      },
    });
    // console.log(userProject)
    const filterProjects = userProjects.map((project) => {
      const totalLikes = project.likes.length;
      const isLike = project.likes.some((like) => like.userId === claims.id);
      const createdAt = new Date(project.createdAt);
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
      const commentsContent = project.comments.map((comment) => comment.content);

      return {
          projectId: project.project_id,
          createdAt: displayTime,
          title: project.title,
          description: project.description,
          postLocation: project.postLocation,
          views: project.views,
          username: project.creator.username,
          name: project.creator.Profile.name,
          profileUrl: `/profileImages/${project.creator.Profile.profileUrl}`,
          location: project.creator.Profile.location,
          PostImage: project.PostImage[0],
          likes: totalLikes,
          isLikes: isLike ? true : false,
          totalComment: commentsContent.length,
        };
      });
  
    // console.log(filterProjects)
    res.json({ userProject: filterProjects });
  } catch (e) {
    console.log(e);
    res.send({ message: "Getting error in fetching project" });
  }
};

module.exports = getAllUserProject;
