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

export const getDivisions = async () => {
   const { data } = await API.get("/divisions");
   return data.data;
};

export const showDivision = async (id) => {
   try {
      const { data } = await API.get(`/divisions/${id}`);
      return data.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const getDivisionLogo = (path) => {
   return `${API.defaults.baseURL}/divisions/image/${path}`;
};

export const createDivision = async (data) => {
   try {
      const response = await API.post("/divisions", data);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const updateDivision = async (id, data) => {
   try {
      const response = await API.post(`divisions/${id}`, data);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const deleteDivision = async (id) => {
   try {
      const response = await API.delete(`divisions/${id}`);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};
