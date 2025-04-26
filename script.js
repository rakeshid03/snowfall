    // Get the snow container and child image elements
    const snowContainer = document.getElementById("snow-container");
    const child = document.getElementById("child");
    
    // Function to create a single snowflake
    function createSnowflake() {
      const flake = document.createElement("div");
      flake.classList.add("snowflake");
      flake.style.left = `${Math.random() * window.innerWidth}px`; // Random horizontal position
      flake.style.animationDuration = `${2 + Math.random() * 3}s`; // Random fall speed
      flake.style.width = flake.style.height = `${4 + Math.random() * 7}px`; // Random snowflake size
      
      snowContainer.appendChild(flake);
      
      // Remove snowflake after it falls
      setTimeout(() => flake.remove(), 5000);
    }
    
    // Function to create floating text effects
    function createFloatingText() {
      const messages = ["Yay!", "Snow!", "Woohoo!", "Hurry!", "Snowfall", "Wow!"];
      const text = document.createElement("div");
      text.className = "floating-text";
      text.innerText = messages[Math.floor(Math.random() * messages.length)]; // Pick random message
      
      snowContainer.appendChild(text);
      
      // Remove floating text after it finishes animation
      setTimeout(() => text.remove(), 2000);
    }
    
    // Variables to manage shake detection and child mood
    let lastShake = Date.now();
    const shakeThreshold = 9; // Minimum shake force needed
    let moodTimeout;
    
    // Listen for device motion events
    window.addEventListener("devicemotion", (event) => {
      const acc = event.accelerationIncludingGravity;
      const total = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2); // Total acceleration
      
      // Detect a valid shake
      if (total > shakeThreshold && Date.now() - lastShake > 1000) {
        lastShake = Date.now();
        
        // Make the child happy
        child.src = "happy.png";
        child.alt = "Happy Child";
        clearTimeout(moodTimeout);
        
        // Create multiple snowflakes
        for (let i = 0; i < 50; i++) {
          setTimeout(createSnowflake, i * 50);
        }
        
        // Create floating texts
        for (let i = 0; i < 2; i++) {
          setTimeout(createFloatingText, i * 300);
        }
        
        // After 5 seconds of no shake, make the child sad again
        moodTimeout = setTimeout(() => {
          child.src = "sad.png";
          child.alt = "Sad Child";
        }, 5000);
      }
    });