"use strict";

const API_URL =
  location.host === "tradememe.club"
    ? "https://api.tradememe.club"
    : "http://localhost:8080";
let auctions = [];

function loadApp() {
  getListings().then((data) => {
    auctions = data;
    const listingsHtml = data
      .map((auction) =>
        generateListing(auction._id, auction.title, 1, auction.image)
      )
      .join("");
    document.getElementById("listings").innerHTML = listingsHtml;
  });
}

function handleSearchChange(search) {
  const matchedAuctions = auctions.filter((auction) =>
    auction.title.includes(search)
  );
  const filteredListingsHtml = matchedAuctions
    .map((auction) =>
      generateListing(auction._id, auction.title, 1, auction.image)
    )
    .join("");
  document.getElementById("listings").innerHTML = filteredListingsHtml;
}

async function getListings() {
  const res = await fetch(`${API_URL}/auctions`);
  const data = await res.json();
  return data.auctions;
}

function incrementBid(elementId) {
  const currentBid = document.getElementById(elementId).innerText;
  document.getElementById(elementId).innerText = parseInt(currentBid) + 1;
  new Audio("./monies.mp3").play();
}

function generateListing(id, title, currentBid, image) {
  return `
        <div class="listing">
            <img class="photo" src="${image}" />
            <div class="details-container">
                <div class="details">
                    <div class="left-content">
                        <div class="end-time">Closing in 2 days</div>
                        <div class="title">${title}</div>
                    </div>
                    <div class="price"><b>$<span id="current-bid-${id}">${currentBid}</span></b></div>
                </div>
                <button class="bid-button" onclick="incrementBid('current-bid-${id}')">Place bid</button>
            </div>
        </div>
    `;
}

async function submitMeme(e) {
  e.preventDefault();
  var name = document.getElementById("meme-name").value;
  var imagememe = document.getElementById("meme-image").value;
  //   var price = document.getElementById("meme-price").value;

  const res = await fetch(`${API_URL}/auctions`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "appication/json",
    },
    body: JSON.stringify({ auction: { title: name, image: imagememe } }),
  });

  const data = await res.json();
}
