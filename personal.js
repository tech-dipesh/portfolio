window.addEventListener('scroll', function() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / totalHeight) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
});

// this is for the dynamic website

document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Rotation
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
  
    function rotateTestimonials() {
      testimonials.forEach(t => t.classList.remove('active'));
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      testimonials[currentTestimonial].classList.add('active');
    }
  
    setInterval(rotateTestimonials, 5000);
  
    // for faq animation
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
      });
    });
  
    //add scroll animation to entire website
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
  
    document.querySelectorAll('.skill, .box1, .faq-item').forEach(el => {
      observer.observe(el);
    });
  
    //with this we can go top of the page
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
  
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });


  //form validation of javascript
  function openModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetForm();
}

// Form Validation
function validateName(name) {
    return /^[A-Za-z\s]{2,50}$/.test(name);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMessage(message) {
    return message.length >= 10;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + 'Error');
    field.parentElement.classList.add('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + 'Error');
    field.parentElement.classList.remove('error');
    errorDiv.style.display = 'none';
}

function resetForm() {
    document.getElementById('contactForm').reset();
    ['name', 'email', 'message'].forEach(clearError);
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('contactForm').style.display = 'block';
}

function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    ['name', 'email', 'message'].forEach(clearError);
    
    let isValid = true;
    
    if (!name) {
        showError('name', 'Name is required');
        isValid = false;
    } else if (!validateName(name)) {
        showError('name', 'Please enter a valid name');
        isValid = false;
    }
    
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!message) {
        showError('message', 'Message is required');
        isValid = false;
    } else if (!validateMessage(message)) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (isValid) {
        const formData = {
            name,
            email,
            message,
            timestamp: new Date().toISOString()
        };
        
        const savedData = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        savedData.push(formData);
        localStorage.setItem('contactSubmissions', JSON.stringify(savedData));
        
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
        
        setTimeout(closeModal, 2000);
    }
}

document.getElementById('contactModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
  