/*
class WindowContextHandler;


class RenderContext
{
public:
    explicit
    RenderContext(sf::RenderWindow& window)
        : m_window(window)
        , m_viewport_handler(toVector2f(window.getSize()))
    {
    }

    void setFocus(sf::Vector2f focus)
    {
        m_viewport_handler.setFocus(focus);
    }

    void setZoom(float zoom)
    {
        m_viewport_handler.setZoom(zoom);
    }
    
    void registerCallbacks(sfev::EventManager& event_manager)
    {
        event_manager.addEventCallback(sf::Event::Closed, [&](sfev::CstEv) { m_window.close(); });
        event_manager.addKeyPressedCallback(sf::Keyboard::Escape, [&](sfev::CstEv) { m_window.close(); });
        event_manager.addMousePressedCallback(sf::Mouse::Left, [&](sfev::CstEv) {
            m_viewport_handler.click(event_manager.getFloatMousePosition());
        });
        event_manager.addMouseReleasedCallback(sf::Mouse::Left, [&](sfev::CstEv) {
            m_viewport_handler.unclick();
        });
        event_manager.addEventCallback(sf::Event::MouseMoved, [&](sfev::CstEv) {
            m_viewport_handler.setMousePosition(event_manager.getFloatMousePosition());
        });
        event_manager.addEventCallback(sf::Event::MouseWheelScrolled, [&](sfev::CstEv e) {
            m_viewport_handler.wheelZoom(e.mouseWheelScroll.delta);
        });
    }
    
    void drawDirect(const sf::Drawable& drawable)
    {
        m_window.draw(drawable);
    }
    
    void draw(const sf::Drawable& drawable, sf::RenderStates render_states = {})
    {
        render_states.transform = m_viewport_handler.getTransform();
        m_window.draw(drawable, render_states);
    }
    
    void clear(sf::Color color = sf::Color::Black)
    {
        m_window.clear(color);
    }
    
    void display()
    {
        m_window.display();
    }
    
private:
    sf::RenderWindow& m_window;
    ViewportHandler m_viewport_handler;
    
    friend class WindowContextHandler;
};


class WindowContextHandler
{
public:
    WindowContextHandler(const std::string& window_name,
                         sf::Vector2u window_size,
                         int32_t window_style = sf::Style::Default)
        : m_window(sf::VideoMode(window_size.x, window_size.y), window_name, window_style)
        , m_event_manager(m_window, true)
        , m_render_context(m_window)
    {
        m_window.setFramerateLimit(60);
        m_render_context.registerCallbacks(m_event_manager);
    }

    [[nodiscard]]
    sf::Vector2u getWindowSize() const
    {
        return m_window.getSize();
    }
    
    void processEvents()
    {
        m_event_manager.processEvents();
    }
    
    bool isRunning() const
    {
        return m_window.isOpen();
    }
    
    bool run()
    {
        processEvents();
        return isRunning();
    }

    sfev::EventManager& getEventManager()
    {
        return m_event_manager;
    }

    RenderContext& getRenderContext()
    {
        return m_render_context;
    }
    
    sf::Vector2f getWorldMousePosition() const
    {
        return m_render_context.m_viewport_handler.getMouseWorldPosition();
    }
    
private:
    sf::RenderWindow m_window;
    sfev::EventManager m_event_manager;
    RenderContext m_render_context;
};
*/

// make javascript code from the above code in c++

class WindowContextHandler{
    constructor(window_name, window_size, window_style){
        let newSf = new sf();
        this.sfVideoMode = newSf.VideoMode(window_size.x, window_size.y);
        this.window = newSf.Window(this.sfVideoMode, window_name, window_style);
        this.event_manager = new EventManager(this.window, true);
        this.render_context = new RenderContext(this.window);
        this.window.setFramerateLimit(60);
        //this.render_context.registerCallbacks(this.event_manager);
    }

    getWindowSize(){
        return this.window.getSize();
    }

    processEvents(){
        this.event_manager.processEvents();
    }

    isRunning(){
        return this.window.isOpen();
    }

    run(){
        this.processEvents();
        return this.isRunning();
    }

    getEventManager(){
        return this.event_manager;
    }

    getRenderContext(){
        return this.render_context;
    }

    getWorldMousePosition(){
        return this.render_context.m_viewport_handler.getMouseWorldPosition();
    }
}

class RenderContext{
    constructor(window){
        this.window = window;
        this.viewport_handler = new ViewportHandler(toVector2f(window.getSize()));
    }

    setFocus(focus){
        this.viewport_handler.setFocus(focus);
    }

    setZoom(zoom){
        this.viewport_handler.setZoom(zoom);
    }

    registerCallbacks(event_manager){
        event_manager.addEventCallback(sf.Event.Closed, (e) => { this.window.close(); });
        event_manager.addKeyPressedCallback(sf.Keyboard.Escape, (e) => { this.window.close(); });
        event_manager.addMousePressedCallback(sf.Mouse.Left, (e) => {
            this.viewport_handler.click(event_manager.getFloatMousePosition());
        });
        event_manager.addMouseReleasedCallback(sf.Mouse.Left, (e) => {
            this.viewport_handler.unclick();
        });
        event_manager.addEventCallback(sf.Event.MouseMoved, (e) => {
            this.viewport_handler.setMousePosition(event_manager.getFloatMousePosition());
        });
        event_manager.addEventCallback(sf.Event.MouseWheelScrolled, (e) => {
            this.viewport_handler.wheelZoom(e.delta);
        });
    }

    drawDirect(drawable){
        this.window.draw(drawable);
    }

    draw(drawable, render_states = {}){
        render_states.transform = this.viewport_handler.getTransform();
        this.window.draw(drawable, render_states);
    }

    clear(color = sf.Color.Black){
        this.window.clear(color);
    }

    display(){
        this.window.display();
    }
}

toVector2f = (vector2u) => {
    let x = vector2u.x;
    let y = vector2u.y;
    return {x, y};
}