import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.EXPO_PUBLIC_RTDB_URL;

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => '/categories.json',
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse: (response) => { return Object.values(response) },
        }),
        getProducts: builder.query({ 
            query: () => '/products.json',
            transformResponse: (response) => Object.values(response),
        }),
    }),
})

export const { useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetProductsQuery } = shopApi