// Big window
let bigwindow = document.querySelector('.my-big-window');

// Label links in big window nav
let linkIndex = 0;
bigwindow.querySelectorAll('a').forEach( link => {
	link.dataset.linkIndex = linkIndex;
	link.classList.add('link-'+linkIndex);
	linkIndex++;
});

// Big window's shadow
let shadow = bigwindow.cloneNode(true);
shadow.classList.add('shadow');
shadow.querySelectorAll('img').forEach( element => { element.remove(); }); // remove any images
bigwindow.parentNode.appendChild(shadow);

// Pointer's shadow
let pointershadow = new Image(18, 19);
pointershadow.classList.add('pointer-shadow')
pointershadow.src = window.location.origin + '/pointer.png';
shadow.appendChild(pointershadow);

// Show pointer's shadow when hovering over big window
bigwindow.addEventListener('mousemove', e => {
	const rect = bigwindow.getBoundingClientRect();
	pointershadow.style.left = (e.clientX - rect.left)+'px';
	pointershadow.style.top = (e.clientY - rect.top)+'px';
});

bigwindow.querySelectorAll('a').forEach( element => {
	element.addEventListener('mouseover', e => {
		shadow.querySelector('.link-'+element.dataset.linkIndex).classList.add('hover');
	});
	element.addEventListener('mouseout', e => {
		shadow.querySelector('.link-'+element.dataset.linkIndex).classList.remove('hover');
	});
});

// Shuffle a list of elements
document.querySelectorAll('.sketches .content-wrapper').forEach( wrapperElement => {
	console.log('helo');
	for (var i = wrapperElement.children.length; i >= 0; i--) {
    wrapperElement.appendChild(wrapperElement.children[Math.random() * i | 0]);
	}
});


// document.querySelectorAll('#email').forEach( element => {
// 	element.addEventListener('click', e => {
// 		element.innerHTML = "&#116;&#097;&#105;&#099;&#104;&#105;&#046;&#097;&#114;&#105;&#116;&#111;&#109;&#111;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;";
// 	});
// });

// document.querySelectorAll('main').forEach( element => {
// 	element.classList.add('hidden');
// 	setTimeout(()=>{
// 		element.classList.add('visible');
// 	}, 1);
// });