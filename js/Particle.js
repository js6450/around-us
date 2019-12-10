"use strict";

class Particle {
    constructor( x, y, z ) {
        this.pos = new THREE.Vector3( x, y, z );
        this.vel = new THREE.Vector3();
        this.acc = new THREE.Vector3();
        this.mass = 5.0 + Math.random() * 40.0;

        this.noiseTwist = 12;
    }
    getPosition() {
        return this.pos;
    }
    update() {
        this.vel.add( this.acc );
        this.pos.add( this.vel );
        this.acc.multiplyScalar( 0 );
        this.vel.multiplyScalar( 0.96 );
        //this.vel.clampLength( 0.1, 10.0 );
    }
    attract( otherPos , frameCount) {
        var d = new Date();

        var vector = new THREE.Vector3();
        vector.subVectors( otherPos, this.pos );

        if(vector.length() < 40){
                // vector.multiplyScalar( -0.075 );
            let x = 40 * Math.cos(frameCount * 0.01) * Math.sin(frameCount * 0.02);
            let y = 40 * Math.sin(frameCount * 0.01) * Math.sin(frameCount * 0.02);
            let z = 40 * Math.cos(frameCount * 0.02);

            this.pos = new THREE.Vector3(x, y, z);

        }
        // if (vector.length() > 40 ) {
        //     vector.multiplyScalar( 0.002 );
        // }
        // else{
        //     vector.multiplyScalar( -0.075 );
        // }
       if (d.getSeconds() === 0 ) {
           vector = new THREE.Vector3( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );
          vector.multiplyScalar( Math.random() * 1 + 0.5 );
            this.noiseRes = Math.floor( Math.random() * 50 ) + 100;
            this.noiseTwist = Math.floor( Math.random() * 5 ) + 2;
       }
        this.applyForce( vector );
    }
    applyNoise() {
        var noiseValue = perlin.noise(
            ( this.pos.x + frameCount ) / 2500,
            ( this.pos.y + frameCount ) / 2500,
            ( this.pos.z + frameCount ) / 2500
        );

        var vector = new THREE.Vector3(Math.random(), Math.random(), 0 );

        var xAxis = Math.cos( frameCount * 0.5 ) * 0.5 + 0.5;
        var yAxis = Math.sin( frameCount * 0.5 ) * 0.5 + 0.5;
        var axis = new THREE.Vector3( xAxis, yAxis, xAxis*2 );
        axis.normalize();

        vector.applyAxisAngle( axis, Math.PI * this.noiseTwist * noiseValue);
        this.applyForce( vector );
    }
    applyForce( force ) {
        force.divideScalar( this.mass );
        this.acc.add( force );
    }
}
