// HELPER functions
export const getImgUrl = (image) => {
    return new URL(`../assets/foodimages/${image}`, import.meta.url).href;
};

// Generate a random number
export const randomNumber = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: "KES",
    });
    return formatter.format(amount);
}

export const getRandomItems = (arr, n) => {
    let result = new Array(n);
    let len = arr.length;
    let taken = new Array(len);

    if (n > len) {
        // Return original
        return arr;
    }

    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
