import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

axios.interceptors.request.use((request) => {
  console.log('Request Interceptor:', request);
  return request;
});

axios.interceptors.response.use((response) => {
  console.log('Response Interceptor:', response);
  return response;
});

function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.all([
      axios.get('https://jsonplaceholder.typicode.com/posts'),
      axios.get('https://jsonplaceholder.typicode.com/users')
    ])
      .then(axios.spread((postsResponse, usersResponse) => {
        console.log(postsResponse);
        console.log(usersResponse);
        setPosts(postsResponse.data);
        setUsers(usersResponse.data);
        setLoading(false);
      }))
      .catch((error) => {
        console.error('Error:', error);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <p>{error}</p>
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1
    };
    axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
      .then((response) => {
        console.log('New Post Added: ', response.data);
        setPosts([response.data, ...posts]);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError("Failed to add new post");
      });
  };

  return (
    <>
      <div>
        <h2>Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <p>{post.title}</p>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
