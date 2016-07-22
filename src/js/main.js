import '../index.jade'
import '../sass/reset.scss'
import '../sass/style.scss';

var scrolling = false;
var mq = window.matchMedia( "only screen and (max-width: 767px) and (orientation: portrait)" );

var menuItems = {
	about: document.querySelector('.about'),
	projects: document.querySelector('.projects'),
	blog: document.querySelector('.blog'),
	contact: document.querySelector('.contact'),

}

document.querySelector('#blog_link').addEventListener('click', () => {
	open('blog');
})

document.querySelector('#projects_link').addEventListener('click', () => {
	open('projects');
})

document.querySelector('#about_link').addEventListener('click', () => {
	open('about');
})

document.querySelector('#contact_link').addEventListener('click', () => {
	open('contact');
})

document.querySelector('.close').addEventListener('click', ()=> {
	document.querySelector('.left').className += " closed";
})

document.querySelector('.hamburger').addEventListener('click', ()=> {
	document.querySelector('.left').className = 'left';
})

window.onload = () => {

	BestRoute.on('/about', () => {
		open('about');
	});

	BestRoute.on('/projects', () => {
		open('projects');
	});

	BestRoute.on('/blog', () => {
		open('blog');
	});

	if(window.location.hash === "") {
		// changeHash("projects");
	} else {
		var hash = window.location.hash;
		changeHash(" ");

		window.setTimeout(()=>{
			window.location.hash = hash;
		}, 1)
	}
};

function open(el_class) {
	if(mq.matches) {
		window.setTimeout(()=> {
			document.querySelector('.left').className += " closed";
		}, 300)
	}
	var scr = window.scrollY;

	window.scroll(0, scr);

	scrollToItem(menuItems[el_class]);

	for(var item in menuItems) {
		if(item != el_class) {
			document.querySelector(`#${item}_link`).className = '';
		} else {
			document.querySelector(`#${item}_link`).className = 'current';
		}

	}
}

window.onwheel = scrolled;

window.addEventListener('touchmove', scrolled)


function scrolled(e){

	if(window._TO) {
		clearTimeout(window._TO);
	}
}

function scrollToItem(item) {
    var diff=((item.offsetTop-40)-window.scrollY)/4


		if (Math.abs(diff)>0.5) {
        window.scrollTo(0, (window.scrollY+diff))
        clearTimeout(window._TO)
        window._TO=setTimeout(scrollToItem, 30, item)
    } else {
        window.scrollTo(0, item.offsetTop-40)
    }
}

function changeHash(value) {
	history.replaceState(undefined, undefined, "#" + value);
}
