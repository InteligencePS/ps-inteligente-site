const search = document.getElementById('search');
const resultCount = document.getElementById('resultCount');
const searchable = [...document.querySelectorAll('.searchable')];

if (search) {
  search.addEventListener('input', () => {
    const term = search.value.trim().toLowerCase();
    let visible = 0;

    searchable.forEach(item => {
      const haystack = `${item.textContent} ${item.dataset.search || ''}`.toLowerCase();
      const show = !term || haystack.includes(term);
      item.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    resultCount.textContent = term
      ? `${visible} resultado(s) encontrado(s).`
      : '';
  });
}

const themeButton = document.getElementById('themeButton');
const savedTheme = localStorage.getItem('ps-theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}

function updateThemeIcon() {
  if (themeButton) {
    themeButton.textContent = document.body.classList.contains('dark') ? '☀' : '☾';
  }
}

updateThemeIcon();

if (themeButton) {
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem(
      'ps-theme',
      document.body.classList.contains('dark') ? 'dark' : 'light'
    );
    updateThemeIcon();
  });
}

document.querySelectorAll('.copy-button').forEach(button => {
  button.addEventListener('click', async () => {
    const target = document.getElementById(button.dataset.copy);
    if (!target) return;

    try {
      await navigator.clipboard.writeText(target.innerText);
      const oldText = button.textContent;
      button.textContent = 'Copiado!';
      setTimeout(() => button.textContent = oldText, 1600);
    } catch {
      button.textContent = 'Selecione e copie manualmente';
    }
  });
});
