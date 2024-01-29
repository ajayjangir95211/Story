const imagePreview = document.querySelector("#image-upload-control img");
const imagePicker = document.querySelector("#image-upload-control input");

function updateImagePreview() {
    const files = imagePicker.files;
    if (!files || files.length === 0) {
        imagePreview.style.display = "none";
        return;
    }

    const image = files[0];

    imagePreview.src = URL.createObjectURL(image);  
    imagePreview.style.display = "block";
}

imagePicker.addEventListener("change", updateImagePreview);