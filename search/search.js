const Document = require('../models/Document')
const randomDocGenerator = require('random-object-generator')
const elasticlunr = require('elasticlunr')

const generateDocuments = (numberOfDocuments) => {
    let documents = [];

    for(let i=0; i < numberOfDocuments; i++) {
        var document = randomDocGenerator.randomObject(new Document());
        documents.push(document)
    }

    return documents;
}

const buildIndex = () => {
    let index = elasticlunr(function() {
        this.addField('title')
        this.addField('description')
        this.addField('slug')
        this.addField('date')
    });

    let documents = generateDocuments(100);

    for(const doc of documents) {
        index.addDoc(doc)
    }

    return index;
}

const search = async(searchQuery) => {
    const index = buildIndex();

    const result = await index.search(searchQuery)
    .map(({ ref }) => index.documentStore.getDoc(ref));

    return result;
}

module.exports = search;