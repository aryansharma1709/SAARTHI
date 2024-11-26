// import  { useState, useEffect } from 'react';
// import { Loader2 } from 'lucide-react';

// // Import the previous ArticleCard component
// // Assuming it's in the same directory
// import NewsFeed from "./NewsFeed"

// const ArticleFeed = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchArticles = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `https://dev.to/api/articles?page=${page}&per_page=10`
//       );
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch articles');
//       }

//       const data = await response.json();
      
//       if (data.length === 0) {
//         setHasMore(false);
//         return;
//       }

//       setArticles(prevArticles => 
//         page === 1 ? data : [...prevArticles, ...data]
//       );
      
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchArticles();
//   }, [page]);

//   const handleLoadMore = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   const handleTagClick = (tag) => {
//     console.log('Tag clicked:', tag);
//     // Implement tag filtering logic here
//   };

//   const handleUserClick = (user) => {
//     console.log('User clicked:', user);
//     // Implement user profile navigation here
//   };

//   const handleOrganizationClick = (org) => {
//     console.log('Organization clicked:', org);
//     // Implement organization page navigation here
//   };

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-[200px] text-red-500">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="space-y-6">
//         {articles.map((article) => (
//           <NewsFeed
//             key={article.id}
//             title={article.title}
//             description={article.description}
//             readable_publish_date={article.readable_publish_date}
//             comments_count={article.comments_count}
//             positive_reactions_count={article.positive_reactions_count}
//             reading_time_minutes={article.reading_time_minutes}
//             tags={article.tags}
//             user={article.user}
//             organization={article.organization}
//             url={article.url}
//             onTagClick={handleTagClick}
//             onUserClick={handleUserClick}
//             onOrganizationClick={handleOrganizationClick}
//           />
//         ))}
//       </div>

//       {loading && (
//         <div className="flex justify-center my-8">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
//         </div>
//       )}

//       {!loading && hasMore && (
//         <div className="flex justify-center mt-8">
//           <button
//             onClick={handleLoadMore}
//             className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//           >
//             Load More
//           </button>
//         </div>
//       )}

//       {!hasMore && (
//         <div className="text-center text-gray-500 mt-8">
//           No more articles to load
//         </div>
//       )}
//     </div>
//   );
// };

// export default ArticleFeed;
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import NewsFeed from './NewsFeed';

const ArticleFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dev.to/api/articles?page=${page}&per_page=10`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }

      const data = await response.json();
      
      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      // Ensure each article has required fields or provide defaults
      const processedData = data.map(article => ({
        ...article,
        tags: article.tags || '',  // Ensure tags is a string
        user: article.user || {
          name: 'Anonymous',
          profile_image: '/api/placeholder/90/90'
        },
        organization: article.organization || null,
        reading_time_minutes: article.reading_time_minutes || 1
      }));

      setArticles(prevArticles => 
        page === 1 ? processedData : [...prevArticles, ...processedData]
      );
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleTagClick = (tag) => {
    console.log('Tag clicked:', tag);
  };

  const handleUserClick = (user) => {
    console.log('User clicked:', user);
  };

  const handleOrganizationClick = (org) => {
    console.log('Organization clicked:', org);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {articles.map((article) => (
        <NewsFeed
          key={article.id}
          title={article.title || 'Untitled'}
          description={article.description || 'No description available'}
          readable_publish_date={article.readable_publish_date || 'Recent'}
          comments_count={article.comments_count || 0}
          positive_reactions_count={article.positive_reactions_count || 0}
          reading_time_minutes={article.reading_time_minutes || 1}
          tags={article.tags || ''}
          user={article.user || {
            name: 'Anonymous',
            profile_image: '/api/placeholder/90/90'
          }}
          organization={article.organization}
          url={article.url}
          onTagClick={handleTagClick}
          onUserClick={handleUserClick}
          onOrganizationClick={handleOrganizationClick}
        />
      ))}

      {loading && (
        <div className="flex justify-center my-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      )}

      {!loading && hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      {!hasMore && articles.length > 0 && (
        <div className="text-center text-gray-500 mt-8">
          No more articles to load
        </div>
      )}
    </div>
  );
};

export default ArticleFeed;