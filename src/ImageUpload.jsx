import { useState } from "react"
// Never used???
function Upload(){
 const [apiData, setApiData] = useState ("");

 const fetchImageUpload = async () => {
  try {
    const response = await fetch('http://freeimage.host/api/1/upload/?key=6d207e02198a847aa98d0a2a901485a5&source=https://somewebsite/someimage.jpg');
    const data = await response.json();
    setApiData(data.message); // "message" contains the image URL
  } catch (error) {
    console.error('Error fetching image:', error);
  }
};

    return(
        <div>
            <img href="http://freeimage.host/images/2014/06/04/example.png" />
            <a>Upload image here</a>
        </div>
    )
}

export default Upload