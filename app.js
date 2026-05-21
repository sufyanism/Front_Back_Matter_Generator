const form = document.getElementById('bookForm');
const clearBtn = document.getElementById('clearBtn');
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {

  const html = document.documentElement;

  if (html.getAttribute('data-theme') === 'dark') {
    html.setAttribute('data-theme', 'light');
    themeToggle.textContent = '🌙 Dark Mode';
  } else {
    html.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️ Light Mode';
  }

});

form.addEventListener('submit', (e) => {

  e.preventDefault();

  if (!form.checkValidity()) {
    e.stopPropagation();
    form.classList.add('was-validated');
    return;
  }

  const bookTitle = document.getElementById('book_title').value.trim();
  const bookSubtitle = document.getElementById('book_subtitle').value.trim();
  const authorName = document.getElementById('author_name').value.trim();
  const publisherName = document.getElementById('publisher_name').value.trim();
  const publisherCity = document.getElementById('publisher_city').value.trim();
  const pubYear = document.getElementById('pub_year').value.trim();
  const editionNum = document.getElementById('edition_num').value.trim();
  const isbnPrint = document.getElementById('isbn_print').value.trim();
  const isbnEbook = document.getElementById('isbn_ebook').value.trim();
  const authorBio = document.getElementById('author_bio').value.trim();
  const authorWebsite = document.getElementById('author_website').value.trim();

  const previousTitles = document.getElementById('previous_titles')
    .value
    .split('\n')
    .map(title => title.trim())
    .filter(title => title !== '');

  const subtitleText = bookSubtitle ? `${bookSubtitle}\n` : '';

  document.getElementById('outputA').textContent = `[HALF TITLE]
${bookTitle}

--------------------------------------------------

[TITLE PAGE]
${bookTitle}
${subtitleText}
By
${authorName}

${publisherName}
${publisherCity}`;

  document.getElementById('outputB').textContent = `Copyright © ${pubYear} by ${authorName}

Published by ${publisherName}
${publisherCity}

${editionNum}

Print ISBN: ${isbnPrint}
Ebook ISBN: ${isbnEbook}`;

  document.getElementById('outputC').textContent = `Books by ${authorName}

--------------------------------------------------
${previousTitles.join('\n')}`;

  document.getElementById('outputD').textContent = `About the Author

${authorName} ${authorBio}

Connect with the author online at: ${authorWebsite}`;

});

clearBtn.addEventListener('click', () => {

  form.reset();
  form.classList.remove('was-validated');

  document.querySelectorAll('pre').forEach(pre => pre.textContent = '');

});

document.querySelectorAll('.copy-btn').forEach(button => {

  button.addEventListener('click', () => {

    const target = document.getElementById(button.dataset.target);

    navigator.clipboard.writeText(target.textContent).then(() => {

      const originalText = button.textContent;

      button.textContent = 'Copied!';

      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);

    });

  });

});
