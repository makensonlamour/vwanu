export default (options) => async (context) => {
  const { mediaArray } = options;
  if (!mediaArray) throw new Error('Please provide the media array');
  const { UploadedMedia } = context.data;
  if (!UploadedMedia) return context;

  const Medias = [];
  if (UploadedMedia && mediaArray.some((media) => UploadedMedia[media])) {
    mediaArray.forEach((mediaGroup) => {
      if (UploadedMedia[mediaGroup]) {
        UploadedMedia[mediaGroup].forEach((doc) => {
          if (doc.path)
            Medias.push({
              original: doc.path,
              UserId: context.params.User.id,
            });
        });
      }
    });
    const entityId = context.result.id;
    const entity = await context.app
      .service(context.path)
      .Model.findByPK(entityId);
    // Medias = Array.from(new Set(Medias));
    const withMedia = await entity.createMedia(Medias);
    context.result = withMedia;
  }
  return context;
};
