
let hour__hand = document.querySelector(".hour-hand");
let min__hand = document.querySelector(".min-hand");
let sec__hand = document.querySelector(".second-hand");
let dh=document.querySelector(".dh")
let dm=document.querySelector(".dm")
let ds=document.querySelector(".ds")

setInterval(() => {
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    
    // Calculate the rotations
    let hrotation = 30 * h + h / 2; // 360° / 12 hours = 30° per hour, plus offset from minutes
    let mrotation = 6 * m; // 360° / 60 minutes = 6° per minute
    let srotation = 6 * s; // 360° / 60 seconds = 6° per second

    // Apply rotations
    hour__hand.style.transform = `rotate(${hrotation}deg)`
    min__hand.style.transform = `rotate(${mrotation}deg)`
    sec__hand.style.transform = `rotate(${srotation}deg)`
    dh.innerHTML=(h<10?'0'+h:h)>12?h-=12:h;
    dm.innerHTML=m<10?'0'+m:m;
    ds.innerHTML=s<10?'0'+s:s;
}, 1000); // Update every second
