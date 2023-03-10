/* 
struct Vec2
{
	Vec2()
		: x(0.0f)
		, y(0.0f)
	{}

	Vec2(float x_, float y_)
		: x(x_)
		, y(y_)
	{}

	float getLength2() const
	{
		return x * x + y * y;
	}

	float getLength() const
	{
		return sqrt(getLength2());
	}

	Vec2 operator/(float f) const
	{
		const float inv = 1.0f / f;
		return Vec2(x * inv, y * inv);
	}

	Vec2 operator*(float f) const
	{
		return Vec2(x * f, y * f);
	}

	Vec2 operator-(const Vec2& other) const
	{
		return Vec2(x - other.x, y - other.y);
	}

	Vec2 operator-() const
	{
		return Vec2(-x, -y);
	}

	void operator+=(const Vec2& other)
	{
		x += other.x;
		y += other.y;
	}

	void operator+=(float f)
	{
		x += f;
		y += f;
	}

	void operator/=(float f)
	{
		x /= f;
		y /= f;
	}

	Vec2 plus(const Vec2& other) const
	{
		return Vec2(x + other.x, y + other.y);
	}

	Vec2 minus(const Vec2& other) const
	{
		return Vec2(x - other.x, y - other.y);
	}

	void operator-=(const Vec2& other)
	{
		x -= other.x;
		y -= other.y;
	}

	void rotate(const Vec2& origin, float angle)
	{
		const Vec2 v = *this - origin;

		// This should be precomputed
		const float ca = cos(angle);
		const float sa = sin(angle);

		const float new_x = v.x * ca - v.y * sa;
		const float new_y = v.x * sa + v.y * ca;

		x = new_x + origin.x;
		y = new_y + origin.y;
	}

	Vec2 getNormal() const
	{
		return Vec2(-y, x);
	}

	float dot(const Vec2& other) const
	{
		return x * other.x + y * other.y;
	}

	float cross(const Vec2& other) const
	{
		return x * other.y - y * other.x;
	}

	Vec2 getNormalized() const
	{
		return (*this) / getLength();
	}

	static Vec2 rotate(Vec2 v, const Vec2& origin, float angle)
	{
		v.rotate(origin, angle);
		return v;
	}

	float x, y;
};


struct IVec2
{
	int32_t x, y;

	IVec2()
		: x(0)
		, y(0)
	{}

	IVec2(int32_t x_, int32_t y_)
		: x(x_)
		, y(y_)
	{}
};
*/

class Vec2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    getLength2(){
        return this.x * this.x + this.y * this.y;
    }

    getLength(){
        return Math.sqrt(this.getLength2());
    }

    plus(other){
        return new Vec2(this.x + other.x, this.y + other.y);
    }

    minus(other){
        return new Vec2(this.x - other.x, this.y - other.y);
    }

    rotate(origin, angle){
        const v = this.minus(origin);

        // This should be precomputed
        const ca = Math.cos(angle);
        const sa = Math.sin(angle);

        const new_x = v.x * ca - v.y * sa;
        const new_y = v.x * sa + v.y * ca;

        this.x = new_x + origin.x;
        this.y = new_y + origin.y;
    }

    getNormal(){
        return new Vec2(-this.y, this.x);
    }

    dot(other){
        return this.x * other.x + this.y * other.y;
    }

    cross(other){
        return this.x * other.y - this.y * other.x;
    }

    getNormalized(){
        return this.divide(this.getLength());
    }

    divide(f){
        const inv = 1.0 / f;
        return new Vec2(this.x * inv, this.y * inv);
    }

    multiply(f){
        return new Vec2(this.x * f, this.y * f);
    }

    negate(){
        return new Vec2(-this.x, -this.y);
    }

    toString(){
        return `(${this.x}, ${this.y})`;
    }

    static rotate(v, origin, angle){
        v.rotate(origin, angle);
        return v;
    }

    static fromAngle(angle){
        return new Vec2(Math.cos(angle), Math.sin(angle));
    }

    static fromPolar(r, angle){
        return new Vec2(r * Math.cos(angle), r * Math.sin(angle));
    }

    static fromPolarDegrees(r, angle){
        return Vec2.fromPolar(r, angle * Math.PI / 180.0);
    }

    static fromPolarRadians(r, angle){
        return Vec2.fromPolar(r, angle);
    }

    // operatorer overloading
    add(other){
        return this.plus(other);
    }

    sub(other){
        return this.minus(other);
    }

    div(f){
        return this.divide(f);
    }

    mul(f){
        return this.multiply(f);
    }

    neg(){
        return this.negate();
    }

    eq(other){
        return this.x == other.x && this.y == other.y;
    }

    neq(other){
        return !this.eq(other);
    }

    static get zero(){
        return new Vec2(0, 0);
    }

    static get one(){
        return new Vec2(1, 1);
    }

    static get up(){
        return new Vec2(0, 1);
    }

    static get down(){
        return new Vec2(0, -1);
    }

    static get left(){
        return new Vec2(-1, 0);
    }

    static get right(){
        return new Vec2(1, 0);
    }

    static get unitX(){
        return new Vec2(1, 0);
    }

    static get unitY(){
        return new Vec2(0, 1);
    }

    static get infinity(){
        return new Vec2(Infinity, Infinity);
    }

    static get negativeInfinity(){
        return new Vec2(-Infinity, -Infinity);
    }

    static get NaN(){
        return new Vec2(NaN, NaN);
    }

    // rotation
    static rotate(v, origin, angle){
        return v.rotate(origin, angle);
    }

    static rotateDegrees(v, origin, angle){
        return v.rotate(origin, angle * Math.PI / 180.0);
    }
}

class IVec2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}