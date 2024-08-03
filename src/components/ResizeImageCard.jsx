import React from "react"
import { useDispatch } from "react-redux"

// Files
import Done from "./Done"
import FileSvg from "../svg/FileSvg"
import DeleteSvg from "../svg/DeleteSvg"
import DownloadSvg from "../svg/DownloadSvg"
import { clampString, readableBytes } from "../utils/helper"
import { selectOptionsForResize } from "../utils/data"
import {
  addOutputQuality,
  removeImageFromResize,
} from "../store/Features/resize/imageResizeSlice"

const ResizeImageCard = ({ image, index }) => {
  const dispatch = useDispatch()

  const imageName = image.file.name.toString()

  // Dispatching action for add Output Quality to Image
  const changeScalePercent = (e) => {
    dispatch(addOutputQuality({ index, quality: e.target.value }))
  }

  // Dispatching action for delete file from Redux Store
  const deleteImage = () => {
    dispatch(removeImageFromResize(image.file))
  }

  return (
    <div className="flex w-full px-5 py-3 flex-wrap rounded-lg items-center justify-between border border-b-1 gap-10">
      <div className="flex-center gap-4">
        <FileSvg />
        <p className="flex-1 text-lg lg:w-96">
          {`${clampString(imageName)}`}{" "}
          <span className="text-base text-b-2 text-nowrap">
            ({readableBytes(image.file.size)})
          </span>
        </p>
      </div>

      {/* Continually rendering Select list or done sign */}
      {image.url ? (
        <Done />
      ) : (
        <div className="flex-center gap-4">
          <select
            className="input"
            onChange={changeScalePercent}
          >
            {selectOptionsForResize.map((o) => {
              return (
                <option
                  value={o}
                  key={o}
                  selected={o === 70}
                >
                  {`${o} %`}
                </option>
              )
            })}
          </select>
          <p className="text-lg text-b-2"> Quality</p>
        </div>
      )}

      {/* Conditionally rendering download button or delete button */}
      {image.url ? (
        <div className="flex-center gap-2">
          <span className="text-base text-b-2 text-nowrap">
            ({readableBytes(image.size)})
          </span>
          <a
            href={image.url}
            download={`Resized-${imageName.split(".")[0]}`}
            className="rounded-full hover:bg-b-1 p-1 transition-all duration-300"
          >
            <DownloadSvg />
          </a>
        </div>
      ) : (
        <button
          className="rounded-full hover:bg-b-1 p-2 transition-all duration-300"
          onClick={deleteImage}
        >
          <DeleteSvg />
        </button>
      )}
    </div>
  )
}

export default ResizeImageCard
