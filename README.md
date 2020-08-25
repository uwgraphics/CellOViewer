# [CellO Viewer](https://uwgraphics.github.io/CellNetworkViewer/) ![License](https://img.shields.io/badge/License-BSD%203--Clause-green.svg)

## Description
Explore gene expression across the Cell Ontology.

## Project setup
```
cd client
npm install
```
**Note**: all the frontend files are in the `client` folder, make sure you go into the `client` folder by `cd client` before doing anything npm related.

### Compiles and hot-reloads for development, AKA start the app
```
npm run serve
```

### Deployment

To deploy the website, run the following commands:

```
cd client
npm run build
bash deploy.sh
```

The ``np run build`` command will compile the website. Github Pages requires that the website's files be located in the ``docs`` directory.  The command  ``bash deploy.sh`` copies the relevant files from ``client/dist`` (i.e. the location where the compiled files are written to by npm) to ``docs``.  Once the ``docs`` directory stores the latest version of the website, pushing the code to Github will trigger Github Pages to serve the new website. 

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Usage
Coming soon.

## License

CellO Viewer is [BSD 3-clause licensed](./LICENSE).
