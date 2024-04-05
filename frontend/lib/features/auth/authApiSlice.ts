// Need to use the React-specific entry point to import `createApi`
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getTokenApiResponse} from "@/lib/features/auth/types";
import {inputLoginFormType} from "@/app/login/types";


// Define a service using a base URL and expected endpoints
export const authApiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:8000/"}),
    reducerPath: "tokenApi",
    // Tag types are used for caching and invalidation.
    tagTypes: ["auth_token"],
    endpoints: (build) => ({
        // Supply generics for the return type (in this case `QuotesApiResponse`)
        // and the expected query argument. If there is no argument, use `void`
        // for the argument type instead.
        getToken: build.query<getTokenApiResponse, inputLoginFormType>({
            query: (authData) => ({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: "token",
                method: 'POST',
                body: new URLSearchParams({...authData})
            }),
            // `providesTags` determines which 'tag' is attached to the
            // cached data returned by the query.
            providesTags: (result, error, id) =>
                [{type: "auth_token"}],
        }),
        // CreateToken: build.mutation<getTokenResponse, useAuthData>({
        //     // note: an optional `queryFn` may be used in place of `query`
        //     query: (authData) => ({
        //         url: "token",
        //         method: 'POST',
        //         body: authData,
        //     }),
        //     // Pick out data and prevent nested properties in a hook or selector
        //     // transformResponse: (response: { data: Post }, meta, arg) => response.data,
        //     // Pick out errors and prevent nested properties in a hook or selector
        //      transformErrorResponse: (
        //          response: { status: string | number },
        //          meta,
        //          arg
        //      ) => response.status,
        //     // invalidatesTags: ['Post'],
        //     // onQueryStarted is useful for optimistic updates
        //     // The 2nd parameter is the destructured `MutationLifecycleApi`
        //     async onQueryStarted(
        //         arg,
        //         {dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry}
        //     ) {
        //     },
        //     // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
        //     async onCacheEntryAdded(
        //         arg,
        //         {
        //             dispatch,
        //             getState,
        //             extra,
        //             requestId,
        //             cacheEntryRemoved,
        //             cacheDataLoaded,
        //             getCacheEntry,
        //         }
        //     ) {
        //     },
        // }),
    })
})

// export const {useCreateTokenMutation, useFindTokenQuery} = authApiSlice;

export const {useGetTokenQuery} = authApiSlice;
