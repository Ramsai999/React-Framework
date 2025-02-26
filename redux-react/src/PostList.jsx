import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './store/actions/postActions';

const PostList = () => {
    const dispatch = useDispatch();
    const { post, loading, error } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if(loading){
        return <h2 className="text-xl font-semibold text-blue-500">Loading...</h2>
    }
    if(error){ 
        return <h2 className="text-xl font-semibold text-red-500">{error}</h2>
    }
    return (
        <div className="container mx-auto p-4">
            {loading && <h2 className="text-xl font-semibold text-blue-500">Loading...</h2>}
            {error && <h2 className="text-xl font-semibold text-red-500">{error}</h2>}
            <ul className="mt-4 space-y-2">
                {post.map((post) => (
                    <li
                        key={post.id}
                        className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                    >
                        <h3 className="text-lg font-bold text-gray-800">User id: {post.userId}</h3>
                        <h3 className="text-lg font-bold text-gray-800">Post id: {post.id}</h3>
                        <h3 className="text-lg font-bold text-gray-800">post title: {post.title}</h3>
                        <p className="text-gray-600"> <b>post body:</b> {post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;