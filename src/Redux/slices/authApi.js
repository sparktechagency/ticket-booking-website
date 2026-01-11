const { baseApi } = require("../baseApi");

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "post",
        body: data,
        headers: {
          "content-type": "application/json",
        },
      }),
      invalidatesTags: ["user"],
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    // Verify Otp
    UserOtpVerify: builder.mutation({
      query: (data) => {
        console.log(data);
        const token = sessionStorage.getItem("createUserToken");
        //  console.log("vetifyOtpToken", token);
        return {
          url: "/auth/verify-email",
          method: "POST",
          body: data,
          headers: {
            "content-type": "application/json",
            token: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),

    // Resend Otp
    resendOtp: builder.mutation({
      query: (email) => {
        const token = sessionStorage.getItem("createUserToken");
        console.log("Resend OTP email", email);
        return {
          url: "/auth/resend-otp",
          method: "post",
          body: email,
          headers: {
            "content-type": "application/json",
            token: token,
          },
        };
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useUserOtpVerifyMutation,
  useResendOtpMutation,
} = authApi;
