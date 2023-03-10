class Renderer {
    constructor(solver) {
        this.solver = solver;
        this.va = new VertexArray(PrimitiveType.Lines);
    }

    updateVA() {
        const links_count = this.solver.constraints.length;
        this.va.resize(2 * links_count);
        for (let i = 0; i < links_count; ++i) {
            const current_link = this.solver.constraints[i];
            this.va[2 * i].position = current_link.particle_1.position;
            this.va[2 * i + 1].position = current_link.particle_2.position;
        }
    }

    render(context) {
        this.updateVA();
        context.draw(this.va);
    }
}

class VertexArray {
    constructor(primitive_type) {
        this.primitive_type = primitive_type;
        this.vertices = [];
    }

    resize(size) {
        this.vertices.length = size;
    }

    get length() {
        return this.vertices.length;
    }

    get(index) {
        return this.vertices[index];
    }

    set(index, value) {
        this.vertices[index] = value;
    }
}

// PrimitiveType is an enum
const PrimitiveType = {
    Points: 0,
    Lines: 1,
    Triangles: 2,
};