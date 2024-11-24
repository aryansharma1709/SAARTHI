export default function Footer(){
    return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold mb-4">Contact Us</h4>
          <p>Email: support@eduportal.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul>
            <li><a href="/faq" className="hover:text-blue-300">FAQ</a></li>
            <li><a href="/guide" className="hover:text-blue-300">User Guide</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Social Media</h4>
          <div className="flex space-x-4">
            <a href="#linkedin" className="hover:text-blue-300">LinkedIn</a>
            <a href="#twitter" className="hover:text-blue-300">Twitter</a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4">About</h4>
          <p>Educational networking platform connecting students and alumni</p>
        </div>
      </div>
    </footer>
  )};