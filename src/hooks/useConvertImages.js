import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Files
import { addFormattedUrl } from '../store/Features/change format/imageFormatSlice'

const useConvertImages = () => {

    const [loading, setLoading] = useState(false)

    const { imagesForFormat } = useSelector(state => state.formatImages)

    const dispatch = useDispatch()

    const convertImages = async () => {
        setLoading(true)
        try {
            if (imagesForFormat.length <= 0) return alert("Select file first.") // checking files is empty or not

            await imagesForFormat.forEach((f, index) => {

                if (!f.outputFormat || f.url) return // checking file have outputForma or Url

                let reader = new FileReader();

                // Event listener for when the file is read as a data URL
                reader.onload = function (e) {
                    let image = new Image();
                    // Event listener for when the image is load
                    image.onload = function () {
                        // Calling Image convert Function 
                        convertImage(image, f.outputFormat).then(blob => {
                            // Dispatching action for add Download url
                            dispatch(addFormattedUrl({ index, url: URL.createObjectURL(blob) }))
                        })
                    }
                    image.src = e.target.result;
                }
                reader.readAsDataURL(f.file);
            })

        } catch (e) {
            console.log("Error in convertImages Hook: ", e)
        } finally { setLoading(false) }
    }

    return { loading, convertImages }
}

const convertImage = async (image, format) => {
    return new Promise((resolve, reject) => {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');

        // Draw the image onto the canvas
        ctx.drawImage(image, 0, 0);

        // Convert the canvas content to a Blob in the specified format
        canvas.toBlob(blob => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('Conversion to Blob failed'));
            }
        }, format);
    })
}

export default useConvertImages