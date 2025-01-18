const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateReport(data) {
    const prompt = `
        You are a powerful AI designed to analyze large datasets and extract actionable insights. Using the provided data, generate a detailed report in **strict JSON format**. 

        Your task is to focus on the following key areas:

        ### 1. Comprehensive Research Automation:
        - Analyze content from blogs, forums, social media, app reviews, and YouTube videos included in the data.
        - Extract recurring **trends**, identify **user pain points**, and propose **effective solutions**.
        - Dive into competitor ads and uncover their **best-performing strategies**, such as high-converting hooks, compelling CTAs, and engaging content formats.

        ### 2. Actionable Insights Generation:
        - Highlight the most significant **triggers** and user problems derived from the data.
        - Provide a curated list of **best-performing hooks**, **CTAs**, and **tailored solutions** to help create user-centric, high-converting ads.

        ### 3. Reference Dashboard:
        - Include **direct links** to resources like YouTube videos, competitor ads, or blogs for easy validation and inspiration.
        - Offer a summary of key insights visualized in graphs, word clouds, or sentiment trends. For sentiment trends, summarize the overall user sentiment (e.g., "positive", "neutral", "negative").

        ### 4. YouTube Video Analysis:
        - For each YouTube video, include a detailed analysis:
            - **Title**: Provide the title of the video.
            - **Description**: Summarize what the video is about.
            - **Key Performance Factors**: Explain why this video stands out (e.g., hooks, visual appeal, pacing, content relevance) and why it has more views compared to others in the dataset.

        Ensure your response strictly adheres to the JSON structure below:
        {
            "comprehensiveResearch": {
                "trends": ["List of identified trends"],
                "painPoints": ["List of user pain points"],
                "solutions": ["List of effective solutions"],
                "competitorStrategies": [
                    {
                        "strategy": "Description of a high-performing strategy",
                        "details": "Additional insights or details about this strategy"
                    }
                ]
            },
            "actionableInsights": {
                "triggers": ["List of identified triggers"],
                "hooks": ["List of best-performing hooks"],
                "CTAs": ["List of effective CTAs"],
                "solutions": ["List of actionable solutions tailored to the audience"]
            },
            "referenceDashboard": {
                "links": ["List of direct URLs to sources"],
                "insightSummary": "Description of visual insights, including trends, word clouds, or sentiment analysis"
            },
            "youtubeVideos": [
                {
                    "title": "Title of the video",
                    "description": "Summary of the video's content",
                    "keyPerformanceFactors": "Explanation of why this video performs well, including specific elements of title descprition etc that contribute to its success"
                }
            ]
        }

        Use the data provided below to fill in the JSON structure. The JSON output must be concise, informative, and free of extraneous text or formatting errors. 

        Data: ${JSON.stringify(data)}

        JSON Report:
    `;

    try {
        const response = await openai.createCompletion({
            model: "gpt-4",
            prompt: prompt,
            max_tokens: 3000,
            temperature: 0.7,
        });

        return JSON.parse(response.data.choices[0].text.trim());
    } catch (error) {
        console.error("Error generating report:", error);
        throw error;
    }
}

module.exports = generateReport;
