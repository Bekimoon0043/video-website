async function loadVideos() {
    try {
        const response = await fetch('https://cdn.jsdelivr.net/gh/your-username/video-website/videos.json');
        const videos = await response.json();
        const container = document.getElementById('videoContainer');
        
        videos.forEach(video => {
            const videoDiv = document.createElement('div');
            videoDiv.innerHTML = `
                <h3>${video.title}</h3>
                <video controls width="600">
                    <source src="https://cdn.jsdelivr.net/gh/${username}/${repo}/VIDEO/${video.filename}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            container.appendChild(videoDiv);
        });
    } catch (error) {
        console.error('Error loading videos:', error);
    }
}

loadVideos();