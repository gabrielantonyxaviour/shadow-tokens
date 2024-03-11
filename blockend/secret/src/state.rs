use secret_toolkit::storage::Item;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use secp256k1::{PublicKey, SecretKey};
#[derive(Serialize, Deserialize)]
pub struct MyMessage {
    pub sender: String,
    pub message: String,
}
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct Asset {
    pub token_address: String,
    pub token_id: u64,
    pub total_fractions: u128,
    pub price_per_fraction: u128,
    pub available_fractions: u128,
    pub owner_pub_key: PublicKey,
}

pub struct Assets {
    pub assets: Vec<Asset>
}

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct Listing {
    pub asset_id: String,
    pub fractions: u128,
    pub total_price: u128,
    pub active_time: u64
}

pub struct Listings {
    pub listings: Vec<Listing>
}

pub const STORED_MESSAGE: Item<MyMessage> = Item::new(b"stored_message");
pub const LISTING_COUNT: Item<u128> = Item::new(b"listing_count");
pub const ASSET_COUNT: Item<u128> = Item::new(b"asset_count");
pub const LISTINGS: Item<Listings> = Item::new(b"listings");
pub const ASSETS: Item<Assets> = Item::new(b"assets");

