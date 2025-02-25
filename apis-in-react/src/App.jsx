import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

axios.interceptors.request.use((request) => {
  console.log('Request Interceptor:', request);
  return request;
});

axios.interceptors.response.use((response) => {
  console.log('Response Interceptor:', response);
  return response;
});

function App() {
  const { register, handleSubmit, reset } = useForm();
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
    return <h1 className="text-2xl font-bold text-center">Loading...</h1>
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>
  }

  const onSubmit = (data) => {
    const newPost = {
      title: data.title,
      body: data.body,
      userId: 1
    };
    axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
      .then((response) => {
        console.log('New Post Added: ', response.data);
        setPosts([response.data, ...posts]);
        reset();
      })
      .catch((error) => {
        console.error('Error:', error);
        setError("Failed to add new post");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="form-container fade-in">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              {...register('title', { required: true })}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Body"
              {...register('body', { required: true })}
              className="border p-2 rounded w-full"
            />
          </div>
          <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-xl text-center w-full max-w-4xl mx-auto fade-in">
        <h2 className="text-3xl font-bold mb-4">Posts</h2>
        <ul className="list-disc pl-5 text-center">
          {posts.map((post) => (
            <li key={post.id} className="mb-2">
              <p className="font-semibold">{post.title}</p>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
        <h2 className="text-3xl font-bold mt-8 mb-4">Users</h2>
        <ul className="list-disc pl-5 text-center">
          {users.map((user) => (
            <li key={user.id} className="mb-2">
              <p className="font-semibold">{user.name}</p>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
