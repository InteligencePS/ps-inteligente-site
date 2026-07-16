
const body = document.body;
const themeButton = document.getElementById('themeButton');
const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const searchInput = document.getElementById('searchInput');
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toastTitle');

if (localStorage.getItem('ps-theme') === 'dark') body.classList.add('dark');

function updateThemeIcon(){
  themeButton.textContent = body.classList.contains('dark') ? '☀' : '☾';
}
updateThemeIcon();

themeButton.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('ps-theme', body.classList.contains('dark') ? 'dark' : 'light');
  updateThemeIcon();
});

menuButton.addEventListener('click', () => sidebar.classList.toggle('open'));

document.querySelectorAll('.soon').forEach(item => {
  item.addEventListener('click', event => {
    event.preventDefault();
    toastTitle.textContent = item.dataset.soon || 'Módulo em desenvolvimento';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
  });
});

const searchable = [...document.querySelectorAll('.searchable')];

searchInput.addEventListener('input', () => {
  const term = searchInput.value.trim().toLowerCase();
  searchable.forEach(item => {
    const haystack = `${item.textContent} ${item.dataset.search || ''}`.toLowerCase();
    item.classList.toggle('hidden', term && !haystack.includes(term));
  });
});
