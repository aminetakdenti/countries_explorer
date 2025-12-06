export default {
  plugins: ["@ianvs/prettier-plugin-sort-imports"],

  importOrder: [
    "^react$",
    "^react-native$",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/hooks/(.*)$",
    "^@/components/(.*)$",
    "^@/screens/(.*)$",
    "^@/lib/(.*)$",
    "^@/utils/(.*)$",
    "^@/services/(.*)$",
    "",
    "^[./]",
  ],

  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
