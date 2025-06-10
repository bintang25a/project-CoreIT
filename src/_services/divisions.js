import API from "../_api";

const message = (error) => {
   if (error.status == 422) {
      return Object.values(error.response?.data["message"]).join("\n");
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

export const getDivisionLogo = async () => {
   // return "http://127.0.0.1:8000/api/divisions/image/";
   // return "http://192.168.1.4:8000/api/divisions/image/";
   return "https://project-coreit-production.up.railway.app/api/divisions/image/";
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
