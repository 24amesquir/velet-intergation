function main(){
    const window_width = 1920;
    const window_height = 1080;
    const app = new WindowContextHandler("Cloth", [window_width, window_height], "default");

    // create solver
    const solver = new PhysicsSolver();
    const renderer = new Renderer(solver);

    // Initialize the Cloth
    const cloth_width = 75;
    const cloth_height = 50;
    const links_length = 20.0;
    const start_x = (window_width - (cloth_width - 1) * links_length) * 0.5;
    for (let y = 0; y < cloth_height; y++) {
        const max_elongation = 1.2 * (2.0 - y / cloth_height);
        for (let x = 0; x < cloth_width; x++) {
            const id = solver.addParticle(start_x + x * links_length, y * links_length)
            if (x > 0) {
                solver.addLink(id - 1, id, max_elongation * 0.9);
            }
            if (y > 0) {
                solver.addLink(id - cloth_width, id, max_elongation);
            } else {
                if(id.mass > 0.0){
                    solver.objects[id].moving = false;
                }
            }
        }
    }

    let last_mouse_position = [];
    let dragging = false;
    let erasing = false;
    // add events callback for mouse control
    canvas.addEventListener("mousedown", (e) => {
        // if right mouse is down draggin is true last_mouse_position is set to the mouse position middle mouse earasing is true
        if (e.button === 0) {
            dragging = true;
            last_mouse_position = [e.clientX, e.clientY];
        } else if (e.button === 1) {
            erasing = true;
        }
    });
    canvas.addEventListener("mouseup", (e) => {
        // if right mouse is up draggin is false middle mouse earasing is false
        if (e.button === 0) {
            dragging = false;
        } else if (e.button === 1) {
            erasing = false;
        }
    });

    /* the example has two wind waves i don't know if i really want one though */
    let wind = new WindManager(window_width);
    wind.winds.emplace_back(
        [100.0, window_height],
        [0.0, 0.0],
        [1000.0, 0.0]
    );
    wind.winds.emplace_back(
        [20.0, window_height],
        [0.0, 0.0],
        [3000.0, 0.0]
    );

    // main loop
    const dt = 1.0 / 60.0;
    requestAnimationFrame(function loop() {
    if(app.run()){
        // Get the mouse coord in the world space, to allow proper control even with modified viewport
        const mouse_position = app.getWorldMousePosition();

        if(dragging){
            // Apply a force on the particles in the direction of the mouse's movement
            const mouse_speed = mouse_position.sub(last_mouse_position);
            last_mouse_position = mouse_position;
            applyForceOnCloth(mouse_position, 100.0, mouse_speed * 8000.0, solver);
        }

        if(erasing){
            // Delete all nodes that are in the range of the mouse
            solver.objects.remove_if((p) => {
                return p.position.sub(mouse_position).length() < 10.0;
            });
        }

        // Update physics
        wind.update(solver, dt);
        solver.update(dt);
        // Render the scene
        // canvas stuff
        ctx = app.getRenderContext();
        ctx.clearRect(0, 0, window_width, window_height);
        renderer.render(ctx);
        // end canvas stuff
        requestAnimationFrame(loop);
    }

    return;
});
}