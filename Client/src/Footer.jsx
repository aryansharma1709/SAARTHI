export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-auto">
      <div className="container mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold mb-4">Contact Us</h4>
          <p>Email: www.Saarthi.com</p>
          <p>Phone: +91-1234567890</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul>
            <li><a href="#faq" className="hover:text-blue-300">FAQ</a></li>
            <li><a href="#userguide" className="hover:text-blue-300">User Guide</a></li>
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
          <h1>Copyright © 2024 | Saarthi</h1>
          <h1>Powered by Saarthi Alumni</h1>
        </div>
      </div>
    </footer>
  );
}
