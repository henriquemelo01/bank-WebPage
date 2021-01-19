'use strict';

///////////////////////////////////////
// Modal window

// Selecting Elements:
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  // Foi adicionado o metodo preventDefault ao evento para não deixar a pagina retornar ao inicio quando clicado nos botões que vão abrir a modal window.
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden'); // borrar fundo
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Adicionando evento de clique para os dois botões que vão exibir a modal window de Cadastrar conta
for (const btnOpenModal of btnsOpenModal)
  btnOpenModal.addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// ==========================================

// DOM: é a interface que permite a "comunicação"/ interaçã entre o browser (HTML documents que são renderizados no browser e pelo browser) e o código em JS - API

/*  Funcionalidades do DOM 

- Nos permite fazer a interção entre o JS e os documentos que são renderizados pelo browser e no browser 

- Usando a DOM podemos escrever JS para criar, modificar e deletar elementos HTML. (.creatElementById, .innerHTML,insertAdjacentHTML() ...
 )

 - Setar estilos (css) , classes , atributos e ouvir e responder eventos.

- DOM tree is generated from an HTML document, which we can then interact with;
http://prntscr.com/wnr5q2

= We can write JavaScript to create, modify and delete HTML elements;

DOM is a very complex API that contains lots of methods and properties to interact with the DOM tree (.querySelector(), .addEventListener()...)

*/

/* Cada Element da DOM tree é chamado de NODE. Eles são representados por objetos, assim contém diversos metodos e propriedades.

Eles ainda podem ser dividos em subtipos (child types):

- Element (objetos) -> HTMLElement - links, buttons , ...; 

Cada um destes apresentam propriedades/metodos/atributos unicos e herdam os metodos dos seus "pais" (parent node types). 

Os elementos HTML vão ter acesso a todos os metodos e propriedades do element type como innerHTML(), .classList, .children, .parentElement, .insertAdjacentHTML(), etc...

- Text ;
- Comment; 
- Document;

http://prntscr.com/wnre69


OBS: Os metodos .addEventListener() e .removeEventListener() são herdados de um outro tipo de node type (que não é utilizado na prática) o Event Target (Event Target -> Node + Window ).

Obs 2: Os metodos .querySelector() e .querySelectorAll() são comuns ao element e ao documen

*/

// // ==================================================

// // Creating Cookie Message

// const header = document.querySelector('.header');
// const message = document.createElement('div');

// // Modifying DOM element
// message.classList.add('cookie-message');
// message.innerHTML =
//   '"We use cookies for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button>"';

// // Insert DOM element (Add element before header as a sibling)

// header.after(message);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', () => message.remove());

// // Styles; Element.style.propertie = "value0" - creating in line properties ** Prioridade Max de estilo

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 15 + 'px';

// // Obs: usando getComputedStyle(element) acessamos todos estilos do element, inclusive, aqueles que foram definidos no stylesheet (classe css)

// // console.log(getComputedStyle(message).width);
// // console.log(message.width); // undefined

// message.style.margin = '2.5px';

// ==================================================

// Implementing Smooth Scrolling: Quando clicar no botão Learn More, vamos percorrer a tela até a 1ª sessão (efeito de transição)

// Learn More
const btnLearnMore = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Add click event (event listner):
btnLearnMore.addEventListener('click', () =>
  section1.scrollIntoView({ behavior: 'smooth' })
);

// ==================================================

// Menu Hover effect using JS - Old hover

// const navMenu = document.querySelectorAll('.nav__link');

// navMenu.forEach(function (item) {
//   item.addEventListener('mouseenter', () => (item.style.color = 'red'));
// });

// navMenu.forEach(function (item) {
//   item.addEventListener('mouseleave', () => (item.style.color = '#333'));
// });

// ==================================================

// JS events important properties ( Bubbling and Capturing) - Event propagation

/* 

- Capturing Phase: Evento é gerado no root (Document) e viaja até o elemento que será alvo do evento percorrendo por todos seus parents.

- Target phase: Assim que o evento "chegou" no elemento alvo, os eventos podem ser "ouvidos"

- Bubbling: Após a target phase o evento retorna ao root. Isto implica na seguinte situação:

Quando atribuimos um eventhandler para dois elementos child e parent, por ex, add evento de click, ao clicarmos no elemento child, o evento será disparado para o pai e filho

*/

// Page Navigation (Scroling) using Event Delegation

// Vamos atribuir um eventhandler para o parent:
const navLinks = document.querySelector('.nav__links');
navLinks.addEventListener(
  'click',
  function (event) {
    event.preventDefault(); /* Por padrão quando clicar em um link que foi referenciado, a pagina move até a referência, assim vamos tirar este "efeito*/

    // Utiliza-se event.target para obter o elemento que foi clicado, em seguida, como este elemento esta "apontando" a uma sessão, pode-se obte-la por meio do atributo href. Em seguida com a saída de .getAttribute("href") conseguimos selecionar esta sessão e por fim aplicar o efeito de scroll

    // Selecionando apenas os elementos que contém a class nav__link
    if (event.target.classList.contains('nav__link')) {
      const id = event.target.getAttribute('href');
      console.log(id);
      const section = document.querySelector(id);
      section.scrollIntoView({ behavior: 'smooth' });
    }
  },
  true // Setando o argumento como true muda-se o sentido da propagação do evento: parent -> children (true) / children -> parent (false - default - bubbling) ** Não é necessário
);

// ==================================================

// Tabbed Component - Operation Section

const tabsContainer = document.querySelector('.operations__tab-container'); // Event delegation
const tabs = document.querySelectorAll('.operations__tab');
const tabContents = document.querySelectorAll('.operations__content');

// Refactoring Tabbed Component functionality

tabsContainer.addEventListener('click', function (event) {
  // Identificando qual elemento foi clicado usando event.target + Selecionando apenas os botões (tabs). Se não utilizarmos o metodo .closest,  quando clicarmos no spam que esta dentro do botão o retorno seria o proprio spam, assim o metodo faz com que o retorno seja o botão (tab)

  const currentTab = event.target.closest('.operations__tab');

  // Não executar o código quando clicamos na região vazia que esta entre a borda do container e os botões(tabs)
  if (!currentTab) return;

  const contentNum = currentTab.dataset.tab;
  const currentContent = document.querySelector(
    `.operations__content--${contentNum}`
  );

  // console.log(contentNum);

  // Remover o efeito de Tab ativa das demais tabs
  tabs.forEach(function (t) {
    if (t !== currentTab) t.classList.remove('operations__tab--active');
  });

  // Add Efeito de Tab Ativa
  currentTab.classList.add('operations__tab--active');

  // Esconder conteúdos que não correspondem a tab clicada - .remove(operations__content--active)
  tabContents.forEach(function (content) {
    if (content !== currentContent)
      content.classList.remove('operations__content--active');
  });

  // Exibir conteudo da tab ativa
  currentContent.classList.add('operations__content--active');
});

// Old Code:

// tabContainer.addEventListener('click', function (event) {
//   // Usando o metodo childrenElement.closest() faz-se uma varredura procurando o elemento "acima" ou parent que contém a classe passada como parãmetro (query string). OBS: Se o event.target contém a classe especificada na query string, será retornado o proprio elemento.

//   const currentTab = event.target.closest('.operations__tab');

//   // Acessando apenas os elementos que são tab
//   if (currentTab.classList.contains('operations__tab')) {
//     // Obtendo valor do dataset para identificar qual conteúdo será exibido
//     const currentTabNum = currentTab.dataset.tab;

//     // Acessar conteudo com valor da currentTabNum
//     const currentContent = document.querySelector(
//       `.operations__content--${currentTabNum}`
//     );

//     // Get Siblings - Removendo classe que faz com que o conteudo dos demais operations content seja exibido

//     [...currentContent.parentElement.children].forEach(function (conteudo) {
//       // Obtendo Elementos que são conteudo
//       if (conteudo.classList.contains('operations__content')) {
//         // Excluindo currentContent
//         if (conteudo !== currentContent)
//           // Remover demais conteúdos que não correspondem ao conteudo da tab
//           conteudo.classList.remove('operations__content--active');
//       }
//     });

//     // Obtendo demais tabs (botões) e excluindo efeito de tab ativa
//     [...currentTab.parentElement.children].forEach(function (tab) {
//       if (tab !== currentTab) {
//         tab.classList.remove('operations__tab--active');
//       }
//     });

//     // Efeito tab ativo
//     currentContent.classList.add('operations__content--active');

//     // Exibir conteúdo do tab ativo
//     currentTab.classList.add('operations__tab--active');
//   }
// });

// Menu fade animation passing args to event handler
const nav = document.querySelector('.nav');

// OBS: Quando queremos passar mais de um argumento para uma handler function, utilizamos this para acessa-lo. Um event handler só tem um parametro padrão (event que ocorreu)
const handleHover = function (e) {
  // Identificando os elementos que fazem parte do menu de navegação: Neste caso não foi necessário usar o metodo closest, uma vez que o elemento alvo (nav__link) não contém nenhum children
  // console.log(this); // Normalmente, usualy corresponde ao elemetno que chamou o eventListener, entretanto como setamos o this manualmente ele retorna o valor passado para função

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    // Getting other elements - siblings

    // Getting parent that contains the class .nav + select children using that contains the class .nav__link
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    const logo = link.closest('.nav').querySelector('img');
    logo.style.opacity = this;
  }
};

// "mouseouver" é similar ao "mouseenter", entretando o evento mouseenter não é propagado (event bubbling)
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Stick navigation - Menu se move quando rolamos a pagina (Scroll)

// 1º Metodo - Performance do sistema é prejudicado uma vez que o evento é disparado a todo momento

// // Obtendo coordenadaas da section 1
// const initialCord = section1.getBoundingClientRect();

// // Evento é disparado toda vez que rolamos a página
// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY); // distância do limite do view port até o topo da página

//   // O efeito de navigation stick - só ocorrerá quando entrarmos na primeira sessão da pagina  (section--1 , features)

//   if (window.scrollY > initialCord.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// 2º Metodo para implementar efeito no menu - Using The Intersection observer API. Usado para criar paginas "infinitas"

// Stick nav - functionality v2
// A call back é disparada toda vez que o elemento que será observado esta ou não no viewport - a call back recebe dois parametros (entries - informações sobre o elemento que esta sendo observado e observer, informações sobre o observer)

const stickNav = function (entries) {
  const [entry] = entries; // entries [0] - primeira intersecção

  // Sticky effect só ocorre quando o viewport não intercept o header

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

// Chamar a call back function quando o header sumir do viewport - section 1 esta depois do header
const header = document.querySelector('.header');
const navHeigth = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(stickNav, {
  root: null, // viewport
  threshold: 0, // header não pode ser mais visto no viewport
  rootMargin: `-${navHeigth}px`, // Evento é disparado 90px antes do threshold
});
headerObserver.observe(header);

// Scroll Animations:

// Reveal sections

const sections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  // valor inicial do entries para este caso são todos Intersection Objects entries , entretanto quando ocorre a 1 interseção o valor será apenas o Object Intersection entry correspondente

  const [entry] = entries;
  // console.log(entries);
  // console.log(entry);

  if (!entry.isIntersecting) return;
  if (entry.isIntersecting) entry.target.classList.remove('section--hidden');

  // Parar de observar elemento após ser revelado
  sectionsObserver.unobserve(entry.target);
};

const sectionsObserver = new IntersectionObserver(revealSection, {
  root: null, // viewport
  threshold: 0.25, // revealing the section when the section is at least 25% of viewport
});

sections.forEach(section => {
  sectionsObserver.observe(section);
  section.classList.add('section--hidden');
});
