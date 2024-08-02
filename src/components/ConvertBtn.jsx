import React from "react"

// Files
import Loader from "./Loader"
import useResizeImage from "../hooks/useResizeImage"
import useConvertImages from "../hooks/useConvertImages"
import { useDispatch } from "react-redux"
import { setMoreImagesForFormat } from "../store/Features/change format/imageFormatSlice"
import { setMoreImagesForResize } from "../store/Features/resize/imageResizeSlice"

const ConvertBtn = ({ resize }) => {
  const { loading, convertImages } = useConvertImages() // custom Hook for convert Images Format
  const { loading: LoadingForResize, resizeImage } = useResizeImage() // custom Hook for Resize Images

  const dispatch = useDispatch()

  // on Change Setting files to Global State
  const onChange = (e) => {
    const fs = [...e.target.files].map((f) => {
      return { file: f }
    })

    if (resize) {
      dispatch(setMoreImagesForResize(fs))
    } else {
      dispatch(setMoreImagesForFormat(fs))
    }

    e.target.value = ""
  }

  return (
    <div className="flex-center flex-col gap-4 w-fit self-end">
      <button
        // Conditionally Providing Click Function
        onClick={resize ? resizeImage : convertImages}
        className="px-6 py-2 w-full bg-w text-black rounded-xl font-semibold"
      >
        {loading || LoadingForResize ? (
          <Loader />
        ) : resize ? (
          "Resize Now"
        ) : (
          "Convert Now"
        )}
      </button>
      <label className="px-6 py-2 border border-b-1 rounded-xl w-full cursor-pointer">
        {loading || LoadingForResize ? (
          <Loader />
        ) : resize ? (
          "Resize Another Image(s)"
        ) : (
          "Convert Another Image(s)"
        )}
        <input
          type="file"
          name="image"
          accept="image/png, image/jpg, image/jpeg, image/webp, image/avif"
          onChange={onChange}
          className="hidden"
          multiple
        />
      </label>
    </div>
  )
}

export default ConvertBtn
