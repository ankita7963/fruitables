import { createApi } from "@reduxjs/toolkit/query"

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => `/category`,
            providesTags: ['category']
        }),

        addCategory: builder.mutation({
            query: (body) => ({
                url: 'post',
                method: 'POST',
                body,
            }),
        }),
    })
});

export const { } = categoryApi