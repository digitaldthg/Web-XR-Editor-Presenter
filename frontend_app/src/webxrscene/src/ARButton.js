class ARButton {
	constructor(renderer, context,) {
		this.domOverlay = null
		this.renderer = renderer
		this.context = context
		this.rootElement = null;
		this.reticle = null;
		this.session = null;
		this.trackingActive = true;
	}

	SetDomOverlay(overlay) {
		console.log("Set Overlay", overlay)
		this.domOverlay = overlay;
	}

	SetRootElement(element) {
		this.rootElement = element;
	}

	SetReticle(element) {
		this.reticle = element;
	}

	SetTrackingActive(isActive) {
		console.log("Set Tracking in ARButton ", isActive)
		this.trackingActive = isActive;
	}


	GetButton() {
		const showStartAR = () => {
			console.log("SHOW AR ")

			var currentSession = null;

			var sessionInit = {
				optionalFeatures: ['local-floor', "local", 'dom-overlay'],
				domOverlay: { root: this.domOverlay },
				requiredFeatures: ['hit-test']
			}


			const onSessionStarted = async (session) => {
				console.log("Session Start ",);
				this.renderer.Resize();
				this.session = session;

				const gl = this.renderer.instance.getContext();
				try {
					await gl.makeXRCompatible();
					console.log("GL")
					this.renderer.Resize();
				} catch (err) {
					console.log("GL error ", err)
				}
				

				session.addEventListener('end', onSessionEnded);


				this.rootElement.visible = false;

				this.referenceSpace = null
				this.viewerspace = null;
				this.hitTestSource = null;

				console.log("Session init ")
				session.requestReferenceSpace('local-floor').then((space) => {
					this.referenceSpace = space
					console.log("Session requestReferenceSpace local ")

					session.requestReferenceSpace('viewer').then((viewerspace) => {
						this.viewerspace = viewerspace;
						console.log("Session requestReferenceSpace viewer",this.viewerspace)
						session.requestHitTestSource({ space: this.viewerspace }).then((source) => {
							this.hitTestSource = source;
							console.log("SET SOURCE ", this.hitTestSource)
							this.renderer.instance.xr.setSession(session);
						});
					});
					
				});

				session.addEventListener("select", clicked);


				const onXRFrame = (time, frame) => {
					this.session.requestAnimationFrame(onXRFrame);
					

					const hitTestResults = frame.getHitTestResults(this.hitTestSource)
					if (hitTestResults.length > 0 && this.referenceSpace != null && this.trackingActive) {
						if (this.reticle.visible == false) {
							//LOAD Target Object

						}

						const hitPose = hitTestResults[0].getPose(this.referenceSpace);
						this.reticle.visible = true;
						//console.log("ON XR FRAME show reticle ", hitPose.transform.position.x)
						this.reticle.position.set(hitPose.transform.position.x, hitPose.transform.position.y, hitPose.transform.position.z)
						//reticle.updateMatrixWorld(true);
					}

				}

				session.requestAnimationFrame(onXRFrame);
				button.textContent = 'STOP AR';

				currentSession = session;

				this.context.Events.dispatchEvent("OnChangeXRView", {
					xrMode: "AR",
					previousXRMode: this.context.Controls.GetCurrentXRMode(),
					session: this.session
				});

			}
			const clicked = (event) => {
				if (!this.trackingActive) {
					return;
				}
				console.log("SELECTED ")
				this.rootElement.visible = true;
				this.rootElement.position.set(this.reticle.position.x, this.reticle.position.y, this.reticle.position.z);
				this.firstTracked = true;
				this.reticle.visible = false;
				this.context.Events.dispatchEvent("OnObjectPlacedOnPlane");
			}

			const onSessionEnded = ( /*event*/) => {

				currentSession.removeEventListener('end', onSessionEnded);

				button.textContent = 'START AR';

				currentSession = null;
				this.context.Events.dispatchEvent("OnChangeXRView", {
					xrMode: "Desktop",
					previousXRMode: "AR",
					session: null
				});

			}

			button.textContent = 'START AR';

			button.onclick = function () {

				if (currentSession === null) {
					sessionInit.domOverlay.root = typeof (button._domOverlayElement) != "undefined" ? button._domOverlayElement : sessionInit.domOverlay.root;
					navigator.xr.requestSession('immersive-ar', sessionInit).then(onSessionStarted);

				} else {

					currentSession.end();

				}

			};

		}

		function disableButton() {

			button.onclick = null;

		}

		function showARNotSupported() {
			console.log("SHOW AR NOT SUPPORTEd")
			disableButton();

			button.textContent = 'AR NOT SUPPORTED';

		}

		if ('xr' in navigator) {
			console.log("GET AR BUTTON ", navigator.xr)

			var button = document.createElement('button');
			button.id = 'ARButton';

			navigator.xr.isSessionSupported('immersive-ar', { requiredFeatures: ['hit-test'] }).then(function (supported) {
				console.log("AR SUPPORTED ", supported)
				supported ? showStartAR() : showARNotSupported();

			})//.catch(showARNotSupported);

			return button;

		} else {

			var message = document.createElement('a');

			if (window.isSecureContext === false) {

				message.href = document.location.href.replace(/^http:/, 'https:');
				message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message

			} else {

				message.href = 'https://immersiveweb.dev/';
				message.innerHTML = 'WEBXR NOT AVAILABLE';

			}

			return message;

		}
	}
};

export { ARButton };
