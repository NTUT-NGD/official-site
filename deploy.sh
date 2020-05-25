set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/AaronXue0/super-card.git master:gh-pages

cd -