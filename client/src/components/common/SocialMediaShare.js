import React from "react";
import PropTypes from "prop-types";
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  EmailIcon,
  FacebookIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";

const SocialMediaShare = ({
  className,
  title,
  quote,
  url,
  image,
  hashtag,
  description,
  imageUrl,
  caption,
  media,
  summary,
  hashtags,
  subject,
  body,
  via,
  style,
  source,
  tags,
}) => {
  return (
    <>
      <div className="mt-6 lg:mt-8 px-4 lg:px-28 flex flex-wrap">
        <p className="py-2 mr-1">Share:</p>
        <EmailShareButton subject={subject} body={body} className={className} style={style} quote={quote} url={url}>
          <EmailIcon size={32} round={false} borderRadius={26} />
        </EmailShareButton>
        <FacebookShareButton className={className} style={style} quote={quote} hashtag={hashtag} url={url}>
          <FacebookIcon bgStyle={{ fill: "#1778F2" }} size={32} round={false} borderRadius={26} />
        </FacebookShareButton>
        <TwitterShareButton className={className} style={style} title={title} via={via} hashtags={hashtags} url={url}>
          <TwitterIcon size={32} round={false} borderRadius={26} />
        </TwitterShareButton>
        <LinkedinShareButton className={className} style={style} title={title} summary={summary} source={source} url={url}>
          <LinkedinIcon size={32} round={false} borderRadius={26} />
        </LinkedinShareButton>
        <PinterestShareButton className={className} style={style} description={description} media={media} url={url}>
          <PinterestIcon size={32} round={false} borderRadius={26} />
        </PinterestShareButton>
        <WhatsappShareButton className={className} style={style} title={title} url={url}>
          <WhatsappIcon size={32} round={false} borderRadius={26} />
        </WhatsappShareButton>
        <TelegramShareButton className={className} style={style} title={title} url={url}>
          <TelegramIcon size={32} round={false} borderRadius={26} />
        </TelegramShareButton>
        <LineShareButton className={className} style={style} title={title} url={url}>
          <LineIcon size={32} round={false} borderRadius={26} />
        </LineShareButton>
        <ViberShareButton className={className} style={style} title={title} url={url}>
          <ViberIcon size={32} round={false} borderRadius={26} />
        </ViberShareButton>
        <RedditShareButton className={className} style={style} title={title} url={url}>
          <RedditIcon size={32} round={false} borderRadius={26} />
        </RedditShareButton>
        <HatenaShareButton className={className} style={style} title={title} url={url}>
          <HatenaIcon size={32} round={false} borderRadius={26} />
        </HatenaShareButton>
        <InstapaperShareButton className={className} style={style} title={title} description={description} url={url}>
          <InstapaperIcon size={32} round={false} borderRadius={26} />
        </InstapaperShareButton>
        <LivejournalShareButton className={className} style={style} title={title} description={description} url={url}>
          <LivejournalIcon size={32} round={false} borderRadius={26} />
        </LivejournalShareButton>
        <MailruShareButton className={className} style={style} title={title} description={description} imageUrl={imageUrl} url={url}>
          <MailruIcon size={32} round={false} borderRadius={26} />
        </MailruShareButton>
        <OKShareButton className={className} style={style} title={title} description={description} image={image} url={url}>
          <OKIcon size={32} round={false} borderRadius={26} />
        </OKShareButton>
        <PocketShareButton className={className} style={style} title={title} url={url}>
          <PocketIcon size={32} round={false} borderRadius={26} />
        </PocketShareButton>
        <TumblrShareButton className={className} style={style} title={title} caption={caption} tags={tags} url={url}>
          <TumblrIcon size={32} round={false} borderRadius={26} />
        </TumblrShareButton>
        <VKShareButton className={className} style={style} title={title} image={image} url={url}>
          <VKIcon size={32} round={false} borderRadius={26} />
        </VKShareButton>
        <WorkplaceShareButton className={className} style={style} quote={quote} hashtag={hashtag} url={url}>
          <WorkplaceIcon size={32} round={false} borderRadius={26} />
        </WorkplaceShareButton>
      </div>
    </>
  );
};

SocialMediaShare.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  quote: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  hashtag: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  caption: PropTypes.string,
  media: PropTypes.string,
  summary: PropTypes.string,
  hashtags: PropTypes.array,
  subject: PropTypes.string,
  body: PropTypes.string,
  via: PropTypes.string,
  style: PropTypes.string,
  source: PropTypes.string,
  tags: PropTypes.array,
};

export default SocialMediaShare;
