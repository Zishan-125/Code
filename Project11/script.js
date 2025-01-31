function startCelebration() {
    const canvas = document.getElementById("confetti");
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.getElementById("celebration").style.display = "block";

    const confettiCount = 300;
    const colors = ["#FFD700", "#FF4500", "#32CD32", "#1E90FF", "#FF69B4"];

    const confetti = Array.from({ length: confettiCount }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: Math.random() * 10 + 5,
        h: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocityX: Math.random() * 2 - 1,
        velocityY: Math.random() * 5 + 2,
    }));

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach((c) => {
            context.fillStyle = c.color;
            context.fillRect(c.x, c.y, c.w, c.h);

            c.x += c.velocityX;
            c.y += c.velocityY;

            if (c.y > canvas.height) c.y = -10;
            if (c.x > canvas.width) c.x = 0;
            if (c.x < 0) c.x = canvas.width;
        });

        requestAnimationFrame(render);
    }

    render();
}



