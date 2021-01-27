import React, { useState, useEffect } from 'react';
import './SubShare.scss'
import {
    FacebookShareButton,
    EmailShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    EmailIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
    FacebookShareCount
} from "react-share";

export function SubShare() {
    const [url] = useState("https://more-cube.herokuapp.com");
    const [title] = useState('Create your own custom cube')
    const [size] = useState('1.5rem')

    return (
        <ul className="SubShare flex">
            <li
                className="network"
            >
                <FacebookShareButton
                    className="network__share-button"
                    url={url}
                    quote={title}
                >
                    <FacebookIcon
                        size={size}
                    />
                </FacebookShareButton>
            </li>
            <li
                className="network"
            >
                <EmailShareButton
                    className="network__share-button"
                    url={url}
                    quote={title}
                >
                    <EmailIcon
                        size={size}
                    />
                </EmailShareButton>
            </li>
            <li
                className="network"
            >
                <TwitterShareButton
                    className="network__share-button"
                    url={url}
                    quote={title}
                >
                    <TwitterIcon
                        size={size}
                    />
                </TwitterShareButton>
            </li>
            <li
                className="network"
            >
                <LinkedinShareButton
                    className="network__share-button"
                    url={url}
                    quote={title}
                >
                    <LinkedinIcon
                        size={size}
                    />
                </LinkedinShareButton>
            </li>
            <li
                className="network"
            >
                <WhatsappShareButton
                    className="network__share-button"
                    url={url}
                    quote={title}
                >
                    <WhatsappIcon
                        size={size}
                    />
                </WhatsappShareButton>
            </li>
        </ul>
    )
}