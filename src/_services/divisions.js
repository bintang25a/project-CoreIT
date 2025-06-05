import API from "../_api";

export const getDivisions = async () => {
   const { data } = await API.get("/divisions");
   return data.data;
};

export const getDivisionLogo = async () => {
   // return "http://127.0.0.1:8000/api/divisions/image/";
   return "http://192.168.1.4:8000/api/divisions/image/";
};

export const showDivision = async (id) => {
   try {
      const response = await API.get(`/divisions/${id}`);
      return response.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
};

export const updateDivision = async (id, data) => {
   try {
      const response = await API.post(`divisions/${id}`, data);
      return response.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
};

export const deleteDivision = async (id) => {
   try {
      const response = await API.delete(`divisions/${id}`);
      return response.data.message;
   } catch (error) {
      console.log(error);
      throw error;
   }
};
