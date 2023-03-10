
class Slot{
    constructor(id, data_id){
        this.id = id;
        this.data_id = data_id;
    }
}

class ObjectSlot{
    constructor(id, data){
        this.id = id;
        this.data = data;
    }
}

class ObjectSlotConst{
    constructor(id, data){
        this.id = id;
        this.data = data;
    }
}

class SlotMetadata{
    constructor(rid, op_id){
        this.rid = rid;
        this.op_id = op_id;
    }
}

class Vector{
    constructor(){
        this.data = [];
        this.ids = [];
        this.metadata = [];
        this.data_size = 0;
        this.op_count = 0;
    }

    getAt(id){
        return this.data[this.getDataID(id)];
    }

    getDataID(id){
        return this.ids[id];
    }

    getMetadataAt(id){
        return this.metadata[this.getDataID(id)];
    }

    isValid(id, validity){
        return validity == this.metadata[this.getDataID(id)].op_id;
    }

    getFreeSlot(){
        const reuse_id = this.metadata[this.data_size].rid;
        this.metadata[this.data_size].op_id = this.op_count++;
        return new Slot(reuse_id, this.data_size);
    }

    createNewSlot(){
        this.data.push({});
        this.ids.push(this.data_size);
        this.metadata.push(new SlotMetadata(this.data_size, this.op_count++));
        return new Slot(this.data_size, this.data_size);
    }

    getSlot(){
        const slot = this.isFull() ? this.createNewSlot() : this.getFreeSlot();
        ++this.data_size;
        return slot;
    }

    isFull(){
        return this.data_size == this.data.length;
    }

    getSlotAt(i){
        return new ObjectSlot(this.metadata[i].rid, this.data[i]);
    }

    getSlotAt(i){
        return new ObjectSlotConst(this.metadata[i].rid, this.data[i]);
    }

    getRef(id){
        return new Ref(id, this, this.metadata[this.ids[id]].op_id);
    }

    getDataAt(i){
        return this.data[i];
    }

    getID(i){
        return this.metadata[i].rid;
    }

    size(){
        return this.data_size;
    }

    begin(){
        return this.data.begin();
    }

    end(){
        return this.data.begin() + this.data_size;
    }

    begin(){
        return this.data.begin();
    }

    end(){
        return this.data.begin() + this.data_size;
    }

    remove_if(f){
        let data_index = 0;
        for (let it = this.data.begin(); it != this.end(); ++it) {
            if (f(it)) {
                this.erase(this.metadata[data_index].rid);
                --it;
            } else {
                ++data_index;
            }
        }
    }

    erase(id){
        const data_id = this.ids[id];
        const last_data_id = this.data_size - 1;
        const last_id = this.metadata[last_data_id].rid;
        this.data[data_id] = this.data[last_data_id];
        this.ids[last_id] = data_id;
        this.metadata[data_id] = this.metadata[last_data_id];
        --this.data_size;
    }
}

class Ref{
    constructor(id, array, validity_id){
        this.id = id;
        this.array = array;
        this.validity_id = validity_id;
    }

    getID(){
        return this.id;
    }

    bool(){
        return this.array && this.array.isValid(this.id, this.validity_id);
    }

    get(){
        return this.array.getAt(this.id);
    }
}