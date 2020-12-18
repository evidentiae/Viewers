{ pkgs ? import <nixpkgs> {} }:

with pkgs.lib;

pkgs.stdenv.mkDerivation {
  name = "oryx-dicom-viewer";

  src = builtins.filterSource (path: type:
    let p = removePrefix (toString ./. + "/") (toString path); in
    hasPrefix "platform/viewer/dist" p
  ) ./.;
  #  let p = removePrefix (toString ./. + "/") (toString path); in
  #  p == "aliases.config.js" ||
  #  p == "babel.config.js" ||
  #  p == "eslintAliasesResolver.js" ||
  #  p == "jest.config.base.js" ||
  #  p == "jest.config.js" ||
  #  p == "postcss.config.js" ||
  #  p == "lerna.json" ||
  #  p == "netlify.toml" || #  p == "package.json" ||
  #  p == "yarn.lock" ||
  #  p == ".browserslistrc" ||
  #  p == ".codecov.yml" ||
  #  p == ".eslintrc.json" ||
  #  p == ".prettierrc" ||
    
  #  hasPrefix ".webpack" p ||
  #  hasPrefix ".netlify" p ||
  #  hasPrefix "platform" p ||
  #  hasPrefix "extensions" p
  #) ./.;

  installPhase = ''
    cp -r platform/viewer/dist $out
  '';
}

