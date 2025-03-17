

// Theme Toggle Functionality
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set initial theme
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  body.classList.add('dark');
  themeSwitch.checked = true;
}

// Theme toggle event listener
themeSwitch.addEventListener('change', function() {
  if (this.checked) {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
});

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', function(e) {
  const posX = e.clientX;
  const posY = e.clientY;
  
  // Animate cursor dot to follow mouse exactly
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;
  
  // Add slight delay to cursor outline for smooth effect
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: 'forwards' });
});

// Hide cursor when mouse leaves window
document.addEventListener('mouseout', function() {
  cursorDot.style.opacity = '0';
  cursorOutline.style.opacity = '0';
});

document.addEventListener('mouseover', function() {
  cursorDot.style.opacity = '1';
  cursorOutline.style.opacity = '1';
});

// Custom cursor interactions
const interactiveElements = document.querySelectorAll('a, button, .theme-label, input, textarea, .project-card, .skill-card, .stat-item');

interactiveElements.forEach(element => {
  element.addEventListener('mouseover', function() {
    cursorOutline.style.width = '60px';
    cursorOutline.style.height = '60px';
    cursorOutline.style.border = '2px solid var(--accent-hover)';
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
  });
  
  element.addEventListener('mouseout', function() {
    cursorOutline.style.width = '40px';
    cursorOutline.style.height = '40px';
    cursorOutline.style.border = '2px solid var(--accent-color)';
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu ul li a');

mobileMenuBtn.addEventListener('click', function() {
  this.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  
  if (this.classList.contains('active')) {
    this.children[0].style.transform = 'translateY(8px) rotate(45deg)';
    this.children[1].style.opacity = '0';
    this.children[2].style.transform = 'translateY(-8px) rotate(-45deg)';
  } else {
    this.children[0].style.transform = 'translateY(0) rotate(0)';
    this.children[1].style.opacity = '1';
    this.children[2].style.transform = 'translateY(0) rotate(0)';
  }
});

// Close mobile menu when clicking a link
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.children[0].style.transform = 'translateY(0) rotate(0)';
    mobileMenuBtn.children[1].style.opacity = '1';
    mobileMenuBtn.children[2].style.transform = 'translateY(0) rotate(0)';
  });
});

// Scroll animations
const animatedElements = document.querySelectorAll('.animate-in');

function checkScroll() {
  animatedElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('visible');
    }
  });
}

// Initial check on page load
window.addEventListener('load', checkScroll);
// Check on scroll
window.addEventListener('scroll', checkScroll);

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    this.classList.add('active');
    
    const filterValue = this.getAttribute('data-filter');
    
    projectCards.forEach(card => {
        console.log(card.getAttribute('data-category'));
        console.log("ss ="+filterValue);
        
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Skill bar animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillSection = document.querySelector('#skills');

function animateSkillBars() {
  const sectionTop = skillSection.getBoundingClientRect().top;
  const triggerHeight = window.innerHeight * 0.8;
  
  if (sectionTop < triggerHeight) {
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
    window.removeEventListener('scroll', animateSkillBars);
  }
}

window.addEventListener('scroll', animateSkillBars);



// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});

// Parallax effect for floating shapes
window.addEventListener('mousemove', function(e) {
  const shapes = document.querySelectorAll('.floating-shape');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 20;
    const moveX = (x - 0.5) * speed;
    const moveY = (y - 0.5) * speed;
    
    shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

// Navbar scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    header.style.padding = '10px 0';
  } else {
    header.style.padding = '20px 0';
  }
});


// for projects and running projects

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - script running');
    
    // State variables
    let visibleProjects = 6;
    let filteredProjects = [];
    let activeFilter = 'all';
    
    // DOM elements
    const projectsGrid = document.getElementById('projectsGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const carouselElement = document.getElementById('projectsCarousel');
    const carouselPrevBtn = document.getElementById('carouselPrev');
    const carouselNextBtn = document.getElementById('carouselNext');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    console.log('Found projects grid:', projectsGrid);
    
    // Sample projects data
    const projects = [
      {
        id: 1,
        title: "HireXpert",
        description: "An advanced recruitment platform designed to streamline and automate pre-screening processes for recruiters.",
        image: "logo (1).png",
        category: "app",
        tags: ["Java", "MySQL", "React", "Python", "re-charts"],
        link: "#",
        github: "https://github.com/ThoufeekRZ/HireExpert"
      },
      {
        id: 2,
        title: "Instagram Clone",
        description: "Developed an Instagram clone using vanilla JavaScript with posts, likes, comments, and profiles.",
        image: "—Pngtree—instagram icon instagram logo_3584852.png",
        category: "app",
        tags: ["Vanilla JS", "LocalStorage"],
        link: "https://instaramiz.netlify.app/loginpage.html",
        github: "https://code.zoho.com/portal/zstechtenkasi/363000000073097#CODE_EDITOR/file:///home/workspace/english.html/Instagram/new_js/loginpage.html"
      },
      {
        id: 3,
        title: "Help Desk",
        description: "A terminal-based help desk application with three roles and all basic features that are in Zoho Desk.",
        image: "pngwing.com (16).png",
        category: "app",
        tags: ["Java", "MySQL"],
        link: "#",
        github: "https://github.com/ThoufeekRZ/helpDesk"
      },
      {
        id: 4,
        title: "North Gpt",
        description: "A webpage consisting of only fake data created using HTML and CSS.",
        image: "north.png",
        category: "app",
        tags: ["HTML", "CSS"],
        link: "https://thoufeeka-9984-8443.zcodeusers.in/final%20project/project.html",
        github: "https://code.zoho.com/portal/zstechtenkasi/363000000073097#CODE_EDITOR/file:///home/workspace/final%20project/project.html"
      },
      {
        id: 5,
        title: "Custom TreeMap Implementation",
        description: "Developed a TreeMap in Java using the Red-Black Tree algorithm for sorted key-value pairs.",
        image: "dsa.webp",
        category: "Data Structure",
        tags: ["Java", "Red-Black tree algorithm"],
        link: "#",
        github: "https://github.com/ThoufeekRZ/Custom_DSA_implementations"
      },
      {
        id: 6,
        title: "Custom Doubly Linked List Implementation",
        description: "Developed a Doubly Linked List in Java with efficient insertion, deletion, and traversal in both directions.",
        image: "dsa.webp",
        category: "Data Structure",
        tags: ["Java", "Linked List"],
        link: "#",
        github: "https://github.com/ThoufeekRZ/Custom_DSA_implementations"
      },
      {
        id: 7,
        title: "Custom Priority Queue Implementation",
        description: "Implemented a Priority Queue in Java using a binary heap to efficiently manage elements based on priority.",
        image: "dsa.webp",
        category: "Data Structure",
        tags: ["Java", "Heap", "Queue"],
        link: "#",
        github: "https://github.com/ThoufeekRZ/Custom_DSA_implementations"
      },
      {
        id: 8,
        title: "Custom HashMap Implementation",
        description: "Developed a custom HashMap in Java to understand its internal workings, ensuring O(n) time complexity.",
        image: "dsa.webp",
        category: "Data Structure",
        tags: ["Java", "Buckets of nodes"],
        link: "#",
        github: "https://github.com/ThoufeekRZ/Custom_DSA_implementations"
      },
      {
        id: 9,
        title: "Custom LinkedHashMap Implementation",
        description: "Designed and implemented a LinkedHashMap in Java to maintain key-value pairs with insertion order.",
        image: "dsa.webp",
        category: "Data Structure",
        tags: ["Java"],
        link: "#",
        github: "https://github.com/ThoufeekRZ/Custom_DSA_implementations"
      },
      {
        id: 10,
        title: "Social Media Application",
        description: "A SPA built during the study period of React.",
        image: "stock-vector-spa-single-page-application-acronym-business-concept-background-vector-illustration-concept-1892868430-removebg-preview.png",
        category: "ui",
        tags: ["React", "CSS", "JSON for storing data"],
        link: "#",
        github: "https://github.com/ThoufeekRZ/react_social_media_netlify"
      },
      {
        id: 11,
        title: "Tip Calculator",
        description: "A tip calculator useful for people when they visit a restaurant and share their expenses.",
        image: "stock-vector-spa-single-page-application-acronym-business-concept-background-vector-illustration-concept-1892868430-removebg-preview.png",
        category: "ui",
        tags: ["JavaScript", "HTML", "CSS"],
        link: "https://thoufeeka-9984-8443.zcodeusers.in/js/DOM/Assignment024.html",
        github: "https://code.zoho.com/portal/zstechtenkasi/363000000073097#CODE_EDITOR/file:///home/workspace/js/DOM/Assignment023.html"
      },
      {
        id: 12,
        title: "Rock Paper Scissor",
        description: "A classic game of Rock, Paper, Scissors.",
        image: "stock-vector-spa-single-page-application-acronym-business-concept-background-vector-illustration-concept-1892868430-removebg-preview.png",
        category: "ui",
        tags: ["JavaScript", "HTML", "CSS"],
        link: "https://thoufeeka-9984-8443.zcodeusers.in/js/DOM/Assignment023.html",
        github: "https://code.zoho.com/portal/zstechtenkasi/363000000073097#CODE_EDITOR/file:///home/workspace/js/DOM/Assignment023.html"
      },
      {
        id: 13,
        title: "To-Do List",
        description: "A To-Do List to keep track of daily tasks.",
        image: "stock-vector-spa-single-page-application-acronym-business-concept-background-vector-illustration-concept-1892868430-removebg-preview.png",
        category: "ui",
        tags: ["React", "CSS", "JSON for storing data"],
        link: "#",
        github: "https://github.com/ThoufeekRZ/todo-list"
      },
      {
        id: 14,
        title: "Mars War",
        description: "A project which I created in Scratch, used many logics, conditions, and looping.",
        image: "Screenshot from 2025-03-14 17-25-17.png",
        category: "app",
        tags: ["Scratch"],
        link: "https://scratch.mit.edu/projects/1040855612/",
        github: "https://scratch.mit.edu/projects/1040855612/editor/"
      }
    ];
    
    
    // Sample notable projects for carousel
    const notableProjects = [
      {
        id: 1,
        title: "Calculator",
        description: "A good calculator.",
        image: "https://placehold.co/300x200/lightblue/white?text=CALCULATOR",
        link: "https://thoufeeka-9984-8443.zcodeusers.in/js/DOM/Assignment021.html",
        github: "https://code.zoho.com/portal/zstechtenkasi/363000000073097#CODE_EDITOR/file:///home/workspace/js/DOM/Assignment021.html",
        tags: ["JavaScript","Html","Css"],
      },
      {
        id: 2,
        title: "Ui Replica",
        description: "A page created only to extend my skills in ui",
        image: "https://placehold.co/300x200/darkblue/white?text=UI+Replica",
        link: "https://thoufeeka-9984-8443.zcodeusers.in/Assignment20/",
        github: "https://code.zoho.com/portal/zstechtenkasi/363000000073097#CODE_EDITOR/file:///home/workspace/Assignment20",
        tags: ["Html", "CSS"],
      },
      {
        id: 3,
        title: "Ui Replica (VORTEX)",
        description: "A page created only to extend my skills in ui",
        image: "https://placehold.co/300x200/darkblue/white?text=UI+Replica",
        link: "https://thoufeeka-9984-8443.zcodeusers.in/Assignment16/vortex.html",
        github: "https://code.zoho.com/portal/zstechtenkasi/363000000073097#CODE_EDITOR/file:///home/workspace/Assignment16/vortex.html",
        tags: ["Html", "CSS"],
      },
      {
        id: 4,
        title: "Type Master",
        description: "A simple markdown editor with preview functionality.",
        image: "https://placehold.co/300x200/purple/white?text=TypeMaster",
        link: "https://thoufeeka-9984-8443.zcodeusers.in/js/DOM/Assignment025.html",
        github: "https://code.zoho.com/portal/zstechtenkasi/363000000073097#CODE_EDITOR/file:///home/workspace/js/DOM/Assignment025.html",
        tags: ["JavaScript", "Html","Css"],
      },
      {
        id: 5,
        title: "Help the key",
        description: "A game where a key is struggling to escape the board, help him to escape",
        image: "https://placehold.co/300x200/green/white?text=Help+The+Key",
        link: "https://scratch.mit.edu/projects/10384383",
        github: "https://scratch.mit.edu/projects/1038438386/editor/",
        tags: ["Scratch"],
      },
      {
        id: 6,
        title: "Catch the apple",
        description: "An application to track workouts and fitness progress.",
        image: "https://placehold.co/300x200/red/white?text=Catch+the+apple",
        link: "https://scratch.mit.edu/projects/1034237224/",
        github: "https://scratch.mit.edu/projects/1034237224/editor/",
        tags: ["Scratch"]
      }
    ];
    
    // Initialize the page
    function init() {
      console.log('Initializing...');
      filterProjects(activeFilter);
      renderCarousel();
      setupEventListeners();
      console.log('Initialization complete');
    }
    
    // Filter projects based on category
    function filterProjects(filter) {
      console.log('Filtering projects by:', filter);
      activeFilter = filter;
      
      if (activeFilter === 'all') {
        filteredProjects = [...projects];
      } else {
        filteredProjects = projects.filter(project => project.category === activeFilter);
      }
      
      console.log('Filtered projects count:', filteredProjects.length);
      renderProjects();
      toggleLoadMoreButton();
    }
    
    // Render projects to the grid
    function renderProjects() {
      if (!projectsGrid) {
        console.error('Projects grid element not found!');
        return;
      }
      
      console.log('Rendering projects...');
      projectsGrid.innerHTML = '';
      
      const projectsToShow = filteredProjects.slice(0, visibleProjects);
      
      if (projectsToShow.length === 0) {
        projectsGrid.innerHTML = '<div class="no-projects">No projects found for this filter.</div>';
        return;
      }
      
      projectsToShow.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
      });
      
      console.log('Projects rendered:', projectsToShow.length);
      
      // Initialize icons after rendering
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
     
    }
    
    // Create a project card element
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card animate-in';
        card.setAttribute('data-category', project.category);
      
        const tagsHtml = project.tags.map(tag => `<span>${tag}</span>`).join('');
      
        card.innerHTML = `
          <div class="project-img">
            <img src="${project.image}" alt="${project.title}" onerror="this.src='https://placehold.co/600x400'">
            <div class="project-overlay">
              <div class="project-links">
              ${project.link !== "#" ? `<a href="${project.link}" target="_blank" class="project-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>` : ""}
              
                <a href="${project.github}" target="_blank" class="project-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path
                                            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                        </path>
                                    </svg>
                </a>
              </div>
            </div>
          </div>
          <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
              ${tagsHtml}
            </div>
          </div>
        `;
      
        // Ensure the animation triggers after DOM insertion
        requestAnimationFrame(() => {
          card.classList.add('visible');
        });
      
        return card;
      }
      
    
    // Render carousel items
    function renderCarousel() {
      if (!carouselElement) {
        console.error('Carousel element not found!');
        return;
      }
      
      console.log('Rendering carousel...');
      carouselElement.innerHTML = '';
      
      notableProjects.forEach(project => {
        const carouselItem = createCarouselItem(project);
        carouselElement.appendChild(carouselItem);
      });
      
      console.log('Carousel rendered');
      
      // Initialize icons after rendering
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }
    
    // Create a carousel item element
    function createCarouselItem(project) {
      const item = document.createElement('div');
      item.className = 'carousel-item';
      
      const tagsHtml = project.tags.map(tag => `<span>${tag}</span>`).join('');
      
      item.innerHTML = `
        <div class="carousel-img">
          <img src="${project.image}" alt="${project.title}" onerror="this.src='https://placehold.co/300x200'">
          <div class="carousel-overlay">
            <div class="carousel-links">
              <a href="${project.link}" target="_blank" class="carousel-link" aria-label="View project">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
              </a>
              <a href="${project.github}" target="_blank" class="carousel-link" aria-label="View code on GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path
                                            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                        </path>
                                    </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="carousel-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="carousel-tags">
            ${tagsHtml}
          </div>
        </div>
      `;
      
      return item;
    }
    
    // Set up event listeners
    function setupEventListeners() {
      console.log('Setting up event listeners...');
      
      // Filter buttons
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const filter = this.getAttribute('data-filter');
          console.log('Filter clicked:', filter);
          
          // Update active class
          filterBtns.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          
          // Reset visible projects and apply filter
          visibleProjects = 6;
          filterProjects(filter);
        });
      });
      
      // Load more button
      if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
          console.log('Load more clicked');
          visibleProjects += 3;
          renderProjects();
          toggleLoadMoreButton();
        });
      }
      
      // Carousel navigation
      if (carouselPrevBtn) {
        carouselPrevBtn.addEventListener('click', function() {
          scrollCarousel('left');
        });
      }
      
      if (carouselNextBtn) {
        carouselNextBtn.addEventListener('click', function() {
          scrollCarousel('right');
        });
      }
      
      console.log('Event listeners set up');
    }
    
    // Toggle load more button visibility
    function toggleLoadMoreButton() {
      if (!loadMoreBtn) return;
      
      if (filteredProjects.length > visibleProjects) {
        loadMoreBtn.style.display = 'block';
      } else {
        loadMoreBtn.style.display = 'none';
      }
    }
    
    // Scroll carousel in a direction
    function scrollCarousel(direction) {
      if (!carouselElement) return;
      
      const scrollAmount = 300;
      
      if (direction === 'left') {
        carouselElement.scrollLeft -= scrollAmount;
      } else {
        carouselElement.scrollLeft += scrollAmount;
      }
    }
    
    // Initialize everything
    init();
  });