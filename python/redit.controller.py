from typing import Iterator, List
from flask import Flask, jsonify, request
import praw
from praw.models import Submission, Subreddit, Comment
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Initialize Reddit API client with authentication credentials from env
reddit: praw.Reddit = praw.Reddit(
    client_id=os.getenv('REDDIT_CLIENT_ID'),
    client_secret=os.getenv('REDDIT_CLIENT_SECRET'),
    user_agent=os.getenv('REDDIT_USER_AGENT')
)

@app.route('/hot-posts', methods=['GET'])
def get_hot_posts():
    try:
        subreddit_name = request.args.get('subreddit', 'technology')
        subreddit: Subreddit = reddit.subreddit(subreddit_name)
        
        all_comments = []
        hot_posts: Iterator[Submission] = subreddit.hot(limit=5)
        
        for post in hot_posts:
            if len(all_comments) >= 5:
                break
                
            post.comments.replace_more(limit=0)
            top_comments: List[Comment] = post.comments[:5]
            
            for comment in top_comments:
                if len(all_comments) >= 5:
                    break
                
                # Skip if author name contains subreddit name (case insensitive)
                author_name = str(comment.author).lower()
                if subreddit_name.lower() in author_name:
                    continue
                    
                from datetime import datetime
                comment_data = {
                    'comment': comment.body,
                    'author': str(comment.author),
                    'score': comment.score,
                    'created_at': datetime.fromtimestamp(comment.created_utc).isoformat()
                }
                all_comments.append(comment_data)
        
        response = {
            'subreddit': subreddit_name,
            'comment_count': len(all_comments),
            'comments': all_comments
        }
        
        return jsonify(response)
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'failed'
        }), 500

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message": "Welcome to Reddit API",
        "endpoints": {
            "hot_posts": "/hot-posts"
        }
    })

if __name__ == '__main__':
    port = int(os.getenv('PORT', 3001))
    app.run(port=port, debug=True)
