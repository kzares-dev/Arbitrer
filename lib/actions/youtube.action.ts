"use server"
import axios from "axios"

export async function getYoutubeVideoData(videoId: string) {


    const ACCESS_TOKEN = "AIzaSyCE6w3NUd49yFMIpW26B8t5lpJdyGU6f00";

    const promise = await axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${ACCESS_TOKEN}`, {
        // Add any optional query parameters here, e.g.:
        params: {
            part: 'snippet,contentDetails,statistics', // Specifies the parts of the video resource to be returned
            id: videoId, // Replace with the ID of the video you want to retrieve
            // ... other parameters as per the YouTube API documentation
        }
    })
        .then(response => {
            return response.data.items[0]
        })
        .catch(error => {
            console.error('Error making the request:', error);
        });

        return promise
}