let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

function changeSlide(n) {
    let slides = document.getElementsByClassName("slide");
    slides[slideIndex - 1].style.display = "none";
    slideIndex += n;
    if (slideIndex > slides.length) slideIndex = 1;
    if (slideIndex < 1) slideIndex = slides.length;
    slides[slideIndex - 1].style.display = "block";
}

// Initialize slideshow
showSlides();

document.getElementById('imageUploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    
    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
    });
    
    const result = await response.json();
    alert(result.message);
});

document.getElementById('imageUploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    
    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
    });
    
    const result = await response.json();
    alert(result.message);
});