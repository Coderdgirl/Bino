const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

const searchData = {
    internship: [
        { title: 'Software Engineering Intern', company: 'TechCorp', category: 'Internships' },
        { title: 'Marketing Intern', company: 'StartupHub', category: 'Internships' },
        { title: 'Data Science Intern', company: 'AI Labs', category: 'Internships' }
    ],
    job: [
        { title: 'Full Stack Developer', company: 'WebSolutions', category: 'Jobs' },
        { title: 'Product Manager', company: 'InnovateCo', category: 'Jobs' },
        { title: 'UX Designer', company: 'DesignStudio', category: 'Jobs' }
    ],
    college: [
        { title: 'Tech Fest 2024', company: 'MIT', category: 'Events' },
        { title: 'Career Fair', company: 'Stanford', category: 'Events' },
        { title: 'Hackathon', company: 'Berkeley', category: 'Events' }
    ],
    event: [
        { title: 'Startup Networking Meetup', company: 'TechHub', category: 'Events' },
        { title: 'AI Conference 2024', company: 'AI Society', category: 'Events' },
        { title: 'Music Festival', company: 'Downtown Events', category: 'Events' }
    ],
    service: [
        { title: 'Web Development Services', company: 'DevStudio', category: 'Services' },
        { title: 'Graphic Design & Branding', company: 'CreativeHub', category: 'Services' },
        { title: 'Digital Marketing', company: 'MarketPro', category: 'Services' }
    ]
};

function addMessage(text, isUser = false, isHTML = false, withTyping = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    
    messageDiv.appendChild(bubbleDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    if (withTyping && !isUser) {
        bubbleDiv.innerHTML = '<span class="typing-indicator"><span></span><span></span><span></span></span>';
        setTimeout(() => {
            if (isHTML) {
                bubbleDiv.innerHTML = text;
            } else {
                bubbleDiv.textContent = text;
            }
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    } else {
        if (isHTML) {
            bubbleDiv.innerHTML = text;
        } else {
            bubbleDiv.textContent = text;
        }
    }
}

function predictCategory(query) {
    const lowerQuery = query.toLowerCase();
    const keywords = {
        internship: ['intern', 'internship', 'trainee', 'student'],
        job: ['job', 'career', 'position', 'hiring', 'work', 'employment'],
        college: ['college', 'university', 'campus', 'student'],
        event: ['event', 'meetup', 'conference', 'festival', 'workshop'],
        service: ['service', 'help', 'agency', 'freelance', 'consultant']
    };
    
    for (const [category, words] of Object.entries(keywords)) {
        if (words.some(word => lowerQuery.includes(word))) {
            return category;
        }
    }
    return null;
}

function searchQuery(query) {
    const lowerQuery = query.toLowerCase();
    let results = [];
    const predicted = predictCategory(query);
    
    for (const [keyword, items] of Object.entries(searchData)) {
        if (lowerQuery.includes(keyword)) {
            results = results.concat(items);
        }
    }
    
    if (results.length === 0 && predicted) {
        results = searchData[predicted] || [];
    }
    
    if (results.length === 0) {
        return '<p>No results found. Try searching for: "internship", "job", "college events", or "services"</p>';
    }
    
    const categorized = {};
    results.forEach(item => {
        if (!categorized[item.category]) {
            categorized[item.category] = [];
        }
        categorized[item.category].push(item);
    });
    
    let response = '<p>Here\'s what I found:</p>';
    for (const [category, items] of Object.entries(categorized)) {
        response += `<div class="result-category">📌 ${category}</div>`;
        items.forEach(item => {
            const url = `apply.html?title=${encodeURIComponent(item.title)}&company=${encodeURIComponent(item.company)}`;
            response += `<a href="${url}" target="_blank" class="result-item">${item.title} at ${item.company}</a>`;
        });
    }
    
    return response;
}

function handleSend() {
    const query = userInput.value.trim();
    if (!query) return;
    
    addMessage(query, true);
    userInput.value = '';
    
    addMessage('', false, false, true);
    
    setTimeout(() => {
        chatMessages.removeChild(chatMessages.lastChild);
        const response = searchQuery(query);
        addMessage(response, false, true);
    }, 1500);
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSend();
    }
});
