# Guardian Recipe Finder

This website allows you to browse and bookmark articles from the Guardian Food website. It features:

1. Search feature to find articles
2. Pagination
3. Sorting option to rank results by relevance or newest
4. Bookmarking powered by local storage

## Install

Can be installed from github repository:

`git clone ...`

After installation navigate to the directory and run:

`npm install`

to install the dependencies.

### Development

To start the development server:

`npm run start`

This will start a webpack dev-server that will be available on localhost:3000

### Deployment

Site is deployed on github pages from the gh-pages branch.

To redeploy:

```git checkout gh-pages
git merge main
npm run build
git add .
git commit -m "Builds latest version"
git push origin gh-pages
git checkout main
```
