// The link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/PfaS82Wgu/";

let model, maxPredictions;

// Load the image model
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
}

// Classify image from input file
async function classify() {
  const imageUpload = document.getElementById("imageUpload");
  const img = await loadImage(imageUpload.files[0]);
  const prediction = await model.predict(img);
  displayImage(img.src);
  displayLabels(prediction);
}

// Load image from input file
function loadImage(file) {
  return new Promise((resolve) => {
    if (!file || !file.type.match(/image.*/)) return; // Verify if the file is an image
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(createImage(reader.result)));
    reader.readAsDataURL(file);
  });
}

// Create image element from URL
function createImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.src = url;
  });
}

// Display image in HTML
function displayImage(url) {
  const imgContainer = document.getElementById("image-container");
  imgContainer.innerHTML = `<img src="${url}" alt="uploaded image">`;
}

// Display class labels in HTML
function displayLabels(prediction) {
  const labelContainer = document.getElementById("label-container");
  const sortedPrediction = prediction
    .map((p, i) => ({ probability: p.probability.toFixed(2), className: p.className, index: i }))
    .sort((a, b) => b.probability - a.probability);
  labelContainer.innerHTML = "";
  sortedPrediction.forEach((p) => {
    const label = document.createElement("div");
    label.classList.add("label");
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.width = `${p.probability * 100}%`;
    if (p.probability >= 0.5) {
      bar.classList.add("high");
    } else if (p.probability >= 0.2) {
      bar.classList.add("medium");
    } else {
      bar.classList.add("low");
    }
    label.appendChild(bar);
    const text = document.createElement("div");
    text.classList.add("text");
    text.innerHTML = `${p.className}: ${p.probability * 100}%`;
    label.appendChild(text);
    labelContainer.appendChild(label);
  });
}

// Initialize image model
init();

// Add event listener to input for image upload
const imageUpload = document.getElementById("imageUpload");
imageUpload.addEventListener("change", () => {
  classify();
});
