'use strict';

window.addEventListener('load', init, false);

var mainObject;

function init(){
	mainObject=new Animation();
}

class Animation{

	constructor(){
		this.objectkeeper={};
		this.hemisphereLight;
		this.shadowLight;
		this.deleter=document.getElementById("delaterList");
		this.button=document.getElementById("creator");
		this.scale=document.getElementById("scale");
		this.figure =document.getElementById("figure");
		this.container = document.getElementById("conrainer3D");
		this.scene=new THREE.Scene();
		this.scene.background = new THREE.Color( 0xcccccc );
		this.scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
		this.renderer=new THREE.WebGLRenderer( { antialias: true } );
		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
		this.camera=new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 3000 );
		this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 3000 );
		this.camera.position.set( 200, 1500, 800 );
		
		this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
		this.controls.enableDamping = true; 
		this.controls.dampingFactor = 0.25;
		this.controls.screenSpacePanning = false;
		this.controls.minDistance = 100;
		this.controls.maxDistance = 2000
		this.controls.maxPolarAngle = Math.PI / 2;

		this.renderer.render(this.scene, this.camera);
	
		this.container.appendChild(this.renderer.domElement);
		window.addEventListener( 'resize', function(){this.onWindowResize()}.bind(this), false );
		createLights(this);
		this.animate();		
		this.render();
		this.button.addEventListener( 'click', function(){addCube(this)}.bind(this), false );
	}

	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
	}
	animate() {
		let b=function(){this.animate()}.bind(this);
		requestAnimationFrame( b);
		this.controls.update(); 
		this.render();
	}
	render() {
		this.renderer.render( this.scene, this.camera );
	}
	save(figure,type){
		this.objectkeeper[figure.uuid]=figure;		
		let div = document.createElement('div');
		let p = document.createElement('p');
		p.innerHTML=type
		let button = document.createElement('button');
		button.innerHTML='удалить';
		button.addEventListener( 'click', function(e){this.dellFigure(e,figure.uuid)}.bind(this), false );
  		div.appendChild(p);
  		div.appendChild(button);
  		this.deleter.appendChild(div);
	}


	dellFigure(e,id){
		this.deleter.removeChild(e.target.parentNode);
		this.scene.remove(this.objectkeeper[id]);
		
	}
}


function addCube(obj){
	
	let scale= parseInt(obj.scale.value);
	let figuretype=parseInt(obj.figure.value);
	let figureObj;
	let figure;
	let nameType;
	switch (figuretype) {			
			case 1:				
				figureObj = new THREE.BoxGeometry(50*scale, 50*scale, 50*scale);
				nameType='Куб';
				break;
			case 2:				
				figureObj = new THREE.SphereGeometry(4*scale,20*scale,20*scale);
				nameType='Сфера';
				break;
			case 3:				
				figureObj = new THREE.CylinderBufferGeometry( 0, 10*scale, 30*scale, 4, 1*scale );
				nameType='Пирамида';
				break;	
			default:
				// statements_def
				break;
		}
	
	
	let figureObjMaterial = new THREE.MeshNormalMaterial();//Устанавливаем материал
	figure = new THREE.Mesh(figureObj, figureObjMaterial);//Создаем линию из созданной геометрии
	
	figure.position.x = (Math.random()-0.5) * 2000;
	figure.position.y = (Math.random()-0.5) * 2000;
	figure.position.z = (Math.random()-0.5) * 2000;
	obj.scene.add(figure);//Добавляем объект на сцену
	obj.save(figure,nameType);
}

function createLights(obj) {

  obj.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)  
  obj.shadowLight = new THREE.DirectionalLight(0xffffff, .9);
  
  obj.shadowLight.position.set(150, 350, 350);

  obj.shadowLight.castShadow = true;
  
  obj.shadowLight.shadow.camera.left = -10;
  obj.shadowLight.shadow.camera.right = 10;
  obj.shadowLight.shadow.camera.top = 10;
  obj.shadowLight.shadow.camera.bottom = -10;
  obj.shadowLight.shadow.camera.near = 1;
  obj.shadowLight.shadow.camera.far = 1000;
  
  obj.shadowLight.shadow.mapSize.width = 2048;
  obj.shadowLight.shadow.mapSize.height = 2048;
  
  obj.scene.add(obj.hemisphereLight);  
  obj.scene.add(obj.shadowLight);
}