const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('.sekcia-zmena-section');
const footer = document.querySelector('footer');

themeToggleButton.addEventListener('click', () => {
  body.classList.toggle('dark');
  navbar.classList.toggle('dark');
  sections.forEach(section => section.classList.toggle('dark'));
  footer.classList.toggle('dark');

  // Переключение иконок
  const sunIcon = themeToggleButton.querySelector('.fa-sun');
  const moonIcon = themeToggleButton.querySelector('.fa-moon');
  sunIcon.style.display = sunIcon.style.display === 'none' ? 'inline' : 'none';
  moonIcon.style.display = moonIcon.style.display === 'inline' ? 'none' : 'inline';
});

