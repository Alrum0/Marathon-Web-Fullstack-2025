document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quizForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
      result.textContent = 'Please make a choice!';
      return;
    }

    if (selected.value === 'gamora') {
      result.textContent = 'Correct! You are ready for the Endgame!';
    } else {
      result.textContent = 'Shame on you! Go and watch Avengers!';
    }
  });
});
