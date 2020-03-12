const fetch = require('node-fetch');



const makeRequest = async(query) => {
    const request = await fetch(`http://localhost:3000/search/${query}`);
    const data = await request.json();

    console.log(data);
}

makeRequest("d");