module.exports = {
  locales: ["en-EN", "fi-FI"],

  output: "locales/$LOCALE/translations.json",
  input: ["**/*.{ts,tsx}"],

  defaultNamespace: "translation",
  keySeparator: false,
  namespaceSeparator: false,
  createOldCatalogs: false,
  sort: true,
};