// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', function () {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll Animations
const fadeElements = document.querySelectorAll('.fade-up');
const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

fadeElements.forEach(function (el) { appearOnScroll.observe(el); });

// Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,bg,ro,ru,tr',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

// Lightbox
var lightbox = document.getElementById('lightbox');
if (lightbox) {
    var lightboxImg = document.getElementById('lightboxImg');
    var closeBtn = document.getElementById('closeLightbox');

    document.querySelectorAll('.gallery-img.interactive').forEach(function (img) {
        img.addEventListener('click', function () {
            lightbox.classList.add('active');
            lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener('click', function () {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', function (e) {
        if (e.target !== lightboxImg) lightbox.classList.remove('active');
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') lightbox.classList.remove('active');
    });
}

// Review Translation Toggle
function toggleTranslation(button) {
    var textEl = button.previousElementSibling;
    var original = textEl.getAttribute('data-original');
    var translated = textEl.getAttribute('data-translated');

    if (button.textContent === 'Translate to English') {
        textEl.textContent = '“' + translated + '”';
        button.textContent = 'Show Original';
    } else {
        textEl.textContent = '“' + original + '”';
        button.textContent = 'Translate to English';
    }
}

// Review Form Submission
var reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(reviewForm);
        var submitBtn = reviewForm.querySelector('button[type="submit"]');
        var successMsg = document.getElementById('formSuccess');

        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        fetch(reviewForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(function (response) {
            if (response.ok) {
                reviewForm.reset();
                submitBtn.textContent = 'Thank You!';
                if (successMsg) successMsg.classList.add('visible');
                setTimeout(function () {
                    submitBtn.textContent = 'Submit Review';
                    submitBtn.disabled = false;
                    if (successMsg) successMsg.classList.remove('visible');
                }, 5000);
            } else {
                submitBtn.textContent = 'Error – Try Again';
                submitBtn.disabled = false;
            }
        }).catch(function () {
            submitBtn.textContent = 'Error – Try Again';
            submitBtn.disabled = false;
        });
    });
}
