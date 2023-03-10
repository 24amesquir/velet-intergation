class sf{
    constructor(){
        this.Event = this.Event;
        this.EventManager = this.EventManager;
        this.Color = this.Color;
        this.ColorTransparent = this.ColorTransparent;
        this.ColorBlack = this.ColorBlack;
        this.ColorWhite = this.ColorWhite;
        this.Vector2f = this.Vector2f;
        this.Vector2i = this.Vector2i;
        this.Vector2u = this.Vector2u;
        this.Vector3f = this.Vector3f;
        this.Vector3i = this.Vector3i;
        this.Vector3u = this.Vector3u;
        this.VideoMode = this.VideoMode;
        this.Window = this.Window;
    }
    static Vector2f(x, y){
        return {x, y};
    }

    static Vector2i(x, y){
        return {x, y};
    }

    static Vector2u(x, y){
        return {x, y};
    }

    static Vector3f(x, y, z){
        return {x, y, z};
    }

    static Vector3i(x, y, z){
        return {x, y, z};
    }

    static Vector3u(x, y, z){
        return {x, y, z};
    }

    VideoMode(width, height){
        return {width, height};
    }

    Window(name, size, style){
        let newRenderWindow = new sfRenderWindow(name, size, style);
        return newRenderWindow;
    }

    Event(){
        return new sfEvent();
    }

    EventManager(window, use_builtin_helpers = true){
        let newEventManager = new EventManager(window, use_builtin_helpers);
        return newEventManager;
    }

    Color(r, g, b, a = 255){
        return {r, g, b, a};
    }

    ColorTransparent(){
        return {r: 0, g: 0, b: 0, a: 0};
    }

    ColorBlack(){
        return {r: 0, g: 0, b: 0, a: 255};
    }

    ColorWhite(){
        return {r: 255, g: 255, b: 255, a: 255};
    }

    // whether the window is open or not
    isOpen(window){
        return window.isOpen;
    }

    /*             this.addEventCallback(sf.Event.Closed, event => {
                this.window.close();
            });*/

    EventClosed(){
        return "closed";
    }
}

class sfRenderWindow{
    constructor(name, size, style){
        this.name = name;
        this.size = size;
        this.style = style;
        this.isOpen = true;
        this.Closed = false;
        this.Window = this;
        
    }

    close(){
        this.isOpen = false;
    }

    isOpen(){
        return this.isOpen;
    }

    getSize(){
        return this.size;
    }

    setFramerateLimit(limit){
        this.limit = limit;
    }
}

class sfev{
    static EventManager(window, use_builtin_helpers = true){
        let newEventManager = new EventManager(window, use_builtin_helpers);
        return newEventManager;
    }
}