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
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });
  return formatter.format(amount);
};

// Pagination - fetch next or previous page contents
export const fetchNextPage = (arr, page, perPage) => {
  if (arr?.length > 0) {
    if (page == 1) {
      if (page * perPage <= arr.length) {
        return arr.slice(page - 1, page * perPage);
      } else {
        return arr.slice(page - 1, arr.length);
      }
    } else {
      if (page * perPage <= arr.length) {
        return arr.slice(page * perPage - perPage, page * perPage);
      } else {
        return arr.slice(page * perPage - perPage, arr.length);
      }
    }
  } else {
    return [];
  }
};

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
};

export const validateEmail = (email) => {
  if (email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  } else {
    return false;
  }
};

export const validateMobile = (phone) => {
  const re = /^\d{10}$/;
  const re2 = /^\+?([0-9]{3})\)?([0-9]{9})$/;
  if (phone) {
    if (phone.match(re) || phone.match(re2)) {
      return true;
    }
    return false;
  }
  return false; // To change to false if cell phone number is required
};

// Get firstname and lastname from fullname
export const getName = (name, fullname) => {
  // name is either firstname or lastname
  if (name === "first") {
    let arr = fullname?.split(" ");
    return titleCase(arr[0]);
  } else {
    let arr = fullname?.split(" ");
    return titleCase(arr[1]);
  }
};

export const titleCase = (str) => {
  return str?.toLowerCase()?.replace(/\b\S/g, function (t) {
    return t?.toUpperCase();
  });
};
