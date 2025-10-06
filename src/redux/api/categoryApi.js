import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from "../../constant/url";

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

    endpoints: (build) => ({

        getAllCategory: build.query({
            query: () => `/category/list-category`,
            providesTags: ['category']
        }),

        addCategory: build.mutation({
            query: (data) => ({
                url: `/category/add-category`,
                method: 'POST',
                body: data,
            }),
            // async onQueryStarted(data, { dispatch, queryFulfilled }) {
            //     const temCatId = crypto.randomUUID();
            //     const patchResult = dispatch(
            //         categoryApi.util.updateQueryData('getAllCategory', undefined, (draft) => {
            //             draft?.data?.push(
            //                 {
            //                     _id: temCatId,
            //                     name: data.get("name"),
            //                     description: data.get("description"),
            //                     cat_img: data.get("cat_img"),
            //                 }
            //             );
            //         }),
            //     )
            //     try {
            //         const { data } = await queryFulfilled
            //         console.log(data);
            //         dispatch(
            //             categoryApi.util.updateQueryData('getAllCategory', undefined, (draft) => {
            //                 const index = draft.data.findIndex(v => v._id === temCatId);

            //                 draft?.data[index] = data?.data;
            //             }),
            //         )
            //     } catch {
            //         patchResult.undo()
            //     }
            // }
        }),

        // updateCategory: build.mutation({
        //     query: (data) => ({
        //         url: `/category/update-category/${id}`,
        //         method: 'PATCH',
        //         body: data,
        //     }),
        // }),

        deleteCategory: build.mutation({
            query: (id) => ({
                url: `/category/delete-category/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    categoryApi.util.updateQueryData('getAllCategory', undefined, (draft) => {

                        const index = draft?.data?.findIndex(v => v._id === id);
                        draft?.data?.splice(index, 1)
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        }),


    })
});

export const { useGetAllCategoryQuery, useDeleteCategoryMutation, useAddCategoryMutation } = categoryApi