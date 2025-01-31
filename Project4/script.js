
// বিভিন্ন উক্তির একটি তালিকা তৈরি করা হয়েছে
const quotes = [
    "The best way to predict the future is to create it. – Peter Drucker",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "Do not wait to strike till the iron is hot; but make it hot by striking. – William Butler Yeats",
    "The only limit to our realization of tomorrow will be our doubts of today. – Franklin D. Roosevelt",
    "It always seems impossible until it's done. – Nelson Mandela",
    "The journey of a thousand miles begins with one step. – Lao Tzu",
    "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "Hardships often prepare ordinary people for an extraordinary destiny. – C.S. Lewis",
    "Your time is limited, don’t waste it living someone else’s life. – Steve Jobs",
    "জীবনের অর্থ হচ্ছে জীবনের মধ্যেই। – জসিম উদ্দিন",
    "সত্যিকারের জ্ঞানী ব্যক্তি সেই, যে নিজের অজ্ঞানতাকে স্বীকার করতে পারে। – লালন ফকির",
    "প্রত্যেকের ভেতরেই একটা আকাশ থাকে, যা খুঁজে বের করতে হয়। – হুমায়ূন আহমেদ",
    "তুমি পৃথিবীকে যেমন ভাব, পৃথিবীও ঠিক তেমনটাই হয়। – ড. মুহম্মদ ইউনুস",
    "স্বাধীনতা মানে মাথা নত না করা। – আনিসুল হক",
    "যার মধ্যে মানবতা নেই, সে বড় কোনো কাজ করতে পারে না। – কাজী নজরুল ইসলাম",
    "মানুষের বেঁচে থাকার জন্য সবচেয়ে বড় শক্তি হলো তার ইচ্ছাশক্তি। – হাসান আজিজুল হক",
    "বই পড়া মানুষের জীবনের শ্রেষ্ঠ বিনিয়োগ। – সৈয়দ মুজতবা আলী",
    "তুমি যা খুঁজছো, তা-ও তোমাকে খুঁজছে। – জালালুদ্দিন রুমি",
    "আলো যে তোমার ভিতরে, তা কখনো বাইরে খুঁজে পাবে না। – জালালুদ্দিন রুমি",
    "ভালোবাসার পথের প্রথম ধাপ হলো নিজেকে হারিয়ে ফেলা। – জালালুদ্দিন রুমি",
    "তুমি যদি নিজের জীবনের পাখিকে উড়তে দাও, তাহলে দেখবে, সে তোমার হৃদয়ের দিকে ফিরে আসবে। – জালালুদ্দিন রুমি",
    "তোমার ভেতরে একটি মোমবাতি আছে, সেটা জ্বালাও। – জালালুদ্দিন রুমি",
    "আমাদের এই দুনিয়ার বাহ্যিক জীবনের বাইরে একটি জীবন আছে, যা আমাদের দেখা ও অনুভবের বাইরে। – জালালুদ্দিন রুমি",
    "অন্ধকারের পরে, প্রতিটি ভোর নতুন একটি সূর্যের আলো নিয়ে আসে। – জালালুদ্দিন রুমি",
    "সত্যিকারের প্রেম সেই, যা আত্মার পরিপূর্ণতায় পৌছে দেয়। – জালালুদ্দিন রুমি",
    "তুমি যেখানে আছো, সেখান থেকেই শুরু করো। – জালালুদ্দিন রুমি",
    "হৃদয় যদি শুদ্ধ হয়, তবে মনের প্রতিটি কাজ হবে পবিত্র। – জালালুদ্দিন রুমি"
];

// ব্যবহৃত ইনডেক্স ট্র্যাক করার জন্য একটি সেট তৈরি করা হয়েছে
const usedIndexes = new Set();
const quoteElement = document.getElementById("quote"); // HTML এর কোট দেখানোর জায়গার রেফারেন্স

// একটি নতুন উক্তি জেনারেট করার ফাংশন
function generateQuote(){
    // যদি সব ইনডেক্সই একবার করে ব্যবহৃত হয়ে যায়, তাহলে সেট খালি করে নিচ্ছি
    if (usedIndexes.size >= quotes.length) {
        usedIndexes.clear();
    }
    
    // লুপ শুরু করছি একটি নতুন, অব্যবহৃত ইনডেক্স পাওয়ার জন্য
    while (true) {
        const randomIdx = Math.floor(Math.random() * quotes.length); // র‍্যান্ডম একটি ইনডেক্স নিচ্ছি

        // যদি এই ইনডেক্সটি আগেই ব্যবহৃত হয়ে থাকে, তাহলে আবার নতুন ইনডেক্স চেষ্টা করব
        if (usedIndexes.has(randomIdx)) continue;

        // র‍্যান্ডম উক্তিটি নিচ্ছি এবং সেটি HTML এ দেখাচ্ছি
        const quote = quotes[randomIdx];
        quoteElement.innerHTML = quote;
        
        // ব্যবহৃত ইনডেক্সগুলো সেটে যুক্ত করছি, যাতে একই উক্তি বারবার না আসে
        usedIndexes.add(randomIdx);
        break; // নতুন উক্তি পাওয়া গেলে লুপ থেকে বের হয়ে আসছি
    }
}
