export default {
  firstLatterUp(word) {
    if (!word.length) return word;

    let parts = word.split("");
    parts[0] = parts[0].toUpperCase();

    return parts.join("");
  },

  title(str) {
    return str.split(" ").map(this.firstLatterUp).join(" ");
  },
};
