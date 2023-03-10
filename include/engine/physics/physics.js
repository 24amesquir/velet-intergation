/* 
struct PhysicSolver
{
    CIVector<Particle>       objects;
    CIVector<LinkConstraint> constraints;
    // Simulator iterations count
    uint32_t solver_iterations;
    uint32_t sub_steps;

    PhysicSolver()
        : solver_iterations(1)
        , sub_steps(16)
    {}

    void update(float dt)
    {
        const float sub_step_dt = dt / to<float>(sub_steps);
        removeBrokenLinks();
        for (uint32_t i(sub_steps); i--;) {
            applyGravity();
            applyAirFriction();
            updatePositions(sub_step_dt);
            solveConstraints();
            updateDerivatives(sub_step_dt);
        }
    }

    void applyGravity()
    {
        const sf::Vector2f gravity(0.0f, 1500.0f);
        for (Particle& p : objects) {
            p.forces += gravity * p.mass;
        }
    }

    void applyAirFriction()
    {
        const float friction_coef = 0.5f;
        for (Particle& p : objects) {
            p.forces -= p.velocity * friction_coef;
        }
    }

    void updatePositions(float dt)
    {
        for (Particle& p : objects) {
            p.update(dt);
        }
    }

    void updateDerivatives(float dt)
    {
        for (Particle& p : objects) {
            p.updateDerivatives(dt);
        }
    }

    void solveConstraints()
    {
        for (uint32_t i(solver_iterations); i--;) {
            for (LinkConstraint &l: constraints) {
                l.solve();
            }
        }
    }

    void removeBrokenLinks()
    {
        constraints.remove_if([](const LinkConstraint& c) {return !c.isValid();});
    }

    civ::ID addParticle(sf::Vector2f position)
    {
        const civ::ID particle_id = objects.emplace_back(position);
        objects[particle_id].id = particle_id;
        return particle_id;
    }

    void addLink(civ::ID particle_1, civ::ID particle_2, float max_elongation_ratio = 1.5f)
    {
        const civ::ID link_id = constraints.emplace_back(objects.getRef(particle_1), objects.getRef(particle_2));
        constraints[link_id].id = link_id;
        constraints[link_id].max_elongation_ratio = max_elongation_ratio;
    }

    void map(const std::function<void(Particle&)>& callback)
    {
        for (Particle& p : objects) {
            callback(p);
        }
    }
};
*/
// the above is C++ code, but it's a good example of how to do it in JS

class PhysicsSolver{
    constructor(){
        this.objects = [];
        this.constraints = [];
        this.solver_iterations = 1;
        this.sub_steps = 16;
    }

    update(dt){
        const sub_step_dt = dt / this.sub_steps;
        this.removeBrokenLinks();
        for (let i = 0; i < this.sub_steps; ++i) {
            this.applyGravity();
            this.applyAirFriction();
            this.updatePositions(sub_step_dt);
            this.solveConstraints();
            this.updateDerivatives(sub_step_dt);
        }
    }

    applyGravity(){
        const gravity = new MathVec2(0.0, 1500.0);
        for (const p of this.objects) {
            p.forces = p.forces.add(gravity.multiply(p.mass));
        }
    }

    applyAirFriction(){
        const friction_coef = 0.5;
        for (const p of this.objects) {
            p.forces = p.forces.subtract(p.velocity.multiply(friction_coef));
        }
    }

    updatePositions(dt){
        for (const p of this.objects) {
            p.update(dt);
        }
    }

    updateDerivatives(dt){
        for (const p of this.objects) {
            p.updateDerivatives(dt);
        }
    }

    solveConstraints(){
        for (let i = 0; i < this.solver_iterations; ++i) {
            for (const l of this.constraints) {
                l.solve();
            }
        }
    }

    removeBrokenLinks(){
        this.constraints = this.constraints.filter(c => c.isValid());
    }

    addParticle(position){
        const particle = new Particle(position);
        this.objects.push(particle);
        return particle;
    }

    addLink(particle_1, particle_2, max_elongation_ratio = 1.5){
        const link = new LinkConstraint(particle_1, particle_2);
        link.max_elongation_ratio = max_elongation_ratio;
        this.constraints.push(link);
        return link;
    }

    map(callback){
        for (const p of this.objects) {
            callback(p);
        }
    }
};