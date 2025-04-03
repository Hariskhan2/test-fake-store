import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { authenticationConfig } from "../config";

import type { Product, Category } from '../../src/types/product.d';

const { baseUrl } = authenticationConfig;

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => 'products'
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
    getAllCategories: builder.query<Category[], void>({
      query: () => 'products/categories',
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `products/category/${category}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetAllCategoriesQuery,
  useGetProductsByCategoryQuery,
} = productsApi;
