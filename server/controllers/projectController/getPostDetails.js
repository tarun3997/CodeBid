const jwt = require('jsonwebtoken');
require('dotenv').config();

async function PostDetails(req, res) {
  try {
    const cookie = req.get('authToken');
    const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
    if (!claims) {
      return res.status(401).send({ message: "unauthenticated" });
    }
    const { projectId } = req.params;
    const post = await global.prisma.project.findUnique({
      where: {
        project_id: projectId,
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                profileUrl: true,
              },
            },
          },
        },
        likes: true,
        comments: {
          select: {
            content: true,
            user: {
              select: {
                username: true,
                Profile: {
                  select: {
                    profileUrl: true,
                  },
                },
              },
            },
          },
        },
        PostImage: true,
      },
    });

    const totalLikes = post.likes.length;
    const isLike = await global.prisma.likes.findUnique({
      where: {
        userId_projectId: {
          userId: claims.id,
          projectId: post.project_id,
        },
      },
    });

    const comments = post.comments.map((comment) => {
      return {
        comment: comment.content,
        commentsUsername: comment.user.username,
        commentsProfileUrl: `/profileImages/${comment.user.Profile.profileUrl}`
      };
    });

    const filterPost = {
      projectId: post.project_id,
      title: post.title,
      description: post.description,
      username: post.creator.username,
      postLocation: post.postLocation,
      profileUrl: `/profileImages/${post.creator.Profile.profileUrl}`,
      PostImage: post.PostImage[0],
      likes: totalLikes,
      isLikes: isLike ? true : false,
      ownPost: claims.id === post.creator.id,
      comments: comments,
    };

    // console.log(filterPost);
    res.json(filterPost);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching project details" });
  }
}

module.exports = PostDetails;
