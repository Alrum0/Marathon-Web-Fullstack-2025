document.getElementById('image-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const url = document.getElementById('image-url').value;
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = url;

  img.onload = () => {
    const size = Math.min(img.width, img.height);
    const canvas = document.getElementById('original-canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const startX = img.width > img.height ? (img.width - size) / 2 : 0;
    const startY = img.height > img.width ? (img.height - size) / 2 : 0;
    ctx.drawImage(img, startX, startY, size, size, 0, 0, size, size);

    const imageData = ctx.getImageData(0, 0, size, size);
    showRGBChannels(imageData, size);
  };
});

function showRGBChannels(imageData, size) {
  const channels = ['r', 'g', 'b'];
  const canvases = {
    r: document.getElementById('r-canvas'),
    g: document.getElementById('g-canvas'),
    b: document.getElementById('b-canvas'),
  };

  channels.forEach((channel) => {
    const newImageData = new ImageData(size, size);
    for (let i = 0; i < imageData.data.length; i += 4) {
      newImageData.data[i] = channel === 'r' ? imageData.data[i] : 0;
      newImageData.data[i + 1] = channel === 'g' ? imageData.data[i + 1] : 0;
      newImageData.data[i + 2] = channel === 'b' ? imageData.data[i + 2] : 0;
      newImageData.data[i + 3] = 255;
    }
    const ctx = canvases[channel].getContext('2d');
    canvases[channel].width = size;
    canvases[channel].height = size;
    ctx.putImageData(newImageData, 0, 0);
  });
}
