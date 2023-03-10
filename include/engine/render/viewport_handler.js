class ViewportHandler {
    constructor(render_size, base_zoom = 1.0) {
        this.state = {
            center:{x:render_size.x * 0.5, y:render_size.y * 0.5},
            offset:{x:render_size.x * 0.5, y:render_size.y * 0.5},
            zoom: base_zoom,
            clicking: false,
            mouse_position: {x:0, y:0},
            mouse_world_position: {x:0, y:0},
            // transform: new sf.Transform(),
            /*updateState: function () {
                this.transform = new sf.Transform().translate(this.center).scale(this.zoom, this.zoom).translate(this.offset.multiply(-1));
                this.mouse_world_position = this.mouse_position.divide(this.zoom).add(this.offset);
            }*/
        };
        this.state.offset = this.state.center;
        //this.state.updateState();
    }

    addOffset(vector2f) {
        this.state.offset = this.state.offset.add(vector2f.divide(this.state.zoom));
        this.state.updateState();
    }

    zoom(factor) {
        this.state.zoom *= factor;
        this.state.updateState();
    }

    wheelZoom(delta) {
        if (delta) {
            const zoom_amount = 1.2;
            const delta = delta > 0 ? zoom_amount : 1.0 / zoom_amount;
            this.zoom(delta);
        }
    }

    reset() {
        this.state.zoom = 1.0;
        this.setFocus(this.state.center);
    }

    getTransform() {
        return this.state.transform;
    }

    click(relative_click_position) {
        this.state.mouse_position = relative_click_position;
        this.state.clicking = true;
    }

    unclick() {
        this.state.clicking = false;
    }

    setMousePosition(new_mouse_position) {
        if (this.state.clicking) {
            this.addOffset(this.state.mouse_position.subtract(new_mouse_position));
        }
        this.state.updateMousePosition(new_mouse_position);
    }

    setFocus(focus_position) {
        this.state.offset = focus_position;
        this.state.updateState();
    }

    setZoom(zoom) {
        this.state.zoom = zoom;
        this.state.updateState();
    }

    getMouseWorldPosition() {
        return this.state.mouse_world_position;
    }

    getScreenCoords(world_pos) {
        return this.state.transform.transformPoint(world_pos);
    }
}