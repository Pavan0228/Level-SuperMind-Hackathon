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

export const demoPlayStoreData = (req, res) => {
    const data = [
        {
            "product": {
                "title": "Grammar Check by AI Writing",
                "link": "https://play.google.com/store/apps/details?id=ai.metaverselabs.grammargpt",
                "product_id": "ai.metaverselabs.grammargpt",
                "serpapi_link": "https://serpapi.com/search.json?engine=google_play_product&gl=us&hl=en&platform=phone&product_id=ai.metaverselabs.grammargpt&sort_by=1&store=apps",
                "rating": 4.4,
                "author": "Metaverse Labs",
                "category": "Education",
                "downloads": "1,000,000+",
                "thumbnail": "https://play-lh.googleusercontent.com/Ot2Rs05YwQ5gA-kUr6UcID-sc97VkWFTvR37TK4M4kpdhqTBo6J_3c_dH9_iBrVeNZw=s64-rw",
                "feature_image": "https://play-lh.googleusercontent.com/kHgiV9PYAAzBnFEA-cfEoHAC5COovDr_cddu7-0kinJa3gPE2V95h_BlWWQqeOU6X1A=w416-h235-rw",
                "description": "Enhance your writing skills with the assistance of Grammar Check by AI Writing, a comprehensive grammar, spelling, and paraphrasing tool, all built on AI. This app will aid you in all your writing tasks.\n\nGrammar Check by AI Writing is the ultimate writing assistant application, utilizing cutting-edge technology to elevate your writing proficiency. With our latest features, including a Dictionary, you can now refine your English within a single app seamlessly.\n\nImagine you have a sentence that needs refinement; you start with Grammar Check. Copy the corrected version generated by AI and utilize the Paraphrase feature to find the best choice. Furthermore, you can use our Dictionary to enhance your understanding of unfamiliar words.\n\nExperience instant results through an intuitive interface, making it effortless to correct English grammar and rectify errors, rephrase paragraphs in various tones, and compose professional emails.\n\nWhy this app is outstanding in the market?\n\n✅ Real-time grammar check and auto-correction: Say goodbye to red squiggly lines, as our app automatically detects and rectifies grammar and spelling mistakes in real-time, allowing you to focus on expressing yourself effectively.\n\n✅ Grammar Explanation: Following the grammar check, a detailed description of your mistakes is provided, enabling you to thoroughly understand and learn from your errors for the future.\n\n✅ Dictionary: Deepen your understanding of English words with our comprehensive dictionary, which includes word types, IPA, and examples to help you master each word.\n\n✅ Enhanced Input Options: In addition to traditional typing, our app offers the convenience of text scanning through your camera or inserting pictures. Furthermore, you can even use your voice for text input.\n\n✅ Word Relations: This feature is designed to enrich your text by suggesting alternative words and expressions, enhancing the quality of your writing with a variety of vocabulary options.\n\n✅ Tone Transformation: Easily adjust the tone of your writing to suit any situation. Whether you need your essay to sound professional or wish to write a casual email to a friend, it's easily accomplished.\n\n✅ Email Composition: Whether you're sending a crucial work email or catching up with friends, Grammar Check by AI Writing has you covered. Our AI can craft emails aligning with your objectives, ensuring your messages are clear, concise, and error-free. You can have confidence in the professionalism and effectiveness of your emails.\n\nWhether you're a student, professional, or simply aiming to enhance your writing skills, this app is the perfect writing assistant to help you achieve your goals. With real-time grammar checks and corrections, you can be confident that your writing is both clear and effective.\n\n\nPrivacy Policy: https://metaverselabs.ai/privacy-policy/\nTerms of use: https://metaverselabs.ai/terms-of-use/\nYou are welcome to contact us at support@metaverselabs.ai"
            },
            "reviews": [
                {
                    "id": "41fd811a-b74e-409f-8fa2-2aad70b6a549",
                    "title": "Marcus Kilpatrick",
                    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjV42fKMHbfb7xeZV9aWk8UUbILYVI2tBvQK-Lb2U41yAg6K6p0o",
                    "rating": 3,
                    "snippet": "As a person who's used this app for years, even back in high school, I have to say this is actually pretty terrible now. For starters half times I don't get things right and correct things where it doesn't need to be corrected. Unless the word is an actual thing, it also doesn't include that either. Furthermore, I can't even have a little pop-up thing on my phone or computer so I can correct myself if that was removed. That's terrible. Unless these are fixed three stars",
                    "likes": 15,
                    "date": "October 31, 2024",
                    "iso_date": "2024-10-31T12:45:07Z"
                },
                {
                    "id": "f203586c-cb3b-4d3f-90c9-b21a3a1e3c0a",
                    "title": "M S",
                    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjVuH3K8wY4MYGBs5wOQEi_2caNmoyucadM1ZcSfx3NtWnSUNwvfjQ",
                    "rating": 3,
                    "snippet": "How do I tell your AI to stop talking to me directly when using the 'expand' or 'shorten' feature? I'm just trying to get a message expanded, not have a conversation with it. If this issue is resolved, the app would be perfect. Sometimes the message may sound like I'm complaining and seeking help, but it suggests options as if trying to be a therapist instead of expanding my message. Please fix this.",
                    "likes": 89,
                    "date": "November 07, 2024",
                    "iso_date": "2024-11-07T10:09:23Z",
                    "response": {
                        "title": "Metaverse Labs",
                        "snippet": "We're truly sorry for any trouble you've encountered. Your feedback is vital to making the app better! To help us resolve your concerns quickly, please reach out to our support team at support@metaverselabs.ai We are dedicated to help you out.",
                        "date": "November 11, 2024",
                        "iso_date": "2024-11-11T10:36:44Z"
                    }
                },
                {
                    "id": "4109e8c8-e523-45b3-8247-954b489b9960",
                    "title": "Vilincia Patrick",
                    "avatar": "https://play-lh.googleusercontent.com/a/ACg8ocJVPi2O3OgR1dPrnmGgYA-5_jSMjxmBmPggc1Lji4UI4HAD5A=mo",
                    "rating": 3,
                    "snippet": "I upgraded. It worked and then it stopped the next day. This app is not worth using. But if you want something good for only a day, this is your app. I uninstalled it. And I do not see the support email address or link. I emailed support. I'm not sure how long it will keep working after my free tries and I upgrade.",
                    "likes": 15,
                    "date": "April 15, 2024",
                    "iso_date": "2024-04-15T22:14:57Z",
                    "response": {
                        "title": "Metaverse Labs",
                        "snippet": "Hello, did your problem get resolved? If not, we are here to help you! Please do let us know at support@metaverselabs.ai.",
                        "date": "February 28, 2024",
                        "iso_date": "2024-02-28T10:50:51Z"
                    }
                },
                {
                    "id": "04269917-dce2-4de0-a57f-ac2f16503af7",
                    "title": "Yua Frost",
                    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjWEy0MZKABuS0KlpE_fTuOhz_lfRXyDMQUcSFgrZZc4NqFDh8Pl",
                    "rating": 3,
                    "snippet": "This app is by far one of the best grammatical correcting and sentence construction apps I've ever seen. I was a bit skeptical at first, but after trying it out, I was pleased to find it lived up to the reviews. Although, what disappoints me is the inability to continuously use the app, for after you use up your free tries, you either have to pay for a subscription or flatline trash the app, since it becomes unusable after your free tries are up. I wish there were options to keep using it.",
                    "likes": 14,
                    "date": "October 29, 2024",
                    "iso_date": "2024-10-29T09:52:56Z"
                },
                {
                    "id": "64e99317-b6a6-468b-acc5-305eadda821d",
                    "title": "Muthu samy",
                    "avatar": "https://play-lh.googleusercontent.com/a/ACg8ocKDbGsQl8IZKfH4WxlT4zFHXhAn5hLSPFHwirqtBhwbg8MZAQ=mo",
                    "rating": 3,
                    "snippet": "I have started using it from today. It is known that its use will not go away. Let's simplify it a bit and let's see how it works in the coming days And it comes with a lot of ads before using it which makes it frustrating to use",
                    "likes": 0,
                    "date": "November 01, 2024",
                    "iso_date": "2024-11-01T15:22:46Z"
                }
            ]
        },
        {
            "product": {
                "title": "AI Grammar Checker for English",
                "link": "https://play.google.com/store/apps/details?id=com.hellotalk.aigrammar",
                "product_id": "com.hellotalk.aigrammar",
                "serpapi_link": "https://serpapi.com/search.json?engine=google_play_product&gl=us&hl=en&platform=phone&product_id=com.hellotalk.aigrammar&sort_by=1&store=apps",
                "rating": 3.5,
                "author": "HelloTalk Limited",
                "category": "Productivity",
                "downloads": "1,000,000+",
                "thumbnail": "https://play-lh.googleusercontent.com/dC62ePTyBsjZf9wbNm0dCoysFY9OCAKEFf7FyOjmKf-nPdLddq0Wo8nbZRoBem8SP58=s64-rw",
                "feature_image": "https://play-lh.googleusercontent.com/EBXHKPwaaSQKJZjk2iY_NVXAi2r0LSD5CLrqidBFZ2mDk7KysehqclwECAZjKiHZ6X4-=w416-h235-rw",
                "description": "AI Grammar Checker for English\n- Check your grammar and spelling errors at any time.\n \nWhether writing academic English papers, proofreading workplace emails, hashing out business, or social writing, AI Grammar Checker could help you by correcting grammatical errors in real-time and make sure your message is clear and mistake-free.\n\nMain Features:\n\nEnglish Grammar Auto-correct\nWhether misspelled words, inaccurate phrases, wrong verb tenses, subject-predicate inconsistencies, or punctuation, AI Grammar Checker can efficiently and accurately correct different kinds of spelling and grammatical errors for you.\n \nMassive Real Error Correction Data\nAI Grammar Checker is based on thousands of error correction data from real people on HelloTalk. Corrections are more genuine and accurate, as if there were a native speaker online at any time to help you check your English grammar. Every modification is in line with the way native speakers talk, which could make your English more authentic!\n\nOCR Text Scanner\nAI Grammar has a built-in OCR camera function, which can accurately identify text in a picture, without having to manually input it, and automatically correct any grammar mistakes.\n\nDetailed Analysis Provided\nAI Grammar Checker will record each grammatical error and compare the original content with the corrected content to help you better understand the grammatical errors you often make. Thoughtful error correction tips to help you notice your grammar weaknesses and avoid repeating mistakes.\nWhat’s more, if you want to see the analysis from other grammar websites or Google search, you can search directly inside the application.\n \nPerfect Your Writing and Listening\nAI Grammar Checker also supports text reading. The proofread content matches authentic pronunciation, which allows you to cultivate a better feel for the language while remembering the correct English grammar.\n\nWord Translation\nYou can get the translation and pronunciation of words with just one click. At present, word translation supports translation in 109 languages including Chinese, Japanese, Korean, and so on. With automatic grammar correction, there won't be any obstacles to you improving your English.\n\nHere are some real reviews on Google Play:\n@Maggie Yung: It's a good app, helps me to improve my English writing.\n@deepa Subramanian: Awesome. It's so easy and will help us become more confident in what we write. It is very useful for formal chats and writing formal letters.\n\nUtilize AI Grammar Checker to improve your writing, so that grammar is no longer an obstacle when expressing yourself in English!\n\nIf you have any comments or suggestions please email us: aigrammar@hellotalk.com\n* Learn more: https://www.aigrammar.com\n* Privacy Policy: https://www.aigrammar.net/privacy-policy\n* Terms of Service: https://www.aigrammar.net/terms-of-service"
            },
            "reviews": [
                {
                    "id": "1e224dca-3df7-4501-abe4-75eb4a5de904",
                    "title": "Sultan Sallaj",
                    "avatar": "https://play-lh.googleusercontent.com/a/ACg8ocLcp_wC5tOTyCfUv-U3dxrk5miLLTW7qtWBkxWkoF1wre3e1g=mo",
                    "rating": 2,
                    "snippet": "The Ui is not intuitive at all. I tried other lower rated apps that did a better job. I can't figure out how to spot check, so in the free trial I lose out on all 3 free proof checks, because of the non-intuitive nature. For example, I had 5 things wrong, and it tells me why I'm wrong, but there's no way to skip, it's either apply all fixes or continue editing. If there were less apps available, I'd give this a better rating, but right now it's poor due to the better competition.",
                    "likes": 381,
                    "date": "June 07, 2021",
                    "iso_date": "2021-06-07T21:27:48Z",
                    "response": {
                        "title": "HelloTalk Limited",
                        "snippet": "We are very sorry that AI Grammar has not met your expectations. We’d love to know more details on how we can make your experience with us better. Please send an email to aigrammar@hellotalk.com and elaborate more so we can assist you. Thanks for helping us improve!",
                        "date": "June 08, 2021",
                        "iso_date": "2021-06-08T11:29:33Z"
                    }
                },
                {
                    "id": "4ca40217-b157-45e4-a82f-85cb2fc1fdd5",
                    "title": "Florante Nalica",
                    "avatar": "https://play-lh.googleusercontent.com/a/ACg8ocKIWUkOfZvVpLN3BookpNlp4Etmg61b9yx4tvako-HekwYi6g=mo",
                    "rating": 2,
                    "snippet": "I watch 30 sec ads just to have 1 reward to correct my grammar. Now this apps increase the 30 secs ads to 1 minute ads. No longer data friendly.. that's why I decide to stop using it and explore other grammar corrections apps.",
                    "likes": 3,
                    "date": "November 28, 2024",
                    "iso_date": "2024-11-28T12:28:38Z"
                },
                {
                    "id": "d8ccf7cf-e3c6-42a4-aca3-dc9200d5430c",
                    "title": "Liz Bridges",
                    "avatar": "https://play-lh.googleusercontent.com/a/ACg8ocLWnvArGk07cyw5CGXV3fM29B_wHwH0QrrAVnWY_Ipl0q89Xg=mo",
                    "rating": 2,
                    "snippet": "I intentionally used words incorrectly to see how well the app worked. For example, I typed \"I was wondering how your doing. I hope your okay.\". It only picked up the incorrect word your (should obviously be you're) in the second sentence.",
                    "likes": 24,
                    "date": "October 30, 2021",
                    "iso_date": "2021-10-30T15:10:26Z",
                    "response": {
                        "title": "HelloTalk Limited",
                        "snippet": "We are very sorry that AI Grammar Checker has not met your expectations. Could you please let us know more details about your concern? Please send an email to aigrammar@hellotalk.com and elaborate more so we can assist you. Thanks for helping us improve!",
                        "date": "November 01, 2021",
                        "iso_date": "2021-11-01T04:33:58Z"
                    }
                },
                {
                    "id": "a3f4d8cc-6e27-4845-8bad-4b1796dcf882",
                    "title": "sonam yuden",
                    "avatar": "https://play-lh.googleusercontent.com/a/ACg8ocKkyKsYEBQyrRZMyyk-Tp_qIpWWocm6nFbyljH0WE4HIuqrPA=mo",
                    "rating": 2,
                    "snippet": "Ughhh!!! I have never been this angry in my life. I downloaded this app to see how accurate it is but it was an awful experience. I had this app check my poem and it was written from a girl's pov and the app corrected it saying instead of her it should be he. Not only that, I have written it using past tense, lol changed my had to has... Need to improve.",
                    "likes": 99,
                    "date": "October 11, 2022",
                    "iso_date": "2022-10-11T16:11:58Z",
                    "response": {
                        "title": "HelloTalk Limited",
                        "snippet": "Thank you very much for your support! AI Grammar's error correction results are based on big data of the HelloTalk community. Each error correction in HelloTalk will help us continue to improve the data. AI Grammar will continue to make progress everyday！",
                        "date": "October 12, 2022",
                        "iso_date": "2022-10-12T06:15:32Z"
                    }
                },
                {
                    "id": "e9bbfd39-ca70-4a03-bb27-fe93a24c7186",
                    "title": "Azwiin Mikael",
                    "avatar": "https://play-lh.googleusercontent.com/a/ACg8ocIlKJkvlNFOYLOsfDLUULzeujx1ghiQOkTD8BULCt64LWeQWFA=mo",
                    "rating": 2,
                    "snippet": "The corrections were atrocious. Even if your sentence is correct, it will say incorrect and the corrections were your sentence as it were. It also replace the word unnecessarily. Like the word free is replaced with feed. What?",
                    "likes": 3,
                    "date": "January 08, 2023",
                    "iso_date": "2023-01-08T09:24:21Z",
                    "response": {
                        "title": "HelloTalk Limited",
                        "snippet": "We are very sorry that AI Grammar has not met your expectations. We can get this fixed as soon as possible. Please contact us at aigrammar@hellotalk.com and include screenshots detailing the specifics of this issue and we'll reply to you as soon as possible regarding further support. Thanks for your patience and support!",
                        "date": "January 08, 2023",
                        "iso_date": "2023-01-08T10:37:57Z"
                    }
                }
            ]
        },
        {
            "product": {
                "title": "Grammar Check AI, Spell: Fixy",
                "link": "https://play.google.com/store/apps/details?id=com.neogpt.english.grammar",
                "product_id": "com.neogpt.english.grammar",
                "serpapi_link": "https://serpapi.com/search.json?engine=google_play_product&gl=us&hl=en&platform=phone&product_id=com.neogpt.english.grammar&sort_by=1&store=apps",
                "rating": 4.3,
                "author": "Matlub AI Apps",
                "category": "Productivity",
                "downloads": "500,000+",
                "thumbnail": "https://play-lh.googleusercontent.com/J7HxK_ujy8fmcpnYO8iYNv8IKgCXR1tvlu30G7N1AlnbZ0aFpfSpa4HqEtt1ulna40AL=s64-rw",
                "feature_image": "https://play-lh.googleusercontent.com/qD-KCLOOvK0jBgDMbgaih7Wnad0uKrAd_FxAaupPro0YQr-hCpoVdvu9oG3CdRJvxc_d=w416-h235-rw",
                "description": "Transform your text with Fixy: AI Grammar Check, Spell, your expert tool for impeccable grammar and spell check accuracy. Whether you're looking to paraphrase content for uniqueness, swiftly rephrase sentences to enhance clarity, or harness the precision of an AI checker, Fixy has you covered. \n\nOur proofreader meticulously polishes each word, while the sentence corrector ensures your prose meets the highest standards. Designed for everyone from students to professionals, the app's AI grammar capabilities support proofreading and editing needs, making it the ultimate companion for flawless communication in any context.\n\nExcellence in Grammar Check, writing corrector, and Spell Check\nHow App Works:\n\nOur app performs a grammar check on each word and monitors for spelling, punctuation, and style errors. You can enhance your communication effortlessly and confidently using our comprehensive AI grammar checker, sentence corrector, and spell check tools.\n\nComprehensive writing corrector On-the-Go:\n\nNo matter the setting—be it professional emails, vibrant social media updates, or casual texting—the product's grammar check, sentence corrector and spelling tools are at your fingertips. The spell check feature ensures error-free text, while our paraphrase tool helps diversify your expressions. Our AI-driven features provide real-time corrections and suggestions, empowering you to write with precision and flair.\n\nPower of AI to Elevate Your Writing Corrector:\n\nWith advanced AI technology, the app offers more than just corrections. Our innovative rewrite feature suggests multiple ways to rephrase your sentences, making them more descriptive, confident, or formal based on your needs. The AI sentence checker, grammar check, and sentence corrector alongside our proofreader service, elevates your writing by ensuring every submission is polished to perfection.\n\nKey Features Include:\n\nGrammar and Check Spelling: Maintain flawless grammar and spelling in every context with the product's rigorous grammar check.\nAdvanced Punctuation Correction: Master punctuation without second-guessing.\nVocabulary Enhancements and Synonyms: Discover better word choices as you type and grammar check.\nAI-Powered Rewriting: Transform your text with alternatives that elevate your message through our paraphrase and rephrase capabilities.\nParaphrase: Boost your writing confidence with a paraphrase tool! It helps you diversify your expressions and provides real-time paraphrase feedback, enabling you to craft impactful prose.\nSpell Check: Never miss a typo again! Our built-in spell checker catches errors as you write, ensuring your work is polished and professional.\nProofreader: Our proofreading tool meticulously scans your writing for errors in grammar, punctuation, and even awkward phrasing, delivering a polished final draft. Proofreader also helps your sentence correct tasks.\n\nDevelop Your Skills with Every Word:\n\nEach correction by our proofreader comes with a concise explanation, helping you understand and learn from your mistakes. Our sentence corrector and proofreader not only fix errors but also improve sentence structure and flow.\n\nUpgrade Your Experience with Premium:\n\nFor those seeking to take their writing to the next level, Premium offers advanced suggestions on tone adjustments, vocabulary enhancement, style refinement, proofreader, and much more. Unlock the full potential of your communication with Premium.\n\nPrivacy and Trust at the Core:\n\nYour privacy is paramount. Fixy respects your data and ensures confidentiality and security in every interaction."
            },
            "reviews": [
                {
                    "id": "8e1fcc7b-8cd7-42d7-8fa3-37e4ff2e7c58",
                    "title": "Dank",
                    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjU1LrRELlFcMX8zF4g2zT8REue9q0TdVq3F9qDWhWXLshpE2aTN",
                    "rating": 1,
                    "snippet": "First of all, many of the reviews use incorrect grammar. Red flag. Secondly, The interface itself has grammatical errors and capitalization errors! Lastly, this app caused my app checker (LibreAV) to alert me. It told me that this was a risky app. That's very rare for me to come across. Uninstalling immediately. Are you saying that this application cannot produce a grammatically correct English interface? If that's the case, please remove it from the American version of Google Play. Spyware 😈",
                    "likes": 102,
                    "date": "November 14, 2023",
                    "iso_date": "2023-11-14T00:15:49Z",
                    "response": {
                        "title": "Matlub AI Apps",
                        "snippet": "Hello. The interface is automatically translated into many languages and we do not check unless there is a significant issue. Google can access our codes and already scans before giving approval to applications, meaning the application you mentioned is unfortunately deceiving you. Thank you.",
                        "date": "November 08, 2023",
                        "iso_date": "2023-11-08T22:10:40Z"
                    }
                },
                {
                    "id": "3da4e11f-211e-4028-9cd8-b69794c22b4f",
                    "title": "Munchkin",
                    "avatar": "https://play-lh.googleusercontent.com/a/ACg8ocIYy32i304EK4HuWsmx0QeNwhoB4hPzy9NbQzVQF_4ImfF13A=mo",
                    "rating": 1,
                    "snippet": "My app will not work today. Restarted my phone. I cleared the cache. Nothing is working tried it multiple times. Yes, I have the paid version.",
                    "likes": 1,
                    "date": "December 12, 2024",
                    "iso_date": "2024-12-12T00:39:35Z",
                    "response": {
                        "title": "Matlub AI Apps",
                        "snippet": "Hello, can you try again ?",
                        "date": "December 12, 2024",
                        "iso_date": "2024-12-12T05:38:11Z"
                    }
                },
                {
                    "id": "21a9b406-0a80-41b0-94e7-c0a8fb1bb60c",
                    "title": "BRIC",
                    "avatar": "https://play-lh.googleusercontent.com/a/ACg8ocKfplnGvPfdDatuQrtFA5qphudZ7stI1ivbGyPLzXH03PBhBg=mo",
                    "rating": 1,
                    "snippet": "Doesn't work well. Even when you watch the ads doesn't correct grammar.",
                    "likes": 1,
                    "date": "December 09, 2024",
                    "iso_date": "2024-12-09T01:35:23Z",
                    "response": {
                        "title": "Matlub AI Apps",
                        "snippet": "We’re sorry to hear about your experience. Please ensure the app is updated and try restarting it. If the issue persists, contact us via WhatsApp with details. We’ll resolve it as quickly as possible. Thank you for your patience and feedback!",
                        "date": "December 16, 2024",
                        "iso_date": "2024-12-16T07:31:15Z"
                    }
                },
                {
                    "id": "94462614-c6f8-4681-8d4a-0d53a2c05870",
                    "title": "Desmond Nweke",
                    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjUWD8wAJE1xzfX-7YYGR0c-BwLY4V7XnKBfCQKFH7rzG9sz06AW",
                    "rating": 1,
                    "snippet": "If I could give a zero rating, I would have done that. This is an app that promises to correct my grammar mistakes, but whenever I try to correct the mistakes, it will only use the opportunity to show me series of video ads that consume my data. I'm uninstalling it right away.",
                    "likes": 11,
                    "date": "November 09, 2023",
                    "iso_date": "2023-11-09T16:23:16Z",
                    "response": {
                        "title": "Matlub AI Apps",
                        "snippet": "We have to display ads in order to grant unlimited right to correction. otherwise we would have to force everyone to subscribe to cover the costs. Thanks for your comment.",
                        "date": "November 09, 2023",
                        "iso_date": "2023-11-09T17:08:02Z"
                    }
                },
                {
                    "id": "610d5128-673b-4240-8a68-bf64a6e1e44b",
                    "title": "Mj Brooks",
                    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjWILStFPjPVXOXgv9L22lkl_TQ5xJ0Hhd6xC48KIlI5e9LzAPiNyw",
                    "rating": 1,
                    "snippet": "Am I right in thinking this WAS Glammerly? If yes, it's not a patch of what it use to be! Doesn't navigate well, can't have it as a general key is I could before, or if I could have done, I couldn't find it. And what???? £4,99 a week or £25 a year? STUPID! No. Uninstalled. Really not a good app. They replied saying they don't understand the problem. I've OUTLINED the problem, clearly. It's not a patch ofln Gramerly and the pricing system is ridiculous. Also may wish to work on tone and manners.",
                    "likes": 3,
                    "date": "March 27, 2024",
                    "iso_date": "2024-03-27T11:05:57Z",
                    "response": {
                        "title": "Matlub AI Apps",
                        "snippet": "Hello, we could not fully understand the problem. If you would like to get help, you can contact us on the support page, thank you.",
                        "date": "March 27, 2024",
                        "iso_date": "2024-03-27T08:13:33Z"
                    }
                }
            ]
        },
        {
            "product": {
                "title": "ChatGPT",
                "link": "https://play.google.com/store/apps/details?id=com.openai.chatgpt",
                "product_id": "com.openai.chatgpt",
                "serpapi_link": "https://serpapi.com/search.json?engine=google_play_product&gl=us&hl=en&platform=phone&product_id=com.openai.chatgpt&sort_by=1&store=apps",
                "rating": 4.8,
                "author": "OpenAI",
                "category": "Productivity",
                "downloads": "100,000,000+",
                "thumbnail": "https://play-lh.googleusercontent.com/6qi3w4uqKaD1c-CBdkkfO6IL0lH4OoCTEdiX0oYbLFxwfvxu1t8vuwHcagdYSFmFKmI=s64-rw",
                "feature_image": "https://play-lh.googleusercontent.com/ZUHDpTlKqnmnqQJTgJIy2hdrYy0oqhF7v3pbjMcoYDjBr843HxPzQnvZU6TczCZPRwg=w416-h235-rw",
                "description": "With the official ChatGPT app, get instant answers and inspiration wherever you are.\n\nThis app is free and brings you the newest model improvements from OpenAI, including access to GPT-4o, our newest and smartest model.\n\nWith ChatGPT in your pocket, you’ll find:\n\n· Advanced Voice Mode–get ChatGPT Plus and tap the soundwave icon to have a real-time convo on the go, request a bedtime story for your family, or settle a dinner table debate.\n· Photo upload—transcribe a handwritten recipe or ask about a monument.  \n· Creative inspiration—birthday gift ideas or create a personalized greeting card.\n· Tailored advice—craft a personalized response or talk through a tough situation.\n· Personalized learning—explain electricity to a dinosaur-loving kid or easily refamiliarize yourself with a historic event.\n· Professional input—brainstorm marketing copy or a business plan.\n· Instant answers—get recipe suggestions when you only have a few ingredients.\n\nJoin hundreds of millions of users and try the app captivating the world. Download ChatGPT today.\n\nTerms of use: https://openai.com/terms"
            },
            "reviews": [
                {
                    "id": "f88c6909-2cea-4bd0-abf7-b6eaf9e87c81",
                    "title": "Captain Irk",
                    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjXRYt6wnFcCs0CAOEV5U-VttSw4W-FELTrIIIsbi-HgwWif-W3qXA",
                    "rating": 3,
                    "snippet": "Love it for some things, but it's glitches up right now and forgets elements of conversations and repeats errors corrected during the chat. Not just prior chats, but in the very same session. It's like talking to a person with a learning disability (eg, rainman) and having to reteach it the outcome of the prior conversation. It'd like the session memory cache is limited to next to nil. Better than Google search, usually, but she's in her second timeout due to lack of effort (Google spot on).",
                    "likes": 33,
                    "date": "December 24, 2024",
                    "iso_date": "2024-12-24T15:47:52Z"
                },
                {
                    "id": "112fa92b-23e4-41a8-9fdd-450a462a723a",
                    "title": "The Multiverse",
                    "avatar": "https://play-lh.googleusercontent.com/a/ACg8ocIGBVSFlNTMiVY8nj-oqxEhAB90ucjXG7VBIoFD42J0TwVzfw=mo",
                    "rating": 3,
                    "snippet": "It's an alright system. It's hard to give it a proper review as you are severely limited on how many times a day you can interact with it. And the 4.0(premium version) has no interaction with 3.5(free version) so any and all progress made with one is not shared forcing you to reteach the other one. Of course 4.0 is paywalled, yet paying the subscription for \"plus\" just lets you interact a little more, there's still a cutoff point. The devs have strangled it's use to the point it's barely usable.",
                    "likes": 44,
                    "date": "December 24, 2024",
                    "iso_date": "2024-12-24T18:10:54Z"
                },
                {
                    "id": "eab00f4b-92c8-4133-a399-3371bdb8dfd4",
                    "title": "Mudhar Al-Razouqi",
                    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjXAhAcTu78eY6okVvSLeklqYgjrw7-LBi9x9EhfLyyVQJ2AGTvKaw",
                    "rating": 3,
                    "snippet": "Overall, the app is great I'm a recurring monthly subscriber fit CHAT GPT pro. Though it has a lot of voice chat issues and information is not as accurate or relevant as compared to typed data. Voice chat, lags quite a bit. I Fiber internet so the issue isn't from my end. Probably server issues with high traffic. Voice data has to catch up with text data.",
                    "likes": 19,
                    "date": "January 03, 2025",
                    "iso_date": "2025-01-03T09:52:37Z"
                },
                {
                    "id": "0239468f-1a25-4aea-978c-219db65e8894",
                    "title": "Zombie Dave",
                    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjWDQ8adA-aOlG3J1KnzA8ygo4jVf5WX6vWXjUz06Pc2dRcpJUk",
                    "rating": 3,
                    "snippet": "Sadly, with its very limited memory, the joy that could have been falls flat. It's frustrating to spend the time with it getting to know you to find you have to delete and start over. I was on the plus plan and that was disappointing. I switched! Fix that and I'll come back, but that needs improvement. Read the reviews! Please. Some of us treat this app as a friend. Not all of us are social butterflies.",
                    "likes": 58,
                    "date": "December 28, 2024",
                    "iso_date": "2024-12-28T14:00:27Z"
                },
                {
                    "id": "88a3cecd-88be-4352-9ec1-68b2f0fce9b0",
                    "title": "Gacha_Sully",
                    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjWzS3JzyiZjm71K-qvi9hUEPd5PQa308nHRwilLy5RhX0d5iZC_",
                    "rating": 3,
                    "snippet": "The image feature is almost useless to me because it doesn't even work. Whenever I ask for an image, it just shows up as a little circle with a \"1\" inside of it. On top of that, you can only create like 2 or 3 photos for free until you have to wait 20 hours for another 2-3 photos, and usually they aren't even the best quality when it works. When I tried to report it as a \"bad response,\" the app completely crashes. So, I came here. That's why I gave 3 stars. I get why it's expensive, but jeez.",
                    "likes": 109,
                    "date": "December 03, 2024",
                    "iso_date": "2024-12-03T03:14:11Z"
                }
            ]
        },
        {
            "product": {
                "title": "QuillBot - AI Writing Keyboard",
                "link": "https://play.google.com/store/apps/details?id=com.quillbot.mobile",
                "product_id": "com.quillbot.mobile",
                "serpapi_link": "https://serpapi.com/search.json?engine=google_play_product&gl=us&hl=en&platform=phone&product_id=com.quillbot.mobile&sort_by=1&store=apps",
                "rating": 4.3,
                "author": "QuillBot",
                "category": "Productivity",
                "downloads": "1,000,000+",
                "thumbnail": "https://play-lh.googleusercontent.com/HbdpGBty8E3hIvM0-G0Mz9JSkAL1_ct8rmxp95_HP49bbrX3ATVz4v_dTXBmfhQbYv1X=s64-rw",
                "feature_image": "https://play-lh.googleusercontent.com/EoAGgFrsei-baLXT-vOHv7ecq4G_5CDEuph1a4dBl6l42Mf5F_f_Natganm4uau01-c=w416-h235-rw",
                "description": "Write better everywhere with QuillBot - AI Writing Keyboard for Android \n\nQuillBot makes communication effortless. This AI keyboard combines a paraphrasing tool, Grammar Checker, and AI Detector to create the perfect mobile AI writing assistant. Paraphrase your writing, eliminate typos, craft clear and concise sentences, detect AI-generated content, and much more with this free app. No matter what you write, QuillBot helps ensure every word is perfect.\n\n🚀Key Features:\nOur AI writing app offers Paraphraser, Grammar Checker, and AI Detector. \n\n✍AI Paraphrasing Tool\nThe paraphrasing tool rephrases your sentences in a variety of styles, with 2 free modes and 8 Premium paraphrasing modes. These rewrites help you enhance the impact of your message, adjust your tone, and more.\n\n✍AI Grammar Checker\nOur free Grammar Checker eliminates typos and mistakes. Unlike a traditional spell check, our proofreader uses AI to ensure suggestions are helpful and accurate.\n\n✍AI Content Detector\nThe AI checker instantly scans your writing and lets you know if AI content is present. It’s fast and free, and it provides highly detailed reports. \n\n💡Paraphrasing Tool Modes Include:\n\n🤖Free\nStandard: Rephrase text with new vocabulary and word order \nFluency: Improve the clarity and readability of text\n\n💎Premium \nNatural: Rephrase text in a more human, authentic way \nFormal: Rephrase text in a more sophisticated way \nAcademic: Express text in a more technical and scholarly way \nSimple: Present text in a way that’s easy to understand \nCreative: Rephrase text in an original and innovative way \nExpand: Increase the length of text\nShorten: Convey the meaning of text concisely\nCustom mode: Rewrite text to match the unique description provided \n\n🤖How the Keyboard App Works:\n\nTo use, download the AI writing keyboard from the Play Store. Then, create an account by providing an email and a password. Next, allow QuillBot to access the keyboard. Keyboard access lets us improve your writing everywhere you type. You’re done! QuillBot’s keyboard app will help you write better everywhere.\n\n✨QuillBot Premium: Ready to take your writing to the next level?\n\nGo Premium. Premium unlocks full access to our AI writing tools. Premium includes unlimited words in the paraphrasing tool, Premium sentence recommendations, 10+ rephrasing modes, and more. Go to quillbot.com/premium for more details.\n\n🤷‍♂️Why Choose QuillBot:\n\nWe’re the best paraphrase tool, AI checker, and grammar-checking app on the market.\n\n✅Comprehensive: Go beyond autocorrect and strengthen the impact of your writing\n✅Customizable: Make your sentences stand out with 10 different predefined rewriting modes\n✅Flexible: Create unlimited different paraphrasing styles with Custom mode\n✅Accurate: Improve your writing with a rephraser trained by expert linguists\n✅High quality: Feel confident your rewrites are clear and grammatically correct\n✅Multilingual: Improve your writing in 20+ languages and fix mistakes in 6\n✅Detailed: Receive in-depth feedback on your content with AI Detector\n✅Fast: Get instant results from our sentence checker, AI Detector, and Paraphraser\n✅Free: Get a grammar check, 2 paraphrasing modes, and our AI Detector at no cost\n\n🔐App Privacy and Data Safety: The security of your personal data is one of QuillBot’s top priorities. To learn more about our privacy policy, visit quillbot.com/privacy. Our full Terms and Conditions may be accessed at https://quillbot.com/terms. \n\nAccessibility permission is used to process text written in apps and provide you with tailored writing assistance. We also use this permission to turn QuillBot on when you’re typing in apps.\n \nWant to start communicating with confidence? Download QuillBot today to paraphrase online, fix typos, and more. Get flawless writing anywhere with QuillBot - AI Writing Keyboard for Android."
            },
            "reviews": [
                {
                    "id": "bbda8348-2a04-449c-885b-25ecaf4b0abe",
                    "title": "Ben Giles",
                    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjUq0n1arZFm7czr0AqRf7DH9YSqOtVuNZSPn42Nvkrw9dxi9f5itQ",
                    "rating": 3,
                    "snippet": "Really want to love it. I love it's rephrasing suggestions. However it has no shortcut to use voice typing, and I find myself reaching for it too often to have it hidden away under multiple taps to switch system inputs. I want to speak to the phone and then use something like this to check my grammar and rephrase before hitting send.",
                    "likes": 17,
                    "date": "August 23, 2024",
                    "iso_date": "2024-08-23T16:44:26Z"
                },
                {
                    "id": "89581cda-7d3f-4887-b07f-94ed3c1231bb",
                    "title": "Kawaii Pocky",
                    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjUpNOxJqtMdIReUO8hY_YW4JwBUFhI5V_9PC_r_r9QtEjhpwG8",
                    "rating": 3,
                    "snippet": "It is doing better than before but, there is a problem though. When I spent a while on the keyboard typing The keyboard refused to pop up when I tried to use it and I couldn't even switch between my own keyboard to use it or to fix it. I lost my copied text when I had to restart my phone. It's not a bad app it just needs updates. I rather not lose my pinned copy-paste text.",
                    "likes": 14,
                    "date": "January 06, 2025",
                    "iso_date": "2025-01-06T20:11:42Z",
                    "response": {
                        "title": "QuillBot",
                        "snippet": "Thank you for sharing your feedback. We’re truly sorry to hear that your experience with our app didn’t meet your expectations. Your feedback helps us identify issues and work on solutions. If you're open to discussing your experience with our team, please contact us here: https://help.quillbot.com/hc/en-us/requests/new.",
                        "date": "January 06, 2025",
                        "iso_date": "2025-01-06T21:33:30Z"
                    }
                },
                {
                    "id": "dc251a2f-1a72-4573-8d89-5d0f96436193",
                    "title": "StellatedTexas 8",
                    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjUtQxjvx2BCd3kXi-gF-Zcoa-nnKgqrCs352yZA9G1cxz_oa44",
                    "rating": 3,
                    "snippet": "This app is very useful. However, it used to be built into the application itself, and now, when you want to log in, it forces you into a browser. I would just open it through my browser if I wanted to be in my browser. It feels pointless to make it an application if it just takes you to the browser version. I could just make a shortcut on my home screen and accomplish the same result.",
                    "likes": 14,
                    "date": "November 26, 2024",
                    "iso_date": "2024-11-26T14:42:08Z",
                    "response": {
                        "title": "QuillBot",
                        "snippet": "Thanks for your support! We’re sorry to hear that you’re experiencing issues. It would be really helpful if you could share more information with our support team at https://quillbot.com/contact. We appreciate your input and are always working on new ways to improve our app.",
                        "date": "November 28, 2024",
                        "iso_date": "2024-11-28T14:26:46Z"
                    }
                },
                {
                    "id": "30bd0edb-bd88-49eb-b10a-77068c4471b9",
                    "title": "Ernesto",
                    "avatar": "https://play-lh.googleusercontent.com/a-/ALV-UjWWDMwp0qXEi_KzpMitRiS54nGaveavLVRdHgvbWg9W4CJKeSuC",
                    "rating": 3,
                    "snippet": "Great job so far. For an even better experience: - Make transitioning from Gboard smoother. Most phones run Gboard. - Declutter the bottom. Remove the web icon (phones have other equally quick ways of switching keyboards). Move the mic button into one corner of the suggestions bar. - Show only 3 suggestions, centered evenly spaced. No \"|\". - Make characters, symbols, and icons bolder. - Make the typing buttons pop out. Add space between them. - Center space button, and make it bigger.",
                    "likes": 11,
                    "date": "November 23, 2024",
                    "iso_date": "2024-11-23T07:11:13Z",
                    "response": {
                        "title": "QuillBot",
                        "snippet": "Thank you for sharing your feedback and suggestions. We appreciate it! Our team is committed to finding new ways to improve your writing experience. It would be really helpful if you could share more information on this with our support team at https://quillbot.com/contact. We will be pleased to address them as soon as possible.",
                        "date": "November 25, 2024",
                        "iso_date": "2024-11-25T21:57:42Z"
                    }
                },
                {
                    "id": "d780e5a4-4523-4105-b1f0-87a1e212b09c",
                    "title": "Akash Khajuria",
                    "avatar": "https://play-lh.googleusercontent.com/a/ACg8ocKBvujC2VzL8wJMc7CwpsBxAWY6UG1OCUNoJipCnzL9wDCWsC4=mo",
                    "rating": 3,
                    "snippet": "Even with my fast internet, the app still freezes whenever I try to use any of the features or paraphrase. Please fix this.Also a lot of times whenever I try to paraphrase it show \"something went wrong\".Fix this too.",
                    "likes": 3,
                    "date": "December 05, 2024",
                    "iso_date": "2024-12-05T14:53:26Z",
                    "response": {
                        "title": "QuillBot",
                        "snippet": "Thank you for sharing your feedback. We're sorry that you had a negative experience with our app. Your feedback helps us identify issues and work on solutions. If you're open to discussing your experience with our team, please contact us here: https://help.quillbot.com/hc/en-us/requests/new.",
                        "date": "December 06, 2024",
                        "iso_date": "2024-12-06T03:37:00Z"
                    }
                }
            ]
        }
    ]

    res.send(data)
}

export { fetchPlayStoreData };