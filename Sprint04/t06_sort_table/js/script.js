let main = document.querySelector('main');

const table = document.createElement('div');
table.classList.add('container');
table.innerHTML = `
 <table>
 <thead>
   <tr>
     <th class="sortable" data-column="name">Name</th>
     <th class="sortable" data-column="strength">Strength</th>
     <th class="sortable" data-column="age">Age</th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td id="name" >Black<br>Panther</td>
     <td id="strength">66</td>
     <td id="age" class="age">53</td>
   </tr>
   <tr>
     <td>Captain<br>America</td>
     <td>79</td>
     <td class="age">137</td>
   </tr>
   <tr>
     <td>Captain<br>Marvel</td>
     <td>97</td>
     <td class="age">26</td>
   </tr>
   <tr>
     <td>Hulk</td>
     <td>80</td>
     <td class="age">49</td>
   </tr>
   <tr>
     <td>Iron<br>Man</td>
     <td>88</td>
     <td class="age">48</td>
   </tr>
   <tr>
     <td>Spider-<br>Man</td>
     <td>78</td>
     <td class="age">16</td>
   </tr>
   <tr>
     <td>Thanos</td>
     <td>99</td>
     <td class="age">1000</td>
   </tr>
   <tr>
     <td>Thor</td>
     <td>95</td>
     <td class="age">1000</td>
   </tr>
   <tr>
     <td>Yon-<br>Rogg</td>
     <td>73</td>
     <td class="age">52</td>
   </tr>
 </tbody>
 </table>
`;
main.appendChild(table);

const notification = document.getElementById('notification');

function collectTableData() {
  const tableElement = table.querySelector('table');
  const rows = Array.from(tableElement.querySelectorAll('tbody tr'));
  const heroes = [];
  
  rows.forEach(row => {
    heroes.push({
      element: row,
      name: row.cells[0].innerHTML,
      strength: parseInt(row.cells[1].textContent),
      age: parseInt(row.cells[2].textContent)
    });
  });
  
  return heroes;
}

function sortTable(column, ascending = true) {
  const tableElement = table.querySelector('table');
  const tbody = tableElement.querySelector('tbody');
  const heroes = collectTableData();
  
  heroes.sort((a, b) => {
    if (column === 'strength' || column === 'age') {
      return ascending ? a[column] - b[column] : b[column] - a[column];
    } else {
      const aText = a[column].replace(/<br>/g, ' ');
      const bText = b[column].replace(/<br>/g, ' ');
      return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
    }
  });
  
  heroes.forEach(hero => {
    tbody.appendChild(hero.element);
  });
  
  notification.textContent = `Sorting by ${column}, order: ${ascending ? 'ASC' : 'DESC'}`;
}

const headers = table.querySelectorAll('th.sortable');
headers.forEach(header => {
  let ascending = true;
  header.addEventListener('click', () => {
    const column = header.dataset.column; 
    sortTable(column, ascending);
    ascending = !ascending; 
  });
});
