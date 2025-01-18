import { getJson } from "serpapi";
import axios from "axios";

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

        // makeLangFlowApiCall(results).then((response) => {
        //     return res.json(response);
        // }).catch((error) => {
        //     console.error("Error processing LangFlow API call:", error.message);
        //     return res.status(500).json({ error: error.message });
        // });

        return res.json(results);

    } catch (error) {
        console.error("Error fetching Play Store data:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

async function makeLangFlowApiCall(inputValue) {

    const url =
        "https://api.langflow.astra.datastax.com/lf/95a48fd4-e2ec-4849-a8d3-979fcdec7e2e/api/v1/run/5f06d66c-f32e-4d8b-a1ac-06232ed8721c";

    const apiKey = process.env.LANGFLOW_API_KEY;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        params: {
            stream: false,
        },
    };

    const payload = {
        input_value: inputValue,
        output_type: "chat",
        input_type: "chat",
    };

    try {
        const response = await axios.post(url, payload, config);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(
                `API error: ${error.response.status} - ${error.response.data}`
            );
        } else if (error.request) {
            throw new Error("No response received from the server");
        } else {
            throw new Error(`Request failed: ${error.message}`);
        }
    }
}

export { reportData };
