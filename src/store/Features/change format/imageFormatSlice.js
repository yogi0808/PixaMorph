import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imagesForFormat: []
}

const formatSlice = createSlice({
    name: "formatImages",
    initialState,
    reducers: {
        setImagesForFormat: (state, action) => {
            state.imagesForFormat = action.payload
        },
        setMoreImagesForFormat: (state, action) => {
            state.imagesForFormat = state.imagesForFormat.concat(action.payload)
        },
        addFormattedUrl: (state, action) => {
            state.imagesForFormat = state.imagesForFormat.map((i, idx) => {
                if (idx === action.payload.index) {
                    return { ...i, url: action.payload.url }
                } else {
                    return i
                }
            })
        },
        setOutputFormat: (state, action) => {
            state.imagesForFormat = state.imagesForFormat.map((i, idx) => {
                if (idx === action.payload.index) {
                    return { ...i, outputFormat: action.payload.format }
                } else {
                    return i
                }
            })
        },
        removeImageFromFormat: (state, action) => {
            state.imagesForFormat = state.imagesForFormat.filter(i => i.file !== action.payload)
        }
    }
})

export const { setImagesForFormat, setMoreImagesForFormat, addFormattedUrl, setOutputFormat, removeImageFromFormat } = formatSlice.actions

export default formatSlice.reducer