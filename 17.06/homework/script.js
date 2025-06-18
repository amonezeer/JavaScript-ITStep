document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '596ca8a5';
    let currentPage = 1;
    let totalResults = 0;
    let currentSearchTerm = '';
    let currentType = '';
    
    const searchForm = document.getElementById('searchForm');
    const searchResults = document.getElementById('searchResults');
    const moviesList = document.getElementById('moviesList');
    const paginationList = document.querySelector('#pagination ul');
    const movieDetails = document.getElementById('movieDetails');
    const noResults = document.getElementById('noResults');
    const backButton = document.getElementById('backButton');
    const loading = document.getElementById('loading');
    const resultCount = document.getElementById('resultCount');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value.trim();
        const type = document.getElementById('type').value;
        const alert = document.getElementById("alert");
        
        if (!title) {
        alert.classList.remove('d-none');
            return;
        }
        
        currentSearchTerm = title;
        currentType = type;
        currentPage = 1;
        
        showLoading();
        searchMovies(title, type, currentPage);
    });
    
    backButton.addEventListener('click', function() {
        movieDetails.classList.add('d-none');
        searchResults.classList.remove('d-none');
    });
    
    function searchMovies(title, type, page) {
        let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title)}&page=${page}`;   
        if (type) url += `&type=${type}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                hideLoading();
                
                if (data.Response === 'True') {
                    displaySearchResults(data);
                } else {
                    showNoResults();
                }
            })
            .catch(error => {
                hideLoading();
                showNoResults();
                console.error('Помилка:', error);
            });
    }
    
    function displaySearchResults(data) {
        totalResults = parseInt(data.totalResults);
        moviesList.innerHTML = '';
        
        data.Search.forEach(movie => {
            const movieCard = createMovieCard(movie);
            moviesList.appendChild(movieCard);
        });
        
        setupPagination();
        updateResultCount(totalResults);
        
        searchResults.classList.remove('d-none');
        movieDetails.classList.add('d-none');
        noResults.classList.add('d-none');
    }
    
    function createMovieCard(movie) {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-lg-4 col-xl-3';
        
        const card = document.createElement('div');
        card.className = 'card movie-card h-100 shadow-sm';
        
        const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=Немає+постера';
        
        card.innerHTML = `
            <img src="${poster}" class="card-img-top" alt="${movie.Title}" onerror="this.src='https://via.placeholder.com/300x450?text=Немає+постера'">
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">${movie.Year} | ${translateType(movie.Type)}</p>
                <button class="btn btn-outline-dark w-100 details-btn" data-imdbid="${movie.imdbID}">
                    <i class="fas fa-info-circle me-2"></i>Деталі
                </button>
            </div>
        `;
        
        col.appendChild(card);
        
        col.querySelector('.details-btn').addEventListener('click', () => {
            showLoading();
            getMovieDetails(movie.imdbID);
        });
        
        return col;
    }
    
    function setupPagination() {
        paginationList.innerHTML = '';
        const totalPages = Math.ceil(totalResults / 10);
        
        const prevLi = createPaginationItem('&laquo;', currentPage === 1, () => {
            if (currentPage > 1) {
                currentPage--;
                showLoading();
                searchMovies(currentSearchTerm, currentType, currentPage);
            }
        });
        paginationList.appendChild(prevLi);
        
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageLi = createPaginationItem(i, false, () => {
                if (i !== currentPage) {
                    currentPage = i;
                    showLoading();
                    searchMovies(currentSearchTerm, currentType, currentPage);
                }
            }, i === currentPage);
            paginationList.appendChild(pageLi);
        }
        
        const nextLi = createPaginationItem('&raquo;', currentPage === totalPages, () => {
            if (currentPage < totalPages) {
                currentPage++;
                showLoading();
                searchMovies(currentSearchTerm, currentType, currentPage);
            }
        });
        paginationList.appendChild(nextLi);
    }
    
    function createPaginationItem(content, disabled, onClick, isActive = false) {
        const li = document.createElement('li');
        li.className = `page-item ${disabled ? 'disabled' : ''} ${isActive ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#">${content}</a>`;
        if (!disabled) li.addEventListener('click', (e) => { e.preventDefault(); onClick(); });
        return li;
    }
    
    function getMovieDetails(imdbID) {
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                hideLoading();
                if (data.Response === 'True') displayMovieDetails(data);
            })
            .catch(error => {
                hideLoading();
                console.error('Помилка:', error);
            });
    }
    
    function displayMovieDetails(movie) {
        document.getElementById('detailTitle').textContent = `${movie.Title} (${movie.Year})`;
        
        const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=Немає+постера';
        document.getElementById('detailPoster').src = poster;
        document.getElementById('detailPoster').alt = movie.Title;
        
        document.getElementById('detailPlot').textContent = movie.Plot || 'Опис відсутній';
        document.getElementById('detailReleased').textContent = movie.Released || 'Невідомо';
        document.getElementById('detailRuntime').textContent = movie.Runtime || 'Невідомо';
        document.getElementById('detailGenre').textContent = movie.Genre || 'Невідомо';
        document.getElementById('detailDirector').textContent = movie.Director || 'Невідомо';
        document.getElementById('detailActors').textContent = movie.Actors || 'Невідомо';
        document.getElementById('detailCountry').textContent = movie.Country || 'Невідомо';
        document.getElementById('detailAwards').textContent = movie.Awards || 'Немає інформації';
        document.getElementById('detailRating').textContent = movie.imdbRating ? `${movie.imdbRating}/10` : 'Немає рейтингу';
        document.getElementById('detailType').textContent = translateType(movie.Type);
        document.getElementById('detailYear').textContent = movie.Year;
        
        movieDetails.classList.remove('d-none');
        searchResults.classList.add('d-none');
    }
    
    function translateType(type) {
        const types = {
            'movie': 'Фільм',
            'series': 'Серіал',
            'episode': 'Епізод'
        };
        return types[type] || type;
    }
    
    function showNoResults() {
        searchResults.classList.add('d-none');
        movieDetails.classList.add('d-none');
        noResults.classList.remove('d-none');
    }
    
    function showLoading() {
        loading.classList.remove('d-none');
        searchResults.classList.add('d-none');
        movieDetails.classList.add('d-none');
        noResults.classList.add('d-none');
    }
    
    function hideLoading() {
        loading.classList.add('d-none');
    }
    
    function updateResultCount(count) {
        resultCount.textContent = `Знайдено: ${count}`;
    }
});