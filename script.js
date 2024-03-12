const video = document.getElementById('video');
const outputCanvas = document.getElementById('output');
const ctx = outputCanvas.getContext('2d');

/* 
const btn = document.querySelector("#order");


btn.addEventListener("click", () => {
  fetch('/save-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      order: "burger",
      qty: 2,
      price: 10,
      total: 20
    },
  });

})
 */
async function loadHandposeModel() {
  try {
    const model = await handpose.load();
    return model;
  } catch (error) {
    console.error("Error loading the handpose model: " + error);
    return null;
  }
}

async function startVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  await video.play();

  const handposeModel = await loadHandposeModel();
  if (handposeModel) {
    detectAndSendHandPoses(handposeModel);
  }
}

startVideo();

async function detectAndSendHandPoses(model) {
  async function animate() {
    const predictions = await model.estimateHands(video);

    // You can process and draw the handpose on the canvas here.
    // For example, you can draw dots at key points or connect them to form lines.

    // Save the handpose data (e.g., predictions[0].landmarks) and send it to the backend.
    const handposeData = {
      landmarks: predictions[0].landmarks,
    };

    // Send the data to the backend server using fetch or another method.
    fetch('/save-handpose', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(handposeData),
    });

    requestAnimationFrame(animate);
  }

  animate();
}
