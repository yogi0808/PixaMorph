import React from "react"

// Files
import UploadSvg from "../svg/UploadSvg"

const AddImage = ({ onChange }) => {
  return (
    <label className="flex flex-1 gap-2 max-w-[800px] flex-center flex-col w-full  rounded-lg py-24 px-4 border-2 border-dashed border-b-1 cursor-pointer">
      <UploadSvg />
      <p className="text-center font-medium">Browse File to Upload!</p>
      <input
        type="file"
        name="image"
        accept="image/png, image/jpg, image/jpeg, image/webp, image/avif"
        onChange={onChange}
        className="hidden"
        multiple
      />
    </label>
  )
}

export default AddImage
