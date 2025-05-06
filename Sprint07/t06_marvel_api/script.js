document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/fetch-marvel-data');
    const data = await response.json();

    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    data.forEach((character) => {
      const characterDiv = document.createElement('div');
      characterDiv.classList.add('character');

      const characterName = document.createElement('h2');
      characterName.textContent = character.name;

      const characterDescription = document.createElement('p');
      characterDescription.textContent =
        character.description || 'No description';

      const detailsDiv = document.createElement('div');
      detailsDiv.classList.add('details');
      detailsDiv.innerHTML = renderNestedData(character);

      characterDiv.appendChild(detailsDiv);

      contentDiv.appendChild(characterDiv);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

function renderNestedData(data, level = 0) {
  if (typeof data !== 'object' || data === null) {
    return `<span class="value">${data}</span>`;
  }

  return Object.entries(data)
    .map(([key, value]) => {
      return `
          <div class="data-item level-${level}">
            <p class="mivina"><strong class="num">${key}:</strong> ${renderNestedData(
        value,
        level + 1
      )}</p>
          </div>
        `;
    })
    .join('');
}
