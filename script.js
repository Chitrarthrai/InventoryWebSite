document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const descriptionInput = document.getElementById('description');
    const resultsContainer = document.getElementById('results');

    let allResults = [];

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const description = descriptionInput.value.toLowerCase();

        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                const filteredItems = data.master.filter(item => item.description.toLowerCase().includes(description));
                allResults.push(...filteredItems.map(item => {
                    const transaction = data.transaction.find(tran => tran.item_id === item.item_id);
                    return {
                        item_id: item.item_id,
                        description: item.description,
                        stock: transaction ? transaction.stock : 'N/A'
                    };
                }));
                displayResults(allResults);
            });
    });

    function displayResults(items) {
        resultsContainer.innerHTML = '';
        if (items.length > 0) {
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            thead.innerHTML = '<tr><th>ID</th><th>Description</th><th>Stock</th></tr>';
            table.appendChild(thead);
            table.appendChild(tbody);

            items.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${item.item_id}</td><td>${item.description}</td><td>${item.stock}</td>`;
                tbody.appendChild(row);
            });

            resultsContainer.appendChild(table);
        } else {
            resultsContainer.textContent = 'No results found';
        }
    }
});
