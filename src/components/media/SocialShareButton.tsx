'use client'

import { useState } from "react";
import { Button } from "../ui/button";

// icons 
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaSms, FaRedditAlien } from 'react-icons/fa';

export default function SocialShareButton() {

    const [isOpen, setIsOpen] = useState(false);

    const shareOnPlatform = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out this article!");

    let shareUrl = '';

    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?url=${url}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${text}&body=${text} - ${url}`;
            break;
        case 'sms':
            shareUrl = `sms:?&body=${text} - ${url}`;
            break;
        case 'reddit':
            shareUrl = `https://reddit.com/submit?url=${url}&title=${text}`;
            break;
        default:
            break;
    }

    window.open(shareUrl, '_blank');
};
     
    const socialPlatforms = [
        {name: 'facebook', icon: <FaFacebookF className="mr-2 text-blue-600" />},
        {name: 'twitter', icon: <FaTwitter className="mr-2 text-black" />},
        {name: 'linkedin', icon: <FaLinkedinIn className="mr-2 text-blue-700" />},
        {name: 'reddit', icon: <FaRedditAlien className="mr-2 text-orange-500" />},
       // {name: 'email', icon: <FaEnvelope className="mr-2 text-red-400" />},
      //  {name: 'sms', icon: <FaSms className="mr-2 text-green-500" />},
    ];

    const renderButtons = () => {
        return socialPlatforms.map((platform, index) => (
            <Button
                key={index}
                onClick={() => shareOnPlatform(platform.name)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 bg-background hover:bg-muted/95 rounded-xl duration-300 justify-center text-justify"
            >
                {platform.icon}
                {platform.name}
            </Button>
        ));
    };


    function toggleMenu() {
        setIsOpen((prev) => !prev);
      }
    
      return (
        <div className="relative inline-block text-left w-1/5 ">
            <Button
                onClick={toggleMenu}
                intent="default"
                className="font-semibold"
            >
                Share This Post
            </Button>

            {isOpen && (
                <div className="absolute bg-primary right-10 bottom-1 z-1 mt-2 w-72 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-2 mx-auto justify-center items-center ">
                    <div className="py-1 bg-primary grid grid-cols-2 gap-2 mx-auto justify-center items-center w-full" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {renderButtons()}
                    </div>
                </div>
            )}
        </div>
  
   
       
    )
}