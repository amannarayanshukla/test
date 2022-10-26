const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {

  let candidate;

  candidate = getCandidateFromEvent(event);
  candidate = updateCandidate(candidate);
  return  hashCandidateIfLimitExceeded(candidate);

};

getCandidateFromEvent = (event) => {
  if (!event) {
      return null;
  }
  if(!event.partitionKey) {
    const data = JSON.stringify(event);
    return hashCandidate(data);
  }
    return event.partitionKey;
}

updateCandidate = (candidate) => {
  const TRIVIAL_PARTITION_KEY = "0";
  if(!candidate) {
    return TRIVIAL_PARTITION_KEY;
  }
  return updateCandidateToString(candidate);
}

updateCandidateToString = (candidate) => {
  if (typeof candidate !== "string") {
    return JSON.stringify(candidate);
  }
  return candidate;
}

checkIfCandidateLengthExceedsLimit = (candidate) => {
  const MAX_PARTITION_KEY_LENGTH = 256;
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return true;
  }
  return false;
}

hashCandidate= (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

hashCandidateIfLimitExceeded = (candidate) => {
  const isHashingRequired = checkIfCandidateLengthExceedsLimit(candidate);
  return isHashingRequired ? hashCandidate : candidate;
}
