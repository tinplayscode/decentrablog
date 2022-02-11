use near_sdk::AccountId;
use near_sdk::serde::{Serialize, Deserialize};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct DonationLog {
    donation_id: usize,
    amount: u128,
    donor: AccountId,
    created_at: u64,
    message: String,
    post_id: usize,
}

impl DonationLog {
    pub fn new(donation_id: usize, amount: u128, donor: AccountId, created_at: u64, message: String, post_id: usize) -> Self {
        Self {
            donation_id,
            amount,
            donor,
            created_at,
            message,
            post_id,
        }
    }

    pub fn get_amount(&self) -> u128 {
        self.amount
    }
}