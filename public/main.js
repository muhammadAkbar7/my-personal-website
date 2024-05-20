'use strict';

function renderRow(results) {
    const tbody = document.getElementById('staff-data');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td><img src="${results.picture.thumbnail}" alt="Thumbnail"></td>
        <td><a href="mailto:${results.email}">${results.name.first} ${results.name.last}</a></td>
        <td>${results.phone}</td>
        <td>${results.location.timezone.description}</td>
    `;

    tbody.appendChild(row);
}

async function fetchData(event) {
    event.preventDefault();

    const apiUrl = 'https://randomuser.me/api/';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const result = data.results[0];
        
        // Render the row with the fetched data
        renderRow(result);
        
        // Update the success message
        document.getElementById('success-message').innerHTML = 'Data fetched successfully!';
        document.getElementById('failure-message').innerHTML = '';
    } catch (error) {
        // Update the failure message
        document.getElementById('failure-message').innerHTML = `Failed to fetch data: ${error.message}`;
        document.getElementById('success-message').innerHTML = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetch-data');
    fetchButton.addEventListener('click', fetchData);
});
