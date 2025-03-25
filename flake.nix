{
  description = "Blink Mavapay Client - Develop";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }: 
  let
    systems = [ "x86_64-linux" "aarch64-darwin" "x86_64-darwin" ];
    forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f system);
  in {
    devShells = forAllSystems (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in {
        default = pkgs.mkShell {
          buildInputs = [
            pkgs.nodejs_22
            pkgs.pnpm
<<<<<<< HEAD
            pkgs.vendir
=======
            pkgs.typescript
            pkgs.eslint
>>>>>>> 4494dd2 (chore: adding typescript and eslint to nix environment)
          ];
        };
      }
    );
  };
}
