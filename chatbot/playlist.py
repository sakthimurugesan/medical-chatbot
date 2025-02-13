import yt_dlp

# Function to download the playlist
def download_playlist(link):
    try:
        ydl_opts = {
            'format': 'bestvideo+bestaudio/best',  # Download best quality
            'outtmpl': '%(playlist_title)s/%(playlist_index)s - %(title)s.%(ext)s',  # Save in folder named after playlist
            'merge_output_format': 'mp4',  # Merge audio and video as MP4
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([link])

        print("Download completed successfully!")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")

# URL of the YouTube playlist
playlist_url = "https://www.youtube.com/playlist?list=PLgUwDviBIf0pOd5zvVVSzgpo6BaCpHT9c"  # Replace with actual playlist URL

# Call the function to download the playlist
download_playlist(playlist_url)
