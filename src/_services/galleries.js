import API from "../_api";

const message = (error) => {
   if (error.status == 422) {
      return Object.values(error.response?.data["message"]).join("\n");
   } else {
      return error.response?.data["message"];
   }
};

export const getImages = async () => {
   const { data } = await API.get("/galleries");
   return data.data;
};

export const showImage = async (id) => {
   try {
      const { data } = await API.get(`/galleries/${id}`);
      return data.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const getImageUrl = async () => {
   return "http://127.0.0.1:8000/api/galleries/image/";
   // return "http://192.168.1.4:8000/api/galleries/image/";
   // return "https://project-coreit-production.up.railway.app/api/galleries/image/";
};

export const createImage = async (data) => {
   try {
      const response = await API.post("/galleries", data);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const deleteImage = async (id) => {
   try {
      const response = await API.delete(`galleries/${id}`);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};
