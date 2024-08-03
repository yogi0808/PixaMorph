// Read bytes and return it in format
export const readableBytes = (bytes) => {
    const i = Math.floor(Math.log(bytes) / Math.log(1024)),
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}

export const clampString = (str, maxLength = 23) => {
    if (str.length <= maxLength) {
        return str;
    }

    return `${str.slice(0, 10)}...${str.slice(-10)}`
}