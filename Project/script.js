// ইনপুট বক্স থেকে তথ্য নেয়ার জন্য ইনপুটবক্সের রেফারেন্স নিই
const inputbox = document.getElementById("input-box");

// টাস্ক লিস্ট দেখানোর জন্য লিস্ট কন্টেইনারের রেফারেন্স নিই
const listContainer = document.getElementById("list-container");

// নতুন টাস্ক যোগ করার ফাংশন
function addTask(){
    // যদি ইনপুট ফিল্ড ফাঁকা থাকে, সতর্কবার্তা দেখান
    if(inputbox.value === ''){
        alert("আপনাকে কিছু লিখতে হবে");
    }
    else{
        // নতুন টাস্ক হিসেবে একটি li এলিমেন্ট তৈরি করা
        let li = document.createElement("li");
        li.innerHTML = inputbox.value; // ইনপুটের মান li-তে যোগ করা
        listContainer.appendChild(li); // লিস্টে নতুন টাস্ক যোগ করা

        // ডিলিট করার জন্য একটি span তৈরি করা এবং এতে "×" যোগ করা
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span); // টাস্কের পাশে span যোগ করা
    }
    inputbox.value = ""; // ইনপুট বক্স খালি করা
    saveData(); // টাস্ক সেভ করা
}

// টাস্কে ক্লিক ইভেন্ট যোগ করা
listContainer.addEventListener("click", function(e){
   // টাস্কে ক্লিক করলে সেটি চেক বা আনচেক করা
   if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
   }
   // স্প্যান ক্লিক করলে টাস্ক মুছে ফেলা
   else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
   }
}, false);

// টাস্ক সেভ করার ফাংশন (লোকাল স্টোরেজে ডাটা সংরক্ষণ)
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

// লোকাল স্টোরেজ থেকে আগের টাস্ক লোড করা
function slowTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

// পেজ লোডের সময় আগের টাস্কগুলো দেখানো
slowTask();
