self["webpackHotUpdatepandemic_globe"]("main",{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three_globe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three-globe */ "./node_modules/three-globe/dist/three-globe.module.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls.js */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_glow_mesh__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three-glow-mesh */ "./node_modules/three-glow-mesh/dist/index.module.js");
/* harmony import */ var _files_globe_data_min_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./files/globe-data-min.json */ "./src/files/globe-data-min.json");
/* harmony import */ var _files_my_flights_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./files/my-flights.json */ "./src/files/my-flights.json");
/* harmony import */ var _files_my_airports_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./files/my-airports.json */ "./src/files/my-airports.json");








var renderer, camera, scene, controls;
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
var Globe;

init();
initGlobe();
onWindowResize();
animate();

// SECTION Initializing core ThreeJS elements
function init() {
	// Initialize renderer
	renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	// renderer.outputEncoding = THREE.sRGBEncoding;
	document.body.appendChild(renderer.domElement);

	// Initialize scene, light
	scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
	scene.add(new three__WEBPACK_IMPORTED_MODULE_1__.AmbientLight(0xbbbbbb, 0.3));
	scene.background = new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x040d21);

	// Initialize camera, light
	camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera();
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	var dLight = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(0xffffff, 0.8);
	dLight.position.set(-800, 2000, 400);
	camera.add(dLight);

	var dLight1 = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(0x7982f6, 1);
	dLight1.position.set(-200, 500, 200);
	camera.add(dLight1);

	var dLight2 = new three__WEBPACK_IMPORTED_MODULE_1__.PointLight(0x8566cc, 0.5);
	dLight2.position.set(-200, 500, 200);
	camera.add(dLight2);

	camera.position.z = 400;
	camera.position.x = 0;
	camera.position.y = 0;

	scene.add(camera);

	// Additional effects
	scene.fog = new three__WEBPACK_IMPORTED_MODULE_1__.Fog(0x535ef3, 400, 2000);

	// Helpers
	// const axesHelper = new AxesHelper(800);
	// scene.add(axesHelper);
	// var helper = new DirectionalLightHelper(dLight);
	// scene.add(helper);
	// var helperCamera = new CameraHelper(dLight.shadow.camera);
	// scene.add(helperCamera);

	// Initialize controls
	controls = new three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_2__.OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dynamicDampingFactor = 0.01;
	controls.enablePan = false;
	controls.minDistance = 200;
	controls.maxDistance = 500;
	controls.rotateSpeed = 0.8;
	controls.zoomSpeed = 1;
	controls.autoRotate = false;

	controls.minPolarAngle = Math.PI / 3.5;
	controls.maxPolarAngle = Math.PI - Math.PI / 3;

	window.addEventListener("resize", onWindowResize, false);
	document.addEventListener("mousemove", onMouseMove);
}

// SECTION Globe
function initGlobe() {
	// Initialize the Globe
	Globe = new three_globe__WEBPACK_IMPORTED_MODULE_0__.default();
	// .globeImageUrl(EarthDarkSkin)

	Globe.rotateY(-Math.PI * (5 / 9));
	Globe.rotateZ(-Math.PI / 6);
	const globeMaterial = Globe.globeMaterial();
	globeMaterial.color = new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x3a228a);
	globeMaterial.emissive = new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x220038);
	globeMaterial.emissiveIntensity = 0.1;
	globeMaterial.shininess = 0.7;
	// NOTE Cool stuff
	// globeMaterial.wireframe = true;

	// Initialize the glow
	var options = {
		backside: true,
		color: "#3a228a",
		size: 100 * 0.25,
		power: 6,
		coefficient: 0.3,
	};
	var glowMesh = (0,three_glow_mesh__WEBPACK_IMPORTED_MODULE_3__.createGlowMesh)(new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(100, 75, 75), options);
	Globe.add(glowMesh);
	scene.add(Globe);
}

function onMouseMove(event) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
	console.log("x: " + mouseX + " y: " + mouseY);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	camera.position.x +=
		Math.abs(mouseX) <= windowHalfX / 2
			? (mouseX / 2 - camera.position.x) * 0.005
			: 0;
	camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005;
	camera.lookAt(scene.position);
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "790f5a903d82bec79add"
/******/ 	})();
/******/ 	
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYW5kZW1pYy1nbG9iZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9wYW5kZW1pYy1nbG9iZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBcUM7QUFDUTtBQVk5QjtBQUM4RDtBQUM1QjtBQUNHO0FBQ0E7QUFDRTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGdEQUFhLEVBQUUsa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSx3Q0FBSztBQUNsQixlQUFlLCtDQUFZO0FBQzNCLHdCQUF3Qix3Q0FBSzs7QUFFN0I7QUFDQSxjQUFjLG9EQUFpQjtBQUMvQjtBQUNBOztBQUVBLGtCQUFrQixtREFBZ0I7QUFDbEM7QUFDQTs7QUFFQSxtQkFBbUIsbURBQWdCO0FBQ25DO0FBQ0E7O0FBRUEsbUJBQW1CLDZDQUFVO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsaUJBQWlCLHNDQUFHOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQix1RkFBYTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZ0RBQVU7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHdDQUFLO0FBQ2hDLDhCQUE4Qix3Q0FBSztBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLCtEQUFjLEtBQUssaURBQWM7QUFDakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7V0N0SkEsb0QiLCJmaWxlIjoibWFpbi5lMjUxZGQ5ZWU5ZGI0YzM1YTQ1OS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRocmVlR2xvYmUgZnJvbSBcInRocmVlLWdsb2JlXCI7XG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyLCBTY2VuZSB9IGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHtcblx0UGVyc3BlY3RpdmVDYW1lcmEsXG5cdEFtYmllbnRMaWdodCxcblx0RGlyZWN0aW9uYWxMaWdodCxcblx0Q29sb3IsXG5cdEZvZyxcblx0QXhlc0hlbHBlcixcblx0RGlyZWN0aW9uYWxMaWdodEhlbHBlcixcblx0Q2FtZXJhSGVscGVyLFxuXHRQb2ludExpZ2h0LFxuXHRTcGhlcmVHZW9tZXRyeSxcbn0gZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVHbG93TWVzaCB9IGZyb20gXCJ0aHJlZS1nbG93LW1lc2hcIjtcbmltcG9ydCBjb3VudHJpZXMgZnJvbSBcIi4vZmlsZXMvZ2xvYmUtZGF0YS1taW4uanNvblwiO1xuaW1wb3J0IHRyYXZlbEhpc3RvcnkgZnJvbSBcIi4vZmlsZXMvbXktZmxpZ2h0cy5qc29uXCI7XG5pbXBvcnQgYWlycG9ydEhpc3RvcnkgZnJvbSBcIi4vZmlsZXMvbXktYWlycG9ydHMuanNvblwiO1xudmFyIHJlbmRlcmVyLCBjYW1lcmEsIHNjZW5lLCBjb250cm9scztcbmxldCBtb3VzZVggPSAwO1xubGV0IG1vdXNlWSA9IDA7XG5sZXQgd2luZG93SGFsZlggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XG5sZXQgd2luZG93SGFsZlkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xudmFyIEdsb2JlO1xuXG5pbml0KCk7XG5pbml0R2xvYmUoKTtcbm9uV2luZG93UmVzaXplKCk7XG5hbmltYXRlKCk7XG5cbi8vIFNFQ1RJT04gSW5pdGlhbGl6aW5nIGNvcmUgVGhyZWVKUyBlbGVtZW50c1xuZnVuY3Rpb24gaW5pdCgpIHtcblx0Ly8gSW5pdGlhbGl6ZSByZW5kZXJlclxuXHRyZW5kZXJlciA9IG5ldyBXZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlIH0pO1xuXHRyZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcblx0cmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcblx0Ly8gcmVuZGVyZXIub3V0cHV0RW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2Rpbmc7XG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cblx0Ly8gSW5pdGlhbGl6ZSBzY2VuZSwgbGlnaHRcblx0c2NlbmUgPSBuZXcgU2NlbmUoKTtcblx0c2NlbmUuYWRkKG5ldyBBbWJpZW50TGlnaHQoMHhiYmJiYmIsIDAuMykpO1xuXHRzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IENvbG9yKDB4MDQwZDIxKTtcblxuXHQvLyBJbml0aWFsaXplIGNhbWVyYSwgbGlnaHRcblx0Y2FtZXJhID0gbmV3IFBlcnNwZWN0aXZlQ2FtZXJhKCk7XG5cdGNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcblx0Y2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuXHR2YXIgZExpZ2h0ID0gbmV3IERpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYsIDAuOCk7XG5cdGRMaWdodC5wb3NpdGlvbi5zZXQoLTgwMCwgMjAwMCwgNDAwKTtcblx0Y2FtZXJhLmFkZChkTGlnaHQpO1xuXG5cdHZhciBkTGlnaHQxID0gbmV3IERpcmVjdGlvbmFsTGlnaHQoMHg3OTgyZjYsIDEpO1xuXHRkTGlnaHQxLnBvc2l0aW9uLnNldCgtMjAwLCA1MDAsIDIwMCk7XG5cdGNhbWVyYS5hZGQoZExpZ2h0MSk7XG5cblx0dmFyIGRMaWdodDIgPSBuZXcgUG9pbnRMaWdodCgweDg1NjZjYywgMC41KTtcblx0ZExpZ2h0Mi5wb3NpdGlvbi5zZXQoLTIwMCwgNTAwLCAyMDApO1xuXHRjYW1lcmEuYWRkKGRMaWdodDIpO1xuXG5cdGNhbWVyYS5wb3NpdGlvbi56ID0gNDAwO1xuXHRjYW1lcmEucG9zaXRpb24ueCA9IDA7XG5cdGNhbWVyYS5wb3NpdGlvbi55ID0gMDtcblxuXHRzY2VuZS5hZGQoY2FtZXJhKTtcblxuXHQvLyBBZGRpdGlvbmFsIGVmZmVjdHNcblx0c2NlbmUuZm9nID0gbmV3IEZvZygweDUzNWVmMywgNDAwLCAyMDAwKTtcblxuXHQvLyBIZWxwZXJzXG5cdC8vIGNvbnN0IGF4ZXNIZWxwZXIgPSBuZXcgQXhlc0hlbHBlcig4MDApO1xuXHQvLyBzY2VuZS5hZGQoYXhlc0hlbHBlcik7XG5cdC8vIHZhciBoZWxwZXIgPSBuZXcgRGlyZWN0aW9uYWxMaWdodEhlbHBlcihkTGlnaHQpO1xuXHQvLyBzY2VuZS5hZGQoaGVscGVyKTtcblx0Ly8gdmFyIGhlbHBlckNhbWVyYSA9IG5ldyBDYW1lcmFIZWxwZXIoZExpZ2h0LnNoYWRvdy5jYW1lcmEpO1xuXHQvLyBzY2VuZS5hZGQoaGVscGVyQ2FtZXJhKTtcblxuXHQvLyBJbml0aWFsaXplIGNvbnRyb2xzXG5cdGNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcblx0Y29udHJvbHMuZW5hYmxlRGFtcGluZyA9IHRydWU7XG5cdGNvbnRyb2xzLmR5bmFtaWNEYW1waW5nRmFjdG9yID0gMC4wMTtcblx0Y29udHJvbHMuZW5hYmxlUGFuID0gZmFsc2U7XG5cdGNvbnRyb2xzLm1pbkRpc3RhbmNlID0gMjAwO1xuXHRjb250cm9scy5tYXhEaXN0YW5jZSA9IDUwMDtcblx0Y29udHJvbHMucm90YXRlU3BlZWQgPSAwLjg7XG5cdGNvbnRyb2xzLnpvb21TcGVlZCA9IDE7XG5cdGNvbnRyb2xzLmF1dG9Sb3RhdGUgPSBmYWxzZTtcblxuXHRjb250cm9scy5taW5Qb2xhckFuZ2xlID0gTWF0aC5QSSAvIDMuNTtcblx0Y29udHJvbHMubWF4UG9sYXJBbmdsZSA9IE1hdGguUEkgLSBNYXRoLlBJIC8gMztcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBvbldpbmRvd1Jlc2l6ZSwgZmFsc2UpO1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlKTtcbn1cblxuLy8gU0VDVElPTiBHbG9iZVxuZnVuY3Rpb24gaW5pdEdsb2JlKCkge1xuXHQvLyBJbml0aWFsaXplIHRoZSBHbG9iZVxuXHRHbG9iZSA9IG5ldyBUaHJlZUdsb2JlKCk7XG5cdC8vIC5nbG9iZUltYWdlVXJsKEVhcnRoRGFya1NraW4pXG5cblx0R2xvYmUucm90YXRlWSgtTWF0aC5QSSAqICg1IC8gOSkpO1xuXHRHbG9iZS5yb3RhdGVaKC1NYXRoLlBJIC8gNik7XG5cdGNvbnN0IGdsb2JlTWF0ZXJpYWwgPSBHbG9iZS5nbG9iZU1hdGVyaWFsKCk7XG5cdGdsb2JlTWF0ZXJpYWwuY29sb3IgPSBuZXcgQ29sb3IoMHgzYTIyOGEpO1xuXHRnbG9iZU1hdGVyaWFsLmVtaXNzaXZlID0gbmV3IENvbG9yKDB4MjIwMDM4KTtcblx0Z2xvYmVNYXRlcmlhbC5lbWlzc2l2ZUludGVuc2l0eSA9IDAuMTtcblx0Z2xvYmVNYXRlcmlhbC5zaGluaW5lc3MgPSAwLjc7XG5cdC8vIE5PVEUgQ29vbCBzdHVmZlxuXHQvLyBnbG9iZU1hdGVyaWFsLndpcmVmcmFtZSA9IHRydWU7XG5cblx0Ly8gSW5pdGlhbGl6ZSB0aGUgZ2xvd1xuXHR2YXIgb3B0aW9ucyA9IHtcblx0XHRiYWNrc2lkZTogdHJ1ZSxcblx0XHRjb2xvcjogXCIjM2EyMjhhXCIsXG5cdFx0c2l6ZTogMTAwICogMC4yNSxcblx0XHRwb3dlcjogNixcblx0XHRjb2VmZmljaWVudDogMC4zLFxuXHR9O1xuXHR2YXIgZ2xvd01lc2ggPSBjcmVhdGVHbG93TWVzaChuZXcgU3BoZXJlR2VvbWV0cnkoMTAwLCA3NSwgNzUpLCBvcHRpb25zKTtcblx0R2xvYmUuYWRkKGdsb3dNZXNoKTtcblx0c2NlbmUuYWRkKEdsb2JlKTtcbn1cblxuZnVuY3Rpb24gb25Nb3VzZU1vdmUoZXZlbnQpIHtcblx0bW91c2VYID0gZXZlbnQuY2xpZW50WCAtIHdpbmRvd0hhbGZYO1xuXHRtb3VzZVkgPSBldmVudC5jbGllbnRZIC0gd2luZG93SGFsZlk7XG5cdGNvbnNvbGUubG9nKFwieDogXCIgKyBtb3VzZVggKyBcIiB5OiBcIiArIG1vdXNlWSk7XG59XG5cbmZ1bmN0aW9uIG9uV2luZG93UmVzaXplKCkge1xuXHRjYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cdHdpbmRvd0hhbGZYID0gd2luZG93LmlubmVyV2lkdGggLyAyO1xuXHR3aW5kb3dIYWxmWSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XG5cdHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG5cdGNhbWVyYS5wb3NpdGlvbi54ICs9XG5cdFx0TWF0aC5hYnMobW91c2VYKSA8PSB3aW5kb3dIYWxmWCAvIDJcblx0XHRcdD8gKG1vdXNlWCAvIDIgLSBjYW1lcmEucG9zaXRpb24ueCkgKiAwLjAwNVxuXHRcdFx0OiAwO1xuXHRjYW1lcmEucG9zaXRpb24ueSArPSAoLW1vdXNlWSAvIDIgLSBjYW1lcmEucG9zaXRpb24ueSkgKiAwLjAwNTtcblx0Y2FtZXJhLmxvb2tBdChzY2VuZS5wb3NpdGlvbik7XG5cdGNvbnRyb2xzLnVwZGF0ZSgpO1xuXHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IFwiNzkwZjVhOTAzZDgyYmVjNzlhZGRcIiJdLCJzb3VyY2VSb290IjoiIn0=