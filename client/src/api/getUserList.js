import axios from "axios";

export async function handelSearchUser(searchInput){
    try{
        await axios.get('http://localhost:4000/chat/api/search-user',
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
          params: {
            user: searchInput, 
          },
        })
      }catch(e){
        console.error("Error in searching user:", e);
        throw e;
    }
}