import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    imagesForResize: []
}

const imageResizeSlice = createSlice({
    name: "imageResizeSlice",
    initialState,
    reducers: {
        setImagesForResize: (state, action) => {
            state.imagesForResize = action.payload
        },
        setMoreImagesForResize: (state, action) => {
            state.imagesForResize = state.imagesForResize.concat(action.payload)
        },
        addResizedImageUrl: (state, action) => {
            state.imagesForResize = state.imagesForResize.map((i, idx) => {
                if (idx === action.payload.index) {
                    return { ...i, url: action.payload.url, size: action.payload.size }
                } else {
                    return i
                }
            })
        },
        addOutputQuality: (state, action) => {
            state.imagesForResize = state.imagesForResize.map((i, idx) => {
                if (idx === action.payload.index) {
                    return { ...i, outputQuality: action.payload.quality }
                } else {
                    return i
                }
            })
        },
        removeImageFromResize: (state, action) => {
            state.imagesForResize = state.imagesForResize.filter(i => i.file !== action.payload)
        }
    }
})

export const { setImagesForResize, setMoreImagesForResize, addOutputQuality, addResizedImageUrl, removeImageFromResize } = imageResizeSlice.actions
export default imageResizeSlice.reducer