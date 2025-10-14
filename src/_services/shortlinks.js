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

export const getShortlinks = async () => {
   const { data } = await API.get("/shortlinks");
   return data.data;
};

export const showShortlink = async (id) => {
   try {
      const { data } = await API.get(`/shortlinks/${id}`);
      return data.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const createShortlink = async (data) => {
   try {
      const response = await API.post("/shortlinks", data);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const updateShortlink = async (id, data) => {
   try {
      const response = await API.post(`shortlinks/${id}`, data);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const deleteShortlink = async (id) => {
   try {
      const response = await API.delete(`shortlinks/${id}`);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};
