import './styles.css';
import { Book, formatBook, Catalog } from './task1-types';
import { addBook, removeBook, getBook } from './task2-functions';
import { applyFilters, filterByAuthor, filterByMinYear } from './task3-filters';
import { createBookFromForm } from './task4-integration';

// Готовые данные для старта
let initialBooks: Catalog = {
  '1': { id: '1', title: 'TypeScript Guide', authors: ['John Doe'], year: 2023 },
  '2': { id: '2', title: 'JavaScript Basics', authors: ['Jane Smith'], year: 2022 },
};

// TODO: Студенты пишут код ниже
const bookList = document.querySelector('#bookList') as HTMLDivElement;
const form = document.querySelector('#bookForm') as HTMLFormElement;
const filtersBtn = document.querySelector('#applyFilters') as HTMLButtonElement;
const autorInput = document.querySelector('#filterAuthor') as HTMLInputElement;
const yearInput = document.querySelector('#filterYear') as HTMLInputElement;
const errorMessage = document.querySelector('#errorMessage') as HTMLDivElement;

function renderBooks(books: Book[]) {
  bookList.innerHTML = books.map(book => 
    `<div class="book-card">${formatBook(book)}</div>`
  ).join('');
}

// Отрисовать начальные книги
renderBooks(Object.values(initialBooks));

// Обработчик формы
document.getElementById('bookForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  errorMessage.textContent = '';
  try {
    const formData = new FormData(form);
    const newBook = createBookFromForm(formData);
    initialBooks = addBook(initialBooks, newBook);
    form.reset();
    renderBooks(Object.values(initialBooks));
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.textContent = error.message;
    }
  }
});

// Обработчик фильтров
document.getElementById('applyFilters')?.addEventListener('click', () => {
  // TODO: Применить фильтры, перерисовать
  const filters = [];
  const authorName = autorInput.value.trim();
  const minYearStr = yearInput.value.trim();
  if (authorName) {
    filters.push(filterByAuthor(authorName));
  }
  if (minYearStr) {
    const minYear = parseInt(minYearStr, 10);
    if (!isNaN(minYear)) {
      filters.push(filterByMinYear(minYear));
    }
  }
  const filteredBooks = applyFilters(Object.values(initialBooks), filters);
  renderBooks(filteredBooks);
});