let currentPage = 1;
let rowsPerPage = 10;
let data = [];
let filteredData = [];
let currentSortColumn = '';
let currentSortDirection = 'asc';

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    document.getElementById('searchInput').addEventListener('input', searchTable);
    document.getElementById('prevPage').addEventListener('click', () => changePage(-1));
    document.getElementById('nextPage').addEventListener('click', () => changePage(1));
    document.getElementById('rowsPerPageSelect').addEventListener('change', changeRowsPerPage);

    document.querySelectorAll('.up-arrow').forEach(arrow => {
        arrow.addEventListener('click', () => sortTable(arrow.parentElement.parentElement.dataset.column, 'asc'));
    });

    document.querySelectorAll('.down-arrow').forEach(arrow => {
        arrow.addEventListener('click', () => sortTable(arrow.parentElement.parentElement.dataset.column, 'desc'));
    });
});

function fetchData() {
    const tableBody = document.getElementById('tableBody');
    const rows = tableBody.getElementsByTagName('tr');
    const headers = document.querySelectorAll('#dataTable thead th');
    const headerKeys = Array.from(headers).map(header => header.dataset.column);

    data = Array.from(rows).map(row => {
        const cells = row.getElementsByTagName('td');
        let rowData = {};
        headerKeys.forEach((key, index) => {
            rowData[key] = cells[index].textContent;
        });
        return rowData;
    });

    filteredData = data;
    renderTable();
}

function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    const start = (currentPage - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    if (rowsPerPage === filteredData.length) {
        end = filteredData.length;
    } else {
        end = Math.min(start + rowsPerPage, filteredData.length);
    }

    const pageData = filteredData.slice(start, end);

    pageData.forEach(row => {
        const tr = document.createElement('tr');
        for (const key in row) {
            const td = document.createElement('td');
            td.innerHTML = row[key];
            tr.appendChild(td);
        }

        // Add event listeners for links and forms within the row
        tr.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', handleLinkClick);
        });

        tr.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', handleFormSubmit);
        });

        tableBody.appendChild(tr);
    });

    document.getElementById('pageIndicator').textContent = currentPage;
    updateEntryInfo();
}

function handleLinkClick(event) {
    event.preventDefault();
    const url = event.target.href;
    console.log('Link clicked:', url);
    // Add your link handling logic here
}

function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log('Form submitted:', Object.fromEntries(formData));
    // Add your form submission handling logic here
}

function searchTable() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    filteredData = data.filter(row => {
        return Object.values(row).some(value => value.toString().toLowerCase().includes(query));
    });
    currentPage = 1;
    renderTable();
}

function changePage(direction) {
    const maxPage = rowsPerPage === 'all' ? 1 : Math.ceil(filteredData.length / rowsPerPage);
    if (currentPage + direction > 0 && currentPage + direction <= maxPage) {
        currentPage += direction;
        renderTable();
    }
}

function changeRowsPerPage() {
    const selectedValue = document.getElementById('rowsPerPageSelect').value;
    rowsPerPage = selectedValue === 'all' ? filteredData.length : parseInt(selectedValue, 10);
    currentPage = 1;
    renderTable();
}

function sortTable(column, direction) {
    currentSortColumn = column;
    currentSortDirection = direction;

    filteredData.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];

        if (currentSortDirection === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });

    updateSortArrows(column);
    renderTable();
}

function updateSortArrows(column) {
    document.querySelectorAll('.sort-arrow span').forEach(span => {
        span.style.color = 'gray';
    });

    const activeArrow = document.querySelector(`th[data-column="${column}"] .sort-arrow`);
    if (currentSortDirection === 'asc') {
        activeArrow.children[0].style.color = 'black'; // Up arrow
        activeArrow.children[1].style.color = 'gray'; // Down arrow
    } else {
        activeArrow.children[0].style.color = 'gray'; // Up arrow
        activeArrow.children[1].style.color = 'black'; // Down arrow
    }
}

function updateEntryInfo() {
    const start = (currentPage - 1) * rowsPerPage + 1;
    let end = currentPage * rowsPerPage;
    if (rowsPerPage === filteredData.length) {
        end = filteredData.length;
    } else {
        end = Math.min(currentPage * rowsPerPage, filteredData.length);
    }
    const total = filteredData.length;
    document.getElementById('entryInfo').textContent = `Showing ${start} to ${end} of ${total} entries`;
}
