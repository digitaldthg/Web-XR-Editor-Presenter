# WebXR Editor (Presenter)
Mit der WebXR Frontend App können eingeloggte User Projekte zeigen, welche mit dem [WebXR Editor](https://github.com/digitaldthg/webxr_editor) angelegt wurden. In XR-fähigen Browsern auf AR-unterstützenden Geräten können die angelegten Projekte als AR-Präsentationen gestartet werden. Mehr Informationen zum Aufbau der Projekte finden Sie in der [Read.Me des WebXR Editors](https://github.com/digitaldthg/webxr_editor).

Dieser Prototyp ist im Rahmen des Forschungsprojekts "Im/material Theatre Spaces" entstanden. Weitere Informationen zum Projekt finden Sie [hier](https://digital.dthg.de/).

## Projektaufbau
Das Projekt wurde mit [Vue 2](https://vuejs.org/) entwickelt und nutzt [three.js](https://threejs.org/) als WebGL Framework. Eine Demo des WebXR Presenters finden Sie [hier](https://developer.digital.dthg.de/tpXRFrontend).

Nach dem Login kann eines der für den eingeloggten User verfügbaren Projekt gestartet werden. Wird AR auf dem Gerät unterstützt, kann von dort aus in den AR Modus gewechselt werden. Sobald eine horizontale Fläche detektiert wurde kann die Position des Präsentationsinhaltes, durch das Tippen auf das auf der Fläche erschienene Rechteck, dort festgelegt werden.
  
## Installation & Entwicklung

### Globale Installationen

**Vue Cli** `npm install -g @vue/cli` und `npm install @vue/cli-service -g`

### NPM im Projekt
Klonen oder downloaden Sie das Projekt auf Ihren Rechner und installieren Sie die Dependencies mit den nachstehenden Befehlen.

**Installation** `npm install`

**Development** `npm run serve`

**Build** `npm run build`

### Entry Points
**2D**

`src > main.js`

**3D**

`src > 3DScene > WebXRScene.vue`
