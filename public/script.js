document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.querySelector('canvas');
  let ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let font_size = 16;
  let columns = width / font_size;
  let drops = [];

  // Initialize drops
  for (let x = 0; x < columns; x++) {
    drops[x] = Math.floor(Math.random() * height);
  }

  // Function to draw the rain
  const draw = () => {
    // Set the canvas background
    ctx.fillStyle = 'rgba(192,192,192, 0.05)'; //rgb(192,192,192)
    ctx.fillRect(0, 0, width, height);

    // Set the text color and font
    ctx.fillStyle = '#00FF00';
    ctx.font = `${font_size}px monospace`;

    // Loop through each column
    for (let i = 0; i < drops.length; i++) {
      // Generate a random character
      let text = String.fromCharCode(Math.random() * 94 + 33);

      // Draw the character
      ctx.fillText(text, i * font_size, drops[i] * font_size);

      // Reset the drop if it's at the bottom
      if (drops[i] * font_size > height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      // Move the drop down
      drops[i]++;
    }
  };

  // Update the animation every 20 milliseconds
  setInterval(draw, 20);
});
