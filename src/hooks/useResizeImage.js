import Pica from 'pica'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Files
import { addResizedImageUrl } from '../store/Features/resize/imageResizeSlice'


const useResizeImage = () => {

    const [loading, setLoading] = useState(false)


    const { imagesForResize } = useSelector(state => state.resizeImages)

    const dispatch = useDispatch()

    const resizeImage = async () => {
        setLoading(true)
        try {
            // Checking if files array is empty or not
            if (imagesForResize <= 0) {
                alert("Add Images to Resize")
                return
            }

            imagesForResize.forEach((f, index) => {

                if (f.url) return // checking file is already Resized or not 

                const outputQuality = f.outputQuality ? f.outputQuality : 70

                const image = new Image()

                image.onload = async () => {
                    // Creating canvas element
                    const canvas = document.createElement("canvas")

                    // Getting new Height width from scale percent
                    const newWidth = image.naturalWidth * (outputQuality / 100)
                    const newHeight = image.naturalHeight * (outputQuality / 100)

                    canvas.width = newWidth
                    canvas.height = newHeight

                    // Using pica library for quality Image  
                    const pica = Pica()
                    await pica.resize(image, canvas)

                    // Converting Canvas to Blob
                    canvas.toBlob(blob => {
                        const imgURL = URL.createObjectURL(blob)
                        // Dispatching action for add download url and output image size
                        dispatch(addResizedImageUrl({ index, url: imgURL, size: blob.size }))
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