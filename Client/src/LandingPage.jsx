import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {  CheckCircle, UserCheck } from 'lucide-react';
import banner1 from './assets/Website_banner_1.png';
import { useNavigate } from 'react-router-dom';
import ayuimg from './assets/ayuimg.jpg';
import aruimg from './assets/Aryan_photo.jpg';
import resume from './assets/ATS_resume.png';
import book from  './assets/book.png';
const LandingPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [
    banner1,
    resume,
    book,
  ];

  // Mentors State
  const mentors = [
    {
      id: "monu123",
      name: "Monu Kumar",
      skills: ["Java", "DSA"],
      company: "Coding Blocks",
      experience: 8,
      image: "https://images.codingblocks.com/img/mentor/Monu.png"
    },
    {
      name: "Samarth vohra",
      skills: ["MERN STACK", "Web Development"],
      company: "Coding Blocks",
      experience: 6,
      image: "https://tse2.mm.bing.net/th?id=OIP.IqiDm7McWYiMpN_DqE2jBQAAAA&pid=Api&P=0&h=180"
    }
  ];

  // Student Reviews State
  const [currentReview, setCurrentReview] = useState(0);
  const reviews = [
    {
      text: "Amazing learning experience with exploration and guidance from alumni mentors, making my educational journey inspiring and successful!",
      name: "Aryan Sharma",
      image: aruimg
    },
    {
      text: "An incredible learning journey enriched by exploration and alumni mentors' guidance, making my path engaging and truly rewarding!",
      name: "Ayushi Katroliya",
      image: ayuimg
    }
  ];

  // Auto-changing slider effects
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 2000);

    const reviewInterval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => {
      clearInterval(bannerInterval);
      clearInterval(reviewInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      {/* Slider Banner Section */}
      <div className="relative h-[500px] overflow-hidden">
        {banners.map((banner, index) => (
          <motion.img
            key={index}
            src={banner}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              transition: { duration: 0.5 }
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}
      </div>

      {/* Mentors Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Expert Mentors</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {mentors.map((mentor, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-lg p-6 flex items-center"
            >
              <img 
                src={mentor.image} 
                alt={mentor.name} 
                className="w-24 h-24 rounded-full mr-6"
              />
              <div>
                <h3 className="text-xl font-semibold">{mentor.name}</h3>
                <p className="text-gray-600">{mentor.company} | {mentor.experience} Years</p>
                <div className="flex mt-2">
                  {mentor.skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <button onClick={()=>{navigate(`/inbox?chat=${mentor.id}`)}} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
                  Chat Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Resource Sharing Section */}
      <motion.section 
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="container mx-auto py-16 grid md:grid-cols-2 items-center gap-12 px-4"
      >
        <img 
          src="https://thumbs.dreamstime.com/b/college-students-studying-outdoor-vector-illustration-grass-42444880.jpg" 
          alt="Resource Sharing" 
          className="rounded-lg shadow-xl"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">Seamless Resource Sharing</h2>
          <p className="text-gray-600">
          Discover an intuitive platform designed for seamless collaboration and resource sharing. 
          Access comprehensive study materials, enhance learning, and connect effortlessly with peers. 
          Simplify your academic journey with a user-friendly interface that fosters knowledge exchange, teamwork, 
          and efficiency, empowering you to achieve your educational goals with ease and convenience.
          </p>
        </div>
      </motion.section>

      {/* Resume Checker & Connection */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 px-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg p-6 shadow-md flex items-center"
          >
            <CheckCircle className="w-16 h-16 text-blue-500 mr-6" />
            <div>
              <h3 className="text-xl font-semibold">Professional Resume Checker</h3>
              <p className="text-gray-600">Get instant, AI-powered resume feedback</p>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg p-6 shadow-md flex items-center"
          >
            <UserCheck className="w-16 h-16 text-green-500 mr-6" />
            <div>
              <h3 className="text-xl font-semibold">One-to-One Mentorship</h3>
              <p className="text-gray-600">Connect directly with industry experts</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Student Reviews */}
      <section className="container mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Students Say</h2>
        <motion.div
          key={currentReview}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <img 
            src={reviews[currentReview].image}
            alt={reviews[currentReview].name}
            className="w-32 h-32 rounded-full mb-4"
          />
          <p className="text-xl italic mb-4">"{reviews[currentReview].text}"</p>
          <p className="font-semibold">{reviews[currentReview].name}</p>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;