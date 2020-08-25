# [CellO Viewer](https://uwgraphics.github.io/CellNetworkViewer/) ![License](https://img.shields.io/badge/License-BSD%203--Clause-green.svg)

## Description

[CellO](https://github.com/deweylab/CellO) is a tool for classifying [single-cell](https://en.wikipedia.org/wiki/Single_cell_sequencing) [RNA-seq](https://en.wikipedia.org/wiki/RNA-Seq) data against the graph-structured [Cell Ontology](http://www.obofoundry.org/ontology/cl.html).  Each cell type in the Cell Ontology is associated with a binary classifier for classifying cells for the given cell type. These binary classifiers are [linear models](https://en.wikipedia.org/wiki/Generalized_linear_model) and thus, each gene's coefficient provides a description of the gene's importance for classifying the given cell type.  The CellO Viewer is a web application for exploring these gene-wise model coefficients across the Cell Ontology.  Each model's largest coefficients can be interpreted as a cell type-specific expression signature.

For more details, see the manuscript: [Bernstein, M.N., Ma, J., Gleicher, M., Dewey, C.N. (2020).CellO: Comprehensive and hierarchical cell type classification of human cellswith the Cell Ontology. bioRxiv](https://www.biorxiv.org/content/10.1101/634097v2)

## Project setup
```
cd client
npm install
```
**Note**: all the frontend files are in the `client` folder, make sure you go into the `client` folder by `cd client` before doing anything npm related.

## Run a local development server

To run a local server for testing the website, run the following command:

```
npm run serve
```

## Deploying to production

To deploy the website, run the following commands:

```
cd client
npm run build
bash deploy.sh
```

The ``np run build`` command will compile the website. Github Pages requires that the website's files be located in the ``docs`` directory.  The command  ``bash deploy.sh`` copies the relevant files from ``client/dist`` (i.e. the location where the compiled files are written to by npm) to ``docs``.  Once the ``docs`` directory stores the latest version of the website, pushing the code to Github will trigger Github Pages to serve the new website. 

## Lints and fixes files

```
npm run lint
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## License

CellO Viewer is [BSD 3-clause licensed](./LICENSE).
