const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const formFallback = document.getElementById('form-fallback');

const EMAILJS_PUBLIC_KEY = 'pwthnv3Gun6zF86NH';
const EMAILJS_SERVICE_ID = 'service_inm2k28';
const EMAILJS_TEMPLATE_ID = 'template_7tawm8o';
const CONTACT_EMAIL = 'tsebeelias@gmail.com';

if (contactForm && formStatus) {
  const value = (name) => contactForm.elements.namedItem(name).value.trim();

  const setStatus = (message, type = '') => {
    formStatus.textContent = message;
    formStatus.className = `form-note${type ? ` form-${type}` : ''}`;
  };

  const createFallbackLink = () => {
    if (!formFallback) return;
    const subject = `Portfolio enquiry from ${value('name') || 'a website visitor'}`;
    const body = [
      `Name: ${value('name')}`,
      `Email: ${value('email')}`,
      `Company / Organization: ${value('company') || 'Not provided'}`,
      `Role / Project Type: ${value('role') || 'Not provided'}`,
      '',
      value('message'),
    ].join('\n');
    formFallback.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    formFallback.hidden = false;
  };

  const hideFallback = () => {
    if (formFallback) formFallback.hidden = true;
  };

  const explainError = (error) => {
    const status = Number(error?.status) || 0;
    const providerMessage = typeof error?.text === 'string'
      ? error.text.replace(/\s+/g, ' ').trim().slice(0, 180)
      : '';
    const details = providerMessage ? ` Details: ${providerMessage}` : '';
    if (status === 400) return `The message service configuration needs attention (error 400).${details}`;
    if (status === 401 || status === 403) return `The message service rejected this request (error ${status}).${details}`;
    if (status === 412) return `The connected email account needs to be reconnected (error 412).${details}`;
    if (status === 429) return `Too many messages were sent recently. Please wait a minute and try again (error 429).${details}`;
    if (status) return `The message service is temporarily unavailable (error ${status}).${details}`;
    return 'The message service could not be reached.';
  };

  if (typeof emailjs === 'undefined') {
    setStatus(`The message form is unavailable. Please email ${CONTACT_EMAIL}.`, 'error');
  }

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    hideFallback();

    if (typeof emailjs === 'undefined') {
      setStatus(`The message form is unavailable. Please email ${CONTACT_EMAIL}.`, 'error');
      createFallbackLink();
      return;
    }

    const button = contactForm.querySelector('[type="submit"]');
    const templateParams = {
      name: value('name'),
      user_name: value('name'),
      email: value('email'),
      user_email: value('email'),
      from_name: value('name'),
      reply_to: value('email'),
      company: value('company'),
      role: value('role'),
      message: value('message'),
    };

    button.disabled = true;
    contactForm.setAttribute('aria-busy', 'true');
    setStatus('Sending your message…');
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });
      setStatus('Message sent. Thank you for reaching out!', 'success');
      contactForm.reset();
    } catch (error) {
      setStatus(`${explainError(error)} Use the email option below to finish sending your message.`, 'error');
      createFallbackLink();
      console.error('EmailJS error:', error);
    } finally {
      button.disabled = false;
      contactForm.removeAttribute('aria-busy');
    }
  });
}
