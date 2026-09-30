"use client";

import { useState } from "react";
import { Button } from "../ui/button";

// icons
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaSms,
  FaRedditAlien,
} from "react-icons/fa";

export default function SocialShareButton() {
  const [isOpen, setIsOpen] = useState(false);

  const shareOnPlatform = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out this article!");

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?url=${url}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${text}&body=${text} - ${url}`;
        break;
      case "sms":
        shareUrl = `sms:?&body=${text} - ${url}`;
        break;
      case "reddit":
        shareUrl = `https://reddit.com/submit?url=${url}&title=${text}`;
        break;
      default:
        break;
    }

    window.open(shareUrl, "_blank");
  };

  const socialPlatforms = [
    { name: "facebook", icon: <FaFacebookF className="mr-2 text-blue-600" /> },
    {
      name: "twitter",
      icon: <FaTwitter className="mr-2" style={{ color: "var(--sys-ink)" }} />,
    },
    { name: "linkedin", icon: <FaLinkedinIn className="mr-2 text-blue-700" /> },
    {
      name: "reddit",
      icon: <FaRedditAlien className="mr-2 text-orange-500" />,
    },
    // {name: 'email', icon: <FaEnvelope className="mr-2 text-red-400" />},
    //  {name: 'sms', icon: <FaSms className="mr-2 text-green-500" />},
  ];

  const renderButtons = () => {
    return socialPlatforms.map((platform, index) => (
      <Button
        key={index}
        onClick={() => shareOnPlatform(platform.name)}
        className="hover:bg-muted/95 flex items-center justify-center rounded-xl bg-background px-4 py-2 text-justify text-sm duration-300"
        style={{ color: "var(--sys-ink)" }}
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
    <div className="relative inline-block w-1/5 text-left ">
      <Button onClick={toggleMenu} intent="default" className="font-semibold">
        Share This Post
      </Button>

      {isOpen && (
        <div className="z-1 absolute bottom-1 right-10 mx-auto mt-2 w-72 items-center justify-center rounded-md bg-primary p-2 shadow-lg ring-1 ring-black ring-opacity-5 ">
          <div
            className="mx-auto grid w-full grid-cols-2 items-center justify-center gap-2 bg-primary py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {renderButtons()}
          </div>
        </div>
      )}
    </div>
  );
}
