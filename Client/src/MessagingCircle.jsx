
import { MessageCircle, User, Bell } from 'lucide-react';

const MessagingCircle = () => {
    const users = [
        { name: 'John Doe', message: 'Hey, how are you?', time: '2m ago', color: 'blue' },
        { name: 'Jane Smith', message: "Let's catch up soon!", time: '5m ago', color: 'purple' },
        { name: 'Mike Johnson', message: 'The project is coming along nicely!', time: '15m ago', color: 'green' },
        { name: 'Sarah Wilson', message: 'Did you see the latest updates?', time: '30m ago', color: 'pink' },
        { name: 'Alex Brown', message: 'Thanks for your help yesterday!', time: '1h ago', color: 'yellow' },
        { name: 'Emma Davis', message: 'Meeting scheduled for tomorrow', time: '2h ago', color: 'indigo' },
        { name: 'Chris Taylor', message: 'Can you review my code?', time: '3h ago', color: 'red' },
        { name: 'Lisa Anderson', message: 'The designs are ready for review', time: '4h ago', color: 'teal' }
    ];

    return (
        <div className="mx-auto bg-white  shadow-xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <MessageCircle className="h-6 w-6 text-white" />
                        <h2 className="text-xl font-bold text-white">Messaging</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Bell className="h-5 w-5 text-white opacity-80 hover:opacity-100 cursor-pointer" />
                        <div className="relative">
                            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                                <User className="h-5 w-5 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-3 border-b border-gray-100">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search messages..." 
                        className="w-full pl-4 pr-10 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                    <div className="absolute right-3 top-2.5 text-gray-400">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Message List */}
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto hide-scroll">
                {users.map((user, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className={`h-12 w-12 rounded-full bg-${user.color}-100 flex items-center justify-center`}>
                                    <User className={`h-6 w-6 text-${user.color}-500`} />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                    <span className="text-xs text-gray-500">{user.time}</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{user.message}</p>
                            </div>
                            <div className="hidden sm:flex items-center space-x-2">
                                <button className="p-1 rounded-full hover:bg-gray-100">
                                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="fixed w-full bottom-0 bg-white border-t border-gray-100 p-4">
                <div className="flex justify-between items-center">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        New Message
                    </button>
                    <div className="flex space-x-2">
                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagingCircle;