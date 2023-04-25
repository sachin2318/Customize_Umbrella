const colors = [
  {
    color: "Pink",
    isClickable: true,
  },
  {
    color: "lightBlue",
    isClickable: true,
  },
  {
    color: "Yellow",
    isClickable: true,
  },
];

const getColor = (color) => {
  let bg = "#e6f6fc";
  switch (color) {
    case "lightBlue":
      bg = "#e6f6fc";
      break;
    case "Pink":
      bg = "#ffdfec";
      break;
    case "Yellow":
      bg = "#fffaed";
      break;
    default:
      bg = "#e6f6fc";
      break;
  }
  return bg;
};

const getLoaderColor = (color) => {
  console.log(color);
  let fill = "";
  switch (color) {
    case "rgb(230, 246, 252)":
      fill = "#b8e6f7";
      break;

    case "rgb(255, 223, 236)":
      fill = "#ffacce";
      break;

    case "rgb(255, 250, 237)":
      fill = "#ffe5a1";
      break;

    default:
      fill = "#b8e6f7";
      break;
  }
  return fill;
};
const handleColor = (color) => {
  let umbrella = document.getElementById("umbrella_img");
  let body = document.getElementsByTagName("body");
  let UploadDiv = document.getElementById("imageUpload");
  UploadDiv.style.backgroundColor = `${color}`;
  body[0].style.backgroundColor = getColor(color);
  umbrella.src = `/Public/${color} umbrella.png`;
  // umbrella.src = `/Public/loader_icon.svg`;
};

const colorDiv = document.getElementById("colorBadge");

for (let i = 0; i < colors.length; i++) {
  // Creates a new div element
  let newDiv = document.createElement("div");

  newDiv.style.backgroundColor = colors[i].color;
  newDiv.style.width = "25px";
  newDiv.style.height = "25px";
  newDiv.style.borderRadius = "50%";
  newDiv.style.marginRight = "10px";

  colorDiv.appendChild(newDiv);
  if (colors[i].isClickable)
    newDiv.addEventListener("click", () => handleColor(colors[i].color));
}

let isImageUploaded = false;
const logoUmbrella = document.getElementById("logo_umbrella");
const umbrellaImg = document.getElementById("umbrella_img");
const uploadIcon = document.getElementById("imageSvg");
const smallLoader = document.getElementById("smallLoader");
const bigLoader = document.getElementById("bigLoader");
const upload = document.getElementById("upload_word");
const imageUpload = document.getElementById("imageUpload");
const logoBottom = document.getElementById("logo-bottom");
const crossIcon = document.getElementById("crossSvg");

imageUpload.addEventListener("click", () => {
  if (!isImageUploaded) {
    const body = document.body;
    const bgColor = window.getComputedStyle(body).backgroundColor;
    const fileInput = document.createElement("input");

    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", () => {
      const maxSize = 5 * 1024 * 1024;
      const file = fileInput.files[0];
      const reader = new FileReader();

      if (file.size >= maxSize) {
        alert("File too Big, please select a file less than 5mb");

        let timeout = setTimeout(() => {
          uploadIcon.style.display = "block";
          smallLoader.style.display = "none";
          clearTimeout(timeout);
        }, 1000);

        return;
      }

      reader.addEventListener("load", () => {
        uploadIcon.style.display = "none";
        smallLoader.style.display = "block";
        smallLoader.style.margin = "0px 15px";
        smallLoader.style.fill = bgColor;
        umbrellaImg.style.display = "none";
        bigLoader.style.display = "block";
        bigLoader.style.fill = getLoaderColor(bgColor);
        isImageUploaded = true;
        upload.innerText = file.name;
        crossIcon.style.display = "block";
        imageUpload.style.justifyContent = "space-between";
        let timeout = setTimeout(() => {
          logoUmbrella.style.display = "block";
          logoBottom.style.display = "block";
          logoBottom.src = reader.result;
          umbrellaImg.style.display = "block";
          bigLoader.style.display = "none";
          uploadIcon.style.display = "block";
          smallLoader.style.display = "none";
          clearTimeout(timeout);
        }, 1000);
      });
      reader.readAsDataURL(file);
    });
    fileInput.click();
  } else {
    logoUmbrella.style.display = "none";
    imageUpload.style.justifyContent = "unset";
    isImageUploaded = false;
    upload.innerText = "UPLOAD LOGO";
    logoBottom.src = "";
    logoBottom.style.display = "none";
    crossIcon.style.display = "none";
  }
});
