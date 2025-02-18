const username = 'Bekimoon0043';
const repo = 'video-website';
const pat = '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';

async function uploadVideo() {
    const title = document.getElementById('title').value;
    const file = document.getElementById('videoFile').files[0];
    
    if (!title || !file) {
        alert('Please fill all fields');
        return;
    }

    const filename = encodeURIComponent(file.name);
    const reader = new FileReader();
    
    reader.onload = async () => {
        try {
            // Upload video file
            const content = reader.result.split(',')[1];
            const videoUrl = `https://api.github.com/repos/${username}/${repo}/contents/VIDEO/${filename}`;
            
            const videoResponse = await fetch(videoUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${pat}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Add video ${filename}`,
                    content: content,
                })
            });

            if (!videoResponse.ok) throw new Error('Video upload failed');

            // Update videos.json
            const jsonUrl = `https://api.github.com/repos/${username}/${repo}/contents/videos.json`;
            const jsonResponse = await fetch(jsonUrl, { headers: { 'Authorization': `token ${pat}` } });
            const jsonData = await jsonResponse.json();
            
            const currentContent = JSON.parse(atob(jsonData.content.replace(/\s/g, '')));
            currentContent.push({ title, filename });
            
            const updateResponse = await fetch(jsonUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${pat}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: 'Update video list',
                    content: btoa(JSON.stringify(currentContent, null, 2)),
                    sha: jsonData.sha
                })
            });

            if (!updateResponse.ok) throw new Error('Metadata update failed');
            
            alert('Upload successful! Changes may take a few minutes to appear.');

        } catch (error) {
            console.error('Error:', error);
            alert('Upload failed: ' + error.message);
        }
    };
    
    reader.readAsDataURL(file);
}
