import { getJson } from "serpapi";
import axios from "axios";
import generateReport from "../utils/prompt.js";

const reportData = async (req, res) => {
    try {
        const apiKey = process.env.SERPAPI_KEY;
        const { query, numProducts = 1, numReviews = 5 } = req.body;

        if (!apiKey) {
            return res.status(500).json({ error: "API key is required" });
        }

        if (!query) {
            return res.status(400).json({ error: "Search query is required" });
        }

        // Fetch product details
        const searchProducts = () => {
            return new Promise((resolve, reject) => {
                getJson(
                    {
                        engine: "google_play",
                        api_key: apiKey,
                        q: query,
                        store: "apps",
                        num: numProducts,
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
        };

        // Fetch reviews for a single product
        const fetchReviews = (productId) => {
            let rating = Math.floor(Math.random() * 3) + 1;
            return new Promise((resolve, reject) => {
                getJson(
                    {
                        engine: "google_play_product",
                        api_key: apiKey,
                        product_id: productId,
                        store: "apps",
                        all_reviews: "true",
                        num: numReviews,
                        rating: rating,
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
        };

        const json = await searchProducts();

        if (!json["organic_results"]?.length) {
            return res.status(404).json({
                error: "No products found for the query.",
            });
        }

        const results = [];
        const promises = [];

        // Process only the first 5 items
        const items = json["organic_results"][0]?.items || [];
        const limitedItems = items.slice(0, 1);

        for (const item of limitedItems) {
            if (item.product_id) {
                console.log("Processing Product ID:", item.product_id);
                promises.push(
                    fetchReviews(item.product_id)
                        .then((reviewJson) => {
                            const filteredReviews = reviewJson.reviews?.map(
                                (review) => ({
                                    rating: review.rating,
                                    snippet: review.snippet,
                                    likes: review.likes,
                                })
                            );
                            results.push({
                                play_store_review: filteredReviews,
                            });
                        })
                        .catch((error) => {
                            console.error(
                                `Error fetching reviews for ${item.product_id}:`,
                                error.message
                            );
                            // Still add the product even if reviews fail
                            results.push({
                                reviews: null,
                            });
                        })
                );
            }
        }

        // Wait for all review fetches to complete
        await Promise.all(promises);

        // Sort results to maintain original order
        results.sort((a, b) => {
            const aIndex = limitedItems.findIndex(
                (item) => item.product_id === a.product.product_id
            );
            const bIndex = limitedItems.findIndex(
                (item) => item.product_id === b.product.product_id
            );
            return aIndex - bIndex;
        });

        const videoResults = await new Promise((resolve, reject) => {
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

        const limitedVideoResults =
            videoResults.video_results?.slice(0, 10) || [];

        const filteredVideoResults = limitedVideoResults.map((video) => ({
            position_on_page: video.position_on_page,
            title: video.title,
            views: video.views,
            description: video.description,
            length: video.length,
        }));

        results.push({
            youtube_video: filteredVideoResults,
        });

        // reddit comments
        const reditUrl = process.env.REDDIT_URL;
        const redditResults = await axios.get(`${reditUrl}/hot-posts?subreddit=${query}`);

        results.push({
            reddit_comments: redditResults.data,
        });

        console.log(JSON.stringify(results, null, 2));
        generateReport(results).then((response) => {
            return res.json(response);
        }).catch((error) => {
            console.error("Error oprn API call:", error.message);
            return res.status(500).json({ error: error.message });
        });

    } catch (error) {
        console.error("Error fetching Play Store data:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

const demoReport = (req, res) => {
    const json = {
        "comprehensiveResearch": {
            "trends": [
                "Multiple Grammarly applications confusing users",
                "Misleading 'free to download' claims",
                "Grammar errors in the app itself",
                "Issues with refund process"
            ],
            "painPoints": [
                "Confusion about app variant features",
                "Perceived lack of transparency about pricing",
                "Dysfunctional keyboard",
                "Unresolved technical issues"
            ],
            "solutions": [
                "Communicate clear differences between app variants",
                "Make pricing structure transparent",
                "Improve keyboard functionality",
                "Enhance customer service for refund requests"
            ],
            "competitorStrategies": [
                {
                    "strategy": "Promoting unique features",
                    "details": "Competitors highlight unique features like rephrasing of sentences and synonym options to attract users"
                }
            ]
        },
        "actionableInsights": {
            "triggers": [
                "Limited free checks",
                "Complex refund process",
                "Confusing multiple app versions"
            ],
            "hooks": [
                "Offering unique features",
                "Clear communication about app features",
                "Transparent pricing"
            ],
            "CTAs": [
                "Upgrade to premium",
                "Try unique features",
                "Download the app"
            ],
            "solutions": [
                "Increase number of free checks",
                "Simplify refund process",
                "Clarify differences between app versions"
            ]
        },
        "referenceDashboard": {
            "links": [
                "https://youtu.be/wk-JR6vEf04",
                "https://support.grammarly.com/hc/en-us/requests/new#/account-help/115000089911"
            ],
            "insightSummary": "Reviews and comments indicate user dissatisfaction with the app due to perceived lack of transparency, functionality issues, and confusing multiple versions",
            "graphData": {
                "ratingDistribution": {
                    "1-star": 100,
                    "2-star": 0,
                    "3-star": 0,
                    "4-star": 0,
                    "5-star": 0
                },
                "averageLikesPerReview": 65,
                "videoMetrics": {
                    "totalViews": 895909,
                    "averageViewsPerVideo": 89591,
                    "mostPopularVideo": "Grammarly Review: Is it worth it, and what you NEED to know!"
                }
            }
        },
        "youtubeVideos": [
            {
                "title": "Grammarly Premium: Is It Worth It?",
                "description": "Grammarly is an AI-powered writing assistant that goes beyond basic grammar and spelling checks.",
                "views": 11008,
                "length": "4:57",
                "keyPerformanceFactors": "Video offers a deep dive into Grammarly Premium offerings, which is a key interest area for potential and existing users"
            },
            {
                "title": "How to add Grammarly to Microsoft Word",
                "description": "Grammarly is a writing assistant that helps you eliminate grammar and spelling errors in your written communication.",
                "views": 341644,
                "length": "2:39",
                "keyPerformanceFactors": "The video provides practical help on a common use case, making it highly relevant to users"
            },
            {
                "title": "How to Use Grammarly on iPhone - Setup & Install",
                "description": "How to use Grammarly on iPhone - how to add Grammarly to iPhone keyboards and then use Grammarly in various apps.",
                "views": 45111,
                "length": "4:40",
                "keyPerformanceFactors": "Video targets iPhone users specifically, offering tailored guidance for this demographic"
            },
            {
                "title": "How to Use Grammarly - New 2024 Update",
                "description": "Grammarly is a free, AI-powered writing assistant and you can use it across all your favorite apps. It's used by over 30 million.",
                "views": 26851,
                "length": "11:31",
                "keyPerformanceFactors": "Video is up-to-date with the latest app version, ensuring the content remains relevant"
            },
            {
                "title": "6 Best and Unique Alternatives To Grammarly",
                "description": "Related Videos 4 Best Free Grammar Checker Tools you need to know - https://youtu.be/wk-JR6vEf04 5 Best and Epic Premium.",
                "views": 1271,
                "length": "6:41",
                "keyPerformanceFactors": "Video provides alternatives to Grammarly, which can be useful for understanding competitor strategies and user preferences"
            }
        ]
    }

    res.send(json);

}

export { reportData , demoReport };
