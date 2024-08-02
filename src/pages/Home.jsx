import React from "react"
import { useDispatch, useSelector } from "react-redux"

// Files
import ImageCard from "../components/ImageCard"
import ConvertBtn from "../components/ConvertBtn"
import { introductionTextForFormat } from "../utils/data"
import { setImagesForFormat } from "../store/Features/change format/imageFormatSlice"
import InputAreaForImages from "../components/InputAreaForImages"

const Home = () => {
  const { imagesForFormat } = useSelector((state) => state.formatImages)

  const dispatch = useDispatch()

  // on change Setting files to Global State
  const onChange = (e) => {
    const files = Array.from(e.target.files)

    dispatch(
      setImagesForFormat(
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
          Convert Images Format
        </h1>
        <p className="max-w-[800px] text-center leading-loose text-lg tracking-wide text-b-2">
          <span className="text-b-3">Introducing Format Changer – </span>
          {introductionTextForFormat}
        </p>
      </div>
      <div className="w-full flex-center flex-col gap-8">
        {/* Conditionally rendering AddImage area or Image list */}
        {imagesForFormat.length <= 0 ? (
          <InputAreaForImages onChange={onChange} />
        ) : (
          <div className="flex flex-col gap-6">
            {imagesForFormat.map((i, idx) => (
              <ImageCard
                image={i}
                index={idx}
                key={`${i.name}.${idx}`}
              />
            ))}

            <ConvertBtn />
          </div>
        )}
      </div>
    </main>
  )
}

export default Home
