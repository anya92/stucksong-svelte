module.exports = {
  plugins: ["svelte3"],
  settings: {
    "svelte3/ignore-styles": function ({ type }) {
      return type === "text/scss";
    },
  },
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
};
