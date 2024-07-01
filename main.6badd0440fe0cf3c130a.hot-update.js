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

	var dLight = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(0xb06ab3, 0.8);
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
	controls.enableZoom = false;

	controls.enableDamping = true;
	controls.dynamicDampingFactor = 0.01;
	controls.enablePan = false;
	controls.minDistance = 200;
	controls.maxDistance = 500;
	controls.rotateSpeed = 0.8;
	controls.zoomSpeed = 1;
	controls.autoRotate = false;

	controls.minPolarAngle = Math.PI / 2;
	controls.maxPolarAngle = Math.PI - Math.PI / 2;

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
	globeMaterial.color = new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x4a0d4d);
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
	// camera.position.x +=
	// 	Math.abs(mouseX) <= windowHalfX / 2
	// 		? (mouseX / 2 - camera.position.x) * 0.005
	// 		: 0;
	// camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005;
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
/******/ 		__webpack_require__.h = () => "ac7dca91ff5257314db5"
/******/ 	})();
/******/ 	
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYW5kZW1pYy1nbG9iZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9wYW5kZW1pYy1nbG9iZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBcUM7QUFDUTtBQVk5QjtBQUM4RDtBQUM1QjtBQUNHO0FBQ0E7QUFDRTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGdEQUFhLEVBQUUsa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSx3Q0FBSztBQUNsQixlQUFlLCtDQUFZO0FBQzNCLHdCQUF3Qix3Q0FBSzs7QUFFN0I7QUFDQSxjQUFjLG9EQUFpQjtBQUMvQjtBQUNBOztBQUVBLGtCQUFrQixtREFBZ0I7QUFDbEM7QUFDQTs7QUFFQSxtQkFBbUIsbURBQWdCO0FBQ25DO0FBQ0E7O0FBRUEsbUJBQW1CLDZDQUFVO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsaUJBQWlCLHNDQUFHOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQix1RkFBYTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZ0RBQVU7QUFDdkI7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw2REFBdUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0VBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix3Q0FBSztBQUNoQyw4QkFBOEIsd0NBQUs7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwrREFBYyxLQUFLLGlEQUFjO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7V0M3S0Esb0QiLCJmaWxlIjoibWFpbi42YmFkZDA0NDBmZTBjZjNjMTMwYS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRocmVlR2xvYmUgZnJvbSBcInRocmVlLWdsb2JlXCI7XG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyLCBTY2VuZSB9IGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHtcblx0UGVyc3BlY3RpdmVDYW1lcmEsXG5cdEFtYmllbnRMaWdodCxcblx0RGlyZWN0aW9uYWxMaWdodCxcblx0Q29sb3IsXG5cdEZvZyxcblx0QXhlc0hlbHBlcixcblx0RGlyZWN0aW9uYWxMaWdodEhlbHBlcixcblx0Q2FtZXJhSGVscGVyLFxuXHRQb2ludExpZ2h0LFxuXHRTcGhlcmVHZW9tZXRyeSxcbn0gZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVHbG93TWVzaCB9IGZyb20gXCJ0aHJlZS1nbG93LW1lc2hcIjtcbmltcG9ydCBjb3VudHJpZXMgZnJvbSBcIi4vZmlsZXMvZ2xvYmUtZGF0YS1taW4uanNvblwiO1xuaW1wb3J0IHRyYXZlbEhpc3RvcnkgZnJvbSBcIi4vZmlsZXMvbXktZmxpZ2h0cy5qc29uXCI7XG5pbXBvcnQgYWlycG9ydEhpc3RvcnkgZnJvbSBcIi4vZmlsZXMvbXktYWlycG9ydHMuanNvblwiO1xudmFyIHJlbmRlcmVyLCBjYW1lcmEsIHNjZW5lLCBjb250cm9scztcbmxldCBtb3VzZVggPSAwO1xubGV0IG1vdXNlWSA9IDA7XG5sZXQgd2luZG93SGFsZlggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XG5sZXQgd2luZG93SGFsZlkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xudmFyIEdsb2JlO1xuXG5pbml0KCk7XG5pbml0R2xvYmUoKTtcbm9uV2luZG93UmVzaXplKCk7XG5hbmltYXRlKCk7XG5cbi8vIFNFQ1RJT04gSW5pdGlhbGl6aW5nIGNvcmUgVGhyZWVKUyBlbGVtZW50c1xuZnVuY3Rpb24gaW5pdCgpIHtcblx0Ly8gSW5pdGlhbGl6ZSByZW5kZXJlclxuXHRyZW5kZXJlciA9IG5ldyBXZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlIH0pO1xuXHRyZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcblx0cmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcblx0Ly8gcmVuZGVyZXIub3V0cHV0RW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2Rpbmc7XG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cblx0Ly8gSW5pdGlhbGl6ZSBzY2VuZSwgbGlnaHRcblx0c2NlbmUgPSBuZXcgU2NlbmUoKTtcblx0c2NlbmUuYWRkKG5ldyBBbWJpZW50TGlnaHQoMHhiYmJiYmIsIDAuMykpO1xuXHRzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IENvbG9yKDB4MDAwKTtcblxuXHQvLyBJbml0aWFsaXplIGNhbWVyYSwgbGlnaHRcblx0Y2FtZXJhID0gbmV3IFBlcnNwZWN0aXZlQ2FtZXJhKCk7XG5cdGNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcblx0Y2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuXHR2YXIgZExpZ2h0ID0gbmV3IERpcmVjdGlvbmFsTGlnaHQoMHhiMDZhYjMsIDAuOCk7XG5cdGRMaWdodC5wb3NpdGlvbi5zZXQoLTgwMCwgMjAwMCwgNDAwKTtcblx0Y2FtZXJhLmFkZChkTGlnaHQpO1xuXG5cdHZhciBkTGlnaHQxID0gbmV3IERpcmVjdGlvbmFsTGlnaHQoMHg3OTgyZjYsIDEpO1xuXHRkTGlnaHQxLnBvc2l0aW9uLnNldCgtMjAwLCA1MDAsIDIwMCk7XG5cdGNhbWVyYS5hZGQoZExpZ2h0MSk7XG5cblx0dmFyIGRMaWdodDIgPSBuZXcgUG9pbnRMaWdodCgweDA1MDQzMCwgMC41KTtcblx0ZExpZ2h0Mi5wb3NpdGlvbi5zZXQoLTIwMCwgNTAwLCAyMDApO1xuXHRjYW1lcmEuYWRkKGRMaWdodDIpO1xuXG5cdGNhbWVyYS5wb3NpdGlvbi56ID0gNDAwO1xuXHRjYW1lcmEucG9zaXRpb24ueCA9IDA7XG5cdGNhbWVyYS5wb3NpdGlvbi55ID0gMDtcblxuXHRzY2VuZS5hZGQoY2FtZXJhKTtcblxuXHQvLyBBZGRpdGlvbmFsIGVmZmVjdHNcblx0c2NlbmUuZm9nID0gbmV3IEZvZygweDA1MDQzMCwgNDAwLCAyMDAwKTtcblxuXHQvLyBIZWxwZXJzXG5cdC8vIGNvbnN0IGF4ZXNIZWxwZXIgPSBuZXcgQXhlc0hlbHBlcig4MDApO1xuXHQvLyBzY2VuZS5hZGQoYXhlc0hlbHBlcik7XG5cdC8vIHZhciBoZWxwZXIgPSBuZXcgRGlyZWN0aW9uYWxMaWdodEhlbHBlcihkTGlnaHQpO1xuXHQvLyBzY2VuZS5hZGQoaGVscGVyKTtcblx0Ly8gdmFyIGhlbHBlckNhbWVyYSA9IG5ldyBDYW1lcmFIZWxwZXIoZExpZ2h0LnNoYWRvdy5jYW1lcmEpO1xuXHQvLyBzY2VuZS5hZGQoaGVscGVyQ2FtZXJhKTtcblxuXHQvLyBJbml0aWFsaXplIGNvbnRyb2xzXG5cdGNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcblx0Y29udHJvbHMuZW5hYmxlWm9vbSA9IGZhbHNlO1xuXG5cdGNvbnRyb2xzLmVuYWJsZURhbXBpbmcgPSB0cnVlO1xuXHRjb250cm9scy5keW5hbWljRGFtcGluZ0ZhY3RvciA9IDAuMDE7XG5cdGNvbnRyb2xzLmVuYWJsZVBhbiA9IGZhbHNlO1xuXHRjb250cm9scy5taW5EaXN0YW5jZSA9IDIwMDtcblx0Y29udHJvbHMubWF4RGlzdGFuY2UgPSA1MDA7XG5cdGNvbnRyb2xzLnJvdGF0ZVNwZWVkID0gMC44O1xuXHRjb250cm9scy56b29tU3BlZWQgPSAxO1xuXHRjb250cm9scy5hdXRvUm90YXRlID0gZmFsc2U7XG5cblx0Y29udHJvbHMubWluUG9sYXJBbmdsZSA9IE1hdGguUEkgLyAyO1xuXHRjb250cm9scy5tYXhQb2xhckFuZ2xlID0gTWF0aC5QSSAtIE1hdGguUEkgLyAyO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG9uV2luZG93UmVzaXplLCBmYWxzZSk7XG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmUpO1xufVxuXG4vLyBTRUNUSU9OIEdsb2JlXG5mdW5jdGlvbiBpbml0R2xvYmUoKSB7XG5cdC8vIEluaXRpYWxpemUgdGhlIEdsb2JlXG5cdEdsb2JlID0gbmV3IFRocmVlR2xvYmUoKVxuXHRcdC8vIC5nbG9iZUltYWdlVXJsKEVhcnRoRGFya1NraW4pXG5cblx0XHQubGFiZWxEb3RPcmllbnRhdGlvbigoZSkgPT4ge1xuXHRcdFx0cmV0dXJuIGUudGV4dCA9PT0gXCJBTEFcIiA/IFwidG9wXCIgOiBcInJpZ2h0XCI7XG5cdFx0fSlcblx0XHQubGFiZWxEb3RSYWRpdXMoMC4zKVxuXHRcdC5sYWJlbFNpemUoKGUpID0+IGUuc2l6ZSlcblx0XHQubGFiZWxUZXh0KFwiY2l0eVwiKVxuXHRcdC5sYWJlbFJlc29sdXRpb24oNilcblx0XHQubGFiZWxBbHRpdHVkZSgwLjAxKVxuXHRcdC5wb2ludHNEYXRhKGFpcnBvcnRIaXN0b3J5LmFpcnBvcnRzKVxuXHRcdC5wb2ludENvbG9yKCgpID0+IFwiI2ZmZmZmZlwiKVxuXHRcdC5wb2ludHNNZXJnZSh0cnVlKVxuXHRcdC5wb2ludEFsdGl0dWRlKDAuMDcpXG5cdFx0LnBvaW50UmFkaXVzKDApXG5cdFx0LmhleFBvbHlnb25zRGF0YShjb3VudHJpZXMuZmVhdHVyZXMpXG5cdFx0LmhleFBvbHlnb25SZXNvbHV0aW9uKDMpXG5cdFx0LmhleFBvbHlnb25NYXJnaW4oMC43KVxuXHRcdC5zaG93QXRtb3NwaGVyZShmYWxzZSlcblx0XHQuaGV4UG9seWdvbkNvbG9yKChlKSA9PiB7XG5cdFx0XHRpZiAoW10uaW5jbHVkZXMoZS5wcm9wZXJ0aWVzLklTT19BMykpIHtcblx0XHRcdFx0cmV0dXJuIFwicmdiYSgyNTUsMjU1LDI1NSwgMSlcIjtcblx0XHRcdH0gZWxzZSByZXR1cm4gXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjcpXCI7XG5cdFx0fSk7XG5cblx0R2xvYmUucm90YXRlWSgtTWF0aC5QSSAqICg1IC8gOSkpO1xuXHRHbG9iZS5yb3RhdGVaKC1NYXRoLlBJIC8gNik7XG5cdGNvbnN0IGdsb2JlTWF0ZXJpYWwgPSBHbG9iZS5nbG9iZU1hdGVyaWFsKCk7XG5cdGdsb2JlTWF0ZXJpYWwuY29sb3IgPSBuZXcgQ29sb3IoMHg0YTBkNGQpO1xuXHRnbG9iZU1hdGVyaWFsLmVtaXNzaXZlID0gbmV3IENvbG9yKDB4MjIwMDM4KTtcblx0Z2xvYmVNYXRlcmlhbC5lbWlzc2l2ZUludGVuc2l0eSA9IDAuMTtcblx0Z2xvYmVNYXRlcmlhbC5zaGluaW5lc3MgPSAwLjc7XG5cdC8vIE5PVEUgQ29vbCBzdHVmZlxuXHQvLyBnbG9iZU1hdGVyaWFsLndpcmVmcmFtZSA9IHRydWU7XG5cblx0Ly8gSW5pdGlhbGl6ZSB0aGUgZ2xvd1xuXHR2YXIgb3B0aW9ucyA9IHtcblx0XHRiYWNrc2lkZTogdHJ1ZSxcblx0XHRjb2xvcjogXCIjM2EyMjhhXCIsXG5cdFx0c2l6ZTogMTAwICogMC4yNSxcblx0XHRwb3dlcjogNixcblx0XHRjb2VmZmljaWVudDogMC4zLFxuXHR9O1xuXHR2YXIgZ2xvd01lc2ggPSBjcmVhdGVHbG93TWVzaChuZXcgU3BoZXJlR2VvbWV0cnkoMTAwLCA3NSwgNzUpLCBvcHRpb25zKTtcblx0R2xvYmUuYWRkKGdsb3dNZXNoKTtcblx0c2NlbmUuYWRkKEdsb2JlKTtcbn1cblxuZnVuY3Rpb24gb25Nb3VzZU1vdmUoZXZlbnQpIHtcblx0Y29uc29sZS5sb2coXCJ4OiBcIiArIG1vdXNlWCArIFwiIHk6IFwiICsgbW91c2VZKTtcbn1cblxuZnVuY3Rpb24gb25XaW5kb3dSZXNpemUoKSB7XG5cdGNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcblx0Y2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblx0d2luZG93SGFsZlggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XG5cdHdpbmRvd0hhbGZZID0gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcblx0cmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gYW5pbWF0ZSgpIHtcblx0Ly8gY2FtZXJhLnBvc2l0aW9uLnggKz1cblx0Ly8gXHRNYXRoLmFicyhtb3VzZVgpIDw9IHdpbmRvd0hhbGZYIC8gMlxuXHQvLyBcdFx0PyAobW91c2VYIC8gMiAtIGNhbWVyYS5wb3NpdGlvbi54KSAqIDAuMDA1XG5cdC8vIFx0XHQ6IDA7XG5cdC8vIGNhbWVyYS5wb3NpdGlvbi55ICs9ICgtbW91c2VZIC8gMiAtIGNhbWVyYS5wb3NpdGlvbi55KSAqIDAuMDA1O1xuXHRjYW1lcmEubG9va0F0KHNjZW5lLnBvc2l0aW9uKTtcblx0Y29udHJvbHMudXBkYXRlKCk7XG5cdHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKTtcblx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gXCJhYzdkY2E5MWZmNTI1NzMxNGRiNVwiIl0sInNvdXJjZVJvb3QiOiIifQ==