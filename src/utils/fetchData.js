import axios from "axios";

let token = sessionStorage.getItem("jwt_token");

export const getDataApi = async (url, headers) => {
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}`, ...headers },
  });
  return res;
};

export const postDataApi = async (url, post, headers) => {
  const res = await axios.post(url, post, {
    headers: { Authorization: `Bearer ${token}`, ...headers },
  });
  return res;
};

export const patchDataApi = async (url, post, headers) => {
  const res = await axios.patch(url, post, {
    headers: { Authorization: `Bearer ${token}`, ...headers },
  });
  return res;
};

export const deleteDataApi = async (url, headers) => {
  const res = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}`, ...headers },
  });
  return res;
};
