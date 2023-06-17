import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ipAddressApi=createApi({
    reducerPath:"ipAddressApi",
    baseQuery:fetchBaseQuery({baseUrl:`https://geo.ipify.org/api/v2`}),
    endpoints:(builder)=>({
        trackIp:builder.query({
            query: (inputTerm)=>({
            url:`/country?apiKey=${process.env.REACT_APP_API}`,
            params:{ipAddress:inputTerm},
            method:"GET"
            })
        })
    })
})

export const {useTrackIpQuery} = ipAddressApi