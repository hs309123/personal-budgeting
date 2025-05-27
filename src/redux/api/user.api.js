import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/user`,
        credentials: "include",
        prepareHeaders: (headers) => {
            let token = window.localStorage.getItem("_PBA_ID") || ""
            headers.set("authorization", token)
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: `/login`,
                method: 'POST',
                body,
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const token = data.data.token;
                    if (token) {
                        window.localStorage.setItem('_PBA_ID', token);
                    }
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                }
            },
            invalidatesTags: ["user"]
        }),
        signUp: builder.mutation({
            query: (body) => ({
                url: `/signup`,
                method: 'POST',
                body,
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const token = data.data.token;
                    if (token) {
                        window.localStorage.setItem('_PBA_ID', token);
                    }
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                }
            },
            invalidatesTags: ["user"]
        }),
        googleAuth: builder.query({
            query: (code) => ({
                url: `/auth/google`,
                method: 'GET',
                params: {
                    code
                }
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const token = data.data.token;
                    if (token) {
                        window.localStorage.setItem('_PBA_ID', token);
                    }
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                }
            }
        }),
        logout: builder.mutation({
            query: () => ({
                url: `/logout`,
                method: 'POST',
            })
        }),
        getUser: builder.query({
            query: () => ({
                url: `/`,
                method: 'GET',
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const token = data.data.token;
                    if (token) {
                        window.localStorage.setItem('_PBA_ID', token);
                    }
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                }
            },
            providesTags: ["user"]
        }),
        sendMailOtp: builder.mutation({
            query: (body) => ({
                url: "/send-mail-otp",
                method: "POST",
                body
            })
        }),
        verifyEmail: builder.mutation({
            query: (body) => ({
                url: "/verify-email",
                method: "POST",
                body
            })
        }),
        changePassword: builder.mutation({
            query: (body) => ({
                url: "/set-password",
                method: "POST",
                body
            })
        }),
    }),
})


export const {
    useLoginMutation,
    useSignUpMutation,
    useLazyGoogleAuthQuery,
    useLogoutMutation,
    useGetUserQuery,
    useSendMailOtpMutation,
    useVerifyEmailMutation,
    useChangePasswordMutation
} = userApi