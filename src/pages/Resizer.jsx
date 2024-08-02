import React from "react"

// Files
import InputArea from "../components/InputArea"
import ConvertBtn from "../components/ConvertBtn"
import { introductionTextForResize } from "../utils/data"
import ResizeImageCard from "../components/ResizeImageCard"
import { useDispatch, useSelector } from "react-redux"
import { setImagesForResize } from "../store/Features/resize/imageResizeSlice"

const Resizer = () => {
  const { imagesForResize } = useSelector((state) => state.resizeImages)

  const dispatch = useDispatch()

  // Adding Files to Global Storage for Resize
  const onChange = (e) => {
    const files = Array.from(e.target.files)
    dispatch(
      setImagesForResize(
        files.map((f) => {
          return { file: f }
        })
      )
    )

    e.target.value = ""
  }

  return (
    <main className="w-full py-6 px-3 md:px-8 flex-center flex-col gap-10">
      <div className="w-full flex-center flex-col">
        <h1 className="text-4xl font-bold tracking-wide leading-loose">
          Resize Images
        </h1>
        <p className="max-w-[800px] text-center leading-loose text-lg tracking-wide text-b-2">
          <span className="text-b-3">Introducing PixaMorph – </span>
          {introductionTextForResize}
        </p>
      </div>
      <div className="w-full flex-center flex-col gap-8">
        {/* Conditionally rendering AddImage area or Image list */}
        {imagesForResize.length <= 0 ? (
          <InputArea onChange={onChange} />
        ) : (
          <div className="flex flex-col gap-6">
            {imagesForResize.map((i, idx) => (
              <ResizeImageCard
                image={i}
                index={idx}
                key={`${i.file.name}.${idx}`}
              />
            ))}

            <ConvertBtn resize />
          </div>
        )}
      </div>
    </main>
  )
}

export default Resizer
