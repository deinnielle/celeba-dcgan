const predictButton = document.querySelector("#predict");
const saveButton = document.querySelector("#save");
const canvas = document.querySelector("#generated");
const context = canvas.getContext("2d");
const CANVAS_SIZE = 128;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

async function generate() {
  const model = await tf.loadLayersModel("generator/model.json");

  const seed = tf.randomNormal([1, 100]);
  let prediction = await model.predict(seed).array();

  prediction = prediction[0];

  let r, g, b;

  for (let height = 0; height < prediction.length; height++) {
    for (let width = 0; width < prediction[height].length; width++) {
      for (let colorValue = 0; colorValue <= 2; colorValue++) {
        if (colorValue === 0) {
          r = prediction[height][width][colorValue] * 255;
        }

        if (colorValue === 1) {
          g = prediction[height][width][colorValue] * 255;
        }

        if (colorValue === 2) {
          b = prediction[height][width][colorValue] * 255;

          context.fillStyle = `rgb(
            ${r},
            ${g},
            ${b})`;

          context.fillRect(width, height, 1, 1);
        }
      }
    }
  }
}

function save() {
  const link = document.createElement("a");
  link.download = "generated.png";
  link.href = canvas.toDataURL();
  link.click();
}

predictButton.addEventListener("click", generate);
saveButton.addEventListener("click", save);
// generate();
