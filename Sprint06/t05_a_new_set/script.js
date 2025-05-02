console.log('script.js loaded!');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('applicationForm');
  const submittedInfo = document.getElementById('submittedInfo');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch('/submit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const text = await response.text();
      submittedInfo.innerHTML = text;
      form.reset();
    } catch (error) {
      submittedInfo.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
  });
});
