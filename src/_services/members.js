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

export const getMembers = async () => {
   const { data } = await API.get("/members");
   return data.data;
};

export const showMember = async (id) => {
   try {
      const { data } = await API.get(`/members/${id}`);
      return data.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const createMember = async (data) => {
   try {
      const response = await API.post("/members", data);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const updateMember = async (id, data) => {
   try {
      const response = await API.post(`members/${id}`, data);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const deleteMember = async (id) => {
   try {
      const response = await API.delete(`members/${id}`);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};
