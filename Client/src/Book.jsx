import { useState, useRef, useEffect } from "react";
import {
  FileText,
  Link,
  Image,
  Upload,
  Search,
  Grid,
  List,
  Filter,
  Plus,
  File,
  X,
} from "lucide-react";

const Book = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Initial resource data
  const [resources, setResources] = useState([
    // {
    //   id: 1,
    //   type: "pdf",
    //   name: "Data Structures Notes",
    //   size: "2.4 MB",
    //   date: "2024-03-20",
    //   category: "notes",
    // },
    // {
    //   id: 2,
    //   type: "link",
    //   name: "Learn React Tutorial",
    //   url: "https://example.com",
    //   category: "links",
    // },
    // {
    //   id: 3,
    //   type: "ppt",
    //   name: "Algorithm Presentation",
    //   size: "5.1 MB",
    //   date: "2024-03-18",
    //   category: "presentations",
    // },
    // {
    //   id: 4,
    //   type: "image",
    //   name: "System Architecture",
    //   size: "1.2 MB",
    //   date: "2024-03-15",
    //   category: "images",
    // },
  ]);

  const categories = [
    { id: "all", name: "All Resources", count: resources.length },
    {
      id: "notes",
      name: "Notes",
      count: resources.filter((r) => r.type === "pdf").length,
    },
    {
      id: "links",
      name: "Important Links",
      count: resources.filter((r) => r.type === "link").length,
    },
    {
      id: "presentations",
      name: "Presentations",
      count: resources.filter((r) => r.type === "ppt").length,
    },
    {
      id: "images",
      name: "Images",
      count: resources.filter((r) => r.type === "image").length,
    },
  ];

  // File handling functions
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = async (files) => {
    let newData = [];
    setIsLoading(true);
    for (const file of files) {
      let fetchLink;
      const fileType = file.type.split("/")[0];
      if (fileType === "image") {
        fetchLink = "image";
      } else if (fileType === "video") {
        fetchLink = "video";
      } else {
        fetchLink = "raw";
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "alumini");
      formData.append("cloud_name", "dmhfcgxnv");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dmhfcgxnv/${fetchLink}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const newFiles = {
        id: Date.now() + Math.random(),
        type: getFileType(file.name),
        name: file.name,
        size: formatFileSize(file.size),
        date: new Date().toISOString().split("T")[0],
        category: getFileCategory(file.name),
        url: data.secure_url,
      };

      newData = [...newData, newFiles];
    }
    setResources((prev) => [...prev, ...newData]);
    localStorage.setItem("resources", JSON.stringify(newData));

    setShowUploadModal(false);
  };

  const getFileType = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    if (["pdf"].includes(ext)) return "pdf";
    if (["ppt", "pptx"].includes(ext)) return "ppt";
    if (["jpg", "jpeg", "png", "gif"].includes(ext)) return "image";
    return "file";
  };

  const getFileCategory = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    if (["pdf"].includes(ext)) return "notes";
    if (["ppt", "pptx"].includes(ext)) return "presentations";
    if (["jpg", "jpeg", "png", "gif"].includes(ext)) return "images";
    return "others";
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Search and filter functions
  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIconForType = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />;
      case "link":
        return <Link className="h-6 w-6 text-blue-500" />;
      case "ppt":
        return <File className="h-6 w-6 text-orange-500" />;
      case "image":
        return <Image className="h-6 w-6 text-green-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  // Delete resource
  const handleDelete = (e, id) => {
    e.stopPropagation();
    const newData = resources.filter((resource) => resource.id !== id);
    setResources(newData);
    localStorage.setItem("resources", JSON.stringify(newData));
  };

  useEffect(() => {
    let data = localStorage.getItem("resources");
    data = JSON.parse(data);
    if (data) {
      setResources(data);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          Resource Library
        </h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Upload className="h-5 w-5 mr-2" />
          Upload Resource
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg ${
              viewMode === "grid" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <Grid className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg ${
              viewMode === "list" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <List className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 ${
                selectedCategory === category.id ? "bg-gray-100" : ""
              }`}
            >
              <span className="text-gray-700">{category.name}</span>
              <span className="bg-gray-200 px-2 py-1 rounded-full text-xs text-gray-600">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Resource Grid/List */}
        <div className="flex-1">
          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-4`}
          >
            {filteredResources.map((resource) => (
              <div
                onClick={() => window.open(resource.url, "_blank")}
                key={resource.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getIconForType(resource.type)}
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {resource.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {resource.size && `${resource.size} • `}
                        {resource.date &&
                          new Date(resource.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, resource.id)}
                    className="p-1.5 hover:bg-red-100 rounded-lg group"
                  >
                    <X className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                  </button>
                </div>
              </div>
            ))}

            {/* Upload Card */}
            <div
              onClick={() => setShowUploadModal(true)}
              className="p-4 border rounded-lg border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="text-center">
                <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload New Resource</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <>
          {isLoading ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
                <p className="text-gray-600">Uploading...</p>
              </div>
            </div>
          ) : (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div
                className="bg-white rounded-lg p-6 max-w-md w-full"
                onDragEnter={handleDrag}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Upload Resources</h2>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop your files here, or{" "}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: PDF, PPT, Images, and more
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Book;
