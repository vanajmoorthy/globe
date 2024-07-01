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

function onMouseMove(event) {}

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
/******/ 		__webpack_require__.h = () => "93bd2d7738a538dfc0a6"
/******/ 	})();
/******/ 	
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYW5kZW1pYy1nbG9iZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9wYW5kZW1pYy1nbG9iZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBcUM7QUFDUTtBQVk5QjtBQUM4RDtBQUM1QjtBQUNHO0FBQ0E7QUFDRTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGdEQUFhLEVBQUUsa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSx3Q0FBSztBQUNsQixlQUFlLCtDQUFZO0FBQzNCLHdCQUF3Qix3Q0FBSzs7QUFFN0I7QUFDQSxjQUFjLG9EQUFpQjtBQUMvQjtBQUNBOztBQUVBLGtCQUFrQixtREFBZ0I7QUFDbEM7QUFDQTs7QUFFQSxtQkFBbUIsbURBQWdCO0FBQ25DO0FBQ0E7O0FBRUEsbUJBQW1CLDZDQUFVO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsaUJBQWlCLHNDQUFHOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQix1RkFBYTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZ0RBQVU7QUFDdkI7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw2REFBdUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0VBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix3Q0FBSztBQUNoQyw4QkFBOEIsd0NBQUs7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwrREFBYyxLQUFLLGlEQUFjO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztXQ3pLQSxvRCIsImZpbGUiOiJtYWluLjE1MWM3ZTU5MGNjNmQ3YTc2YTU3LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGhyZWVHbG9iZSBmcm9tIFwidGhyZWUtZ2xvYmVcIjtcbmltcG9ydCB7IFdlYkdMUmVuZGVyZXIsIFNjZW5lIH0gZnJvbSBcInRocmVlXCI7XG5pbXBvcnQge1xuXHRQZXJzcGVjdGl2ZUNhbWVyYSxcblx0QW1iaWVudExpZ2h0LFxuXHREaXJlY3Rpb25hbExpZ2h0LFxuXHRDb2xvcixcblx0Rm9nLFxuXHRBeGVzSGVscGVyLFxuXHREaXJlY3Rpb25hbExpZ2h0SGVscGVyLFxuXHRDYW1lcmFIZWxwZXIsXG5cdFBvaW50TGlnaHQsXG5cdFNwaGVyZUdlb21ldHJ5LFxufSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUdsb3dNZXNoIH0gZnJvbSBcInRocmVlLWdsb3ctbWVzaFwiO1xuaW1wb3J0IGNvdW50cmllcyBmcm9tIFwiLi9maWxlcy9nbG9iZS1kYXRhLW1pbi5qc29uXCI7XG5pbXBvcnQgdHJhdmVsSGlzdG9yeSBmcm9tIFwiLi9maWxlcy9teS1mbGlnaHRzLmpzb25cIjtcbmltcG9ydCBhaXJwb3J0SGlzdG9yeSBmcm9tIFwiLi9maWxlcy9teS1haXJwb3J0cy5qc29uXCI7XG52YXIgcmVuZGVyZXIsIGNhbWVyYSwgc2NlbmUsIGNvbnRyb2xzO1xubGV0IG1vdXNlWCA9IDA7XG5sZXQgbW91c2VZID0gMDtcbmxldCB3aW5kb3dIYWxmWCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMjtcbmxldCB3aW5kb3dIYWxmWSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XG52YXIgR2xvYmU7XG5cbmluaXQoKTtcbmluaXRHbG9iZSgpO1xub25XaW5kb3dSZXNpemUoKTtcbmFuaW1hdGUoKTtcblxuLy8gU0VDVElPTiBJbml0aWFsaXppbmcgY29yZSBUaHJlZUpTIGVsZW1lbnRzXG5mdW5jdGlvbiBpbml0KCkge1xuXHQvLyBJbml0aWFsaXplIHJlbmRlcmVyXG5cdHJlbmRlcmVyID0gbmV3IFdlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXM6IHRydWUgfSk7XG5cdHJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuXHRyZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXHQvLyByZW5kZXJlci5vdXRwdXRFbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZztcblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcblxuXHQvLyBJbml0aWFsaXplIHNjZW5lLCBsaWdodFxuXHRzY2VuZSA9IG5ldyBTY2VuZSgpO1xuXHRzY2VuZS5hZGQobmV3IEFtYmllbnRMaWdodCgweGJiYmJiYiwgMC4zKSk7XG5cdHNjZW5lLmJhY2tncm91bmQgPSBuZXcgQ29sb3IoMHgwMDApO1xuXG5cdC8vIEluaXRpYWxpemUgY2FtZXJhLCBsaWdodFxuXHRjYW1lcmEgPSBuZXcgUGVyc3BlY3RpdmVDYW1lcmEoKTtcblx0Y2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xuXHRjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG5cdHZhciBkTGlnaHQgPSBuZXcgRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZiwgMC44KTtcblx0ZExpZ2h0LnBvc2l0aW9uLnNldCgtODAwLCAyMDAwLCA0MDApO1xuXHRjYW1lcmEuYWRkKGRMaWdodCk7XG5cblx0dmFyIGRMaWdodDEgPSBuZXcgRGlyZWN0aW9uYWxMaWdodCgweDc5ODJmNiwgMSk7XG5cdGRMaWdodDEucG9zaXRpb24uc2V0KC0yMDAsIDUwMCwgMjAwKTtcblx0Y2FtZXJhLmFkZChkTGlnaHQxKTtcblxuXHR2YXIgZExpZ2h0MiA9IG5ldyBQb2ludExpZ2h0KDB4MDUwNDMwLCAwLjUpO1xuXHRkTGlnaHQyLnBvc2l0aW9uLnNldCgtMjAwLCA1MDAsIDIwMCk7XG5cdGNhbWVyYS5hZGQoZExpZ2h0Mik7XG5cblx0Y2FtZXJhLnBvc2l0aW9uLnogPSA0MDA7XG5cdGNhbWVyYS5wb3NpdGlvbi54ID0gMDtcblx0Y2FtZXJhLnBvc2l0aW9uLnkgPSAwO1xuXG5cdHNjZW5lLmFkZChjYW1lcmEpO1xuXG5cdC8vIEFkZGl0aW9uYWwgZWZmZWN0c1xuXHRzY2VuZS5mb2cgPSBuZXcgRm9nKDB4MDUwNDMwLCA0MDAsIDIwMDApO1xuXG5cdC8vIEhlbHBlcnNcblx0Ly8gY29uc3QgYXhlc0hlbHBlciA9IG5ldyBBeGVzSGVscGVyKDgwMCk7XG5cdC8vIHNjZW5lLmFkZChheGVzSGVscGVyKTtcblx0Ly8gdmFyIGhlbHBlciA9IG5ldyBEaXJlY3Rpb25hbExpZ2h0SGVscGVyKGRMaWdodCk7XG5cdC8vIHNjZW5lLmFkZChoZWxwZXIpO1xuXHQvLyB2YXIgaGVscGVyQ2FtZXJhID0gbmV3IENhbWVyYUhlbHBlcihkTGlnaHQuc2hhZG93LmNhbWVyYSk7XG5cdC8vIHNjZW5lLmFkZChoZWxwZXJDYW1lcmEpO1xuXG5cdC8vIEluaXRpYWxpemUgY29udHJvbHNcblx0Y29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXHRjb250cm9scy5lbmFibGVEYW1waW5nID0gdHJ1ZTtcblx0Y29udHJvbHMuZHluYW1pY0RhbXBpbmdGYWN0b3IgPSAwLjAxO1xuXHRjb250cm9scy5lbmFibGVQYW4gPSBmYWxzZTtcblx0Y29udHJvbHMubWluRGlzdGFuY2UgPSAyMDA7XG5cdGNvbnRyb2xzLm1heERpc3RhbmNlID0gNTAwO1xuXHRjb250cm9scy5yb3RhdGVTcGVlZCA9IDAuODtcblx0Y29udHJvbHMuem9vbVNwZWVkID0gMTtcblx0Y29udHJvbHMuYXV0b1JvdGF0ZSA9IGZhbHNlO1xuXG5cdGNvbnRyb2xzLm1pblBvbGFyQW5nbGUgPSBNYXRoLlBJIC8gMy41O1xuXHRjb250cm9scy5tYXhQb2xhckFuZ2xlID0gTWF0aC5QSSAtIE1hdGguUEkgLyAzO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG9uV2luZG93UmVzaXplLCBmYWxzZSk7XG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmUpO1xufVxuXG4vLyBTRUNUSU9OIEdsb2JlXG5mdW5jdGlvbiBpbml0R2xvYmUoKSB7XG5cdC8vIEluaXRpYWxpemUgdGhlIEdsb2JlXG5cdEdsb2JlID0gbmV3IFRocmVlR2xvYmUoKVxuXHRcdC8vIC5nbG9iZUltYWdlVXJsKEVhcnRoRGFya1NraW4pXG5cblx0XHQubGFiZWxEb3RPcmllbnRhdGlvbigoZSkgPT4ge1xuXHRcdFx0cmV0dXJuIGUudGV4dCA9PT0gXCJBTEFcIiA/IFwidG9wXCIgOiBcInJpZ2h0XCI7XG5cdFx0fSlcblx0XHQubGFiZWxEb3RSYWRpdXMoMC4zKVxuXHRcdC5sYWJlbFNpemUoKGUpID0+IGUuc2l6ZSlcblx0XHQubGFiZWxUZXh0KFwiY2l0eVwiKVxuXHRcdC5sYWJlbFJlc29sdXRpb24oNilcblx0XHQubGFiZWxBbHRpdHVkZSgwLjAxKVxuXHRcdC5wb2ludHNEYXRhKGFpcnBvcnRIaXN0b3J5LmFpcnBvcnRzKVxuXHRcdC5wb2ludENvbG9yKCgpID0+IFwiI2ZmZmZmZlwiKVxuXHRcdC5wb2ludHNNZXJnZSh0cnVlKVxuXHRcdC5wb2ludEFsdGl0dWRlKDAuMDcpXG5cdFx0LnBvaW50UmFkaXVzKDApXG5cdFx0LmhleFBvbHlnb25zRGF0YShjb3VudHJpZXMuZmVhdHVyZXMpXG5cdFx0LmhleFBvbHlnb25SZXNvbHV0aW9uKDMpXG5cdFx0LmhleFBvbHlnb25NYXJnaW4oMC43KVxuXHRcdC5zaG93QXRtb3NwaGVyZShmYWxzZSlcblx0XHQuaGV4UG9seWdvbkNvbG9yKChlKSA9PiB7XG5cdFx0XHRpZiAoW10uaW5jbHVkZXMoZS5wcm9wZXJ0aWVzLklTT19BMykpIHtcblx0XHRcdFx0cmV0dXJuIFwicmdiYSgyNTUsMjU1LDI1NSwgMSlcIjtcblx0XHRcdH0gZWxzZSByZXR1cm4gXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjcpXCI7XG5cdFx0fSk7XG5cblx0R2xvYmUucm90YXRlWSgtTWF0aC5QSSAqICg1IC8gOSkpO1xuXHRHbG9iZS5yb3RhdGVaKC1NYXRoLlBJIC8gNik7XG5cdGNvbnN0IGdsb2JlTWF0ZXJpYWwgPSBHbG9iZS5nbG9iZU1hdGVyaWFsKCk7XG5cdGdsb2JlTWF0ZXJpYWwuY29sb3IgPSBuZXcgQ29sb3IoMHgzYTIyOGEpO1xuXHRnbG9iZU1hdGVyaWFsLmVtaXNzaXZlID0gbmV3IENvbG9yKDB4MjIwMDM4KTtcblx0Z2xvYmVNYXRlcmlhbC5lbWlzc2l2ZUludGVuc2l0eSA9IDAuMTtcblx0Z2xvYmVNYXRlcmlhbC5zaGluaW5lc3MgPSAwLjc7XG5cdC8vIE5PVEUgQ29vbCBzdHVmZlxuXHQvLyBnbG9iZU1hdGVyaWFsLndpcmVmcmFtZSA9IHRydWU7XG5cblx0Ly8gSW5pdGlhbGl6ZSB0aGUgZ2xvd1xuXHR2YXIgb3B0aW9ucyA9IHtcblx0XHRiYWNrc2lkZTogdHJ1ZSxcblx0XHRjb2xvcjogXCIjM2EyMjhhXCIsXG5cdFx0c2l6ZTogMTAwICogMC4yNSxcblx0XHRwb3dlcjogNixcblx0XHRjb2VmZmljaWVudDogMC4zLFxuXHR9O1xuXHR2YXIgZ2xvd01lc2ggPSBjcmVhdGVHbG93TWVzaChuZXcgU3BoZXJlR2VvbWV0cnkoMTAwLCA3NSwgNzUpLCBvcHRpb25zKTtcblx0R2xvYmUuYWRkKGdsb3dNZXNoKTtcblx0c2NlbmUuYWRkKEdsb2JlKTtcbn1cblxuZnVuY3Rpb24gb25Nb3VzZU1vdmUoZXZlbnQpIHt9XG5cbmZ1bmN0aW9uIG9uV2luZG93UmVzaXplKCkge1xuXHRjYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cdHdpbmRvd0hhbGZYID0gd2luZG93LmlubmVyV2lkdGggLyAyO1xuXHR3aW5kb3dIYWxmWSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XG5cdHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG5cdGNhbWVyYS5wb3NpdGlvbi54ICs9XG5cdFx0TWF0aC5hYnMobW91c2VYKSA8PSB3aW5kb3dIYWxmWCAvIDJcblx0XHRcdD8gKG1vdXNlWCAvIDIgLSBjYW1lcmEucG9zaXRpb24ueCkgKiAwLjAwNVxuXHRcdFx0OiAwO1xuXHRjYW1lcmEucG9zaXRpb24ueSArPSAoLW1vdXNlWSAvIDIgLSBjYW1lcmEucG9zaXRpb24ueSkgKiAwLjAwNTtcblx0Y2FtZXJhLmxvb2tBdChzY2VuZS5wb3NpdGlvbik7XG5cdGNvbnRyb2xzLnVwZGF0ZSgpO1xuXHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IFwiOTNiZDJkNzczOGE1MzhkZmMwYTZcIiJdLCJzb3VyY2VSb290IjoiIn0=