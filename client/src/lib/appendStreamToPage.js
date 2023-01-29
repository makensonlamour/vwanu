export default function appendStreamToPage(media, stream, errCb) {
  try {
    media.srcObject = stream;
    media.addEventListener("loadedmetadata", () => {
      media.play();
    });
    if (media instanceof HTMLVideoElement) {
      const videoGrid = document.getElementById("video-grid");
      videoGrid.append(media);
    }
  } catch (error) {
    errCb(error);
  }
}
