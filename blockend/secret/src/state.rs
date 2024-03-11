use secret_toolkit::storage::Item;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use secp256k1::{PublicKey, SecretKey};
#[derive(Serialize, Deserialize)]
pub struct MyMessage {
    pub sender: String,
    pub message: String,
}

pub struct Asset {
    pub token_address: String,
    pub token_id: u64,
    pub total_fractions: u128,
    pub price_per_fraction: u128,
    pub available_fractions: u128,
    pub owner_pub_key: PublicKey,
}

pub struct Listing {
    pub asset_id: String,
    pub fractions: u128,
    pub total_price: u128,
    pub active_time: u64
}

pub const STORED_MESSAGE: Item<MyMessage> = Item::new(b"stored_message");
