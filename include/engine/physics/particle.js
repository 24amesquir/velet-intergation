class Particle {
    constructor(id, mass, moving, position, position_old, velocity, forces) {
        this.id = id;
        this.mass = mass;
        this.moving = moving;
        this.position = position;
        this.position_old = position_old;
        this.velocity = velocity;
        this.forces = forces;
    }

    update(dt) {
        if (!this.moving) return;
        this.position_old = this.position;
        this.velocity += (this.forces / this.mass) * dt;
        this.position += this.velocity * dt;
    }

    updateDerivatives(dt) {
        this.velocity = (this.position - this.position_old) / dt;
        this.forces = {};
    }

    move(v) {
        if (!this.moving) return;
        this.position += v;
    }
}
