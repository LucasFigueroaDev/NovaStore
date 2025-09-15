import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.EXPO_PUBLIC_RTDB_URL;

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getProfilePicture: builder.query({
            query: (localId) => `users/${localId}.json`,
        }),
        updateProfilePicture: builder.mutation({
            query: (data) => ({
                url: `users/${data.localId}.json`,
                method: "PUT",
                body: { image:data.image },
            }),
        }),
        updateProfileData: builder.mutation({
            query: (data) => ({
                url: `users/${data.localId}.json`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const { useGetProfilePictureQuery, useUpdateProfilePictureMutation, useUpdateProfileDataMutation } = profileApi