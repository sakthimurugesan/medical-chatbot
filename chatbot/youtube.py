from pytube import YouTube
from pytube.cli import on_progress
import time

def download_video(url, quality='1080p', subtitles_lang=None, retries=3):
    for attempt in range(retries):
        try:
            # Create a YouTube object
            yt = YouTube(url, on_progress_callback=on_progress)

            # Filter streams based on quality
            video_stream = yt.streams.filter(res=quality, file_extension='mp4').first()
            if video_stream is None:
                print(f'Quality {quality} not available, downloading the highest quality instead.')
                video_stream = yt.streams.get_highest_resolution()

            # Download video
            print(f'Downloading video: {yt.title} in {video_stream.resolution}...')
            video_stream.download()

            # Download subtitles if specified
            if subtitles_lang:
                print(f'Downloading subtitles in {subtitles_lang}...')
                captions = yt.captions.get_by_language_code(subtitles_lang)
                if captions:
                    with open(f'{yt.title}_{subtitles_lang}.srt', 'w', encoding='utf-8') as f:
                        f.write(captions.generate_srt_captions())
                else:
                    print(f'No subtitles available in {subtitles_lang}.')

            print('Download completed!')
            return  # Exit function if successful

        except Exception as e:
            print(f'Error: {e}')
            if attempt < retries - 1:
                print('Retrying...')
                time.sleep(2)  # Wait before retrying
            else:
                print('Failed to download the video after several attempts.')

# Example usage
url = 'https://www.youtube.com/watch?v=yqTi0I4MLUo&t=167s'  # Replace with your video URL
download_video(url, quality='1080p', subtitles_lang='en')  # Change quality and language as needed
