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

// Nav shrink on scroll
var nav = document.querySelector('nav');
var lastScroll = 0;
window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    lastScroll = window.scrollY;
}, { passive: true });

// Scroll Animations with staggered delays
var animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right, .scale-in');

var appearOnScroll = new IntersectionObserver(function (entries, observer) {
    var visibleEntries = [];
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            visibleEntries.push(entry);
            observer.unobserve(entry.target);
        }
    });

    visibleEntries.forEach(function (entry, index) {
        var delay = index * 100;
        setTimeout(function () {
            entry.target.classList.add('visible');
        }, delay);
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

animatedElements.forEach(function (el) { appearOnScroll.observe(el); });

// Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,bg,ro,ru,tr',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

// Lightbox with navigation
var lightbox = document.getElementById('lightbox');
if (lightbox) {
    var lightboxImg = document.getElementById('lightboxImg');
    var closeBtn = document.getElementById('closeLightbox');
    var prevBtn = document.getElementById('lightboxPrev');
    var nextBtn = document.getElementById('lightboxNext');
    var counter = document.getElementById('lightboxCounter');
    var galleryImages = Array.from(document.querySelectorAll('.gallery-img.interactive'));
    var currentIndex = 0;

    function showImage(index) {
        if (index < 0) index = galleryImages.length - 1;
        if (index >= galleryImages.length) index = 0;
        currentIndex = index;

        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.95)';

        setTimeout(function () {
            lightboxImg.src = galleryImages[currentIndex].src;
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        }, 150);

        if (counter) {
            counter.textContent = (currentIndex + 1) + ' / ' + galleryImages.length;
        }
    }

    function openLightbox(index) {
        currentIndex = index;
        lightbox.classList.add('active');
        lightboxImg.src = galleryImages[currentIndex].src;
        document.body.style.overflow = 'hidden';
        if (counter) {
            counter.textContent = (currentIndex + 1) + ' / ' + galleryImages.length;
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    galleryImages.forEach(function (img, index) {
        img.addEventListener('click', function () {
            openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);

    if (prevBtn) {
        prevBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            showImage(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            showImage(currentIndex + 1);
        });
    }

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });

    var touchStartX = 0;
    lightbox.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function (e) {
        var diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) showImage(currentIndex - 1);
            else showImage(currentIndex + 1);
        }
    }, { passive: true });
}

// Review Translation Toggle
function toggleTranslation(button) {
    var textEl = button.previousElementSibling;
    var original = textEl.getAttribute('data-original');
    var translated = textEl.getAttribute('data-translated');

    if (button.textContent === 'Translate to English') {
        textEl.textContent = '"' + translated + '"';
        button.textContent = 'Show Original';
    } else {
        textEl.textContent = '"' + original + '"';
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
