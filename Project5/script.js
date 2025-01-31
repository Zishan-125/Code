
// টাইমারের সময় গণনা রাখার জন্য সেকেন্ড এবং ইন্টারভ্যাল ভ্যারিয়েবল
let secondsElapsed = 0;
let interval = null;

// HTML এর যেই জায়গায় টাইমার দেখানো হবে, তার রেফারেন্স নিচ্ছি
const time = document.getElementById("time");

// টাইমারকে মিনিট এবং সেকেন্ডে ফরম্যাট করে দেখানোর ফাংশন
function setTime(){
    const minutes = Math.floor(secondsElapsed / 60); // সেকেন্ড থেকে মিনিট বের করছি
    const seconds = secondsElapsed % 60; // অবশিষ্ট সেকেন্ড গুলো নিচ্ছি
    time.innerHTML = `${minutes} : ${seconds}`; // ডিসপ্লেতে সময় দেখাচ্ছি
}

// প্রতি সেকেন্ডে টাইমার ১ সেকেন্ড করে বাড়ানোর ফাংশন
function timer() {
    secondsElapsed++; // ১ সেকেন্ড যোগ করছি
    setTime(); // নতুন সময় ডিসপ্লেতে আপডেট করছি
}

// টাইমার শুরু করার ফাংশন
function startClock(){
    if (interval) stopClock(); // যদি টাইমার ইতিমধ্যেই চলে, তবে থামাই
    interval = setInterval(timer, 1000); // `timer` ফাংশনকে প্রতি সেকেন্ডে একবার চালাচ্ছি
}

// টাইমার থামানোর ফাংশন
function stopClock(){
    clearInterval(interval); // টাইমার বন্ধ করতে ইন্টারভ্যাল ক্লিয়ার করছি
}

// টাইমার রিসেট করার ফাংশন
function resetClock(){
    startClock(); // টাইমার নতুন করে শুরু করছি
    secondsElapsed = 0; // সময় শূন্যে রিসেট করছি
    setTime(); // ডিসপ্লেতে 0:0 দেখাচ্ছি
}
