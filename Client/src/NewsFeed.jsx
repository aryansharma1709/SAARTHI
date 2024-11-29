
import  { useState, useEffect } from "react";

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const articlesPerPage = 20; // Number of articles per page
  const totalArticles = 200; // Total number of articles (assumed from the API)
  const totalPages = Math.ceil(totalArticles / articlesPerPage); // Total number of pages

  const demoImage =
    "https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg";

  // Fetch articles for the current page
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dev.to/api/articles?page=${currentPage}&per_page=${articlesPerPage}`
        );
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-5 min-h-screen mt-16 w-4/5 mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">News Feed</h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={article.cover_image || demoImage}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {article.title}
              </h2>
              <p className="text-gray-600 text-sm">
                {article.description || "No description available"}
              </p>
              <div className="flex items-center my-3">
                <img
                  src={article.user.profile_image_90}
                  alt={article.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">{article.user.name}</p>
                  <p className="text-gray-600 text-sm">@{article.user.username}</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm">
                Published: {article.readable_publish_date}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {article.tag_list.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-center text-white bg-blue-600 hover:bg-blue-700 font-medium py-2 rounded-lg"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Bar */}
      <div className="flex justify-center items-center mt-8">
        <nav className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NewsFeed;
