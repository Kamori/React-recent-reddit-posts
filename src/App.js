import axios from "axios";
import React, { useState } from "react";


export default function App() {
  return (
    <div>
      <Reddit subreddit="/r/programming/" />
    </div>
  )

}

function Reddit(props) {
  const [posts, setPosts] = useState([]);
  const [subredditList, setSubredditList] = useState([]);
  const [subreddit, setSubreddit] = useState(props.subreddit);

  const getPosts = (subr) => {
    setPosts([]);
    axios.get(`https://www.reddit.com${subr ? subr.slice(0, -1) : subreddit.slice(0, -1)}.json`)
      .then(res => {
        const newPosts = res.data.data.children
          .map(obj => obj.data);

        setPosts(newPosts);
      });
  };


  React.useEffect(() => {
    axios.get(`https://www.reddit.com/subreddits.json`)
      .then(res => {
        const subReddits = res.data.data.children
          .map(obj => obj.data.url);

        setSubredditList(subReddits);
        getPosts();
      });
  }, []);




  return (
    <div>
      <h1>{subreddit}</h1>

      <select onChange={(val) => { console.log(val.target.value); setSubreddit(val.target.value); getPosts(val.target.value); }}>
        <option value={props.subreddit}>{props.subreddit}</option>
        {subredditList.map(sub => (
          <option value={sub}>{sub}</option>
        ))}
      </select>

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}