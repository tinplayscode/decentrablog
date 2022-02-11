use std::collections::HashSet;

use near_sdk::{serde::{Serialize, Deserialize}, AccountId};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};

use crate::{PostId, donation::DonationLog};

/// Implements both `serde` and `borsh` serialization.
/// `serde` is typically useful when returning a struct in JSON format for a frontend.
#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Post {
    post_id: usize,
    title: String,
    body: String,
    author: AccountId,
    created_at: u64,
    comments: Vec<usize>,

    upvotes: HashSet<AccountId>,
    downvotes: HashSet<AccountId>,
    
    donation_logs: Vec<DonationLog>,
}

impl Post {
    pub fn new(post_id: usize, title: String, body: String, author: AccountId, created_at: u64) -> Self {
        Self {
            post_id,
            title,
            body,
            author,
            created_at,
            comments: Vec::new(),

            upvotes: HashSet::new(),
            downvotes: HashSet::new(),

            donation_logs: Vec::new(),
        }
    }
    
    pub fn add_comment(&mut self, comment_id: usize) {
        self.comments.push(comment_id);
    }

    pub fn add_upvote(&mut self, account_id: AccountId) -> bool {
        //check if there is downvote, if so remove it
        if self.downvotes.contains(&account_id) {
            self.downvotes.retain(|x| *x != account_id);
        }

        self.upvotes.insert(account_id)
    }

    pub fn remove_upvote(&mut self, account_id: AccountId) -> bool {
        self.upvotes.remove(&account_id)
    }

    pub fn add_downvote(&mut self, account_id: AccountId) -> bool {
        //check if there is upvote, if so remove it
        if self.upvotes.contains(&account_id) {
            self.upvotes.retain(|x| *x != account_id);
        }

        self.downvotes.insert(account_id)
    }

    pub fn remove_downvote(&mut self, account_id: AccountId) -> bool {
        self.downvotes.remove(&account_id)
    }

    pub fn get_points(&self) -> usize {
        self.upvotes.len() - self.downvotes.len()
    }

    pub fn get_title(&self) -> String {
        self.title.clone()
    }

    pub fn get_post_id(&self) -> PostId {
        self.post_id
    }

    pub fn get_author(&self) -> AccountId {
        self.author.clone()
    }

    pub fn get_comments(&self) -> Vec<usize> {
        self.comments.clone()
    }

    pub fn remove_comment(&mut self, comment_id: usize) -> bool {
        //return false if comment_id is not found
        if let Some(index) = self.comments.iter().position(|&x| x == comment_id) {
            self.comments.remove(index);
            return true;
        }
        false
    }

    pub fn add_donation_logs(&mut self, donation_log: DonationLog) {
        self.donation_logs.push(donation_log);
    }

    pub fn get_upvotes(&self) -> HashSet<AccountId> {
        self.upvotes.clone()
    }

    pub fn get_downvotes(&self) -> HashSet<AccountId> {
        self.downvotes.clone()
    }

    pub fn get_total_donation(&self) -> u128 {
        self.donation_logs.iter().map(|x| x.get_amount()).sum()
    }

    pub fn get_body(&self) -> String {
        self.body.clone()
    }
}
