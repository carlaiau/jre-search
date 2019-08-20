// Converts the transcript back to original
/* eslint-disable */

export default function (highlight){
    const regex = /(\[?\d+\]?)/g

    let timestamps = highlight.match(regex);

    const clean = highlight.replace(regex, '')
    const time = timestamps[0].replace(/[^\d+]/g, '') - 2
    
    return {
        clean,
        time
    }
        

}