import axios from "axios"
// TODO: install Mintlify for docs

export async function getVideoDetails() {


    const ACCESS_TOKEN = process.env.YOUTUBE_API_KEY;
     
    axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${ACCESS_TOKEN}`, {
        // Add any optional query parameters here, e.g.:
        params: {
            part: 'snippet,contentDetails,statistics', // Specifies the parts of the video resource to be returned
            id: 'ZZS7Dxv6ZmE', // Replace with the ID of the video you want to retrieve
            // ... other parameters as per the YouTube API documentation
        }
    })
        .then(response => {

            console.log(response.data.items[0]);
        })
        .catch(error => {
            console.error('Error making the request:', error);
        });
}