import React from "react"

// Files
import Done from "./Done"
import FileSvg from "../svg/FileSvg"
import DeleteSvg from "../svg/DeleteSvg"
import DownloadSvg from "../svg/DownloadSvg"
import { readableBytes } from "../utils/helper"
import { useAppContext } from "../store/appContext"
import { selectOptionsForFormat } from "../utils/data"

const ImageCard = ({ image, index }) => {
  const { setFiles } = useAppContext() // Getting setter Function from App Context

  // Adding outputFormat to flies on Change and adding to Global State
  const changeOutputFormat = (e) => {
    setFiles((pre) =>
      pre.map((i, idx) => {
        if (idx === index) {
          return { ...i, outputFormat: e.target.value }
        } else {
          return i
        }
      })
    )
  }

  // Deleting File
  const deleteImage = () => {
    setFiles((pre) => pre.filter((p) => p !== image))
  }

  return (
    <div className="flex w-full px-5 py-3 flex-wrap rounded-lg items-center justify-between border border-b-1 gap-10">
      <div className="flex-center gap-4">
        <FileSvg />
        <p className="flex-1 text-lg lg:w-96">
          {`${image.file.name}`}{" "}
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
          <p className="text-lg text-b-2">Convert to</p>
          <select
            className="input"
            onChange={changeOutputFormat}
          >
            <option
              disabled
              selected={image.outputFormat ? false : true}
              hidden
            >
              Select Type
            </option>

            {selectOptionsForFormat.map((o, idx) => {
              if (
                image.file.type !== "image/jpeg" &&
                image.file.type === `image/${o}`
              )
                return
              return (
                <option
                  value={`image/${o}`}
                  key={idx}
                  selected={image.outputFormat === `image/${o}`}
                >
                  {o}
                </option>
              )
            })}
          </select>
        </div>
      )}

      {/* Conditionally rendering download button or delete button */}
      {image.url ? (
        <a
          href={image.url}
          download={`converted-${image.file.name.split(".")[0]}.${
            image.outputFormat.split("/")[1]
          }`}
          className="rounded-full hover:bg-b-1 p-1 transition-all duration-300"
        >
          <DownloadSvg />
        </a>
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

export default ImageCard
