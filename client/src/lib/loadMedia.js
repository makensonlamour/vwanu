/**
 *
 * @param {Function} cb | function to be called after the user grants access to the camera and microphone
 * @param {Object} callProperties | object containing the properties of the call
 */

export default function loadMedia(mediaProperties, cb, errCb) {
  var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  getUserMedia(mediaProperties, cb, errCb);
}
