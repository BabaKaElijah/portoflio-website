const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
  if (typeof emailjs !== 'undefined') {
    emailjs.init('pwthnv3Gun6zF86NH');
  } else {
    formStatus.textContent = 'The form is unavailable right now. Please email me at tsebeelias@gmail.com.';
  }

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    if (typeof emailjs === 'undefined') {
      formStatus.textContent = 'The form is unavailable right now. Please email me at tsebeelias@gmail.com.';
      return;
    }

    const value = (name) => contactForm.elements.namedItem(name).value.trim();
    const button = contactForm.querySelector('[type="submit"]');
    const templateParams = {
      name: value('name'),
      email: value('email'),
      from_name: value('name'),
      reply_to: value('email'),
      company: value('company'),
      role: value('role'),
      message: value('message'),
    };

    button.disabled = true;
    contactForm.setAttribute('aria-busy', 'true');
    formStatus.textContent = 'Sending your message…';
    try {
      await emailjs.send('service_0ptc8gw', 'template_7tawm8o', templateParams);
      formStatus.textContent = 'Message sent. Thank you for reaching out!';
      contactForm.reset();
    } catch (error) {
      formStatus.textContent = 'The message could not be sent. Please email me at tsebeelias@gmail.com.';
      console.error('EmailJS error:', error);
    } finally {
      button.disabled = false;
      contactForm.removeAttribute('aria-busy');
    }
  });
}
