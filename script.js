// Dados dos livros
const books = [
    {
      id: 1,
      title: "Dominando JavaScript",
      author: "Alex Johnson",
      price: 29.99,
      coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      category: "Programação"
    },
    {
      id: 2,
      title: "Design Thinking",
      author: "Maria Silva",
      price: 24.99,
      coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      category: "Design"
    },
    {
      id: 3,
      title: "Inteligência Artificial para Iniciantes",
      author: "Pedro Santos",
      price: 34.99,
      coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      category: "Tecnologia"
    },
    {
      id: 4,
      title: "Marketing Digital",
      author: "Ana Ferreira",
      price: 19.99,
      coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      category: "Marketing"
    },
    {
      id: 5,
      title: "Desenvolvimento Web Completo",
      author: "Carlos Mendes",
      price: 39.99,
      coverImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      category: "Programação"
    },
    {
      id: 6,
      title: "SEO Avançado",
      author: "Roberto Lima",
      price: 27.99,
      coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
      category: "Marketing"
    }
  ];
  
  // Função para criar os itens do carrossel
  function createCarouselItems() {
    const carousel = document.querySelector('.carousel');
    
    books.forEach(book => {
      const carouselItem = document.createElement('div');
      carouselItem.className = 'carousel-item';
      
      carouselItem.innerHTML = `
        <div class="book-card">
          <img src="${book.coverImage}" alt="${book.title}" class="book-img">
          <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">${book.author}</p>
            <div class="book-bottom">
              <span class="book-price">R$ ${book.price.toFixed(2)}</span>
              <button class="add-cart-btn">Adicionar</button>
            </div>
            <div>
              <span class="category-tag">${book.category}</span>
            </div>
          </div>
        </div>
      `;
      
      carousel.appendChild(carouselItem);
    });
  }
  
  // Inicializar o carrossel
  createCarouselItems();
  
  // Funcionalidade do carrossel
  const carousel = document.querySelector('.carousel');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const carouselItems = document.querySelectorAll('.carousel-item');
  
  let currentIndex = 0;
  let itemWidth;
  
  // Calcular a largura dos itens com base no tamanho da tela
  function calculateItemWidth() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= 600) {
      return carousel.offsetWidth;
    } else if (screenWidth <= 900) {
      return carousel.offsetWidth / 2;
    } else {
      return carousel.offsetWidth / 3;
    }
  }
  
  // Atualizar a posição do carrossel
  function updateCarouselPosition() {
    itemWidth = calculateItemWidth();
    carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }
  
  // Navegação do carrossel
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarouselPosition();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    const maxIndex = carouselItems.length - (window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarouselPosition();
    }
  });
  
  // Recalcular quando a janela for redimensionada
  window.addEventListener('resize', updateCarouselPosition);
  
  // Inicializar o carrossel
  updateCarouselPosition();
  
  // Adicionar funcionalidade aos botões "Adicionar"
  const addButtons = document.querySelectorAll('.add-cart-btn');
  
  addButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      alert(`${books[index].title} adicionado ao carrinho!`);
    });
  });
  
  // Rolagem suave para links de âncora
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    });
  });
  
  // Menu Hamburguer
  const menuHamburguer = document.querySelector('.menu-hamburguer');
  const navMenu = document.querySelector('.nav-menu');
  
  menuHamburguer.addEventListener('click', () => {
    const isExpanded = menuHamburguer.getAttribute('aria-expanded') === 'true';
    menuHamburguer.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  });
  
  // Fechar o menu quando um item for clicado (mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menuHamburguer.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      }
    });
  });