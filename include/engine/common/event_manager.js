class EventManager {
    constructor(window, use_builtin_helpers = true) {
        this.window = window;
        this.event_map = new EventMap(use_builtin_helpers);
    }

    processEvents(fallback = null) {
        let event;
        while (event = this.window.pollEvent()) {
            this.event_map.executeCallback(event, fallback);
        }
    }

    addEventCallback(type, callback) {
        this.event_map.addEventCallback(type, callback);
    }

    removeCallback(type) {
        this.event_map.removeCallback(type);
    }

    addKeyPressedCallback(key, callback) {
        this.event_map.addKeyPressedCallback(key, callback);
    }

    addKeyReleasedCallback(key, callback) {
        this.event_map.addKeyReleasedCallback(key, callback);
    }

    addMousePressedCallback(button, callback) {
        this.event_map.addMousePressedCallback(button, callback);
    }

    addMouseReleasedCallback(button, callback) {
        this.event_map.addMouseReleasedCallback(button, callback);
    }

    getWindow() {
        return this.window;
    }

    getFloatMousePosition() {
        const mouse_position = this.window.getMousePosition();
        return { x: mouse_position.x, y: mouse_position.y };
    }

    getMousePosition() {
        return this.window.getMousePosition();
    }
}

class EventMap {
    constructor(use_builtin_helpers = true) {
        this.events_callmap = new Map();
        if (use_builtin_helpers) {
            /*this.addEventCallback(sf.Event.Closed, event => {
                this.window.close();
            });*/
        }
    }

    addEventCallback(type, callback) {
        this.events_callmap.set(type, callback);
    }

    addKeyPressedCallback(key_code, callback) {
        this.key_pressed_manager.addCallback(key_code, callback);
    }

    addKeyReleasedCallback(key_code, callback) {
        this.key_released_manager.addCallback(key_code, callback);
    }

    addMousePressedCallback(button, callback) {
        this.mouse_pressed_manager.addCallback(button, callback);
    }

    addMouseReleasedCallback(button, callback) {
        this.mouse_released_manager.addCallback(button, callback);
    }

    executeCallback(e, fallback = null) {
        const callback = this.events_callmap.get(e.type);
        if (callback) {
            callback(e);
        } else if (fallback) {
            fallback(e);
        }
    }

    removeCallback(type) {
        this.events_callmap.delete(type);
    }
}

class SubTypeManager {
    constructor() {
        this.callbacks = new Map();
    }

    addCallback(type, callback) {
        let callbacks = this.callbacks.get(type);
        if (!callbacks) {
            callbacks = [];
            this.callbacks.set(type, callbacks);
        }
        callbacks.push(callback);
    }

    executeCallbacks(e) {
        const callbacks = this.callbacks.get(e.type);
        if (callbacks) {
            callbacks.forEach(callback => callback(e));
        }
    }
}

class KeyManager extends SubTypeManager {
    constructor() {
        super();
        this.addCallback(sf.Event.KeyPressed, e => {
            this.executeCallbacks(e);
        });
        this.addCallback(sf.Event.KeyReleased, e => {
            this.executeCallbacks(e);
        });
    }
}

class MouseManager extends SubTypeManager {
    constructor() {
        super();
        this.addCallback(sf.Event.MouseButtonPressed, e => {
            this.executeCallbacks(e);
        });
        this.addCallback(sf.Event.MouseButtonReleased, e => {
            this.executeCallbacks(e);
        });
    }
}

