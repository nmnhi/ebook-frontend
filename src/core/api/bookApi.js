import axiosClient from "./axiosClient";

const bookApi = {
  getBooks: (params) => axiosClient.get("/books", { params }),
  getBookById: (id) => axiosClient.get(`/books/${id}`),
  getCategories: () => axiosClient.get("/books/categories")
};

export default bookApi;
