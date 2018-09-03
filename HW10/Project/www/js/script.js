"use strict";

;(()=>{
	let temp='test';
	document.getElementsByClassName('hamburger ')[0].onclick=function(){console.log(temp)};
})();

$(document).on('ready',function(){
	$('.mouse').on('click',function(){
		$('.overlay,.pop-up').css('display','block');
		
	});

	$('.pop-up').on('click',function(event){
		event.stopPropagation();	
		console.log('point1');	
		// $('.overlay').css('display','none');
		let temp=document.createElement('p');
		temp.innerText='Hellow';
		this.appendChild(temp);
	});
	$('.overlay').on('click',function(){
		console.log('point2');
		$('.overlay,.pop-up').css('display','none');
		
	});
	$('.portfolio__card').on('click',function(e){
		$(this).attr('data-portfolio-card');
		$('.overlay,.pop-up').css('display','block');
		let temp=document.createElement('p');
		temp.innerText=$(this).attr('data-portfolio-card');
		document.getElementsByClassName('pop-up')[0].appendChild(temp);
	})




})

