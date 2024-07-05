// script.js
const URL = "https://teachablemachine.withgoogle.com/models/o-1d0M-Cy/";
let model, maxPredictions, cropper;

// Load the image model
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
  console.log("Model loaded, total classes:", maxPredictions);
}

// Initialize image model
init();

document.getElementById('imageUpload').addEventListener('change', handleImageUpload);
document.getElementById('cropBtn').addEventListener('click', cropImage);
document.getElementById('classifyBtn').addEventListener('click', classifyCroppedImage);
document.getElementById('resetBtn').addEventListener('click', function() {
  window.location.reload();
});
document.getElementById('printerBtn').addEventListener('click', function() {
  window.print();
});

// Popup logic
window.onload = function() {
  const popup = document.getElementById("popup");
  const close = document.querySelector(".close");
  popup.style.display = "block";

  close.onclick = function() {
    popup.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  }
};

function handleImageUpload(event) {
  const imageUpload = event.target;
  if (imageUpload.files && imageUpload.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgElement = document.createElement('img');
      imgElement.id = 'image';
      imgElement.src = e.target.result;
      const imageContainer = document.getElementById('image-container');
      imageContainer.innerHTML = '';
      imageContainer.appendChild(imgElement);
      cropper = new Cropper(imgElement, {
        aspectRatio: 1,
        viewMode: 1,
      });
      document.getElementById('cropBtn').style.display = 'block';
    };
    reader.readAsDataURL(imageUpload.files[0]);
  }
}

function cropImage() {
  const canvas = cropper.getCroppedCanvas();
  const croppedImageContainer = document.getElementById('cropped-image-container');
  croppedImageContainer.innerHTML = '';
  const imgElement = document.createElement('img');
  imgElement.src = canvas.toDataURL('image/png');
  croppedImageContainer.appendChild(imgElement);
  cropper.destroy();
  document.getElementById('image-container').innerHTML = ''; // Remove the original image
  document.getElementById('cropBtn').style.display = 'none';
  document.getElementById('classifyBtn').style.display = 'block';
  document.getElementById('resetBtn').style.display = 'block';
  document.getElementById('printerBtn').style.display = 'block';
}

async function classifyCroppedImage() {
  const imgElement = document.querySelector('#cropped-image-container img');
  const img = new Image();
  img.src = imgElement.src;
  img.onload = async () => {
    const prediction = await model.predict(img);
    displayLabels(prediction);
  };
}

function displayLabels(prediction) {
  const labelContainer = document.getElementById("label-container");
  const sortedPrediction = prediction
    .filter(p => p.probability >= 0.01)
    .map((p, i) => ({
      probability: (p.probability * 100).toFixed(1),
      className: getFullClassName(p.className),
      index: i
    }))
    .sort((a, b) => b.probability - a.probability);
  
  labelContainer.innerHTML = "";
  sortedPrediction.forEach((p) => {
    const label = document.createElement("div");
    label.classList.add("label");
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.width = `${p.probability}%`;
    if (p.probability >= 50) {
      bar.classList.add("high");
    } else if (p.probability >= 20) {
      bar.classList.add("medium");
    } else {
      bar.classList.add("low");
    }
    label.appendChild(bar);
    const text = document.createElement("div");
    text.classList.add("text");
    text.innerHTML = `${p.className}: ${p.probability}%`;
    console.log(`Class: ${p.className}, Probability: ${p.probability}%`); // Log para depuração
    label.appendChild(text);
    labelContainer.appendChild(label);
  });
}

const CLASS_NAMES = {
  "Normal": "Normal",
  "Otite Média Aguda - Bacteriana": "Otite Média Aguda - Bacteriana",
  "Otite Média Crônica - Simples": "Otite Média Crônica - Simples",
  "Corpo Estranho": "Corpo Estranho",
  "Cerume Impactado": "Cerume Impactado",
  "Otite Externa Localizada": "Otite Externa Localizada",
  "Pós Operatório: Timpanoplastia": "Pós Operatório: Timpanoplastia",
  "Timpanosclerose": "Timpanosclerose",
  "Tubo de Ventilação: Shepard": "Tubo de Ventilação: Shepard",
  "Otite Externa Fúngica": "Otite Externa Fúngica",
  "Otite Externa Aguda - Difusa": "Otite Externa Aguda - Difusa",
  "Otite Média Aguda - Viral ou Inicial": "Otite Média Aguda - Viral ou Inicial",
  "Otite Média Crônica - Colesteatomatosa/Adesiva": "Otite Média Crônica - Colesteatomatosa/Adesiva",
  "Otite Média Serosa": "Otite Média Serosa",
  "Otite Média Aguda Suparativa/Supurada": "Otite Média Aguda Suparativa/Supurada",
  "Não é imagem Otoscópica": "Não é imagem Otoscópica"
};

function getFullClassName(truncatedClassName) {
  truncatedClassName = truncatedClassName.replace('...', '').trim(); // Remove reticências e espaços extras
  for (let key in CLASS_NAMES) {
    if (key.startsWith(truncatedClassName)) {
      console.log(`Matched: ${truncatedClassName} to ${CLASS_NAMES[key]}`);
      return CLASS_NAMES[key];
    }
  }
  console.log(`No match found for: ${truncatedClassName}`);
  return truncatedClassName; // Default to the truncated name if no match is found
}
