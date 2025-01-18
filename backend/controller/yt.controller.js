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

        const limitedVideoResults = results.video_results?.slice(0, 10) || [];

        const limitedShortsResults =
            results.shorts_results?.map((shortEntry) => ({
                ...shortEntry,
                shorts: shortEntry.shorts?.slice(0, 10),
            })) || [];

        res.status(200).json({
            success: true,
            video_results: limitedVideoResults,
            shorts_results: limitedShortsResults,
        });
    } catch (error) {
        console.error("Error fetching YouTube results:", error.message);
        res.status(500).json({ error: error.message });
    }
}

const json = {
    success: true,
    video_results: [
        {
            position_on_page: 1,
            title: "3 Services That Are FREE At The Lenskart Store | #Lenskart",
            link: "https://www.youtube.com/watch?v=jOvPHe-JiV0",
            serpapi_link:
                "https://serpapi.com/search.json?engine=youtube_video&v=jOvPHe-JiV0",
            channel: {
                name: "Lenskart",
                link: "https://www.youtube.com/@lenskart",
                verified: true,
                thumbnail:
                    "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj",
            },
            published_date: "1 year ago",
            views: 622567,
            length: "1:58",
            description:
                "If you haven't visited a Lenskart store yet, you're in for a treat! We've got not one, not two, but three fantastic services that you can...",
            extensions: ["4K"],
            thumbnail: {
                static: "https://i.ytimg.com/vi/jOvPHe-JiV0/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBJkIPaUJSBTl5L8JdPD9urflJn4g",
                rich: "https://i.ytimg.com/an_webp/jOvPHe-JiV0/mqdefault_6s.webp?du=3000&sqp=CLOor7wG&rs=AOn4CLBfnZyNMzROrFDc0JG25oigY-Bf3Q",
            },
        },
        {
            position_on_page: 2,
            title: "Unbreakable Glasses For Kids | Lenskart Hooper",
            link: "https://www.youtube.com/watch?v=iidyzXZfeGk",
            serpapi_link:
                "https://serpapi.com/search.json?engine=youtube_video&v=iidyzXZfeGk",
            channel: {
                name: "Lenskart",
                link: "https://www.youtube.com/@lenskart",
                verified: true,
                thumbnail:
                    "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj",
            },
            published_date: "4 months ago",
            views: 21993,
            length: "0:20",
            description:
                "Chashma tootne ke darr ko bolo Goodbye with our Unbreakable Frames for Kids! Stretch them. Bend them. Twist them.",
            thumbnail: {
                static: "https://i.ytimg.com/vi/iidyzXZfeGk/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCPU7OV899gQSbz08tpmztXsWYPYw",
                rich: "https://i.ytimg.com/an_webp/iidyzXZfeGk/mqdefault_6s.webp?du=3000&sqp=CPabr7wG&rs=AOn4CLAXdgN5tRSGdEpL_6BoPW_s310rNA",
            },
        },
        {
            position_on_page: 4,
            title: "How Blue Light Eyeglasses Work | #Shorts | #Lenskart",
            link: "https://www.youtube.com/watch?v=d_iztYVYRnU",
            serpapi_link:
                "https://serpapi.com/search.json?engine=youtube_video&v=d_iztYVYRnU",
            channel: {
                name: "Lenskart",
                link: "https://www.youtube.com/@lenskart",
                verified: true,
                thumbnail:
                    "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj",
            },
            published_date: "1 year ago",
            views: 406297,
            length: "0:25",
            description:
                "Curious about how the Blue light #eyeglasses work? Well, watch on to know everything about it and all the reasons that make ...",
            thumbnail: {
                static: "https://i.ytimg.com/vi/d_iztYVYRnU/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBtgiAAoAPigIMCAAQARhlIF4oTTAP&rs=AOn4CLDCeBRUwiY18ozo11vbsklU8DlKCw",
                rich: "https://i.ytimg.com/an_webp/d_iztYVYRnU/mqdefault_6s.webp?du=3000&sqp=COisr7wG&rs=AOn4CLCtr0smgA2oPHsKWrXBhgYooLyxVg",
            },
        },
        {
            position_on_page: 5,
            title: "Peyush Bansal Talks About The Eyewear Innovation At Lenskart | #Shorts | #Lenskart",
            link: "https://www.youtube.com/watch?v=XOm9cRLFNUw",
            serpapi_link:
                "https://serpapi.com/search.json?engine=youtube_video&v=XOm9cRLFNUw",
            channel: {
                name: "Lenskart",
                link: "https://www.youtube.com/@lenskart",
                verified: true,
                thumbnail:
                    "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj",
            },
            published_date: "1 year ago",
            views: 16759433,
            length: "0:29",
            description:
                "The all time favourite magnetic clip-ons that go from eye to sun in a snap, have a cool new addition. Sliding rubber retainers that ...",
            extensions: ["4K"],
            thumbnail: {
                static: "https://i.ytimg.com/vi/XOm9cRLFNUw/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBtgiAAoAPigIMCAAQARhyIFIoOTAP&rs=AOn4CLAXsH3TLRfUWFaMpYdEirgsSJ098w",
                rich: "https://i.ytimg.com/an_webp/XOm9cRLFNUw/mqdefault_6s.webp?du=3000&sqp=CJSFr7wG&rs=AOn4CLAhEWFeAjmOLHOxwIpaVMAvFDm7zw",
            },
        },
        {
            position_on_page: 7,
            title: "How To Find The Perfect Sunglasses For Your Face Shape | #Lenskart",
            link: "https://www.youtube.com/watch?v=g4aetQg5XK0",
            serpapi_link:
                "https://serpapi.com/search.json?engine=youtube_video&v=g4aetQg5XK0",
            channel: {
                name: "Lenskart",
                link: "https://www.youtube.com/@lenskart",
                verified: true,
                thumbnail:
                    "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj",
            },
            published_date: "1 year ago",
            views: 258400,
            length: "0:17",
            description:
                "Stylish #eyewear according to face shape! Watch on to learn how to choose the eyewear that complements your #faceshape the ...",
            thumbnail: {
                static: "https://i.ytimg.com/vi/g4aetQg5XK0/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBtgiAAoAPigIMCAAQARhlIFAoRDAP&rs=AOn4CLCWgoEMffnLPm4BamelJDogKgs7qw",
                rich: "https://i.ytimg.com/an_webp/g4aetQg5XK0/mqdefault_6s.webp?du=3000&sqp=CKedr7wG&rs=AOn4CLD5uHFI6dK2npYub7BDmlR1Slf6WQ",
            },
        },
        {
            position_on_page: 8,
            title: "Comfortable and Cool Eyeglasses You Must Own | #Shorts | #Lenskart",
            link: "https://www.youtube.com/watch?v=XwvY_-1W_Kg",
            serpapi_link:
                "https://serpapi.com/search.json?engine=youtube_video&v=XwvY_-1W_Kg",
            channel: {
                name: "Lenskart",
                link: "https://www.youtube.com/@lenskart",
                verified: true,
                thumbnail:
                    "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj",
            },
            published_date: "9 months ago",
            views: 82356,
            length: "0:16",
            description:
                "We've all swooned over Peyush Bansal's iconic look with these Hustlr glasses, but have you checked out the new Jade Green ...",
            thumbnail: {
                static: "https://i.ytimg.com/vi/XwvY_-1W_Kg/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBtgiAAoAPigIMCAAQARhlIE0oSzAP&rs=AOn4CLA7YqzxY0BNUgQSAvHoM8urSqTR9w",
                rich: "https://i.ytimg.com/an_webp/XwvY_-1W_Kg/mqdefault_6s.webp?du=3000&sqp=COinr7wG&rs=AOn4CLBN7oIAmpditek5hdmCPSb0ygMbww",
            },
        },
        {
            position_on_page: 9,
            title: "Is Lenskart the Best Powered Sunglasses Brand for You?",
            link: "https://www.youtube.com/watch?v=xVvkGlowNNI",
            serpapi_link:
                "https://serpapi.com/search.json?engine=youtube_video&v=xVvkGlowNNI",
            channel: {
                name: "Mr Kholu",
                link: "https://www.youtube.com/@MrKholu",
                thumbnail:
                    "https://yt3.ggpht.com/IH0B10NF1m1AQDcdg348cgyNvWybhzWwEsFddfRNfeSY64SUKyW5OpWFYP4cljk3OrOtulOfyw=s68-c-k-c0x00ffffff-no-rj",
            },
            published_date: "2 days ago",
            views: 256,
            length: "4:56",
            description:
                "Chalo kholte hai ---------------------------------------------------------------- Hello Dosto Me Aapka Anuj . About this video : Chaliye is Video ...",
            extensions: ["New"],
            thumbnail: {
                static: "https://i.ytimg.com/vi/xVvkGlowNNI/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCc-bWld8N6la7G9yay32QcHmm85A",
                rich: "https://i.ytimg.com/an_webp/xVvkGlowNNI/mqdefault_6s.webp?du=3000&sqp=CJj1rrwG&rs=AOn4CLC1t6zXCyviWxztI6t0-6XVisCD7w",
            },
        },
        {
            position_on_page: 10,
            title: "Lenskart Order Status (UHD)",
            link: "https://www.youtube.com/watch?v=MR-ZnDoZx1A",
            serpapi_link:
                "https://serpapi.com/search.json?engine=youtube_video&v=MR-ZnDoZx1A",
            channel: {
                name: "Lenskart",
                link: "https://www.youtube.com/@lenskart",
                verified: true,
                thumbnail:
                    "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj",
            },
            published_date: "4 years ago",
            views: 128146,
            length: "2:25",
            thumbnail: {
                static: "https://i.ytimg.com/vi/MR-ZnDoZx1A/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgBtgiAAoAPigIMCAAQARhHIEsoWTAP&rs=AOn4CLBAAhJgMzhH70aG1yGfb5UA-4RIag",
                rich: "https://i.ytimg.com/an_webp/MR-ZnDoZx1A/mqdefault_6s.webp?du=3000&sqp=CKD1rrwG&rs=AOn4CLCVxzpr0OXoHsyiKXBvxInRERsyaw",
            },
        },
        {
            position_on_page: 13,
            title: "Find The Perfect Eyewear For Your Face Shape | #Shorts | #Lenskart",
            link: "https://www.youtube.com/watch?v=qliIKIsS2hw",
            serpapi_link:
                "https://serpapi.com/search.json?engine=youtube_video&v=qliIKIsS2hw",
            channel: {
                name: "Lenskart",
                link: "https://www.youtube.com/@lenskart",
                verified: true,
                thumbnail:
                    "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj",
            },
            published_date: "1 year ago",
            views: 446084,
            length: "0:16",
            description:
                "Unveiling the Perfect Pair! Complete your look effortlessly with the ideal • • that perfectly suits your unique face shape ...",
            thumbnail: {
                static: "https://i.ytimg.com/vi/qliIKIsS2hw/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBtgiAAoAPigIMCAAQARg8IEgocjAP&rs=AOn4CLA6ypoM_9qkpR8Br8XLR1azL4dNFQ",
                rich: "https://i.ytimg.com/an_webp/qliIKIsS2hw/mqdefault_6s.webp?du=3000&sqp=CIicr7wG&rs=AOn4CLCRzsMfMonN9tSdSZMsWO19XS7jMQ",
            },
        },
        {
            position_on_page: 14,
            title: "2 Pairs at the Price of Just 1 | Buy Now! Lenskart Buy 1 Get 1 Offer",
            link: "https://www.youtube.com/watch?v=raRtEx0F5yM",
            serpapi_link:
                "https://serpapi.com/search.json?engine=youtube_video&v=raRtEx0F5yM",
            channel: {
                name: "Lenskart",
                link: "https://www.youtube.com/@lenskart",
                verified: true,
                thumbnail:
                    "https://yt3.ggpht.com/m6_wlYQtnPaaVjpF3Y9vls6aS0VpUnUDhy6SEM-Xx90jDY0cCthuqGDXz3H7NhW1QeR5ngcMqw=s68-c-k-c0x00ffffff-no-rj",
            },
            published_date: "2 weeks ago",
            views: 9920,
            length: "1:03",
            description:
                "Unlock all the exciting offers with Lenskart Gold Membership: ✔️ Double the joy with Buy 1, Get 1! ✔️ You're the VIP with First ...",
            thumbnail: {
                static: "https://i.ytimg.com/vi/raRtEx0F5yM/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA3NsJrgLt-M8td-amoIuXCjIxAyQ",
                rich: "https://i.ytimg.com/an_webp/raRtEx0F5yM/mqdefault_6s.webp?du=3000&sqp=CMG0r7wG&rs=AOn4CLDTs4Xh2DD7xpNBlfUS96CQ31Db3w",
            },
        },
    ],
    shorts_results: [
        {
            position_on_page: 3,
            shorts: [
                {
                    title: "The BEST Glasses For Your Face Shape | #Shorts | #Lenskart",
                    link: "https://www.youtube.com/shorts/biNvZDA1qAM",
                    thumbnail: "https://i.ytimg.com/vi/biNvZDA1qAM/frame0.jpg",
                    views_original: "32K views",
                    views: 32000,
                    video_id: "biNvZDA1qAM",
                },
                {
                    title: "How To Find The Perfect Sunglasses For Your Face Shape | #Lenskart",
                    link: "https://www.youtube.com/shorts/Z-r2OAlf9jo",
                    thumbnail: "https://i.ytimg.com/vi/Z-r2OAlf9jo/frame0.jpg",
                    views_original: "2.2M views",
                    views: 2200000,
                    video_id: "Z-r2OAlf9jo",
                },
                {
                    title: "Best Glasses For Four FACE SHAPE | #Shorts | #Lenskart",
                    link: "https://www.youtube.com/shorts/QfT-9etxkEU",
                    thumbnail: "https://i.ytimg.com/vi/QfT-9etxkEU/frame0.jpg",
                    views_original: "299K views",
                    views: 299000,
                    video_id: "QfT-9etxkEU",
                },
                {
                    title: "Unbreakable Eyeglasses | Lenskart Air Flex | #Shorts | #Lenskart",
                    link: "https://www.youtube.com/shorts/bWO7zvozJJA",
                    thumbnail: "https://i.ytimg.com/vi/bWO7zvozJJA/frame0.jpg",
                    views_original: "40K views",
                    views: 40000,
                    video_id: "bWO7zvozJJA",
                },
                {
                    title: "How Lenskart Beat Tata?",
                    link: "https://www.youtube.com/shorts/r1Y60AZ1x0g",
                    thumbnail: "https://i.ytimg.com/vi/r1Y60AZ1x0g/frame0.jpg",
                    views_original: "3M views",
                    views: 3000000,
                    video_id: "r1Y60AZ1x0g",
                },
                {
                    title: "Lenskart Founder Peyush Bansal on the Most Weird Pitch Ever!🤢 #shorts",
                    link: "https://www.youtube.com/shorts/eSKHV8EnKbk",
                    thumbnail: "https://i.ytimg.com/vi/eSKHV8EnKbk/frame0.jpg",
                    views_original: "2.6M views",
                    views: 2600000,
                    video_id: "eSKHV8EnKbk",
                },
                {
                    title: "Why so many people are talking about these glasses? | #Shorts | #Lenskart",
                    link: "https://www.youtube.com/shorts/N7pcOW9kNTM",
                    thumbnail: "https://i.ytimg.com/vi/N7pcOW9kNTM/frame0.jpg",
                    views_original: "141K views",
                    views: 141000,
                    video_id: "N7pcOW9kNTM",
                },
                {
                    title: "lenskart",
                    link: "https://www.youtube.com/shorts/iK-yqmIYAI8",
                    thumbnail: "https://i.ytimg.com/vi/iK-yqmIYAI8/frame0.jpg",
                    views_original: "6.6M views",
                    views: 6600000,
                    video_id: "iK-yqmIYAI8",
                },
                {
                    title: "REDUCE Eye Strain While Binge Watching | #Shorts | #Lenskart",
                    link: "https://www.youtube.com/shorts/FnR6E3c_RBM",
                    thumbnail: "https://i.ytimg.com/vi/FnR6E3c_RBM/frame0.jpg",
                    views_original: "10K views",
                    views: 10000,
                    video_id: "FnR6E3c_RBM",
                },
                {
                    title: "My New Specs 👓 from @lenskart ft.Clip On",
                    link: "https://www.youtube.com/shorts/sMn4FHTATk4",
                    thumbnail: "https://i.ytimg.com/vi/sMn4FHTATk4/frame0.jpg",
                    views_original: "256K views",
                    views: 256000,
                    video_id: "sMn4FHTATk4",
                },
            ],
        },
        {
            position_on_page: 6,
            shorts: [
                {
                    title: "Lenskart Founder Peyush Bansal on the Most Weird Pitch Ever!🤢 #shorts",
                    link: "https://www.youtube.com/shorts/eSKHV8EnKbk",
                    thumbnail: "https://i.ytimg.com/vi/eSKHV8EnKbk/frame0.jpg",
                    views_original: "2.6M views",
                    views: 2600000,
                    video_id: "eSKHV8EnKbk",
                },
                {
                    title: "Why so many people are talking about these glasses? | #Shorts | #Lenskart",
                    link: "https://www.youtube.com/shorts/N7pcOW9kNTM",
                    thumbnail: "https://i.ytimg.com/vi/N7pcOW9kNTM/frame0.jpg",
                    views_original: "141K views",
                    views: 141000,
                    video_id: "N7pcOW9kNTM",
                },
                {
                    title: "lenskart",
                    link: "https://www.youtube.com/shorts/iK-yqmIYAI8",
                    thumbnail: "https://i.ytimg.com/vi/iK-yqmIYAI8/frame0.jpg",
                    views_original: "6.6M views",
                    views: 6600000,
                    video_id: "iK-yqmIYAI8",
                },
                {
                    title: "REDUCE Eye Strain While Binge Watching | #Shorts | #Lenskart",
                    link: "https://www.youtube.com/shorts/FnR6E3c_RBM",
                    thumbnail: "https://i.ytimg.com/vi/FnR6E3c_RBM/frame0.jpg",
                    views_original: "10K views",
                    views: 10000,
                    video_id: "FnR6E3c_RBM",
                },
                {
                    title: "My New Specs 👓 from @lenskart ft.Clip On",
                    link: "https://www.youtube.com/shorts/sMn4FHTATk4",
                    thumbnail: "https://i.ytimg.com/vi/sMn4FHTATk4/frame0.jpg",
                    views_original: "256K views",
                    views: 256000,
                    video_id: "sMn4FHTATk4",
                },
                {
                    title: "LensKart Offer 😱 | LensKart 🤓Procedure | Arshi Saifi #arshisaifi #lenskart #ofer #shorts #lens",
                    link: "https://www.youtube.com/shorts/g3-Y1tJnYGs",
                    thumbnail: "https://i.ytimg.com/vi/g3-Y1tJnYGs/frame0.jpg",
                    views_original: "1.3M views",
                    views: 1300000,
                    video_id: "g3-Y1tJnYGs",
                },
                {
                    title: "Lenskart Air Switch || Lenskart glasses #lenskart  #lenskartreviews  #glasses #shorts #youtubeshorts",
                    link: "https://www.youtube.com/shorts/FQi7Yp9Nopo",
                    thumbnail: "https://i.ytimg.com/vi/FQi7Yp9Nopo/frame0.jpg",
                    views_original: "132K views",
                    views: 132000,
                    video_id: "FQi7Yp9Nopo",
                },
                {
                    title: "Piyush Bansal | Lenskart Business Case Study | Marketing | Startup",
                    link: "https://www.youtube.com/shorts/hcnx9bpvogI",
                    thumbnail: "https://i.ytimg.com/vi/hcnx9bpvogI/frame0.jpg",
                    views_original: "26K views",
                    views: 26000,
                    video_id: "hcnx9bpvogI",
                },
                {
                    title: "What is Chunky Pandey doing at Lenskart Store? | #Shorts | #Lenskart",
                    link: "https://www.youtube.com/shorts/bbgdZgd9xb4",
                    thumbnail: "https://i.ytimg.com/vi/bbgdZgd9xb4/frame0.jpg",
                    views_original: "45K views",
                    views: 45000,
                    video_id: "bbgdZgd9xb4",
                },
                {
                    title: "2022 New Pilot's Magnetic Polarized Lenses Magnetic Glasses #shorts",
                    link: "https://www.youtube.com/shorts/y1xvIHePdsc",
                    thumbnail: "https://i.ytimg.com/vi/y1xvIHePdsc/frame0.jpg",
                    views_original: "821K views",
                    views: 821000,
                    video_id: "y1xvIHePdsc",
                },
            ],
        },
    ],
};

export const demoYt = (req, res) => {
    res.send(json);
};
