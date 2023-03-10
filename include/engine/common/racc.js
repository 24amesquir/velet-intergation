/* not sure what this is, i think it might be like a rust compiler? */

/*
template<typename T>
struct RAccBase
{
    uint32_t max_values_count;
    std::vector<T> values;
    uint32_t current_index;
    T pop_value;

    RAccBase(uint32_t max_size=8)
        : max_values_count(max_size)
        , values(max_size, 0.0f)
        , current_index(0)
        , pop_value(0.0f)
    {
    }

    bool addValueBase(T val)
    {
        const bool pop = current_index >= max_values_count;
        const uint32_t i = getIndex();
        pop_value = values[i];
        values[i] = val;
        ++current_index;
        return pop;
    }

    uint32_t getCount() const
    {
        return std::min(current_index + 1, max_values_count);
    }

    virtual T get() const = 0;

    operator T() const
    {
        return get();
    }

protected:
    uint32_t getIndex(int32_t offset = 0) const
    {
        return (current_index + offset) % max_values_count;
    }
};


template<typename T>
struct RMean : public RAccBase<T>
{
    T sum;

    RMean(uint32_t max_size=8)
        : RAccBase<T>(max_size)
        , sum(0.0f)
    {
    }

    void addValue(T v)
    {
        sum += v - float(RAccBase<T>::addValueBase(v)) * RAccBase<T>::pop_value;
    }

    T get() const override
    {
        return sum / float(RAccBase<T>::getCount());
    }
};


template<typename T>
struct RDiff : public RAccBase<T>
{
    RDiff(uint32_t max_size = 8)
        : RAccBase<T>(max_size)
    {
    }

    void addValue(T v)
    {
        RAccBase<T>::addValueBase(v);
    }

    T get() const override
    {
        return RAccBase<T>::values[RAccBase<T>::getIndex(-1)] - RAccBase<T>::values[RAccBase<T>::getIndex()];
    }
};
*/

class RAccBase{
    constructor(max_size=8){
        this.max_values_count = max_size;
        this.values = new Array(max_size).fill(0.0);
        this.current_index = 0;
        this.pop_value = 0.0;
    }

    addValueBase(val){
        const pop = this.current_index >= this.max_values_count;
        const i = this.getIndex();
        this.pop_value = this.values[i];
        this.values[i] = val;
        ++this.current_index;
        return pop;
    }

    getCount(){
        return Math.min(this.current_index + 1, this.max_values_count);
    }

    get(){
        throw new Error("not implemented");
    }
}

class RMean extends RAccBase{
    constructor(max_size=8){
        super(max_size);
        this.sum = 0.0;
    }

    addValue(v){
        this.sum += v - this.addValueBase(v) * this.pop_value;
    }

    get(){
        return this.sum / this.getCount();
    }
}

class RDiff extends RAccBase{
    constructor(max_size=8){
        super(max_size);
    }

    addValue(v){
        this.addValueBase(v);
    }

    get(){
        return this.values[this.getIndex(-1)] - this.values[this.getIndex()];
    }
}