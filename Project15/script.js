
let btn=document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")

function speak(text){
    let text__speak =new SpeechSynthesisUtterance(text)
    text__speak.rate =1
    text__speak.pitch=1
    text__speak.volume=1
    text__speak.lang = "en-GB"; 
    window.speechSynthesis.speak(text__speak)
}

function wishMe(){
    let day= new Date()
    let hours=day.getHours()
    console.log(hours)
    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours<16){
        speak("Good afternoon Sir")
    }else{
        speak("Good evening  Sir")
    }
}
window.addEventListener('load',()=>{
    wishMe()
}

)
let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()


recognition.onresult =(event)=>{
    let currentIndex= event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText =transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click", ()=>{

    recognition.start()
    btn.style.display ="none"
    voice.style.display ="block"

})

function takeCommand(message){
    btn.style.display ="flex"
    voice.style.display ="none"
if(message.includes("hello") || message.includes("hey") || message.includes("hi")){
    speak("hello sir,what can I help you?")
}else if(message.includes("who are you")){
 speak("I am virtual assistant , created by Zishan IT limited")
}else if(message.includes("bye") || message.includes("goodbye")){
    speak("Goodbye Sir! Have a great day!");
}else if(message.includes("hear") || message.includes("hearing")){
    speak("Yes, I can hear you clearly! How can I help you today?");
}
else if(message.includes("help") || message.includes("assist")) {
    speak("How can I assist you today? Feel free to ask anything!");
}  else if(message.includes("thank you") || message.includes("thanks")) {
    speak("You're welcome, sir! I'm here to help.");
} else if(message.includes("how are you") || message.includes("how's it going")) {
    speak("I'm doing great, thank you for asking! How about you?");
} else if(message.includes("music") || message.includes("play song")) {
    speak("I can't play music, but I recommend you listen to your favorite playlist!");
} else if(message.includes("location") || message.includes("where are you")) {
    speak("I exist in the virtual world, created by Zishan IT Limited!");
}else if(message.includes("Zishan") || message.includes("zeeshan") || message.includes("about Zishan") || message.includes("jishan") || message.includes("who is Zishan")) {
    speak("Zishan, full name Abdullah Al Mamun Zishan, is a passionate student in the Department of Computer Science and Engineering at Feni University. He is dedicated to continuous learning and personal growth, specializing in coding, IT, and technology. Zishan is also the creator of ZakaBot, a virtual assistant developed by Zishan IT Limited. His mission is to contribute to society through his knowledge and skills in technology.");
}else if(message.includes("Izma") || message.includes("isma") || message.includes("about Izma") || message.includes("who is Izma")) {
    speak("In Zishan's eyes, Izma is the epitome of grace and beauty. Every glance at her feels like discovering something new and mesmerizing. Her smile brightens even the darkest days, and her kindness makes the world feel like a better place.");
}else if(message.includes("morning") ){
    speak("Good morning! How can I assist you today? Feel free to ask anything!");
}else if(message.includes("evening") ){
    speak("Good evening! How can I assist you today? Feel free to ask anything!");
}else if(message.includes("afternoon") ){
    speak("Good afternoon! How can I assist you today? Feel free to ask anything!");
}else if (message.toLowerCase().includes("university")) {
    console.log("Matched University");
    speak("Feni University, located in Feni, Bangladesh, offers a variety of undergraduate and postgraduate programs. It's known for its focus on quality education and its supportive environment for students.");
}

else if(message.includes("open youtube")){
    speak("opening youtube...... ")
    window.open("https://www.youtube.com/","_blank")
   }
   else if(message.includes("open google")){
    speak("opening google...... ")
    window.open("https://www.google.com/","_blank")
   }
   else if(message.includes("open facebook")){
    speak("opening facebook...... ")
    window.open("https://www.facebook.com/","_blank")
   }
   else if(message.includes("open linkedin")){
    speak("opening linkedln...... ")
    window.open("https://www.linkedin.com/feed/","_blank")
   }
   else if(message.includes("open my linkedin profile")){
    speak("opening your linkedln profile...... ")
    window.open("https://www.linkedin.com/in/abdullah-al-mamun-zishan-606550282/","_blank")
   }

   else if(message.includes("open calculator")){
    speak("opening calculator...... ")
    window.open("calculator://","_blank")
   }
   else if(message.includes("open whatsapp")){
    speak("opening WhatsApp...... ")
    window.open("whatsapp://")
   }
   else if(message.includes("time")){
    let time= new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
    speak(time)
   }
   else if(message.includes("date")){
    let date= new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
    speak(date)
   }

   else{
    let finalText = "this is what I found on internet regarding" + message.replace("Good  evening Sir","")
     || message.replace("Good  evening, Sir","") || message.replace("Good  afternoon Sir","") ||
     message.replace("Good  afternoon ,Sir","") || message.replace("Good  Morning Sir","")
     || message.replace("Good  Morning ,Sir","")
    speak(finalText)
window.open(`https://www.bing.com/search?q=${message.replace("Good evening Zishan Sir","")}`,"_blank")
   }

   }

   