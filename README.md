# WebXR Frontend App (Presenter)
Mit der WebXR Frontend App können Projekte gezeigt werden, welche mit dem [WebXR Editor](https://github.com/digitaldthg/webxr_editor) angelegt wurden. In XR-fähigen Browsern auf AR-unterstützenden Geräten können die angelegten Projekte als AR-Präsentationen gestartet werden. Mehr Informationen zum Aufbau der Projekte finden Sie in der [Read.Me des WebXR Editors](https://github.com/digitaldthg/webxr_editor).

Dieser Prototyp ist im Rahmen des Forschungsprojekts "Im/material Theatre Spaces" entstanden. Weitere Informationen zum Projekt finden Sie [hier](https://digital.dthg.de/).

## Projektaufbau
Das Projekt wurde mit [Vue 2](https://vuejs.org/) entwickelt und nutzt [three.js](https://threejs.org/) als WebGL Framework. Eine Demo des WebXR Presenters finden Sie [hier](https://developer.digital.dthg.de/tpXRFrontend).
  
## Installation & Entwicklung

Klonen oder downloaden Sie das Projekt auf Ihren Rechner und installieren Sie die Dependencies mit den nachstehenden Befehlen.

**Installation** `npm install`

**Development** `npm run serve`

**Build** `npm run build`

### Entry Points
**2D**

`src > main.js`

**3D**

`src > 3DScene > WebXRScene.vue`
