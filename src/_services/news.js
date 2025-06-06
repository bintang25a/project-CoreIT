import API from "../_api";

const message = (error) => {
   if (error.status == 422) {
      return Object.values(error.response?.data["message"]).join("\n");
   } else {
      return error.response?.data["message"];
   }
};

export const getNews = async () => {
   const { data } = await API.get("/news");
   return data.data;
};

export const showNews = async (id) => {
   try {
      const { data } = await API.get(`/news/${id}`);
      return data.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const getNewsImage = async () => {
   // return "http://127.0.0.1:8000/api/divisions/image/";
   return "http://192.168.1.4:8000/api/galleries/image/";
};

export const createNews = async (data) => {
   try {
      const response = await API.post("/news", data);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const updateNews = async (id, data) => {
   try {
      const response = await API.post(`news/${id}`, data);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const deleteNews = async (id) => {
   try {
      const response = await API.delete(`news/${id}`);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};
