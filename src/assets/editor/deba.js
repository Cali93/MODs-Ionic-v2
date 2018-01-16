document.getElementById('addMod').addEventListener('click',function(){
	var loader = new THREE.ObjectLoader();
	loader.load( // load a resource
		'../assets/MODs.json', // resource URL
		function ( obj ) { // onCompleted callback
			editor.execute( new AddObjectCommand( obj ) );
		},
		function ( xhr ) { // onProgress callback
			// console.log();
		},
		function( err ) { // onError callback
			console.log( 'An error happened' );
		}
	);
})

var menuHiders = document.getElementsByClassName('hideMenu');
for (var i = 0; i < menuHiders.length; i++) {
	menuHiders[i].addEventListener('click',function(e){
		e.preventDefault;
		document.querySelector(this.dataset.toggle).classList.toggle('hidden');
	});
}
document.querySelector('#rotate').addEventListener('click',function(e){
	editor.signals.transformModeChanged.dispatch( 'rotate' );
	document.querySelector('#move').classList.toggle('hide');
	document.querySelector('#rotate').classList.toggle('hide');
});
document.querySelector('#move').addEventListener('click',function(e){
	editor.signals.transformModeChanged.dispatch( 'translate' );
	document.querySelector('#move').classList.toggle('hide');
	document.querySelector('#rotate').classList.toggle('hide');
});
document.querySelector('#delete').addEventListener('click',function(e){
	var object = editor.selected;
	if ( confirm( 'Delete ' + object.name + '?' ) === false ) return;
	var parent = object.parent;
	if ( parent === undefined ) return; // avoid deleting the camera or scene
	editor.execute( new RemoveObjectCommand( object ) );
});
document.querySelector('#clone').addEventListener('click',function(e){
	var object = editor.selected;
	if ( object.parent === null ) return; // avoid cloning the camera or scene
	object = object.clone();
	editor.execute( new AddObjectCommand( object ) );
});
