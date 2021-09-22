module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    "no-console": "error",
    "dot-notation": "off",
    "flowtype/no-types-missing-file-annotation": "off",

    "react/jsx-handler-names": "off",
    "react/no-unescaped-entities": "warn",
    "react/react-in-jsx-scope": "error",
    "react/no-did-update-set-state": "warn",
    "react/prop-types": "off",

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "jsx-a11y/anchor-is-valid": "off"
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      'babel/no-invalid-this': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      indent: ['error', 2],
      semi: ['error', 'never']
    }
  ]
};
