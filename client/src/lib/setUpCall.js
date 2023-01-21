/**
 *
 * @param {Function} cb | function to be called after the user grants access to the camera and microphone
 * @param {Object} callProperties | object containing the properties of the call
 */

const setupCall = (cb, callProperties) => {
  var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  getUserMedia(
    {
      video: true,
      audio: true,
      ...callProperties,
    },
    cb
  );
};

export default setupCall;
