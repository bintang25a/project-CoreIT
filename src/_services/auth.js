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

export const login = async (data) => {
   try {
      const response = await API.post("/login", data);
      const token = response.data.token;
      const user = response.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return token;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const validateToken = async () => {
   const token = localStorage.getItem("token");

   if (!token) return false;

   try {
      const response = await API.get("/validate-token", {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.success;
   } catch (error) {
      console.error(
         "Token tidak valid:",
         error.response?.data || error.message
      );
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
   }
};

export const isAuthenticated = async () => {
   const valid = await validateToken();
   return valid;
};

export const changePassword = async (id, data) => {
   try {
      const response = await API.post(`/change-password/${id}`, data);
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const getRecruitmentStatus = async () => {
   try {
      const response = await API.get("/recruitment-status");
      return response.data.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const toggleRecruitmentStatus = async () => {
   try {
      const response = await API.post("/toggle-recruitment");
      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};

export const logout = async () => {
   try {
      const response = await API.post("/logout");

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      return response.data;
   } catch (error) {
      console.log(error);
      throw message(error);
   }
};
