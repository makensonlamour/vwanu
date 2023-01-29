/**
 *
 * @param {Function} cb | function to be called after the user grants access to the camera and microphone
 * @param {Object} callProperties | object containing the properties of the call
 */

type MediaProperties = {
  video: boolean;
  audio: boolean;
};

// eslint-disable-next-line no-unused-vars
export default function loadMedia(mediaProperties: MediaProperties, cb: (media: STREAM) => {}, errCb: (err: ERROR) => {}): void;
