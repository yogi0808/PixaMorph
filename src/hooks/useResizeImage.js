import { useState } from 'react'
import Pica from 'pica'

// Files
import { useAppContext } from '../store/appContext'


const useResizeImage = () => {

    const [loading, setLoading] = useState(false)

    const { resizeFiles, setResizeFiles } = useAppContext() // Getting Global State form App Context

    const resizeImage = async () => {
        setLoading(true)
        try {
            // Checking if files array is empty or not
            if (resizeFiles <= 0) {
                alert("Add Images to Resize")
                return
            }

            resizeFiles.forEach((f, index) => {

                if (f.url) return // checking file is already Resized or not 

                const scalePercent = f.scalePercent ? f.scalePercent : 70

                const image = new Image()

                image.onload = async () => {
                    // Creating canvas element
                    const canvas = document.createElement("canvas")

                    // Getting new Height width from scale percent
                    const newWidth = image.naturalWidth * (scalePercent / 100)
                    const newHeight = image.naturalHeight * (scalePercent / 100)

                    canvas.width = newWidth
                    canvas.height = newHeight

                    // Using pica library for quality Image  
                    const pica = Pica()
                    await pica.resize(image, canvas)

                    // Converting Canvas to Blob
                    canvas.toBlob(blob => {
                        const imgURL = URL.createObjectURL(blob)
                        // Storing URL to files
                        setResizeFiles((pre) =>
                            pre.map((i, idx) => {
                                if (idx === index) {
                                    return { ...i, url: imgURL, size: blob.size }
                                } else {
                                    return i
                                }
                            }))
                    }, f.file.type)
                }

                image.src = URL.createObjectURL(f.file)
            })

        } catch (e) {
            console.log("Error in resizeImage Hook: ", e.target)
        } finally {
            setLoading(false)
        }
    }

    return { loading, resizeImage }
}

export default useResizeImage