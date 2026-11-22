const bookingValue = import.meta.env.VITE_BOOKING_URL?.trim();
let bookingUrl: string | undefined;
try {
  const url = new URL(bookingValue ?? '');
  if (url.protocol === 'https:' && !url.username && !url.password) bookingUrl = url.href;
} catch {
  // Hide booking until a real destination is configured.
}

const emailValue = import.meta.env.VITE_CONTACT_EMAIL?.trim();
const contactEmail = emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue) ? emailValue : undefined;

export { bookingUrl, contactEmail };
