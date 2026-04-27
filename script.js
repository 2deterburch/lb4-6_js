"use strict";

const container = document.getElementById("moviesContainer");
const searchInput = document.getElementById("searchInput");
const errorText = document.getElementById("error");

let movies = [];

// ===== FETCH API =====
async function loadMovies() {
    try {
        const response = await fetch("https://api.tvmaze.com/shows");

        if (!response.ok) {
            throw new Error("Помилка завантаження");
        }

        const data = await response.json();
        movies = data;

        displayMovies(movies);

    } catch (error) {
        errorText.textContent = "❌ Не вдалося завантажити фільми";
        console.error(error);
    }
}

// ===== ВІДОБРАЖЕННЯ =====
function displayMovies(list) {
    container.innerHTML = "";

    list.forEach(movie => {
        const { name, rating, image } = movie;

        const card = `
            <div class="card">
                <img src="${image ? image.medium : ''}" alt="">
                <h3>${name}</h3>
                <p>⭐ ${rating.average || "N/A"}</p>
            </div>
        `;

        container.innerHTML += card;
    });
}

// ===== ПОШУК =====
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = movies.filter(m =>
        m.name.toLowerCase().includes(value)
    );

    displayMovies(filtered);
});

// ===== СОРТУВАННЯ =====
function sortByName() {
    const sorted = [...movies].sort((a, b) =>
        a.name.localeCompare(b.name)
    );
    displayMovies(sorted);
}

function sortByRating() {
    const sorted = [...movies].sort((a, b) =>
        (b.rating.average || 0) - (a.rating.average || 0)
    );
    displayMovies(sorted);
}

// ===== СТАРТ =====
loadMovies();
