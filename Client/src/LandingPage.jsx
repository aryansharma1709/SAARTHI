const LandingPage = () => {
    const mentors = [
      { name: "John Doe", expertise: "Software Engineering" },
      { name: "Jane Smith", expertise: "Data Science" },
      { name: "Mike Johnson", expertise: "Product Management" }
    ];
  
    const news = [
      { 
        title: "New Mentorship Program Launched", 
        description: "Connecting students with industry experts", 
        date: "November 15, 2024" 
      },
      { 
        title: "Alumni Success Stories", 
        description: "Inspiring journeys of our graduates", 
        date: "November 10, 2024" 
      }
    ];
  
    const reviews = [
      { 
        name: "Emily Rodriguez", 
        review: "Amazing platform for professional growth!", 
        role: "Student" 
      },
      { 
        name: "Michael Chen", 
        review: "Incredible networking opportunities", 
        role: "Alumni" 
      }
    ];
  
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="pt-20">
          {/* Banner Slider */}
          <BannerSlider />
  
          {/* Mentors Section */}
          <section className="container mx-auto my-12">
            <h2 className="text-3xl font-bold text-center mb-8">Our Alumni Mentors</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {mentors.map((mentor, index) => (
                <MentorCard key={index} {...mentor} />
              ))}
            </div>
          </section>
  
          {/* News Section */}
          <section className="container mx-auto my-12 bg-gray-100 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-8">Latest News</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {news.map((item, index) => (
                <NewsCard key={index} {...item} />
              ))}
            </div>
          </section>
  
          {/* Reviews Section */}
          <section className="container mx-auto my-12">
            <h2 className="text-3xl font-bold text-center mb-8">Community Reviews</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {reviews.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
            </div>
          </section>
        </main>
  
        <Footer />
      </div>
    );
  };