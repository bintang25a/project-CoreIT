import API from "../_api"

export const getNews = async () => {
    const { data } = await API.get("/news");
    return data.data;
}

// export const createGenre = async (data) => {
//   try {
//       const response = await API.post("/genres", data);
//       return response.data;
//   }
//   catch (error) {
//       console.log(error);
//       throw error;
//   }
// }