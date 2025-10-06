import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../constant/url'

export const couponApi = createApi({
    reducerPath: 'couponApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

    endpoints: (build) => ({
        getAllCoupon: build.query({
            query: () => `/coupon/list-coupon`,
            providesTags: ['coupon']
        }),

        addCoupon: build.mutation({
            query: (data) => ({
                url: `/coupon/add-coupon`,
                method: 'POST',
                body: data
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const temId = crypto.randomUUID();
                const temImg = { url: URL.createObjectURL(data.get("coupon_image")) };

                const patchResult = dispatch(
                    couponApi.util.updateQueryData('getAllCoupon', undefined, (draft) => {
                        draft?.data?.push({
                            _id: temId,
                            coupon: data.get("coupon"),
                            percentage: data.get("percentage"),
                            expiry: data.get("expiry"),
                            stock: data.get("stock"),
                            coupon_image: temImg,
                        });
                    }),
                )
                try {
                    const { data } = await queryFulfilled
                    console.log(data);

                    dispatch(
                        couponApi.util.updateQueryData('getAllCoupon', undefined, (draft) => {
                            const index = draft.data?.findIndex(v => v._id === temId)

                            draft.data[index] = data?.data;
                        }),
                    )
                } catch {
                    patchResult.undo()
                }
            }
        }),

        updateCoupon: build.mutation({
            query: ({ _id, body }) => ({
                url: `/coupon/update-coupon/${_id}`,
                method: 'PATCH',
                body: body
            }),
            async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
                // const patchResult = dispatch(
                //     couponApi.util.updateQueryData('getAllCoupon', undefined, (draft) => {
                //         const index = draft.findIndex(v => v.id === id);
                //         draft[index] = { ...draft[index], ...data }
                //     }),
                // )
                // try {
                //     await queryFulfilled
                // } catch {
                //     patchResult.undo()
                // }
                const temUrlimg = body.get("coupon_image") ? { url: URL.createObjectURL(body.get("coupon_image")) } : null;

                const patchResult = dispatch(couponApi.util.updateQueryData
                    ("getAllCoupon", undefined, (draft) => {
                        const index = draft.findIndex(v => v.id === id);

                        if (index !== -1) {
                            const updateData = {
                                coupon: data.get("coupon"),
                                percentage: data.get("percentage"),
                                expiry: data.get("expiry"),
                                stock: data.get("stock"),
                                active: data.get("active") === "true" ? ture : false
                            };
                            if (temUrlimg) {
                                updateData.coupon_image = temUrlimg;
                            }
                            console.log("updateData", updateData, temUrlimg);

                            draft.data[index] = { ...draft.data[index], ...updateData }
                        }
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        }),

        deleteCoupon: build.mutation({
            query: (id) => ({
                url: `/coupon/delete-coupon/${id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    couponApi.util.updateQueryData('getAllCoupon', undefined, (draft) => {
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

        updateStatus: build.mutation({
            query: ({ _id, active }) => ({
                url: `/coupon/update-coupon/${_id}`,
                method: 'PATCH',
                body: { active }
            }),
            async onQueryStarted({ id, active }, { dispatch, queryFulfilled }) {


                const patchResult = dispatch(couponApi.util.updateQueryData
                    ("getAllCoupon", undefined, (draft) => {
                        const index = draft?.data?.findIndex(v => v.id === id);

                        if (index !== -1) {
                            draft.data[index].active = active
                        }
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        })
    })

});

export const {
    useGetAllCouponQuery,
    useAddCouponMutation,
    useUpdateCouponMutation,
    useDeleteCouponMutation,
    useUpdateStatusMutation
} = couponApi