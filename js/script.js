document.addEventListener('DOMContentLoaded', function () {
    // 1. Welcome Message Logic
    const userNameDisplay = document.getElementById('user-name-display');
    // Only run welcome logic if element exists (Home Page)
    if (userNameDisplay) {
        let userName = prompt("Please enter your name:", "Guest");

        if (userName && userName.trim() !== "") {
            userNameDisplay.textContent = userName;
        } else {
            userNameDisplay.textContent = "Guest";
        }
    }

    // 2. Form Validation & Submission
    const form = document.getElementById('message-form');
    // Only run form logic if form exists (Message Us Page)
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent actual submission

            // Get values
            const nameInput = document.getElementById('name');
            const dobInput = document.getElementById('dob');
            const genderInputs = document.getElementsByName('gender');
            const messageInput = document.getElementById('message');

            let isValid = true;
            let selectedGender = null;

            // Reset errors
            document.querySelectorAll('.error-msg').forEach(el => el.classList.remove('show-error'));

            // Validate Name
            if (nameInput.value.trim() === "") {
                document.getElementById('error-name').classList.add('show-error');
                isValid = false;
            }

            // Validate DOB
            if (dobInput.value === "") {
                document.getElementById('error-dob').classList.add('show-error');
                isValid = false;
            }

            // Validate Gender
            for (const radio of genderInputs) {
                if (radio.checked) {
                    selectedGender = radio.value;
                    break;
                }
            }
            if (!selectedGender) {
                document.getElementById('error-gender').classList.add('show-error');
                isValid = false;
            }

            // Validate Message
            if (messageInput.value.trim() === "") {
                document.getElementById('error-message').classList.add('show-error');
                isValid = false;
            }

            // If Valid, Display Data
            if (isValid) {
                const outputBox = document.getElementById('output-box');
                document.getElementById('out-name').textContent = nameInput.value;
                document.getElementById('out-dob').textContent = dobInput.value;
                document.getElementById('out-gender').textContent = selectedGender;
                document.getElementById('out-message').textContent = messageInput.value;

                // Get current time
                const now = new Date();
                document.getElementById('out-time').textContent = now.toLocaleString();

                outputBox.classList.remove('hidden');

                // Optional: Scroll to output
                outputBox.scrollIntoView({ behavior: 'smooth' });

                // Reset form
                form.reset();
            }
        });
    }
    // 3. Carousel Logic
    const track = document.getElementById('carousel-track');
    if (track) {
        let slides = Array.from(track.children);
        const nextButton = document.getElementById('nextBtn');
        const prevButton = document.getElementById('prevBtn');
        const dotsNav = document.getElementById('carousel-dots');
        const dots = Array.from(dotsNav.children);

        let currentSlideIndex = 0;

        const updateCarousel = (index) => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = 'translateX(-' + (slideWidth * index) + 'px)';

            dots.forEach(dot => dot.classList.remove('active-dot'));
            dots[index].classList.add('active-dot');

            currentSlideIndex = index;
        };

        nextButton.addEventListener('click', () => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateCarousel(currentSlideIndex);
        });

        prevButton.addEventListener('click', () => {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            updateCarousel(currentSlideIndex);
        });

        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('span');
            if (!targetDot) return;
            const targetIndex = dots.indexOf(targetDot);
            updateCarousel(targetIndex);
        });

        // Auto-slide every 5 seconds
        setInterval(() => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateCarousel(currentSlideIndex);
        }, 5000);

        window.addEventListener('resize', () => {
            updateCarousel(currentSlideIndex);
        });
    }
});
