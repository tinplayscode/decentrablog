use near_sdk::{serde::{Serialize, Deserialize}, AccountId};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};

use crate::CommentId;

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Comment {
    comment_id: usize,
    body: String,
    author: AccountId,
    created_at: u64,
}

impl Comment {
    pub fn new(comment_id: usize, body: String, author: AccountId, created_at: u64) -> Self {
        Self {
            comment_id,
            body,
            author,
            created_at,
        }
    }

    pub fn get_comment_id(&self) -> CommentId {
        self.comment_id
    }

    pub fn get_body(&self) -> String {
        self.body.clone()
    }
}