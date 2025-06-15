import API from "../_api";

const message = (error) => {
   const response = error.response;

   if (response?.status === 422 || response?.status === 400) {
      const data = response.data;
      const messages = data?.message;

      if (messages && typeof messages === "object") {
         // Gabungkan pesan dari setiap field
         return Object.values(messages).flat().join("\n");
      } else if (typeof messages === "string") {
         // Kalau message berupa string
         return messages;
      } else {
         return "The given data was invalid.";
      }
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
