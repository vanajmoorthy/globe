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
	scene.background = new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x000);

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

	var dLight2 = new three__WEBPACK_IMPORTED_MODULE_1__.PointLight(0x050430, 0.5);
	dLight2.position.set(-200, 500, 200);
	camera.add(dLight2);

	camera.position.z = 400;
	camera.position.x = 0;
	camera.position.y = 0;

	scene.add(camera);

	// Additional effects
	scene.fog = new three__WEBPACK_IMPORTED_MODULE_1__.Fog(0x050430, 400, 2000);

	// Helpers
	// const axesHelper = new AxesHelper(800);
	// scene.add(axesHelper);
	// var helper = new DirectionalLightHelper(dLight);
	// scene.add(helper);
	// var helperCamera = new CameraHelper(dLight.shadow.camera);
	// scene.add(helperCamera);

	// Initialize controls
	controls = new three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_2__.OrbitControls(camera, renderer.domElement);
	controls.enableZoom(false);
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
	Globe = new three_globe__WEBPACK_IMPORTED_MODULE_0__.default()
		// .globeImageUrl(EarthDarkSkin)

		.labelDotOrientation((e) => {
			return e.text === "ALA" ? "top" : "right";
		})
		.labelDotRadius(0.3)
		.labelSize((e) => e.size)
		.labelText("city")
		.labelResolution(6)
		.labelAltitude(0.01)
		.pointsData(_files_my_airports_json__WEBPACK_IMPORTED_MODULE_6__.airports)
		.pointColor(() => "#ffffff")
		.pointsMerge(true)
		.pointAltitude(0.07)
		.pointRadius(0)
		.hexPolygonsData(_files_globe_data_min_json__WEBPACK_IMPORTED_MODULE_4__.features)
		.hexPolygonResolution(3)
		.hexPolygonMargin(0.7)
		.showAtmosphere(false)
		.hexPolygonColor((e) => {
			if ([].includes(e.properties.ISO_A3)) {
				return "rgba(255,255,255, 1)";
			} else return "rgba(255,255,255, 0.7)";
		});

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
/******/ 		__webpack_require__.h = () => "82b469162bec3259bdd8"
/******/ 	})();
/******/ 	
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYW5kZW1pYy1nbG9iZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9wYW5kZW1pYy1nbG9iZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBcUM7QUFDUTtBQVk5QjtBQUM4RDtBQUM1QjtBQUNHO0FBQ0E7QUFDRTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGdEQUFhLEVBQUUsa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSx3Q0FBSztBQUNsQixlQUFlLCtDQUFZO0FBQzNCLHdCQUF3Qix3Q0FBSzs7QUFFN0I7QUFDQSxjQUFjLG9EQUFpQjtBQUMvQjtBQUNBOztBQUVBLGtCQUFrQixtREFBZ0I7QUFDbEM7QUFDQTs7QUFFQSxtQkFBbUIsbURBQWdCO0FBQ25DO0FBQ0E7O0FBRUEsbUJBQW1CLDZDQUFVO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsaUJBQWlCLHNDQUFHOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQix1RkFBYTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxnREFBVTtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDZEQUF1QjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnRUFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHdDQUFLO0FBQ2hDLDhCQUE4Qix3Q0FBSztBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLCtEQUFjLEtBQUssaURBQWM7QUFDakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztXQzVLQSxvRCIsImZpbGUiOiJtYWluLmU1NjYwYmQ4Njk0NTBmYzA5OGUwLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGhyZWVHbG9iZSBmcm9tIFwidGhyZWUtZ2xvYmVcIjtcbmltcG9ydCB7IFdlYkdMUmVuZGVyZXIsIFNjZW5lIH0gZnJvbSBcInRocmVlXCI7XG5pbXBvcnQge1xuXHRQZXJzcGVjdGl2ZUNhbWVyYSxcblx0QW1iaWVudExpZ2h0LFxuXHREaXJlY3Rpb25hbExpZ2h0LFxuXHRDb2xvcixcblx0Rm9nLFxuXHRBeGVzSGVscGVyLFxuXHREaXJlY3Rpb25hbExpZ2h0SGVscGVyLFxuXHRDYW1lcmFIZWxwZXIsXG5cdFBvaW50TGlnaHQsXG5cdFNwaGVyZUdlb21ldHJ5LFxufSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUdsb3dNZXNoIH0gZnJvbSBcInRocmVlLWdsb3ctbWVzaFwiO1xuaW1wb3J0IGNvdW50cmllcyBmcm9tIFwiLi9maWxlcy9nbG9iZS1kYXRhLW1pbi5qc29uXCI7XG5pbXBvcnQgdHJhdmVsSGlzdG9yeSBmcm9tIFwiLi9maWxlcy9teS1mbGlnaHRzLmpzb25cIjtcbmltcG9ydCBhaXJwb3J0SGlzdG9yeSBmcm9tIFwiLi9maWxlcy9teS1haXJwb3J0cy5qc29uXCI7XG52YXIgcmVuZGVyZXIsIGNhbWVyYSwgc2NlbmUsIGNvbnRyb2xzO1xubGV0IG1vdXNlWCA9IDA7XG5sZXQgbW91c2VZID0gMDtcbmxldCB3aW5kb3dIYWxmWCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMjtcbmxldCB3aW5kb3dIYWxmWSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XG52YXIgR2xvYmU7XG5cbmluaXQoKTtcbmluaXRHbG9iZSgpO1xub25XaW5kb3dSZXNpemUoKTtcbmFuaW1hdGUoKTtcblxuLy8gU0VDVElPTiBJbml0aWFsaXppbmcgY29yZSBUaHJlZUpTIGVsZW1lbnRzXG5mdW5jdGlvbiBpbml0KCkge1xuXHQvLyBJbml0aWFsaXplIHJlbmRlcmVyXG5cdHJlbmRlcmVyID0gbmV3IFdlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXM6IHRydWUgfSk7XG5cdHJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuXHRyZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXHQvLyByZW5kZXJlci5vdXRwdXRFbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZztcblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcblxuXHQvLyBJbml0aWFsaXplIHNjZW5lLCBsaWdodFxuXHRzY2VuZSA9IG5ldyBTY2VuZSgpO1xuXHRzY2VuZS5hZGQobmV3IEFtYmllbnRMaWdodCgweGJiYmJiYiwgMC4zKSk7XG5cdHNjZW5lLmJhY2tncm91bmQgPSBuZXcgQ29sb3IoMHgwMDApO1xuXG5cdC8vIEluaXRpYWxpemUgY2FtZXJhLCBsaWdodFxuXHRjYW1lcmEgPSBuZXcgUGVyc3BlY3RpdmVDYW1lcmEoKTtcblx0Y2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xuXHRjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG5cdHZhciBkTGlnaHQgPSBuZXcgRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZiwgMC44KTtcblx0ZExpZ2h0LnBvc2l0aW9uLnNldCgtODAwLCAyMDAwLCA0MDApO1xuXHRjYW1lcmEuYWRkKGRMaWdodCk7XG5cblx0dmFyIGRMaWdodDEgPSBuZXcgRGlyZWN0aW9uYWxMaWdodCgweDc5ODJmNiwgMSk7XG5cdGRMaWdodDEucG9zaXRpb24uc2V0KC0yMDAsIDUwMCwgMjAwKTtcblx0Y2FtZXJhLmFkZChkTGlnaHQxKTtcblxuXHR2YXIgZExpZ2h0MiA9IG5ldyBQb2ludExpZ2h0KDB4MDUwNDMwLCAwLjUpO1xuXHRkTGlnaHQyLnBvc2l0aW9uLnNldCgtMjAwLCA1MDAsIDIwMCk7XG5cdGNhbWVyYS5hZGQoZExpZ2h0Mik7XG5cblx0Y2FtZXJhLnBvc2l0aW9uLnogPSA0MDA7XG5cdGNhbWVyYS5wb3NpdGlvbi54ID0gMDtcblx0Y2FtZXJhLnBvc2l0aW9uLnkgPSAwO1xuXG5cdHNjZW5lLmFkZChjYW1lcmEpO1xuXG5cdC8vIEFkZGl0aW9uYWwgZWZmZWN0c1xuXHRzY2VuZS5mb2cgPSBuZXcgRm9nKDB4MDUwNDMwLCA0MDAsIDIwMDApO1xuXG5cdC8vIEhlbHBlcnNcblx0Ly8gY29uc3QgYXhlc0hlbHBlciA9IG5ldyBBeGVzSGVscGVyKDgwMCk7XG5cdC8vIHNjZW5lLmFkZChheGVzSGVscGVyKTtcblx0Ly8gdmFyIGhlbHBlciA9IG5ldyBEaXJlY3Rpb25hbExpZ2h0SGVscGVyKGRMaWdodCk7XG5cdC8vIHNjZW5lLmFkZChoZWxwZXIpO1xuXHQvLyB2YXIgaGVscGVyQ2FtZXJhID0gbmV3IENhbWVyYUhlbHBlcihkTGlnaHQuc2hhZG93LmNhbWVyYSk7XG5cdC8vIHNjZW5lLmFkZChoZWxwZXJDYW1lcmEpO1xuXG5cdC8vIEluaXRpYWxpemUgY29udHJvbHNcblx0Y29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXHRjb250cm9scy5lbmFibGVab29tKGZhbHNlKTtcblx0Y29udHJvbHMuZW5hYmxlRGFtcGluZyA9IHRydWU7XG5cdGNvbnRyb2xzLmR5bmFtaWNEYW1waW5nRmFjdG9yID0gMC4wMTtcblx0Y29udHJvbHMuZW5hYmxlUGFuID0gZmFsc2U7XG5cdGNvbnRyb2xzLm1pbkRpc3RhbmNlID0gMjAwO1xuXHRjb250cm9scy5tYXhEaXN0YW5jZSA9IDUwMDtcblx0Y29udHJvbHMucm90YXRlU3BlZWQgPSAwLjg7XG5cdGNvbnRyb2xzLnpvb21TcGVlZCA9IDE7XG5cdGNvbnRyb2xzLmF1dG9Sb3RhdGUgPSBmYWxzZTtcblxuXHRjb250cm9scy5taW5Qb2xhckFuZ2xlID0gTWF0aC5QSSAvIDMuNTtcblx0Y29udHJvbHMubWF4UG9sYXJBbmdsZSA9IE1hdGguUEkgLSBNYXRoLlBJIC8gMztcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBvbldpbmRvd1Jlc2l6ZSwgZmFsc2UpO1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlKTtcbn1cblxuLy8gU0VDVElPTiBHbG9iZVxuZnVuY3Rpb24gaW5pdEdsb2JlKCkge1xuXHQvLyBJbml0aWFsaXplIHRoZSBHbG9iZVxuXHRHbG9iZSA9IG5ldyBUaHJlZUdsb2JlKClcblx0XHQvLyAuZ2xvYmVJbWFnZVVybChFYXJ0aERhcmtTa2luKVxuXG5cdFx0LmxhYmVsRG90T3JpZW50YXRpb24oKGUpID0+IHtcblx0XHRcdHJldHVybiBlLnRleHQgPT09IFwiQUxBXCIgPyBcInRvcFwiIDogXCJyaWdodFwiO1xuXHRcdH0pXG5cdFx0LmxhYmVsRG90UmFkaXVzKDAuMylcblx0XHQubGFiZWxTaXplKChlKSA9PiBlLnNpemUpXG5cdFx0LmxhYmVsVGV4dChcImNpdHlcIilcblx0XHQubGFiZWxSZXNvbHV0aW9uKDYpXG5cdFx0LmxhYmVsQWx0aXR1ZGUoMC4wMSlcblx0XHQucG9pbnRzRGF0YShhaXJwb3J0SGlzdG9yeS5haXJwb3J0cylcblx0XHQucG9pbnRDb2xvcigoKSA9PiBcIiNmZmZmZmZcIilcblx0XHQucG9pbnRzTWVyZ2UodHJ1ZSlcblx0XHQucG9pbnRBbHRpdHVkZSgwLjA3KVxuXHRcdC5wb2ludFJhZGl1cygwKVxuXHRcdC5oZXhQb2x5Z29uc0RhdGEoY291bnRyaWVzLmZlYXR1cmVzKVxuXHRcdC5oZXhQb2x5Z29uUmVzb2x1dGlvbigzKVxuXHRcdC5oZXhQb2x5Z29uTWFyZ2luKDAuNylcblx0XHQuc2hvd0F0bW9zcGhlcmUoZmFsc2UpXG5cdFx0LmhleFBvbHlnb25Db2xvcigoZSkgPT4ge1xuXHRcdFx0aWYgKFtdLmluY2x1ZGVzKGUucHJvcGVydGllcy5JU09fQTMpKSB7XG5cdFx0XHRcdHJldHVybiBcInJnYmEoMjU1LDI1NSwyNTUsIDEpXCI7XG5cdFx0XHR9IGVsc2UgcmV0dXJuIFwicmdiYSgyNTUsMjU1LDI1NSwgMC43KVwiO1xuXHRcdH0pO1xuXG5cdEdsb2JlLnJvdGF0ZVkoLU1hdGguUEkgKiAoNSAvIDkpKTtcblx0R2xvYmUucm90YXRlWigtTWF0aC5QSSAvIDYpO1xuXHRjb25zdCBnbG9iZU1hdGVyaWFsID0gR2xvYmUuZ2xvYmVNYXRlcmlhbCgpO1xuXHRnbG9iZU1hdGVyaWFsLmNvbG9yID0gbmV3IENvbG9yKDB4M2EyMjhhKTtcblx0Z2xvYmVNYXRlcmlhbC5lbWlzc2l2ZSA9IG5ldyBDb2xvcigweDIyMDAzOCk7XG5cdGdsb2JlTWF0ZXJpYWwuZW1pc3NpdmVJbnRlbnNpdHkgPSAwLjE7XG5cdGdsb2JlTWF0ZXJpYWwuc2hpbmluZXNzID0gMC43O1xuXHQvLyBOT1RFIENvb2wgc3R1ZmZcblx0Ly8gZ2xvYmVNYXRlcmlhbC53aXJlZnJhbWUgPSB0cnVlO1xuXG5cdC8vIEluaXRpYWxpemUgdGhlIGdsb3dcblx0dmFyIG9wdGlvbnMgPSB7XG5cdFx0YmFja3NpZGU6IHRydWUsXG5cdFx0Y29sb3I6IFwiIzNhMjI4YVwiLFxuXHRcdHNpemU6IDEwMCAqIDAuMjUsXG5cdFx0cG93ZXI6IDYsXG5cdFx0Y29lZmZpY2llbnQ6IDAuMyxcblx0fTtcblx0dmFyIGdsb3dNZXNoID0gY3JlYXRlR2xvd01lc2gobmV3IFNwaGVyZUdlb21ldHJ5KDEwMCwgNzUsIDc1KSwgb3B0aW9ucyk7XG5cdEdsb2JlLmFkZChnbG93TWVzaCk7XG5cdHNjZW5lLmFkZChHbG9iZSk7XG59XG5cbmZ1bmN0aW9uIG9uTW91c2VNb3ZlKGV2ZW50KSB7XG5cdGNvbnNvbGUubG9nKFwieDogXCIgKyBtb3VzZVggKyBcIiB5OiBcIiArIG1vdXNlWSk7XG59XG5cbmZ1bmN0aW9uIG9uV2luZG93UmVzaXplKCkge1xuXHRjYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cdHdpbmRvd0hhbGZYID0gd2luZG93LmlubmVyV2lkdGggLyAyO1xuXHR3aW5kb3dIYWxmWSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XG5cdHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG5cdGNhbWVyYS5wb3NpdGlvbi54ICs9XG5cdFx0TWF0aC5hYnMobW91c2VYKSA8PSB3aW5kb3dIYWxmWCAvIDJcblx0XHRcdD8gKG1vdXNlWCAvIDIgLSBjYW1lcmEucG9zaXRpb24ueCkgKiAwLjAwNVxuXHRcdFx0OiAwO1xuXHRjYW1lcmEucG9zaXRpb24ueSArPSAoLW1vdXNlWSAvIDIgLSBjYW1lcmEucG9zaXRpb24ueSkgKiAwLjAwNTtcblx0Y2FtZXJhLmxvb2tBdChzY2VuZS5wb3NpdGlvbik7XG5cdGNvbnRyb2xzLnVwZGF0ZSgpO1xuXHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IFwiODJiNDY5MTYyYmVjMzI1OWJkZDhcIiJdLCJzb3VyY2VSb290IjoiIn0=