import { getJson } from "serpapi";

const fetchPlayStoreData = async (req, res) => {
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
        const limitedItems = items.slice(0, 5);

        for (const item of limitedItems) {
            if (item.product_id) {
                console.log("Processing Product ID:", item.product_id);
                promises.push(
                    fetchReviews(item.product_id)
                        .then((reviewJson) => {
                            results.push({
                                product: item,
                                reviews: reviewJson.reviews,
                            });
                        })
                        .catch((error) => {
                            console.error(
                                `Error fetching reviews for ${item.product_id}:`,
                                error.message
                            );
                            // Still add the product even if reviews fail
                            results.push({
                                product: item,
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

        return res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching Play Store data:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

export { fetchPlayStoreData };