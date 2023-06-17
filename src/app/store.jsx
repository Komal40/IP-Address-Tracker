import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { ipAddressApi } from '../services/IpAddress'

export const store = configureStore({
  reducer: {
    [ipAddressApi.reducerPath]: ipAddressApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ipAddressApi.middleware),
})

setupListeners(store.dispatch)