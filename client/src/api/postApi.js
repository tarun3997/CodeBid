import axios from "axios";

export async function likePostApi(projectId) {
    try{
        await axios.post(
            "http://localhost:4000/api/like",
            {
              projectId,
            },
            {
              headers: {
                authToken: localStorage.getItem("authToken"),
              },
            }
          );
    }catch(e){
        console.error("Error creating like:", e);
        throw e;
    }
}
export async function viewPostApi(projectId) {
    try{
        await axios.post(
            "http://localhost:4000/api/view",
            {
              projectId,
            },
            {
              headers: {
                authToken: localStorage.getItem("authToken"),
              },
            }
          );
    }catch(e){
        console.error("Error creating like:", e);
        throw e;
    }
}
export async function savedPostApi(projectId) {
    try{
        await axios.post(
            "http://localhost:4000/api/saved",
            {
              projectId,
            },
            {
              headers: {
                authToken: localStorage.getItem("authToken"),
              },
            }
          );
    }catch(e){
        console.error("Error creating like:", e);
        throw e;
    }
}

export async function handelNotificationApi(id, postId){
    try{
        await axios.post('http://localhost:4000/notification/like',{
            receiver: id,
            postId: postId,
          },
          {
            headers:{
              authToken: localStorage.getItem("authToken"),
            }
          }
          );
    }catch(e){
        console.error("Error in notification:", e);
        throw e;
    }
}
export async function handelCommentApi(postId, comment){
    try{
        await axios.post("http://localhost:4000/api/comment",
            {
              projectId: postId,
              content: comment,
            },
          {
            headers:{
              authToken: localStorage.getItem("authToken"),
            }
          }
          );
    }catch(e){
        console.error("Error creating Comment:", e);
        throw e;
    }
}
export async function handelCommentNotificationApi(id,postId, comment){
    try{
        await axios.post('http://localhost:4000/notification/comment',{
            receiver: id,
            postId: postId,
            comment: comment
          },
          {
            headers:{
              authToken: localStorage.getItem("authToken"),
            }
          }
          );
    }catch(e){
        console.error("Error creating Comment:", e);
        throw e;
    }
}