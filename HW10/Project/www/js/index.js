"use strict"

window.onload=()=>{
	//add event on element after download
	let portfolCard=document.getElementsByClassName('portfolio__item');
	for (let i in portfolCard) {
		if (i<portfolCard.length) {
			portfolCard[i].addEventListener('click', showPopUp, false);
		}else{
			break;
		}
	}
	//close pop up
	document.getElementById('portfolio_pop_up').addEventListener('click', closewPopUp, false);

	//open menu
	document.getElementsByClassName('hamburger')[0].addEventListener('click', hamburgerEvent, false);
	
	
}

function showPopUp(e){	
	let popUp=document.getElementById('portfolio_pop_up');
	popUp.style.cssText='display:block';
	document.getElementById('portfolio_pop_up_content').innerText=dataJson[this.getAttribute("data-index")];
	e.preventDefault();
	e.stopPropagation();
}

function closewPopUp(){
	this.style.cssText='display:none';
}

function hamburgerEvent(){
	let menu=document.getElementsByClassName('hero__menu')[0];
	if(this.classList.length<2){
		this.classList.add("hamburger--active");
		menu.classList.add("hero__menu--active");

	}else{
		this.classList.remove("hamburger--active");	
		menu.classList.remove("hero__menu--active");		
	}


}
