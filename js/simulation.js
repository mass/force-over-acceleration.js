/**
 * Javascript - Simulation
 * Author - Andrew Mass
 *
 * Main simulation code.
 */

define(function(require) {
  'use strict';

  var Util = require('util');
  var Constants = require('constants');
  var Particle = require('particle');

  var Simulation = {
    keysDown: {},
    particles: []
  };

  Simulation.start = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    Simulation.scene = new THREE.Scene();

    Simulation.renderer = new THREE.WebGLRenderer();
    Simulation.renderer.setSize(width, height);

    Simulation.camera = new THREE.PerspectiveCamera(Constants.VIEW_ANGLE, (width / height),
      Constants.NEAR, Constants.FAR);
    Simulation.camera.position.z = 300;
    Simulation.scene.add(Simulation.camera);

    Simulation.cameraControls = new THREE.OrbitControls(Simulation.camera);
    Simulation.cameraControls.addEventListener('change', Simulation.render);

    document.getElementById('view-container').appendChild(Simulation.renderer.domElement);

    // Adds boundary particles.
    Simulation.particles.push(new Particle(Simulation.scene, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0,0,0), 75));
    Simulation.particles.push(new Particle(Simulation.scene, new THREE.Vector3(Constants.GALAXY_SIZE, 0, 0), new THREE.Vector3(0,0,0), 75));
    Simulation.particles.push(new Particle(Simulation.scene, new THREE.Vector3(-Constants.GALAXY_SIZE, 0, 0), new THREE.Vector3(0,0,0), 75));
    Simulation.particles.push(new Particle(Simulation.scene, new THREE.Vector3(0, Constants.GALAXY_SIZE, 0), new THREE.Vector3(0,0,0), 75));
    Simulation.particles.push(new Particle(Simulation.scene, new THREE.Vector3(0, -Constants.GALAXY_SIZE, 0), new THREE.Vector3(0,0,0), 75));
    Simulation.particles.push(new Particle(Simulation.scene, new THREE.Vector3(0, 0, Constants.GALAXY_SIZE), new THREE.Vector3(0,0,0), 75));
    Simulation.particles.push(new Particle(Simulation.scene, new THREE.Vector3(0, 0, -Constants.GALAXY_SIZE), new THREE.Vector3(0,0,0), 75));

    // Adds random smaller particles within the boundary.
    for(var i=0; i<Constants.NUM_PARTICLES; i++) {
      Simulation.particles.push(new Particle(Simulation.scene, Util.randomStartPos(), Util.randomStartVel(), 20));
    }

    initLighting();

    Simulation.renderer.render(Simulation.scene, Simulation.camera);

    window.onkeydown = function(k) {
      Simulation.keysDown[k.which] = true;
    };

    window.onkeyup = function(k) {
      Simulation.keysDown[k.which] = false;
    };

    requestAnimationFrame(_.bind(Simulation.render, Simulation));
  }

  Simulation.render = function() {
    if(Simulation.keysDown[Constants.KEY_LEFT]) {
      console.log('left');
    }

    if(Simulation.keysDown[Constants.KEY_UP]) {
      console.log('up');
    }

    if(Simulation.keysDown[Constants.KEY_RIGHT]) {
      console.log('right');
    }

    if(Simulation.keysDown[Constants.KEY_DOWN]) {
      console.log('down');
    }

    if(Simulation.keysDown[Constants.KEY_D]) {
      console.log('debug');
    }

    if(Simulation.keysDown[Constants.KEY_P]) {
      console.log('pause');
    }

    if(Simulation.keysDown[Constants.KEY_R]) {
      console.log('restart');
    }

    Simulation.renderer.render(Simulation.scene, Simulation.camera);
    requestAnimationFrame(_.bind(Simulation.render, Simulation));
  };

  /**
   * Add lights on the positive and negative ends of the axes.
  */
  var initLighting = function() {
    var INTENSITY = 3;
    var light;

    light = new THREE.SpotLight(0xFFFFFF);
    light.position = new THREE.Vector3(0, 0, Constants.UNIVERSE_SIZE);
    light.intensity = INTENSITY;
    light.lookAt(new THREE.Vector3(0, 0, 0));
    Simulation.scene.add(light);

    // light = new THREE.SpotLight(0xFFFFFF);
    // light.position = new THREE.Vector3(0, 0, -Constants.UNIVERSE_SIZE);
    // light.intensity = INTENSITY;
    // light.lookAt(new THREE.Vector3(0, 0, 0));
    // Simulation.scene.add(light);

    light = new THREE.SpotLight(0xFFFFFF);
    light.position = new THREE.Vector3(0, Constants.UNIVERSE_SIZE, 0);
    light.intensity = INTENSITY;
    light.lookAt(new THREE.Vector3(0, 0, 0));
    Simulation.scene.add(light);

    // light = new THREE.SpotLight(0xFFFFFF);
    // light.position = new THREE.Vector3(0, -Constants.UNIVERSE_SIZE, 0);
    // light.intensity = INTENSITY;
    // light.lookAt(new THREE.Vector3(0, 0, 0));
    // Simulation.scene.add(light);

    light = new THREE.SpotLight(0xFFFFFF);
    light.position = new THREE.Vector3(Constants.UNIVERSE_SIZE, 0, 0);
    light.intensity = INTENSITY;
    light.lookAt(new THREE.Vector3(0, 0, 0));
    Simulation.scene.add(light);

    // light = new THREE.SpotLight(0xFFFFFF);
    // light.position = new THREE.Vector3(-Constants.UNIVERSE_SIZE, 0, 0);
    // light.intensity = INTENSITY;
    // light.lookAt(new THREE.Vector3(0, 0, 0));
    // Simulation.scene.add(light);
  }

  return Simulation;
});
