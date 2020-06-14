set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/NTUT-NGD/official-site.git master:gh-pages

cd -