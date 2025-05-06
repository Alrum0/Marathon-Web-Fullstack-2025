// // const originQuoutes = [
// //   {
// //     id: 1,
// //     author: 'Misha',
// //     quote: 'i am 418',
// //     photo:
// //       'https://plus.unsplash.com/premium_photo-1710846906747-7ee7199956ed?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNhbXBsZXxlbnwwfHwwfHx8MA%3D%3D',
// //     publishDate: '2025-05-04',
// //     coments: { '2025-05-04': 'WW' },
// //   },
// //   {
// //     id: 2,
// //     aithor: 'Vlad',
// //     quote: 'i am Groot',
// //     photo:
// //       'https://v.wpimg.pl/MTVkYzMxYjU3CS9JYgNvIHRRexMkWmF2I0ljWGJJf2xmE3YcJBQoJjMbNlQqCjgkNxwpVD0UYjUmAnYMfFcpPSUbNRs0Vyg5NA49VS4cfmJiCmtJYEApNm9GbR4pTmBsYl87VykbLmVjDzpJfEt5ZXQW',
// //     publishDate: '2024-08-29',
// //     comments: { '2024-08-30': 'amazing' },
// //   },
// //   new AvengerQuote(
// //     3,
// //     'Stepa',
// //     'i am spioniro golubio',
// //     'https://plus.unsplash.com/premium_photo-1710846906747-7ee7199956ed?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNhbXBsZXxlbnwwfHwwfHx8MA%3D%3D',
// //     '2025-05-04',
// //     [new Comment('2025-05-06'), 'cool']
// //   ),
// // ];
// const originalQuotes = [
//   {
//     id: 1,
//     author: 'Iron Man',
//     quote: 'I am Iron Man.',
//     photo: 'https://linktoimage.com/ironman.jpg',
//     publishDate: '2008-05-02',
//     comments: { '2008-05-02': 'Iconic scene' },
//   },
//   {
//     id: 2,
//     author: 'Captain America',
//     quote: 'I can do this all day.',
//     photo: 'https://linktoimage.com/captain.jpg',
//     publishDate: '2011-07-22',
//     comments: { '2011-07-22': 'Inspirational' },
//   },
//   {
//     id: 3,
//     author: 'Thor',
//     quote: 'Bring me Thanos!',
//     photo: 'https://linktoimage.com/thor.jpg',
//     publishDate: '2018-04-27',
//     comments: { '2018-04-27': 'Epic moment' },
//   },
//   {
//     id: 4,
//     author: 'Hulk',
//     quote: 'Hulk smash!',
//     photo: 'https://linktoimage.com/hulk.jpg',
//     publishDate: '2012-05-04',
//     comments: { '2012-05-04': 'Smash hit' },
//   },
// ];

// document.addEventListener('DOMContentLoaded', () => {
//   const originalQuotesList = document.getElementById('originQuoutes');
//   originalQuotes.forEach((quote) => {
//     const li = document.createElement('li');
//     li.textContent = `${quote.author}: "${quote.quote}"`;
//     originalQuotesList.appendChild(li);
//   });
// });

// function convertToXML() {
//   fetch('/convert-to-xml').then(() =>
//     alert('Converted to XML and saved to file.')
//   );
// }

// function convertFromXML() {
//   fetch('/convert-from-xml')
//     .then((response) => response.json())
//     .then((data) => {
//       const convertedQuotesList = document.getElementById('resultedQuputes');
//       convertedQuotesList.innerHTML = '';
//       data.forEach((quote) => {
//         const li = document.createElement('li');
//         li.textContent = `${quote.author}: "${quote.quote}"`;
//         convertedQuotesList.appendChild(li);
//       });
//     });
// }

document.addEventListener('DOMContentLoaded', () => {
  loadOriginalQuotes();
});

async function loadOriginalQuotes() {
  try {
    const response = await fetch('/get-original-quotes');
    const quotes = await response.json();
    displayQuotes(quotes, 'originQuoutes');
  } catch (error) {
    console.error('Error loading original quotes:', error);
  }
}

function displayQuotes(quotes, elementId) {
  const listElement = document.getElementById(elementId);
  listElement.innerHTML = '';

  quotes.forEach((quote) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${quote.author}</strong>: "${quote.quote}"
      <div><small>Date: ${quote.publishDate}</small></div>
      <div>Photos: ${quote.photo.length}</div>
      <div>Comments: ${quote.comments.length}</div>
    `;
    listElement.appendChild(li);
  });
}

async function convertToXML() {
  try {
    const response = await fetch('/get-original-quotes');
    const quotes = await response.json();

    const convertResponse = await fetch('/convert-to-xml', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quotes }),
    });

    const result = await convertResponse.json();
    if (result.success) {
      alert('Successfully converted to XML and saved to file.');
    } else {
      alert('Failed to convert to XML.');
    }
  } catch (error) {
    console.error('Error converting to XML:', error);
    alert('Error converting to XML.');
  }
}

async function convertFromXML() {
  try {
    const response = await fetch('/convert-from-xml');
    const quotes = await response.json();
    displayQuotes(quotes, 'resultedQuoutes');
  } catch (error) {
    console.error('Error converting from XML:', error);
    alert('Error converting from XML.');
  }
}
