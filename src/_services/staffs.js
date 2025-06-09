import API from "../_api";

const message = (error) => {
   if (error.status == 422) {
      return Object.values(error.response?.data["message"]).join("\n");
   } else {
      return error.response?.data["message"];
   }
};

export const getStaffs = async () => {
   const { data } = await API.get("/staffs");
   return data.data;
};

export const showStaff = async (id) => {
   try {
      const { data } = await API.get(`/staffs/${id}`);
      return data.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const getStaffPhoto = async () => {
   return "http://127.0.0.1:8000/api/galleries/";
   // return "http://192.168.1.4:8000/api/galleries/";
   // return "https://project-coreit-production.up.railway.app/api/galleries/";
};

export const createStaffs = async (data) => {
   try {
      const response = await API.post("/staffs", data);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const updateStaff = async (id, data) => {
   try {
      const response = await API.post(`staffs/${id}`, data);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const deleteStaff = async (id) => {
   try {
      const response = await API.delete(`staffs/${id}`);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};
