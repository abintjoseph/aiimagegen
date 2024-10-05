// const generateForm = document.querySelector('.generate-form');
// const imageGallery = document.querySelector('.img-gallery');

// const OPENAI_API_KEY = "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";

// const generateAiImages = async (userPrompt, userQuantity) => {
//     try {
//         const response = await fetch("https://api.openai.com/v1/images/generations", { // Removed extra space
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 "Authorization": `Bearer ${OPENAI_API_KEY}`
//             },
//             body: JSON.stringify({
//                 prompt: userPrompt,
//                 n: userQuantity,
//                 size: "512x512",
//                 response_format: "b64_json"
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`Error: ${response.status} ${response.statusText}`);
//         }

//         const { data } = await response.json(); // Get data from response
//         console.log(data);

//         // Update image gallery with generated images
//         const imagesMarkup = data.map((item, index) => `
//             <div class="img-card">
//                 <img src="data:image/png;base64,${item.b64_json}" alt="Generated image ${index + 1}">
//                 <a href="data:image/png;base64,${item.b64_json}" download="image_${index + 1}.png" class="download-btn">
//                     <img src="/download.svg" alt="Download icon">
//                 </a>
//             </div>
//         `).join(" ");

//         imageGallery.innerHTML = imagesMarkup;

//     } catch (error) {
//         console.log(error);
//     }
// }

// const handleFormSubmission = (e) => {
//     // Prevent form submission
//     e.preventDefault();

//     const userPrompt = e.target[0].value;
//     const userQuantity = e.target[1].value;

//     // Creating HTML markup for image with loading state
//     const imgCardMarkup = Array.from({ length: userQuantity }, () =>
//         `<div class="img-card loading">
//             <img src="./loader.svg" alt="Loading...">
//             <a href="#" class="download-btn">
//                 <img src="/download.svg" alt="Download icon">
//             </a>
//         </div>`
//     ).join(" ");

//     imageGallery.innerHTML = imgCardMarkup;
//     generateAiImages(userPrompt, userQuantity);
// }

// generateForm.addEventListener('submit', handleFormSubmission);




//clipboard api
const generateForm = document.querySelector('.generate-form');
const imageGallery = document.querySelector('.img-gallery');

const API_KEY = "39c0fa33ac97f6261f7a78abe9ca979c097f229bc9a32e38fa5af2488d5d2fb8e53070b7e62743d34c13a8496c5bf926"; // Replace with your actual API key

const generateAiImages = async (userPrompt) => {
    try {
        const form = new FormData();
        form.append('prompt', userPrompt);

        const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
            method: 'POST',
            headers: {
                'x-api-key': API_KEY,
            },
            body: form,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const buffer = await response.arrayBuffer();
        const base64Image = arrayBufferToBase64(buffer);
        const imageUrl = `data:image/jpeg;base64,${base64Image}`;

        // Display the image in the gallery
        imageGallery.innerHTML = `
            <div class="img-card">
                <img src="${imageUrl}" alt="Generated Image">
                <a href="${imageUrl}" download="generated_image.jpg" class="download-btn">
                    <img src="/download.svg" alt="Download icon">
                </a>
            </div>`;
    } catch (error) {
        console.error(error);
    }
}

// Convert ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

const handleFormSubmission = (e) => {
    e.preventDefault();

    const userPrompt = e.target[0].value;

    // Creating HTML markup for image with loading state
    const imgCardMarkup = `
        <div class="img-card loading">
            <img src="./loader.svg" alt="Loading...">
            <a href="#" class="download-btn">
                <img src="/download.svg" alt="Download icon">
            </a>
        </div>`;

    imageGallery.innerHTML = imgCardMarkup;
    generateAiImages(userPrompt);
}

generateForm.addEventListener('submit', handleFormSubmission);
