import { configureStore } from "@reduxjs/toolkit";
import formatReducer from "./Features/change format/imageFormatSlice"
import resizeReducer from "./Features/resize/imageResizeSlice"

const store = configureStore({
    reducer: {
        formatImages: formatReducer,
        resizeImages: resizeReducer
    }
})

export default store