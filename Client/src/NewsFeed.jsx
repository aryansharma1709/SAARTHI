// import React from 'react';
// import { Calendar, MessageSquare, Heart, Clock } from 'lucide-react';

// const NewsFeed = () => {
//   const article = {
//     "title": "New DEV Feature: Following Tab",
//     "description": "Hey, there is a new feature on the home feed: a Following tab. The existing feed is now called...",
//     "readable_publish_date": "Nov 21",
//     "comments_count": 11,
//     "positive_reactions_count": 99,
//     "reading_time_minutes": 1,
//     "tags": "meta, news",
//     "user": {
//       "name": "Ben Halpern",
//       "profile_image": "https://media2.dev.to/dynamic/image/width=90,height=90,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1%2Ff451a206-11c8-4e3d-8936-143d0a7e65bb.png"
//     },
//     "organization": {
//       "name": "The DEV Team"
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//       <div className="p-6">
//         {/* Author Info */}
//         <div className="flex items-center mb-4">
//           <img
//             src={article.user.profile_image}
//             alt={article.user.name}
//             className="w-10 h-10 rounded-full"
//           />
//           <div className="ml-3">
//             <p className="text-sm font-semibold text-gray-900">{article.user.name}</p>
//             <p className="text-xs text-gray-600">{article.organization.name}</p>
//           </div>
//         </div>

//         {/* Article Content */}
//         <div className="mb-4">
//           <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
//             {article.title}
//           </h2>
//           <p className="text-gray-600">
//             {article.description}
//           </p>
//         </div>

//         {/* Tags */}
//         <div className="mb-4">
//           {article.tags.split(', ').map((tag) => (
//             <span
//               key={tag}
//               className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 hover:bg-gray-200 cursor-pointer"
//             >
//               #{tag}
//             </span>
//           ))}
//         </div>

//         {/* Metadata */}
//         <div className="flex items-center justify-between text-sm text-gray-600">
//           <div className="flex items-center space-x-4">
//             <span className="flex items-center">
//               <Calendar className="w-4 h-4 mr-1" />
//               {article.readable_publish_date}
//             </span>
//             <span className="flex items-center">
//               <Clock className="w-4 h-4 mr-1" />
//               {article.reading_time_minutes} min read
//             </span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <span className="flex items-center">
//               <Heart className="w-4 h-4 mr-1" />
//               {article.positive_reactions_count}
//             </span>
//             <span className="flex items-center">
//               <MessageSquare className="w-4 h-4 mr-1" />
//               {article.comments_count}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default NewsFeed;
// import React from 'react';
import { Calendar, MessageSquare, Heart, Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Define TypeScript interface for props
const NewsFeed = ({ 
  title,
  description,
  readable_publish_date,
  comments_count,
  positive_reactions_count,
  reading_time_minutes,
  tags,
  user,
  organization,
  url,
  onArticleClick,
  onTagClick,
  onUserClick,
  onOrganizationClick 
}) => {
  // Handle clicks with optional fallback to URL
  const handleArticleClick = (e) => {
    e.preventDefault();
    if (onArticleClick) {
      onArticleClick();
    } else if (url) {
      window.open(url, '_blank');
    }
  };

  const handleTagClick = (tag) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  const handleUserClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onUserClick) {
      onUserClick(user);
    }
  };

  const handleOrganizationClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onOrganizationClick) {
      onOrganizationClick(organization);
    }
  };

  return (
    <Card 
      onClick={handleArticleClick}
      className="max-w-2xl mx-auto hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <CardContent className="p-6">
        {/* Author Info */}
        <div className="flex items-center mb-4">
          <img
            src={user.profile_image}
            alt={user.name}
            className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleUserClick}
          />
          <div className="ml-3">
            <p 
              className="text-sm font-semibold text-gray-900 hover:text-blue-600 cursor-pointer"
              onClick={handleUserClick}
            >
              {user.name}
            </p>
            {organization && (
              <p 
                className="text-xs text-gray-600 hover:text-blue-600 cursor-pointer"
                onClick={handleOrganizationClick}
              >
                {organization.name}
              </p>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600">
            {title}
          </h2>
          <p className="text-gray-600 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.split(', ').map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="hover:bg-gray-200 cursor-pointer transition-colors"
              onClick={handleTagClick(tag)}
            >
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {readable_publish_date}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {reading_time_minutes} min read
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="flex items-center hover:text-blue-600 transition-colors"
              aria-label={`${positive_reactions_count} reactions`}
            >
              <Heart className="w-4 h-4 mr-1" />
              {positive_reactions_count}
            </button>
            <button 
              className="flex items-center hover:text-blue-600 transition-colors"
              aria-label={`${comments_count} comments`}
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              {comments_count}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsFeed;