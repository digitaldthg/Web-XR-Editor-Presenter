var VRButton = {

	createButton: function ( renderer, context ) {


		function showEnterVR( /*device*/ ) {

			var currentSession = null;

			function onSessionStarted( session ) {
				session.addEventListener( 'end', onSessionEnded );

				renderer.xr.setSession( session );
				button.textContent = 'EXIT VR';

				currentSession = session;

				context.Events.dispatchEvent("OnChangeXRView",  {xrMode : "VR",previousXRMode : context.Controls.GetCurrentXRMode(), session: session});

			}

			function onSessionEnded( /*event*/ ) {

				currentSession.removeEventListener( 'end', onSessionEnded );

				button.textContent = 'ENTER VR';

				currentSession = null;
				
				context.Events.dispatchEvent("OnChangeXRView",  {xrMode : "Desktop",previousXRMode : "VR",session: null});
			}


			button.textContent = 'ENTER VR';


			button.onclick = function () {

				if ( currentSession === null ) {

					// WebXR's requestReferenceSpace only works if the corresponding feature
					// was requested at session creation time. For simplicity, just ask for
					// the interesting ones as optional features, but be aware that the
					// requestReferenceSpace call will fail if it turns out to be unavailable.
					// ('local' is always available for immersive sessions and doesn't need to
					// be requested separately.)

					var sessionInit = { 
						optionalFeatures: [ 'local-floor',"local" ]
					};
					navigator.xr.requestSession( 'immersive-vr', sessionInit ).then( onSessionStarted );

				} else {

					currentSession.end();

				}

			};

		}

		function disableButton() {

			button.onclick = null;

		}

		function showWebXRNotFound() {

			disableButton();

			button.textContent = 'VR NOT SUPPORTED';

		}

		if ( 'xr' in navigator ) {

			var button = document.createElement( 'button' );
			button.id = 'VRButton';
			navigator.xr.isSessionSupported( 'immersive-vr' ).then( function ( supported ) {

				supported ? showEnterVR() : showWebXRNotFound();

			} );

			return button;

		} else {

			var message = document.createElement( 'a' );

			if ( window.isSecureContext === false ) {

				message.href = document.location.href.replace( /^http:/, 'https:' );
				message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message

			} else {

				message.href = 'https://immersiveweb.dev/';
				message.innerHTML = 'WEBXR NOT AVAILABLE';

			}
			return message;

		}

	}

};

export { VRButton };
