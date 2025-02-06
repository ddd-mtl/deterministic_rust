
use hdk::prelude::*;


/// Returns number of seconds since UNIX_EPOCH
pub fn now() -> u64 {
    let now = sys_time().expect("sys_time() should always work");
    now.as_seconds_and_nanos().0 as u64
}