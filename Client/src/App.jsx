import Footer from "./Footer"
import Navbar from "./Navbar"
import BannerSlide from "./BannerSlide"
import MessagingCircle from "./MessagingCircle"
import Book from "./Book"
import Signup from "./SignUp"
import NewsFeed from "./NewsFeed"
function App() {

  return (
   <>
     {/* <BannerSlide/> */}
     {/* <MessagingCircle/> */}
    {/* <Footer/> */}
    {/* <Book/> */}
    {/* <Navbar/> */}
    {/* <Signup /> */}
    // Example usage
<NewsFeed
  title="New DEV Feature: Following Tab"
  description="Hey, there is a new feature on the home feed: a Following tab..."
  readable_publish_date="Nov 21"
  comments_count={11}
  positive_reactions_count={99}
  reading_time_minutes={1}
  tags="meta, news"
  user={{
    name: "Ben Halpern",
    profile_image: "path/to/image"
  }}
  organization={{
    name: "The DEV Team"
  }}
  url="https://dev.to/devteam/new-dev-feature-following-tab-5fae"
  onArticleClick={() => console.log('Article clicked')}
  onTagClick={(tag) => console.log('Tag clicked:', tag)}
  onUserClick={(user) => console.log('User clicked:', user)}
  onOrganizationClick={(org) => console.log('Organization clicked:', org)}
/>
    </>
  )
}

export default App
