import React from "react"

// Files
import Done from "./Done"
import FileSvg from "../svg/FileSvg"
import DeleteSvg from "../svg/DeleteSvg"
import DownloadSvg from "../svg/DownloadSvg"
import { readableBytes } from "../utils/helper"
import { useAppContext } from "../store/appContext"
import { selectOptionsForResize } from "../utils/data"

const ResizeImageCard = ({ image, index }) => {
  const { setResizeFiles } = useAppContext() // Getting setter Function from App Context

  const imageName = image.file.name.toString()

  // Adding scale percent to flies on Change and adding to Global State
  const changeScalePercent = (e) => {
    setResizeFiles((pre) =>
      pre.map((i, idx) => {
        if (idx === index) {
          return { ...i, scalePercent: e.target.value }
        } else {
          return i
        }
      })
    )
  }

  // Deleting File
  const deleteImage = () => {
    setResizeFiles((pre) => pre.filter((p) => p !== image))
  }

  return (
    <div className="flex w-full px-5 py-3 flex-wrap rounded-lg items-center justify-between border border-b-1 gap-10">
      <div className="flex-center gap-4">
        <FileSvg />
        <p className="flex-1 text-lg lg:w-96">
          {`${imageName}`}{" "}
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
