const apiKey = 'nyXymgxBnsSca9vHrpGRbjQD'; // Замените на ваш ключ API
const fileInput = document.getElementById('file-input');
const removeBgBtn = document.getElementById('remove-bg-btn');
const originalImage = document.getElementById('original-image');
const modifiedImage = document.getElementById('modified-image');
const downloadLink = document.getElementById('download-link');
const deleteImageBtn = document.getElementById('delete-image');

fileInput.addEventListener('change', handleFileSelect);
removeBgBtn.addEventListener('click', removeBackground);
deleteImageBtn.addEventListener('click', deleteImage);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            originalImage.src = e.target.result;
            originalImage.style.display = 'block';
            removeBgBtn.disabled = false;
            deleteImageBtn.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

async function removeBackground() {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey,
        },
        body: formData,
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        modifiedImage.src = url;
        modifiedImage.style.display = 'block';
        downloadLink.href = url;
        downloadLink.download = 'modified-image.png';
        downloadLink.style.display = 'block';
    } else {
        console.error('Ошибка при удалении фона:', response.statusText);
    }
}

function deleteImage() {
    originalImage.src = '';
    modifiedImage.src = '';
    downloadLink.style.display = 'none';
    deleteImageBtn.style.display = 'none';
    removeBgBtn.disabled = true;
    fileInput.value = '';
}
