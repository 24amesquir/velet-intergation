class Utils{
    
    // should return a boolean
    isInRadius(particle, [x, y], radius) {
        p = particle;
        const v = center.sub(p.position);
        return v.x * v.x + v.y * v.y < radius * radius;
    }

    // dosen't return anything
    applyForceOnCloth([x, y], radius, force, solver) {
        for (let i = 0; i < solver.objects.length; i++) {
            const p = solver.objects[i];
            if (this.isInRadius(p, [x, y], radius)) {
                p.applyForce(force);
            }
        }
    }
}
