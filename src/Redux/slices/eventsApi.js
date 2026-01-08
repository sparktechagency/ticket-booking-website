const { baseApi } = require("../baseApi");

const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log({ accessToken });

        return {
          url: "/events",
          method: "get",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["events"],
    }),
    getSingleEvent: builder.query({
      query: (eventID) => {
        const accessToken = sessionStorage.getItem("accessToken");
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
      providesTags: ["events"],
    }),
  }),
});

export const { useGetAllEventsQuery, useGetSingleEventQuery } = eventsApi;
