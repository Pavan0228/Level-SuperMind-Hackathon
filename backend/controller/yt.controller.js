import { getJson } from "serpapi";

export async function fetchYouTubeResults(req, res) {
    console.log("Fetching YouTube results...");

    try {
        const apiKey = process.env.SERPAPI_KEY;
        const { query } = req.body;

        if (!apiKey) {
            return res.status(500).json({ error: "API key is required" });
        }

        if (!query) {
            return res.status(400).json({ error: "Search query is required" });
        }

        const results = await new Promise((resolve, reject) => {
            getJson(
                {
                    engine: "youtube",
                    search_query: query,
                    api_key: apiKey,
                },
                (json) => {
                    if (json.error) {
                        reject(new Error(json.error));
                    } else {
                        resolve(json);
                    }
                }
            );
        });

        res.status(200).json({
            success: true,
            video_results: results.video_results,
            shorts_results: results.shorts_results,
            channels_new_to_you: results.channels_new_to_you,
        });
    } catch (error) {
        console.error("Error fetching YouTube results:", error.message);
        res.status(500).json({ error: error.message });
    }
}


const json = {
    "success": true,
    "video_results": [
        {
            "position_on_page": 1,
            "title": "3 Services That Are FREE At The Lenskart Store | #Lenskart",
            "link": "https://www.youtube.com/watch?v=jOvPHe-JiV0",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=jOvPHe-JiV0",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "1 year ago",
            "views": 622567,
            "length": "1:58",
            "description": "If you haven't visited a Lenskart store yet, you're in for a treat! We've got not one, not two, but three fantastic services that you can ...",
            "extensions": [
                "4K"
            ],
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/jOvPHe-JiV0/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBJkIPaUJSBTl5L8JdPD9urflJn4g",
                "rich": "https://i.ytimg.com/an_webp/jOvPHe-JiV0/mqdefault_6s.webp?du=3000&sqp=CLOor7wG&rs=AOn4CLBfnZyNMzROrFDc0JG25oigY-Bf3Q"
            }
        },
        {
            "position_on_page": 2,
            "title": "Unbreakable Glasses For Kids | Lenskart Hooper",
            "link": "https://www.youtube.com/watch?v=iidyzXZfeGk",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=iidyzXZfeGk",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "4 months ago",
            "views": 21993,
            "length": "0:20",
            "description": "Chashma tootne ke darr ko bolo Goodbye with our Unbreakable Frames for Kids! Stretch them. Bend them. Twist them.",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/iidyzXZfeGk/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCPU7OV899gQSbz08tpmztXsWYPYw",
                "rich": "https://i.ytimg.com/an_webp/iidyzXZfeGk/mqdefault_6s.webp?du=3000&sqp=CPabr7wG&rs=AOn4CLAXdgN5tRSGdEpL_6BoPW_s310rNA"
            }
        },
        {
            "position_on_page": 4,
            "title": "How Blue Light Eyeglasses Work | #Shorts | #Lenskart",
            "link": "https://www.youtube.com/watch?v=d_iztYVYRnU",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=d_iztYVYRnU",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "1 year ago",
            "views": 406297,
            "length": "0:25",
            "description": "Curious about how the Blue light #eyeglasses work? Well, watch on to know everything about it and all the reasons that make ...",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/d_iztYVYRnU/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBtgiAAoAPigIMCAAQARhlIF4oTTAP&rs=AOn4CLDCeBRUwiY18ozo11vbsklU8DlKCw",
                "rich": "https://i.ytimg.com/an_webp/d_iztYVYRnU/mqdefault_6s.webp?du=3000&sqp=COisr7wG&rs=AOn4CLCtr0smgA2oPHsKWrXBhgYooLyxVg"
            }
        },
        {
            "position_on_page": 5,
            "title": "Peyush Bansal Talks About The Eyewear Innovation At Lenskart | #Shorts | #Lenskart",
            "link": "https://www.youtube.com/watch?v=XOm9cRLFNUw",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=XOm9cRLFNUw",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "1 year ago",
            "views": 16759433,
            "length": "0:29",
            "description": "The all time favourite magnetic clip-ons that go from eye to sun in a snap, have a cool new addition. Sliding rubber retainers that ...",
            "extensions": [
                "4K"
            ],
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/XOm9cRLFNUw/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBtgiAAoAPigIMCAAQARhyIFIoOTAP&rs=AOn4CLAXsH3TLRfUWFaMpYdEirgsSJ098w",
                "rich": "https://i.ytimg.com/an_webp/XOm9cRLFNUw/mqdefault_6s.webp?du=3000&sqp=CJSFr7wG&rs=AOn4CLAhEWFeAjmOLHOxwIpaVMAvFDm7zw"
            }
        },
        {
            "position_on_page": 7,
            "title": "How To Find The Perfect Sunglasses For Your Face Shape | #Lenskart",
            "link": "https://www.youtube.com/watch?v=g4aetQg5XK0",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=g4aetQg5XK0",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "1 year ago",
            "views": 258400,
            "length": "0:17",
            "description": "Stylish #eyewear according to face shape! Watch on to learn how to choose the eyewear that complements your #faceshape the ...",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/g4aetQg5XK0/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBtgiAAoAPigIMCAAQARhlIFAoRDAP&rs=AOn4CLCWgoEMffnLPm4BamelJDogKgs7qw",
                "rich": "https://i.ytimg.com/an_webp/g4aetQg5XK0/mqdefault_6s.webp?du=3000&sqp=CKedr7wG&rs=AOn4CLD5uHFI6dK2npYub7BDmlR1Slf6WQ"
            }
        },
        {
            "position_on_page": 8,
            "title": "Comfortable and Cool Eyeglasses You Must Own | #Shorts | #Lenskart",
            "link": "https://www.youtube.com/watch?v=XwvY_-1W_Kg",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=XwvY_-1W_Kg",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "9 months ago",
            "views": 82356,
            "length": "0:16",
            "description": "We've all swooned over Peyush Bansal's iconic look with these Hustlr glasses, but have you checked out the new Jade Green ...",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/XwvY_-1W_Kg/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBtgiAAoAPigIMCAAQARhlIE0oSzAP&rs=AOn4CLA7YqzxY0BNUgQSAvHoM8urSqTR9w",
                "rich": "https://i.ytimg.com/an_webp/XwvY_-1W_Kg/mqdefault_6s.webp?du=3000&sqp=COinr7wG&rs=AOn4CLBN7oIAmpditek5hdmCPSb0ygMbww"
            }
        },
        {
            "position_on_page": 9,
            "title": "Is Lenskart the Best Powered Sunglasses Brand for You?",
            "link": "https://www.youtube.com/watch?v=xVvkGlowNNI",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=xVvkGlowNNI",
            "channel": {
                "name": "Mr Kholu",
                "link": "https://www.youtube.com/@MrKholu",
                "thumbnail": "https://yt3.ggpht.com/IH0B10NF1m1AQDcdg348cgyNvWybhzWwEsFddfRNfeSY64SUKyW5OpWFYP4cljk3OrOtulOfyw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "2 days ago",
            "views": 256,
            "length": "4:56",
            "description": "Chalo kholte hai ---------------------------------------------------------------- Hello Dosto Me Aapka Anuj . About this video : Chaliye is Video ...",
            "extensions": [
                "New"
            ],
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/xVvkGlowNNI/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCc-bWld8N6la7G9yay32QcHmm85A",
                "rich": "https://i.ytimg.com/an_webp/xVvkGlowNNI/mqdefault_6s.webp?du=3000&sqp=CJj1rrwG&rs=AOn4CLC1t6zXCyviWxztI6t0-6XVisCD7w"
            }
        },
        {
            "position_on_page": 10,
            "title": "Lenskart Order Status (UHD)",
            "link": "https://www.youtube.com/watch?v=MR-ZnDoZx1A",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=MR-ZnDoZx1A",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "4 years ago",
            "views": 128146,
            "length": "2:25",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/MR-ZnDoZx1A/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgBtgiAAoAPigIMCAAQARhHIEsoWTAP&rs=AOn4CLBAAhJgMzhH70aG1yGfb5UA-4RIag",
                "rich": "https://i.ytimg.com/an_webp/MR-ZnDoZx1A/mqdefault_6s.webp?du=3000&sqp=CKD1rrwG&rs=AOn4CLCVxzpr0OXoHsyiKXBvxInRERsyaw"
            }
        },
        {
            "position_on_page": 13,
            "title": "Find The Perfect Eyewear For Your Face Shape | #Shorts | #Lenskart",
            "link": "https://www.youtube.com/watch?v=qliIKIsS2hw",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=qliIKIsS2hw",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "1 year ago",
            "views": 446084,
            "length": "0:16",
            "description": "Unveiling the Perfect Pair! Complete your look effortlessly with the ideal • • that perfectly suits your unique face shape ...",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/qliIKIsS2hw/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBtgiAAoAPigIMCAAQARg8IEgocjAP&rs=AOn4CLA6ypoM_9qkpR8Br8XLR1azL4dNFQ",
                "rich": "https://i.ytimg.com/an_webp/qliIKIsS2hw/mqdefault_6s.webp?du=3000&sqp=CIicr7wG&rs=AOn4CLCRzsMfMonN9tSdSZMsWO19XS7jMQ"
            }
        },
        {
            "position_on_page": 14,
            "title": "2 Pairs at the Price of Just 1 | Buy Now! Lenskart Buy 1 Get 1 Offer",
            "link": "https://www.youtube.com/watch?v=raRtEx0F5yM",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=raRtEx0F5yM",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "2 weeks ago",
            "views": 9920,
            "length": "1:03",
            "description": "Unlock all the exciting offers with Lenskart Gold Membership: ✔️ Double the joy with Buy 1, Get 1! ✔️ You're the VIP with First ...",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/raRtEx0F5yM/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA3NsJrgLt-M8td-amoIuXCjIxAyQ",
                "rich": "https://i.ytimg.com/an_webp/raRtEx0F5yM/mqdefault_6s.webp?du=3000&sqp=CMG0r7wG&rs=AOn4CLDTs4Xh2DD7xpNBlfUS96CQ31Db3w"
            }
        },
        {
            "position_on_page": 15,
            "title": "FREE Ultrasonic Eyewear Cleaning | Lenskart Store | #Shorts | #Lenskart",
            "link": "https://www.youtube.com/watch?v=og-c2ysfR_I",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=og-c2ysfR_I",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "1 year ago",
            "views": 2639521,
            "length": "0:39",
            "description": "Want your pre-owned glasses to look brand new? Well, we'll let you in on a little secret. Enter your nearest #LenskartStore and get ...",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/og-c2ysfR_I/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBtgiAAoAPigIMCAAQARhlIF0oUzAP&rs=AOn4CLBanhqt9EnSG83RgShWFL0y1tjTkw",
                "rich": "https://i.ytimg.com/an_webp/og-c2ysfR_I/mqdefault_6s.webp?du=3000&sqp=CO71rrwG&rs=AOn4CLCwPGSYeEoPstz3h3njK1Dr8Bl2Qg"
            }
        },
        {
            "position_on_page": 16,
            "title": "3 Glasses Fir Kids Who Are Going Back To School | #Shorts | #Lenskart",
            "link": "https://www.youtube.com/watch?v=cS3g11kSJuE",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=cS3g11kSJuE",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "1 year ago",
            "views": 45644,
            "length": "0:25",
            "description": "Kids are ready to go back to school. Protect their little eyes with Hooper #sunnies! These 🕶️ are packed with features that are ...",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/cS3g11kSJuE/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBtgiAAoAPigIMCAAQARhWIGUoZDAP&rs=AOn4CLCfcw1V25Q0gfLRlxdNCzwqrNX5pg",
                "rich": "https://i.ytimg.com/an_webp/cS3g11kSJuE/mqdefault_6s.webp?du=3000&sqp=CKmKr7wG&rs=AOn4CLBnCm001y5l1V8xATECne4ZratTvw"
            }
        },
        {
            "position_on_page": 17,
            "title": "Unbreakable Eyeglasses Are For Real | Lenskart Air Flex | #Shorts | #Lenskart",
            "link": "https://www.youtube.com/watch?v=xDmVgj5rxvo",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=xDmVgj5rxvo",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "1 year ago",
            "views": 453344,
            "length": "0:32",
            "description": "You can stretch it, you can twist it. But most importantly, you can end up sleeping on it & it still won't break! ✨ Airy light ✨ Super ...",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/xDmVgj5rxvo/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBtgiAAoAPigIMCAAQARhlIFcoSjAP&rs=AOn4CLDcB_8E74AUqP2IExnthixEutOgSg",
                "rich": "https://i.ytimg.com/an_webp/xDmVgj5rxvo/mqdefault_6s.webp?du=3000&sqp=CNyNr7wG&rs=AOn4CLDkRKFcVUkj5P6FgEQk2B3ErO7xPQ"
            }
        },
        {
            "position_on_page": 18,
            "title": "FREE Ultrasonic Eyewear Cleaning at the Lenskart Store | #Shorts | #Lenskart",
            "link": "https://www.youtube.com/watch?v=6FgZwcXUVKA",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=6FgZwcXUVKA",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "1 year ago",
            "views": 88973,
            "length": "0:31",
            "description": "Want your pre-owned glasses to look brand new? Well, we'll let you in on a little secret. Enter your nearest #LenskartStore and get ...",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/6FgZwcXUVKA/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBtgiAAoAPigIMCAAQARhlIEsoQzAP&rs=AOn4CLB0CZslobOl3tkXxBEAtFRrU0PaEA",
                "rich": "https://i.ytimg.com/an_webp/6FgZwcXUVKA/mqdefault_6s.webp?du=3000&sqp=CKCyr7wG&rs=AOn4CLCW7OmdurQIJYUySF1YlIHWENqqMw"
            }
        },
        {
            "position_on_page": 19,
            "title": "The BEST Glasses For Your Face Shape | #Shorts | #Lenskart",
            "link": "https://www.youtube.com/watch?v=soNONkQsIj4",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=soNONkQsIj4",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "4 months ago",
            "views": 156051,
            "length": "0:16",
            "description": "Complete your look effortlessly with the ideal • • that perfectly suits your unique face shape ✨ Whether you have a round, square, ...",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/soNONkQsIj4/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBzgWAAoAKigIMCAAQARg8IEgocjAP&rs=AOn4CLD9RZFLCsULIkqiXUrFb-0Y2HqwxA",
                "rich": "https://i.ytimg.com/an_webp/soNONkQsIj4/mqdefault_6s.webp?du=3000&sqp=CI6Rr7wG&rs=AOn4CLDL2jwpLBhB4ml-DjdQZjcm8kGizg"
            }
        },
        {
            "position_on_page": 20,
            "title": "Introducing Lenskart Smart Glasses Collection | Phonic | #NewLaunch | #Lenskart",
            "link": "https://www.youtube.com/watch?v=0S5BUXHFaUQ",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=0S5BUXHFaUQ",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "10 days ago",
            "views": 9890,
            "length": "0:51",
            "description": "What if your glasses could help you work smarter, not harder? Welcome to the smart life! Introducing Phonic - the sleek, ...",
            "extensions": [
                "4K"
            ],
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/0S5BUXHFaUQ/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAOzrXY26OpgpCCRVJ0gXk-WLoHGw",
                "rich": "https://i.ytimg.com/an_webp/0S5BUXHFaUQ/mqdefault_6s.webp?du=3000&sqp=COCLr7wG&rs=AOn4CLAb3k7T8jjz-OI3VLbpleVmHh3QHQ"
            }
        },
        {
            "position_on_page": 21,
            "title": "FREE Ultrasonic Eyewear Cleaning | Lenskart Store | #Shorts | #Lenskart",
            "link": "https://www.youtube.com/watch?v=xGH7WmaHk1E",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=xGH7WmaHk1E",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "7 months ago",
            "views": 12596,
            "length": "0:39",
            "description": "Want your pre-owned glasses to look brand new? Well, we'll let you in on a little secret. Enter your nearest #LenskartStore and get ...",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/xGH7WmaHk1E/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBzgWAAoAKigIMCAAQARhlIFwoUzAP&rs=AOn4CLCTug0qXkVJwT_mrrv7HGS8Qy0y5A",
                "rich": "https://i.ytimg.com/an_webp/xGH7WmaHk1E/mqdefault_6s.webp?du=3000&sqp=CK6er7wG&rs=AOn4CLBc_VVbhBgNPZ5SoMTgJKzSZmrP2A"
            }
        },
        {
            "position_on_page": 22,
            "title": "Best Eyewear For Different Eye Shapes | Lenskart",
            "link": "https://www.youtube.com/watch?v=hBnhi_evVaw",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=hBnhi_evVaw",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "1 year ago",
            "views": 618025,
            "length": "0:18",
            "description": "Did you know? In the same way that there are different face shapes, there are also different eye shapes. And, we are here to ...",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/hBnhi_evVaw/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBtgiAAoAPigIMCAAQARhlIGUoZTAP&rs=AOn4CLCegFpVF46lNNxX-yY2E4qabjYKyw",
                "rich": "https://i.ytimg.com/an_webp/hBnhi_evVaw/mqdefault_6s.webp?du=3000&sqp=CMigr7wG&rs=AOn4CLC5I1ty6OvoMwskqOLrIqRyY1Q2SQ"
            }
        },
        {
            "position_on_page": 23,
            "title": "UNBREAKABLE Eyeglasses Are For Real | Lenskart Air Flex | #Shorts | #Lenskart",
            "link": "https://www.youtube.com/watch?v=nARf_FOGrHI",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=nARf_FOGrHI",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "4 months ago",
            "views": 13680,
            "length": "0:32",
            "description": "You can stretch it, you can twist it. But most importantly, you can end up sleeping on it & it still won't break! ✨ Airy light ✨ Super ...",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/nARf_FOGrHI/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBzgWAAoAKigIMCAAQARhlIFcoSjAP&rs=AOn4CLCfF0Huhq0TH_5NZii-wiWvfFSa2Q",
                "rich": "https://i.ytimg.com/an_webp/nARf_FOGrHI/mqdefault_6s.webp?du=3000&sqp=CJaEr7wG&rs=AOn4CLDOWILkNG4B5RtG-1sk8u0MGYRM2g"
            }
        },
        {
            "position_on_page": 24,
            "title": "The Cateye Charm | Unboxing the Glamourous Cateye 👓 | Lenskart",
            "link": "https://www.youtube.com/watch?v=rHSVisjdVCM",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=rHSVisjdVCM",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "2 years ago",
            "views": 29941,
            "length": "0:12",
            "description": "Cat-eyes will inject your look with a heavy dose of glam. Grab them and slay like an eye-con Grab them now: ...",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/rHSVisjdVCM/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBzgWAAoAKigIMCAAQARhaIFooWjAP&rs=AOn4CLAH--UQgj3iwDpYlpqDTbaLxi9UiQ"
            }
        }
    ],
    "shorts_results": [
        {
            "position_on_page": 3,
            "shorts": [
                {
                    "title": "The BEST Glasses For Your Face Shape | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/biNvZDA1qAM",
                    "thumbnail": "https://i.ytimg.com/vi/biNvZDA1qAM/frame0.jpg",
                    "views_original": "32K views",
                    "views": 32000,
                    "video_id": "biNvZDA1qAM"
                },
                {
                    "title": "How To Find The Perfect Sunglasses For Your Face Shape | #Lenskart",
                    "link": "https://www.youtube.com/shorts/Z-r2OAlf9jo",
                    "thumbnail": "https://i.ytimg.com/vi/Z-r2OAlf9jo/frame0.jpg",
                    "views_original": "2.2M views",
                    "views": 2200000,
                    "video_id": "Z-r2OAlf9jo"
                },
                {
                    "title": "Best Glasses For Four FACE SHAPE | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/QfT-9etxkEU",
                    "thumbnail": "https://i.ytimg.com/vi/QfT-9etxkEU/frame0.jpg",
                    "views_original": "299K views",
                    "views": 299000,
                    "video_id": "QfT-9etxkEU"
                },
                {
                    "title": "Unbreakable Eyeglasses | Lenskart Air Flex | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/bWO7zvozJJA",
                    "thumbnail": "https://i.ytimg.com/vi/bWO7zvozJJA/frame0.jpg",
                    "views_original": "40K views",
                    "views": 40000,
                    "video_id": "bWO7zvozJJA"
                },
                {
                    "title": "How Lenskart Beat Tata?",
                    "link": "https://www.youtube.com/shorts/r1Y60AZ1x0g",
                    "thumbnail": "https://i.ytimg.com/vi/r1Y60AZ1x0g/frame0.jpg",
                    "views_original": "3M views",
                    "views": 3000000,
                    "video_id": "r1Y60AZ1x0g"
                },
                {
                    "title": "Lenskart Founder Peyush Bansal on the Most Weird Pitch Ever!🤢 #shorts",
                    "link": "https://www.youtube.com/shorts/eSKHV8EnKbk",
                    "thumbnail": "https://i.ytimg.com/vi/eSKHV8EnKbk/frame0.jpg",
                    "views_original": "2.6M views",
                    "views": 2600000,
                    "video_id": "eSKHV8EnKbk"
                },
                {
                    "title": "Why so many people are talking about these glasses? | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/N7pcOW9kNTM",
                    "thumbnail": "https://i.ytimg.com/vi/N7pcOW9kNTM/frame0.jpg",
                    "views_original": "141K views",
                    "views": 141000,
                    "video_id": "N7pcOW9kNTM"
                },
                {
                    "title": "lenskart",
                    "link": "https://www.youtube.com/shorts/iK-yqmIYAI8",
                    "thumbnail": "https://i.ytimg.com/vi/iK-yqmIYAI8/frame0.jpg",
                    "views_original": "6.6M views",
                    "views": 6600000,
                    "video_id": "iK-yqmIYAI8"
                },
                {
                    "title": "REDUCE Eye Strain While Binge Watching | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/FnR6E3c_RBM",
                    "thumbnail": "https://i.ytimg.com/vi/FnR6E3c_RBM/frame0.jpg",
                    "views_original": "10K views",
                    "views": 10000,
                    "video_id": "FnR6E3c_RBM"
                },
                {
                    "title": "My New Specs 👓 from @lenskart ft.Clip On",
                    "link": "https://www.youtube.com/shorts/sMn4FHTATk4",
                    "thumbnail": "https://i.ytimg.com/vi/sMn4FHTATk4/frame0.jpg",
                    "views_original": "256K views",
                    "views": 256000,
                    "video_id": "sMn4FHTATk4"
                },
                {
                    "title": "LensKart Offer 😱 | LensKart 🤓Procedure | Arshi Saifi #arshisaifi #lenskart #ofer #shorts #lens",
                    "link": "https://www.youtube.com/shorts/g3-Y1tJnYGs",
                    "thumbnail": "https://i.ytimg.com/vi/g3-Y1tJnYGs/frame0.jpg",
                    "views_original": "1.3M views",
                    "views": 1300000,
                    "video_id": "g3-Y1tJnYGs"
                },
                {
                    "title": "Lenskart Air Switch || Lenskart glasses #lenskart  #lenskartreviews  #glasses #shorts #youtubeshorts",
                    "link": "https://www.youtube.com/shorts/FQi7Yp9Nopo",
                    "thumbnail": "https://i.ytimg.com/vi/FQi7Yp9Nopo/frame0.jpg",
                    "views_original": "132K views",
                    "views": 132000,
                    "video_id": "FQi7Yp9Nopo"
                },
                {
                    "title": "Piyush Bansal | Lenskart Business Case Study | Marketing | Startup",
                    "link": "https://www.youtube.com/shorts/hcnx9bpvogI",
                    "thumbnail": "https://i.ytimg.com/vi/hcnx9bpvogI/frame0.jpg",
                    "views_original": "26K views",
                    "views": 26000,
                    "video_id": "hcnx9bpvogI"
                },
                {
                    "title": "What is Chunky Pandey doing at Lenskart Store? | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/bbgdZgd9xb4",
                    "thumbnail": "https://i.ytimg.com/vi/bbgdZgd9xb4/frame0.jpg",
                    "views_original": "45K views",
                    "views": 45000,
                    "video_id": "bbgdZgd9xb4"
                },
                {
                    "title": "2022 New Pilot's Magnetic Polarized Lenses Magnetic Glasses #shorts",
                    "link": "https://www.youtube.com/shorts/y1xvIHePdsc",
                    "thumbnail": "https://i.ytimg.com/vi/y1xvIHePdsc/frame0.jpg",
                    "views_original": "821K views",
                    "views": 821000,
                    "video_id": "y1xvIHePdsc"
                },
                {
                    "title": "What's Your Screen Time????? | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/fTW7ClmdAko",
                    "thumbnail": "https://i.ytimg.com/vi/fTW7ClmdAko/frame0.jpg",
                    "views_original": "13K views",
                    "views": 13000,
                    "video_id": "fTW7ClmdAko"
                },
                {
                    "title": "I Buying Lenskart Blue Sunglasses #buying #tech #shorts",
                    "link": "https://www.youtube.com/shorts/yY2PrjWQyzc",
                    "thumbnail": "https://i.ytimg.com/vi/yY2PrjWQyzc/frame0.jpg",
                    "views_original": "138K views",
                    "views": 138000,
                    "video_id": "yY2PrjWQyzc"
                },
                {
                    "title": "Why You Need Powered Sunglasses | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/CGDFbdQCUis",
                    "thumbnail": "https://i.ytimg.com/vi/CGDFbdQCUis/frame0.jpg",
                    "views_original": "16K views",
                    "views": 16000,
                    "video_id": "CGDFbdQCUis"
                },
                {
                    "title": "Don’t Do This MISTAKE While Buying Glasses | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/9x5FVngHRpE",
                    "thumbnail": "https://i.ytimg.com/vi/9x5FVngHRpE/frame0.jpg",
                    "views_original": "15K views",
                    "views": 15000,
                    "video_id": "9x5FVngHRpE"
                },
                {
                    "title": "The Only CONTACT LENSES You Should Use | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/l6EHuUtsr6E",
                    "thumbnail": "https://i.ytimg.com/vi/l6EHuUtsr6E/frame0.jpg",
                    "views_original": "101K views",
                    "views": 101000,
                    "video_id": "l6EHuUtsr6E"
                },
                {
                    "title": "Stop Doing This To Avoid Headaches | Lenskart",
                    "link": "https://www.youtube.com/shorts/6jrJiLekRQs",
                    "thumbnail": "https://i.ytimg.com/vi/6jrJiLekRQs/frame0.jpg",
                    "views_original": "608K views",
                    "views": 608000,
                    "video_id": "6jrJiLekRQs"
                },
                {
                    "title": "Everything You Need to Know About Colored Contact Lenses | Lenskart",
                    "link": "https://www.youtube.com/shorts/XMhipMAyqCI",
                    "thumbnail": "https://i.ytimg.com/vi/XMhipMAyqCI/frame0.jpg",
                    "views_original": "10K views",
                    "views": 10000,
                    "video_id": "XMhipMAyqCI"
                },
                {
                    "title": "The Power Of Two In One | Lenskart Air Switch | Lenskart",
                    "link": "https://www.youtube.com/shorts/uqlbJQfsyh8",
                    "thumbnail": "https://i.ytimg.com/vi/uqlbJQfsyh8/frame0.jpg",
                    "views_original": "10M views",
                    "views": 10000000,
                    "video_id": "uqlbJQfsyh8"
                },
                {
                    "title": "#SPOTTED: Kapil Sharma Wearing Lenskart Air Switch | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/i_OA7Ps8ncY",
                    "thumbnail": "https://i.ytimg.com/vi/i_OA7Ps8ncY/frame0.jpg",
                    "views_original": "57K views",
                    "views": 57000,
                    "video_id": "i_OA7Ps8ncY"
                },
                {
                    "title": "Peyush Bansal Wearing THESE NEWLY LAUNCHED Lenskart Glasses | Lenskart Phonic | #SharkTank | #Shorts",
                    "link": "https://www.youtube.com/shorts/84hfRWMRraA",
                    "thumbnail": "https://i.ytimg.com/vi/84hfRWMRraA/frame0.jpg",
                    "views_original": "9.6K views",
                    "views": 9600,
                    "video_id": "84hfRWMRraA"
                },
                {
                    "title": "How To Find The Perfect Sunglasses For Your Face Shape | #Lenskart",
                    "link": "https://www.youtube.com/shorts/g4aetQg5XK0",
                    "thumbnail": "https://i.ytimg.com/vi/g4aetQg5XK0/frame0.jpg",
                    "views_original": "258K views",
                    "views": 258000,
                    "video_id": "g4aetQg5XK0"
                },
                {
                    "title": "Weekend Shopping Plans | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/kZ8itQCO96Q",
                    "thumbnail": "https://i.ytimg.com/vi/kZ8itQCO96Q/frame0.jpg",
                    "views_original": "14K views",
                    "views": 14000,
                    "video_id": "kZ8itQCO96Q"
                },
                {
                    "title": "Parmeet Sethi Ne Diya Archana Puran Singh Ko SHOCKING Surprise | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/RBO3OAE_KK8",
                    "thumbnail": "https://i.ytimg.com/vi/RBO3OAE_KK8/frame0.jpg",
                    "views_original": "1.9M views",
                    "views": 1900000,
                    "video_id": "RBO3OAE_KK8"
                },
                {
                    "title": "Comfortable and Cool Eyeglasses You Must Own | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/XwvY_-1W_Kg",
                    "thumbnail": "https://i.ytimg.com/vi/XwvY_-1W_Kg/frame0.jpg",
                    "views_original": "82K views",
                    "views": 82000,
                    "video_id": "XwvY_-1W_Kg"
                },
                {
                    "title": "Best Eyewear For Different Eye Shapes | Lenskart",
                    "link": "https://www.youtube.com/shorts/hBnhi_evVaw",
                    "thumbnail": "https://i.ytimg.com/vi/hBnhi_evVaw/frame0.jpg",
                    "views_original": "618K views",
                    "views": 618000,
                    "video_id": "hBnhi_evVaw"
                },
                {
                    "title": "DIE HARD HUSTLR FAN Met the OG Hustlr Peyush Bansal | Lenskart Store | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/4jlLh_u9A5Y",
                    "thumbnail": "https://i.ytimg.com/vi/4jlLh_u9A5Y/frame0.jpg",
                    "views_original": "18K views",
                    "views": 18000,
                    "video_id": "4jlLh_u9A5Y"
                },
                {
                    "title": "How To Choose Your Frame In 5 Easy Steps | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/NYyqOnaWNKo",
                    "thumbnail": "https://i.ytimg.com/vi/NYyqOnaWNKo/frame0.jpg",
                    "views_original": "1.3M views",
                    "views": 1300000,
                    "video_id": "NYyqOnaWNKo"
                },
                {
                    "title": "Find The Perfect Eyewear For Your Face Shape | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/qliIKIsS2hw",
                    "thumbnail": "https://i.ytimg.com/vi/qliIKIsS2hw/frame0.jpg",
                    "views_original": "446K views",
                    "views": 446000,
                    "video_id": "qliIKIsS2hw"
                },
                {
                    "title": "Introducing Lenskart Air Switch Grip | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/LdktgZcrKQ0",
                    "thumbnail": "https://i.ytimg.com/vi/LdktgZcrKQ0/frame0.jpg",
                    "views_original": "55K views",
                    "views": 55000,
                    "video_id": "LdktgZcrKQ0"
                },
                {
                    "title": "How To Keep Your Glasses From Sliding Off Your Nose | Lenskart",
                    "link": "https://www.youtube.com/shorts/bicLe8uXYyM",
                    "thumbnail": "https://i.ytimg.com/vi/bicLe8uXYyM/frame0.jpg",
                    "views_original": "499K views",
                    "views": 499000,
                    "video_id": "bicLe8uXYyM"
                },
                {
                    "title": "How Blue Light Eyeglasses Work | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/d_iztYVYRnU",
                    "thumbnail": "https://i.ytimg.com/vi/d_iztYVYRnU/frame0.jpg",
                    "views_original": "406K views",
                    "views": 406000,
                    "video_id": "d_iztYVYRnU"
                },
                {
                    "title": "Get Eyes Tested From The Comfort Of Your Home | Lenskart At Home | Lenskart",
                    "link": "https://www.youtube.com/shorts/57TU577-s68",
                    "thumbnail": "https://i.ytimg.com/vi/57TU577-s68/frame0.jpg",
                    "views_original": "984K views",
                    "views": 984000,
                    "video_id": "57TU577-s68"
                },
                {
                    "title": "The Cateye Charm | Unboxing the Glamourous Cateye 👓 | Lenskart",
                    "link": "https://www.youtube.com/shorts/rHSVisjdVCM",
                    "thumbnail": "https://i.ytimg.com/vi/rHSVisjdVCM/frame0.jpg",
                    "views_original": "29K views",
                    "views": 29000,
                    "video_id": "rHSVisjdVCM"
                },
                {
                    "title": "What are the TOP STYLISH GLASSES for 2025 | Eyewear Trends 2025 | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/ah8IFBxe44U",
                    "thumbnail": "https://i.ytimg.com/vi/ah8IFBxe44U/frame0.jpg",
                    "views_original": "1.6K views",
                    "views": 1600,
                    "video_id": "ah8IFBxe44U"
                },
                {
                    "title": "NEW HUSTLR Color | As Seen On Peyush Bansal | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/5_p9wEC6m20",
                    "thumbnail": "https://i.ytimg.com/vi/5_p9wEC6m20/frame0.jpg",
                    "views_original": "176K views",
                    "views": 176000,
                    "video_id": "5_p9wEC6m20"
                }
            ]
        },
        {
            "position_on_page": 6,
            "shorts": [
                {
                    "title": "Lenskart Founder Peyush Bansal on the Most Weird Pitch Ever!🤢 #shorts",
                    "link": "https://www.youtube.com/shorts/eSKHV8EnKbk",
                    "thumbnail": "https://i.ytimg.com/vi/eSKHV8EnKbk/frame0.jpg",
                    "views_original": "2.6M views",
                    "views": 2600000,
                    "video_id": "eSKHV8EnKbk"
                },
                {
                    "title": "Why so many people are talking about these glasses? | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/N7pcOW9kNTM",
                    "thumbnail": "https://i.ytimg.com/vi/N7pcOW9kNTM/frame0.jpg",
                    "views_original": "141K views",
                    "views": 141000,
                    "video_id": "N7pcOW9kNTM"
                },
                {
                    "title": "lenskart",
                    "link": "https://www.youtube.com/shorts/iK-yqmIYAI8",
                    "thumbnail": "https://i.ytimg.com/vi/iK-yqmIYAI8/frame0.jpg",
                    "views_original": "6.6M views",
                    "views": 6600000,
                    "video_id": "iK-yqmIYAI8"
                },
                {
                    "title": "REDUCE Eye Strain While Binge Watching | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/FnR6E3c_RBM",
                    "thumbnail": "https://i.ytimg.com/vi/FnR6E3c_RBM/frame0.jpg",
                    "views_original": "10K views",
                    "views": 10000,
                    "video_id": "FnR6E3c_RBM"
                },
                {
                    "title": "My New Specs 👓 from @lenskart ft.Clip On",
                    "link": "https://www.youtube.com/shorts/sMn4FHTATk4",
                    "thumbnail": "https://i.ytimg.com/vi/sMn4FHTATk4/frame0.jpg",
                    "views_original": "256K views",
                    "views": 256000,
                    "video_id": "sMn4FHTATk4"
                },
                {
                    "title": "LensKart Offer 😱 | LensKart 🤓Procedure | Arshi Saifi #arshisaifi #lenskart #ofer #shorts #lens",
                    "link": "https://www.youtube.com/shorts/g3-Y1tJnYGs",
                    "thumbnail": "https://i.ytimg.com/vi/g3-Y1tJnYGs/frame0.jpg",
                    "views_original": "1.3M views",
                    "views": 1300000,
                    "video_id": "g3-Y1tJnYGs"
                },
                {
                    "title": "Lenskart Air Switch || Lenskart glasses #lenskart  #lenskartreviews  #glasses #shorts #youtubeshorts",
                    "link": "https://www.youtube.com/shorts/FQi7Yp9Nopo",
                    "thumbnail": "https://i.ytimg.com/vi/FQi7Yp9Nopo/frame0.jpg",
                    "views_original": "132K views",
                    "views": 132000,
                    "video_id": "FQi7Yp9Nopo"
                },
                {
                    "title": "Piyush Bansal | Lenskart Business Case Study | Marketing | Startup",
                    "link": "https://www.youtube.com/shorts/hcnx9bpvogI",
                    "thumbnail": "https://i.ytimg.com/vi/hcnx9bpvogI/frame0.jpg",
                    "views_original": "26K views",
                    "views": 26000,
                    "video_id": "hcnx9bpvogI"
                },
                {
                    "title": "What is Chunky Pandey doing at Lenskart Store? | #Shorts | #Lenskart",
                    "link": "https://www.youtube.com/shorts/bbgdZgd9xb4",
                    "thumbnail": "https://i.ytimg.com/vi/bbgdZgd9xb4/frame0.jpg",
                    "views_original": "45K views",
                    "views": 45000,
                    "video_id": "bbgdZgd9xb4"
                },
                {
                    "title": "2022 New Pilot's Magnetic Polarized Lenses Magnetic Glasses #shorts",
                    "link": "https://www.youtube.com/shorts/y1xvIHePdsc",
                    "thumbnail": "https://i.ytimg.com/vi/y1xvIHePdsc/frame0.jpg",
                    "views_original": "821K views",
                    "views": 821000,
                    "video_id": "y1xvIHePdsc"
                }
            ]
        }
    ],
    "channels_new_to_you": [
        {
            "position_on_page": 11,
            "title": "Naam Batate Batate Lenskart Se Order Aa Jaayega | Meet Iyer | Javed Jaffrey",
            "link": "https://www.youtube.com/watch?v=Zyk0GcXKS1s",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=Zyk0GcXKS1s",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "3 weeks ago",
            "views": 152751,
            "length": "1:15",
            "description": "\"Main hoon Iyer… Ramakrishnan… Shrinivasan… Venkatesh… Subramanian…\" Just like the name, our offers are loooong ...",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/Zyk0GcXKS1s/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB4qTjz2E9RkHl4LFqbnKoHdrxaZg",
                "rich": "https://i.ytimg.com/an_webp/Zyk0GcXKS1s/mqdefault_6s.webp?du=3000&sqp=COSbr7wG&rs=AOn4CLADCqTYtayI099KZqkp8anK717zow"
            }
        },
        {
            "position_on_page": 12,
            "title": "LENSKART eyeglasses unboxing || lenskart blue filter glasses in budget 800 INR review and quality",
            "link": "https://www.youtube.com/watch?v=UQ5iRnpiF7I",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=UQ5iRnpiF7I",
            "channel": {
                "name": "GYANI CHASMA BABA",
                "link": "https://www.youtube.com/@GYANICHASMABABA",
                "thumbnail": "https://yt3.ggpht.com/ytc/AIdro_mNuLYpSbXWOGmEA5a595kZHNh8897BX4du4W7e3mgdToM=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "1 month ago",
            "views": 4317,
            "length": "6:51",
            "description": "Hello guys we have ordered a glasses from lenskart and this video is all about unboxing glasses from lenskart. This video is all ...",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/UQ5iRnpiF7I/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC0mXpQ3mp4hIa4ca6EjnOuys0SRg",
                "rich": "https://i.ytimg.com/an_webp/UQ5iRnpiF7I/mqdefault_6s.webp?du=3000&sqp=CL74rrwG&rs=AOn4CLCSOyn1RBGi5KOvg3hpE_PCdFOlpA"
            }
        },
        {
            "position_on_page": "hidden",
            "title": "Everything You Need To Know About Shopping at Lenskart | Lenskart 101 Guide",
            "link": "https://www.youtube.com/watch?v=F9eew5lp7lg",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=F9eew5lp7lg",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "4 months ago",
            "views": 3530,
            "length": "1:09",
            "description": "Think shopping at Lenskart is just about buying glasses? Think again! We offer amazing services to meet all your eyewear needs.",
            "extensions": [
                "4K"
            ],
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/F9eew5lp7lg/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCVP3c-IKDIF-oNNTUIc-k7hFS9ng",
                "rich": "https://i.ytimg.com/an_webp/F9eew5lp7lg/mqdefault_6s.webp?du=3000&sqp=CJC0r7wG&rs=AOn4CLAxIHSmd5iDxpeOuVb9e9w98fzOzA"
            }
        },
        {
            "position_on_page": "hidden",
            "title": "Smart Glasses with Calling, ChatGPT, Siri, Google Assistant, Music,etc | Lenskart Phonic Review",
            "link": "https://www.youtube.com/watch?v=ee0k5WSS7dw",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=ee0k5WSS7dw",
            "channel": {
                "name": "Digidoty",
                "link": "https://www.youtube.com/@Digidoty",
                "thumbnail": "https://yt3.ggpht.com/2u92TK0kYTzZtFN9c5sc6daxXJEBwr-OVQ_AqBCv31La5hdVh62Q-DcbhN18i-ljcrx7W50kyoY=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "5 days ago",
            "views": 5338,
            "length": "6:11",
            "description": "Smart Glasses with Calling, ChatGPT, Siri, Google Assistant, Music,etc | Lenskart Phonic Review In this video we have reviewed ...",
            "extensions": [
                "New",
                "4K"
            ],
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/ee0k5WSS7dw/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCAu3KlnbHqnl37ENBGBrrrEqfsTw",
                "rich": "https://i.ytimg.com/an_webp/ee0k5WSS7dw/mqdefault_6s.webp?du=3000&sqp=CIyTr7wG&rs=AOn4CLBS32hWrVK6ypE2kopeiJgDLR4w5g"
            }
        },
        {
            "position_on_page": "hidden",
            "title": "Top 5 Yourspex & Lenskart Eyeglasses Review | Stylish and High-Quality Specs",
            "link": "https://www.youtube.com/watch?v=hXG35dFiJ28",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=hXG35dFiJ28",
            "channel": {
                "name": "The Shivaay",
                "link": "https://www.youtube.com/@TheShivaayVlogs",
                "thumbnail": "https://yt3.ggpht.com/14E6HMgTnOwkTE9hFLGz5-vkQBM6vUxOnAhCbvVa_mebBesRM2U56NnOj3_9uZat8G3WH7GmJg=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "5 months ago",
            "views": 11593,
            "length": "7:04",
            "description": "Wishlink post Url wishlink.com/vikalpshrivas/post/549555 All Product Urls Gradient Brown Rimless Rectangle Sunglass for Men ...",
            "extensions": [
                "4K"
            ],
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/hXG35dFiJ28/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB7CDt_aRbrHiLKoabaCvuOo9tvTw",
                "rich": "https://i.ytimg.com/an_webp/hXG35dFiJ28/mqdefault_6s.webp?du=3000&sqp=CI6rr7wG&rs=AOn4CLCeAMKlIbM82ece2XIhBZzFaDevZw"
            }
        },
        {
            "position_on_page": "hidden",
            "title": "How To Maintain Glasses? | Tips to Clean Your Glasses | #Lenskart",
            "link": "https://www.youtube.com/watch?v=kJ6TWF63iVU",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=kJ6TWF63iVU",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "5 months ago",
            "views": 18072,
            "length": "1:16",
            "description": "Do you find yourself struggling with smudged or dirty glasses, even after wiping them with a cloth? Give your #eyeglasses the care ...",
            "extensions": [
                "4K"
            ],
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/kJ6TWF63iVU/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAIvJVaKAHBJzgEfwgvJsBHOICRzQ",
                "rich": "https://i.ytimg.com/an_webp/kJ6TWF63iVU/mqdefault_6s.webp?du=3000&sqp=COjrrrwG&rs=AOn4CLAgG6ZbjWkuwHEoeyXamO6JzBxKjw"
            }
        },
        {
            "position_on_page": "hidden",
            "title": "#NewLaunch : Harry Potter Inspired Eyewear Collection | #Lenskart",
            "link": "https://www.youtube.com/watch?v=wImMSYG48yQ",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=wImMSYG48yQ",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "5 months ago",
            "views": 138746,
            "length": "1:05",
            "description": "Introducing the new Harry Potter-inspired collection for all the Potterheads out there. Wizards, wands and the wonders of ...",
            "extensions": [
                "4K"
            ],
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/wImMSYG48yQ/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBUW6_0PXavaRNMT9W9TcsO_C8_UQ",
                "rich": "https://i.ytimg.com/an_webp/wImMSYG48yQ/mqdefault_6s.webp?du=3000&sqp=CKy3r7wG&rs=AOn4CLCeOiPWh1AIMZjCtM3YBuqgPbQqRg"
            }
        },
        {
            "position_on_page": "hidden",
            "title": "3 Things You Should Know BEFORE Ordering From Lenskart",
            "link": "https://www.youtube.com/watch?v=40ZejIUH5ac",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=40ZejIUH5ac",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "2 months ago",
            "views": 1464,
            "length": "1:33",
            "description": "At #Lenskart, we're all about making your #shopping experience the best it can be! To make sure you get the most out of your ...",
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/40ZejIUH5ac/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDWfff9Lk3OuxsVIDhnIjdLA-kINw",
                "rich": "https://i.ytimg.com/an_webp/40ZejIUH5ac/mqdefault_6s.webp?du=3000&sqp=CPqhr7wG&rs=AOn4CLBeD_CO5rGfSwiOIZgCmX0GfaM0RA"
            }
        },
        {
            "position_on_page": "hidden",
            "title": "Why Raghu Lost His Anger | Lenskart Next Day Delivery",
            "link": "https://www.youtube.com/watch?v=5ib-flCJ1aU",
            "serpapi_link": "https://serpapi.com/search.json?engine=youtube_video&v=5ib-flCJ1aU",
            "channel": {
                "name": "Lenskart",
                "link": "https://www.youtube.com/@lenskart",
                "verified": true,
                "thumbnail": "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj"
            },
            "published_date": "1 month ago",
            "views": 58907,
            "length": "1:16",
            "description": "Remember the guy who could make anyone's temper rise? Well, this time, #RaghuRam is all chill—thanks to Lenskart's Next Day ...",
            "extensions": [
                "4K"
            ],
            "thumbnail": {
                "static": "https://i.ytimg.com/vi/5ib-flCJ1aU/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCKi-cBWdgwgTYTGpDeX3bpefntdA",
                "rich": "https://i.ytimg.com/an_webp/5ib-flCJ1aU/mqdefault_6s.webp?du=3000&sqp=CJiJr7wG&rs=AOn4CLCDk0hwj3Odz9QTrtwvRjrAomI6nQ"
            }
        }
    ]
}

export const demoYt = ( req, res ) => {
    res.send( json );
}