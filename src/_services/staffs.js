import API from "../_api";

export const getStaffs = async () => {
   const { data } = await API.get("/staffs");
   return data.data;
};

export const getStaffPhoto = async () => {
   return "http://192.168.1.4:8000/api/galleries/";
};

export const createStaffs = async (data) => {
   try {
      const response = await API.post("/staffs", data);
      return response.data;
   } catch (error) {
      console.log(error.message);
      throw error;
   }
};

export const showStaff = async (id) => {
   try {
      const response = await API.get(`/staffs/${id}`);
      return response.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
};

export const updateStaff = async (id, data) => {
   try {
      const response = await API.post(`staffs/${id}`, data);
      return response.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
};

export const deleteStaff = async (id) => {
   try {
      const response = await API.delete(`staffs/${id}`);
      return response.data.message;
   } catch (error) {
      console.log(error);
      throw error;
   }
};
