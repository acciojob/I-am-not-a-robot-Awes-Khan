//your code here
document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('.image-container');
    const resetButton = document.getElementById('reset');
    const verifyButton = document.getElementById('verify');
    const para = document.getElementById('para');
    const message = document.getElementById('h');

	let selectedImages = [];
    let identicalClass = '';
    let imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];

	function randomizedArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


	function renderImages() {
        identicalClass = imageClasses[Math.floor(Math.random() * imageClasses.length)];
        const classes = randomizedArray([...imageClasses, identicalClass]);
        imageContainer.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            const img = document.createElement('img');
            img.className = classes[i];
            img.dataset.className = classes[i];
            img.addEventListener('click', handleClick);
            imageContainer.appendChild(img);
        }
    }

    function handleClick(event) {
        const clickedImage = event.target;
        const imageClass = clickedImage.dataset.className;

        if (selectedImages.length < 2 && !selectedImages.includes(imageClass)) {
            selectedImages.push(imageClass);

            if (selectedImages.length === 2) {
                verifyButton.style.display = 'inline';
            }

            resetButton.style.display = 'inline';
        }

        if (selectedImages.length === 2) {
            verifyButton.addEventListener('click', handleVerifyClick);
        }
    }

    function handleVerifyClick() {
        const [first, second] = selectedImages;

        if (first === second) {
            para.textContent = 'You are a human. Congratulations!';
        } else {
            para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        }

        verifyButton.style.display = 'none';
        resetButton.style.display = 'none';
        selectedImages = [];
    }

    function resetState() {
        selectedImages = [];
        verifyButton.style.display = 'none';
        para.textContent = '';
        renderImages();
    }

    resetButton.addEventListener('click', resetState);

    renderImages();
});