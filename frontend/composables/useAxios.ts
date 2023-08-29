import axios from "axios";

if (typeof window !== "undefined") {
  axios.interceptors.request.use(
    (config) => {
      if (localStorage.getItem("tnt_at")) {
        config.headers["Authorization"] = `${localStorage.getItem("tnt_at")}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        // localStorage.removeItem("tnt_at");
        // location.href = "/auth/login";
      }
      return Promise.reject(error);
    }
  );
}
export const useAxios = () => {
  const runtimeConfig = useRuntimeConfig();
  const axiosGet = (url: string, option = {}) => {
    return axios.get(`${runtimeConfig.public.BACKEND_URL}/${url}`, option);
  };
  const axiosPost = (url: string, payload: object, option = {}) => {
    return axios.post(
      `${runtimeConfig.public.BACKEND_URL}/${url}`,
      payload,
      option
    );
  };
  const axiosPatch = (url: string, payload: object, option = {}) => {
    return axios.patch(
      `${runtimeConfig.public.BACKEND_URL}/${url}`,
      payload,
      option
    );
  };
  const axiosDelete = (url: string, option = {}) => {
    return axios.delete(`${runtimeConfig.public.BACKEND_URL}/${url}`, option);
  };
  return { axiosGet, axiosPost, axiosPatch, axiosDelete };
};
