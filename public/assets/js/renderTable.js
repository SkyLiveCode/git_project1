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
    data = Array.from(rows).map(row => {
        const cells = row.getElementsByTagName('td');
        return {
            position: cells[0].textContent,
            email: cells[1].textContent,
            city: cells[2].textContent,
            date: cells[3].textContent,
            salary: cells[4].textContent,
            age: parseInt(cells[5].textContent, 10),
            experience: cells[6].textContent,
            status: cells[7].textContent,
            actions: cells[8].textContent
        };
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
            td.textContent = row[key];
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    });

    document.getElementById('pageIndicator').textContent = currentPage;
    updateEntryInfo();
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
