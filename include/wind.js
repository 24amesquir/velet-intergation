class Wind{
    constructor([width, height], [x, y], [force_x, force_y]){
        this.rect = new Rectangle(x, y, width, height);
        this.force = new Vector2(force_x, force_y);
    }
    update(dt){
        this.rect.x += 1.0 * this.force.x * dt;
        //this.rect.y += this.force.y * dt;
    }
}

class WindManager{
    constructor(width){
        this.winds = [];
        this.world_width = width;
    }
    update(solver, dt){
        for (let i = 0; i < this.winds.length; i++) {
            const w = this.winds[i];
            w.update(dt);
            for (let j = 0; j < solver.objects.length; j++) {
                const p = solver.objects[j];
                if (w.rect.contains(p.position)) {
                    p.forces.add(w.force);
                }
            }
            if (w.rect.left > this.world_width) {
                w.rect.left = -w.rect.width;
            }
        }
    }
}