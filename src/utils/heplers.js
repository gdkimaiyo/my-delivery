// HELPER functions
export const getImgUrl = (image) => {
    return new URL(`../assets/foodimages/${image}`, import.meta.url).href;
};

// Generate a random number
export const randomNumber = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};