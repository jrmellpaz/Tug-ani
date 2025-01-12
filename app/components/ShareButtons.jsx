"use client";

import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    XIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    TelegramShareButton,
    TelegramIcon,
    EmailShareButton,
    EmailIcon,

} from 'react-share';

const ShareButtons = ({ shareUrl, title }) => {
    return (
        <div className="mt-6 flex justify-center gap-4">
            <FacebookShareButton url={shareUrl} quote={title} hashtag=''>
                <FacebookIcon size={40} round />
            </FacebookShareButton>

            <TwitterShareButton url={shareUrl} title={title}>
                <XIcon size={40} round />
            </TwitterShareButton>
            
            <TelegramShareButton url={shareUrl} title={title}>
                <TelegramIcon size={40} round />
            </TelegramShareButton>

            <EmailShareButton url={shareUrl} subject={title}>
                <EmailIcon size={40} round />
            </EmailShareButton>
        </div>
    );
};

export default ShareButtons;
