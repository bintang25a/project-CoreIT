import API from "../_api";

export const getMembers = async () => {
   const { data } = await API.get("/members");
   return data.data;
};

export const createMember = async (data) => {
   try {
      const response = await API.post("/members", data);
      return response.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
};

export const showMember = async (id) => {
   try {
      const response = await API.get(`/members/${id}`);
      return response.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
};

export const updateMember = async (id, data) => {
   try {
      const response = await API.post(`members/${id}`, data);
      return response.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
};

export const deleteMember = async (id) => {
   try {
      const response = await API.delete(`members/${id}`);
      return response.data.message;
   } catch (error) {
      console.log(error);
      throw error;
   }
};
