/*Js for scrollview*/ 
function scroll_to(id) {
      document.documentElement.style.scrollBehavior = 'smooth';
      element = document.createElement('a');
      element.setAttribute('href', id);
      element.click();
  }
  document.getElementById("tocontent").addEventListener('click', () => {
  scroll_to('#7');
  });