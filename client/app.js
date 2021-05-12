'use strict'

let auctions = [];

function loadApp() {
    console.log(generateListing('Test', 100))
    getListings().then((data) => {
        auctions = data;
        const listingsHtml = data.map(auction => generateListing(auction.title, 1, auction.image)).join('')
        document.getElementById('listings').innerHTML = listingsHtml;
    })
}

function handleSearchChange(search) {
    const matchedAuctions = auctions.filter(auction => auction.title.includes(search));
    const filteredListingsHtml = matchedAuctions.map(auction => generateListing(auction.title, 1, auction.image)).join('')
    document.getElementById('listings').innerHTML = filteredListingsHtml;
}


async function getListings() {
    const res = await fetch('http://localhost:8080/auctions');
    const data = await res.json();
    return data.auctions;
}

function generateListing(title, currentBid, image) {
    return `
        <div class="listing">
            <img class="photo" src="${image}" />
            <div class="details-container">
                <div class="details">
                    <div class="left-content">
                        <div class="end-time">Closing in 2 days</div>
                        <div class="title">${title}</div>
                    </div>
                    <div class="price"><b>$${currentBid}</b></div>
                </div>
                <button class="bid-button">Place bid</button>
            </div>
        </div>
    `;
}