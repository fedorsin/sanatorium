import React, { useEffect } from "react";

const TelegramChat = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.setAttribute("src", "https://telegram.org/js/telegram-widget.js?22");
        script.setAttribute("data-telegram-discussion", "findsanatorium/3");
        script.setAttribute("data-comments-limit", "5");
        document.getElementsByClassName("twitter-embed")[0].appendChild(script);
    }, []);

    return (
            <div className="twitter-embed"></div>
    );
};

export default TelegramChat;
