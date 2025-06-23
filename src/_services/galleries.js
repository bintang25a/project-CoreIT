import API from "../_api";

const message = (error) => {
   if (error.status == 422) {
      if (error.response?.data == {}) {
         return Object.values(error.response?.data["message"]).join("\n");
      } else {
         return Object.values(error.response?.data).join("\n");
      }
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

export const getImageUrl = (path) => {
   return `${API.defaults.baseURL}/galleries/image/${path}`;
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
