class LinkConstraint{
    constructor(p_1, p_2){
        this.particle_1 = p_1;
        this.particle_2 = p_2;
        this.distance = MathVec2.length(p_1.position.subtract(p_2.position));
    }

    // returns a boolean
    isValid(){
        return this.particle_2 && this.particle_1 && !this.broken;
    }

    // returns nothing
    solve(){
        if(!this.isValid()){ return; }
        const p_1 = this.particle_1;
        const p_2 = this.particle_2;
        const v = p_1.position.subtract(p_2.position);
        const dist = MathVec2.length(v);
        if(dist > this.distance){
            // Break if the distance is over the given threshold
            this.broken = dist > this.distance * this.max_elongation_ratio;
            const n = v.divide(dist);
            const c = this.distance - dist;
            const p = n.multiply(-(c * this.strength) / (p_1.mass + p_2.mass));
            // Apply position correction
            p_1.move(p.divide(p_1.mass).multiply(-1));
            p_2.move(p.divide(p_2.mass));
        }
    }
}