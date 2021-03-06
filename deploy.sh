#!usr/bin/env sh

# abort on errors
set -e

# build
npm run build:prod

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deployment'

git push -f git@github.com:Erik3010/pacman-resolver.git master:gh-pages

cd -