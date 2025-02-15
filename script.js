class HashMap {
	constructor(size = 16) {
		this.buckets = Array.from({ length: size }, () => []);
		this.size = size;
		this.capacity = 0.75;
		this.count = 0;
	}

	hash(key) {
		let hashCode = 0;
		const primeNumber = 31;

		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
		}

		return hashCode;
	}

	set(key, value) {
		const hashCode = this.hash(key);
		const index = hashCode % this.size;
		const bucket = this.buckets[index];

		for (let entry of bucket) {
			if (entry.key === key) {
				entry.value = value;
				return;
			}
		}
		bucket.push({ key, value });

		let loadFactor = this.length() / this.size;
		if (loadFactor > this.capacity) {
			this.grow();
		}
	}

	get(key) {
		const hashCode = this.hash(key);
		const index = hashCode % this.size;
		const bucket = this.buckets[index];

		for (let entry of bucket) {
			if (entry.key === key) {
				return entry.value;
			}
		}

		return null;
	}

	has(key) {
		const hashCode = this.hash(key);
		const index = hashCode % this.size;
		const bucket = this.buckets[index];

		for (let entry of bucket) {
			if (entry.key === key) {
				return true;
			}
		}

		return false;
	}

	remove(key) {
		if (this.has(key)) {
			const hashCode = this.hash(key);
			const index = hashCode % this.size;
			const bucket = this.buckets[index];

			let newBucket = bucket.filter((entry) => entry.key !== key);
			this.buckets[index] = newBucket;
			return true;
		} else {
			return false;
		}
	}

	length() {
		return this.buckets.flat().length;
	}

	clear() {
		this.buckets = Array.from({ length: size }, () => []);
	}

	keys() {
		let answer = [];
		for (let bucket of this.buckets) {
			for (let entry of bucket) {
				answer.push(entry.key);
			}
		}
		return answer;
	}

	values() {
		return this.buckets.flat().map((entry) => entry.value);
	}

	entries() {
		return this.buckets.flat().map((entry) => [entry.key, entry.value]);
	}

	grow() {
		size = this.size * 2;
		const entries = this.entries();
		this.clear();

		for (let entry of entries) {
			this.set(entry[0], entry[1]);
		}
	}
}

let hashy = new HashMap();
hashy.set("age", "25");
hashy.set("name", "lebron");
hashy.set("age", "36");
hashy.set("height", "6969cm");
hashy.remove("name");
console.log(hashy);
console.log(hashy.keys());
console.log(hashy.values());
console.log(hashy.length());
console.log(hashy.entries());

// thank you https://github.com/JAlblas/odin-hashmap/blob/main/HashMap.js !!!
