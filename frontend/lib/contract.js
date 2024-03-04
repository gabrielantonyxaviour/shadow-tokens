import abiJSON from "./ABI.json";
import { ethers } from "ethers";
let accounts;
let myContract;

export async function connectContract(ethereum) {
  const contractAddress = "0x2354f6aB9e621ef46F1eE4E8ef7Ef2B03F03BD64";
  const contractABI = abiJSON.abi;
  let NFTContract;

  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      console.log(signer)
      NFTContract = new ethers.Contract(contractAddress, contractABI, signer);
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
  console.log(NFTContract);
  return NFTContract;
}

async function totalNFTsMinted() {
  await myContract.methods.currentTokenId().call(function (err, res) {
    if (!err) {
      console.log(res);
      document.getElementById("totalNFTs").innerHTML =
        "Total NFTs Minted : " + res;
    }
  });
}

async function GetNFT() {
  let tokenId = document.getElementById("tokenId").value;

  await myContract.methods.tokenURI(tokenId).call(async function (err, res) {
    if (!err) {
      console.log(res);
      JSONResponse = await httpGet(res);
      JSONResponse = JSON.parse(JSONResponse);
      console.log(JSONResponse);
      document.getElementById("nftpng").src = JSONResponse["image"];
      document.getElementById("nftname").innerHTML =
        "Name : " + JSONResponse["name"];
      getNFTOwner(tokenId);
    } else {
      console.log(err);
    }
  });
}

async function getNFTOwner(_tokenId) {
  await myContract.methods.ownerOf(_tokenId).call(function (err, res) {
    if (!err) {
      console.log(res);
      document.getElementById("nftowner").innerHTML = "Owner : " + res;
    }
  });
}

async function MintNFT(_tokenId) {
  await myContract.methods
    .mintNFT()
    .send({ from: accounts[0] }, function (err, res) {
      if (!err) {
        console.log(res);
      } else {
        console.log(err);
      }
    });
}

async function TransferNFT(_tokenId) {
  let toAddress = document.getElementById("toAddress").value;
  let tokenId = document.getElementById("tokenId").value;
  await myContract.methods
    .transferFrom(accounts[0], toAddress, tokenId)
    .send({ from: accounts[0] }, function (err, res) {
      if (!err) {
        console.log(res);
      } else {
        console.log(err);
      }
    });
}

function httpGet(theUrl) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}
