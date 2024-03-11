use cosmos_sdk_proto::tendermint::mempool::message;
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
};
use tiny_keccak::Keccak;
pub use secp256k1::constants::{COMPACT_SIGNATURE_SIZE as SIGNATURE_SIZE, MESSAGE_SIZE, UNCOMPRESSED_PUBLIC_KEY_SIZE};
use secp256k1::ecdsa::Signature as SecpSignature;

use crate::{
    errors::CustomContractError,
    msg::{ExecuteMsg, Fee, GetStoredMessageResp, InstantiateMsg, QueryMsg},
};

use crate::msg::QueryMsg::GetStoredMessage;

use crate::state::*;

use ethabi::{decode, encode, ParamType, Token};
use hex;
use prost::Message;
use serde_json_wasm::to_string;

use crate::msg::GmpMessage;

#[entry_point]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> StdResult<Response> {
    Ok(Response::default())
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, CustomContractError> {
    match msg {
        ExecuteMsg::SendFractions {
            destination_chain,
            destination_address,
            asset_id,
            fractions,
            hash_data,
            signature,
            pub_key,
        } => try_send_fractions_to_evm(
            deps,
            env,
            info,
            destination_chain,
            destination_address,
            asset_id,
            fractions,
            hash_data,
            signature,
            pub_key,
        ),
        ExecuteMsg::FractionalizeNft {
            source_chain,
            source_address,
            payload,
        } => try_fractionalize_nft(deps, source_chain, source_address, payload),
        ExecuteMsg::TransferFractionsToEvm {
            source_chain, 
            source_address,
            payload,
        } => try_send_fractions_to_evm(deps, source_chain, source_address, payload),
        ExecuteMsg::ListFractions { asset_id, fractions, total_price, active_time, signature, pub_key }
    }
}



pub fn send_message_evm(
    _deps: DepsMut,
    env: Env,
    info: MessageInfo,
    destination_chain: String,
    destination_address: String,
    message: String,
) -> Result<Response, CustomContractError> {
    // Message payload to be received by the destination
    let message_payload = encode(&vec![
        Token::String(info.sender.to_string()),
        Token::Uint(10),
    ]);

    let coin = &info.funds[0];

    let my_coin = crate::ibc::Coin {
        denom: coin.denom.clone(),
        amount: coin.amount.clone().to_string(),
    };

    let gmp_message: GmpMessage = GmpMessage {
        destination_chain,
        destination_address,
        payload: message_payload.to_vec(),
        type_: 1,
        fee: Some(Fee {
            amount: coin.amount.clone().to_string(), // Make sure to handle amounts accurately
            recipient: "axelar1aythygn6z5thymj6tmzfwekzh05ewg3l7d6y89".to_string(),
        }),
    };

    let memo = to_string(&gmp_message).unwrap();

    let ibc_message = crate::ibc::MsgTransfer {
        source_port: "transfer".to_string(),
        source_channel: "channel-3".to_string(), // Testnet Osmosis to axelarnet: https://docs.axelar.dev/resources/testnet#ibc-channels
        token: Some(my_coin.into()),
        sender: env.contract.address.to_string(),
        receiver: "axelar1dv4u5k73pzqrxlzujxg3qp8kvc3pje7jtdvu72npnt5zhq05ejcsn5qme5".to_string(),
        timeout_height: None,
        timeout_timestamp: env.block.time.plus_seconds(604_800u64).nanos(),
        memo: memo,
    };

    let cosmos_msg = cosmwasm_std::CosmosMsg::Stargate {
        type_url: "/ibc.applications.transfer.v1.MsgTransfer".to_string(),
        value: Binary(ibc_message.encode_to_vec()),
    };

    Ok(Response::new().add_message(cosmos_msg))
}

pub fn receive_message_evm(
    deps: DepsMut,
    _source_chain: String,
    _source_address: String,
    payload: Binary,
) -> Result<Response, CustomContractError> {
    
    // decode the payload
    // executeMsgPayload: [sender, message]
    let decoded = decode(
        &vec![ParamType::Address, ParamType::Uint(256), ParamType::Uint(256), ParamType::Address],
        payload.as_slice(),
    )
    .unwrap();

    Ok(Response::new())
}


pub fn try_fractionalize_nft(deps: Deps, _env: Env, msg: QueryMsg) {

}

pub fn try_send_fractions_to_evm( _deps: DepsMut,
    env: Env,
    info: MessageInfo,
    destination_chain: String,
    destination_address: String,
    asset_id: usize,
    fractions: u128,
    hash_data: Vec<u8>, 
    signature: Vec<u8>,
    pub_key: Vec<u8>,
    ) {
    let user_address = public_key_to_address(pub_key);
    
    let mut assets: Item<Assets> = ASSETS
      .load(deps.storage)
      .unwrap_or(Assets {
          assets: Vec::new(),
      });

    let asset=assets.assets.get(asset_id).unwrap();
    let owner_address = asset.owner_address;

    assert_eq!(user_address, owner_address,"Public key does not match the owner of the asset");

    assert!(validate_signature(public_key, hash_data, signature),"Invalid signature");

    let message_payload: Vec<u8> = encode(&vec![
        Token::Address(asset.token_address),
        Token::Uint(asset.token_id),
        Token::Uint(fractions),
        Token::Address(asset.owner_address),
    ]);

    let coin = &info.funds[0];

    let my_coin = crate::ibc::Coin {
        denom: coin.denom.clone(),
        amount: coin.amount.clone().to_string(),
    };

    let gmp_message: GmpMessage = GmpMessage {
        destination_chain,
        destination_address,
        payload: message_payload.to_vec(),
        type_: 1,
        fee: Some(Fee {
            amount: coin.amount.clone().to_string(), // Make sure to handle amounts accurately
            recipient: "axelar1aythygn6z5thymj6tmzfwekzh05ewg3l7d6y89".to_string(),
        }),
    };

    let memo = to_string(&gmp_message).unwrap();

    let ibc_message = crate::ibc::MsgTransfer {
        source_port: "transfer".to_string(),
        source_channel: "channel-3".to_string(), // Testnet Osmosis to axelarnet: https://docs.axelar.dev/resources/testnet#ibc-channels
        token: Some(my_coin.into()),
        sender: env.contract.address.to_string(),
        receiver: "axelar1dv4u5k73pzqrxlzujxg3qp8kvc3pje7jtdvu72npnt5zhq05ejcsn5qme5".to_string(),
        timeout_height: None,
        timeout_timestamp: env.block.time.plus_seconds(604_800u64).nanos(),
        memo: memo,
    };

    let cosmos_msg = cosmwasm_std::CosmosMsg::Stargate {
        type_url: "/ibc.applications.transfer.v1.MsgTransfer".to_string(),
        value: Binary(ibc_message.encode_to_vec()),
    };

    Ok(Response::new().add_message(cosmos_msg))
}

pub fn try_receive_fractions_from_evm(deps: Deps, _env: Env, msg: QueryMsg) {
    
}

pub fn try_list_fractions(deps: Deps, _env: Env, msg: QueryMsg) {
    
}


#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        GetStoredMessage {} => to_binary(&get_stored_message(deps)?),

    }
}

pub fn get_stored_message(deps: Deps) -> StdResult<GetStoredMessageResp> {
    let message = STORED_MESSAGE.may_load(deps.storage).unwrap().unwrap();
    let resp = GetStoredMessageResp {
        sender: message.sender,
        message: message.message,
    };
    Ok(resp)
}


fn public_key_to_address(public_key: Vec<u8>) -> [u8; 20] {
    let mut hasher = Keccak::v256();
    let mut hash = [0u8; 32];
    let mut address = [0u8; 20];

    // Calculate Keccak-256 hash of the public key
    hasher.update(&public_key);
    hasher.finalize(&mut hash);

    // Take the last 20 bytes of the hash as the address
    address.copy_from_slice(&hash[12..32]);

    address
}

fn validate_signature(public_key: Vec<u8>, message: Vec<u8>, signature: Vec<u8>) -> bool {
    let secp = Secp256k1::new();
    let public_key = PublicKey::from_slice(&public_key).unwrap();
    let message = Message::from_slice(&message).unwrap();
    let signature = Signature::from_compact(&signature).unwrap();

    secp.verify(&message, &signature, &public_key).is_ok()
}
