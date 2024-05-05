const jwt = require("jsonwebtoken");
require("dotenv").config();

async function getSavedPost(req, res) {
  try {
    const cookie = req.get("authToken");
    const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
    if (!claims) {
      return res.status(401).send({ message: "unauthenticated" });
    }
    const savedProjects = await global.prisma.saved.findMany({
      where: {
        userId: claims.id,
      },
      include: {
        project: {
          include: {
            PostImage: true,
            likes: true,
            Saved: true,
            comments: {
              select: {
                content: true,
              },
            },
            ratings: true,
          },
        },
        user: {
          select: {
            username: true,
            Profile: {
              select: {
                name: true,
                profileUrl: true,
                location: true,
              },
            },
          },
        },
      },
    });
    const formattedProjects = savedProjects.map((saved) => {
      const totalLikes = saved.project.likes.length;
      const isLike = saved.project.likes.some((like) => like.userId === claims.id);
      const isSaved = saved.project.Saved.some((save) => save.userId === claims.id);
      const commentsContent = saved.project.comments.map(
        (comment) => comment.content
      );

      return {
        projectId: saved.project.project_id,
        title: saved.project.title,
        description: saved.project.description,
        postLocation: saved.project.postLocation,
        username: saved.user.username,
        name: saved.user.Profile.name,
        profileUrl: `/profileImages/${saved.user.Profile.profileUrl}`,
        location: saved.user.Profile.location,
        PostImage: saved.project.PostImage[0],
        likes: totalLikes,
        isLikes: isLike ? true : false,
        isSaved: isSaved ? true : false,
        totalComment: commentsContent.length,
      };
    });

    // console.log(formattedProjects);
    res.status(200).send(formattedProjects);
  } catch (e) {
    console.error("Error fetching saved posts:", e);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

module.exports = getSavedPost;
