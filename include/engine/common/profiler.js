class Profiler{
    constructor(){
        this.clock = new sf.Clock();
        this.clock.restart();
    }

    start(elem){
        elem.start = this.clock.getElapsedTime().asMicroseconds();
    }

    stop(elem){
        elem.total += this.clock.getElapsedTime().asMicroseconds() - elem.start;
    }
}
