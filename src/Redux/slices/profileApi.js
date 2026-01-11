import { getCookie } from "cookies-next";

const { baseApi } = require("../baseApi");

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => {
        const accessToken = getCookie("accessToken");
        console.log({ accessToken });

        return {
          url: "/users/profile",
          method: "get",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["profile"],
    }),
    editProfile: builder.mutation({
      query: () => {
        const accessToken = getCookie("accessToken");
        console.log({ accessToken });

        return {
          url: "/users",
          method: "patch",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["profile"],
    }),
    getSingleEvent: builder.query({
      query: (eventID) => {
        const accessToken = getCookie("accessToken");
        console.log({ accessToken });

        return {
          url: `/events/${eventID}`,
          method: "get",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["profile"],
    }),
  }),
});

export const { useGetUserProfileQuery, useEditProfileMutation } = profileApi;
