# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
Have used the following function 
getCandidateFromEvent // This method will get the candidate key from the event if present. Now this function is only doing one thing i.e. getting candidate

updateCandidate // We are updating the candidate key to trivial partition key if not present or type casting it to string if present but not a string

updateCandidateToString // updating the candidate key to return it as a string

checkIfCandidateLengthExceedsLimit  // checking if length of candidate it greater than limit of not

hashCandidate //  hashing the candidate key

hashCandidateIfLimitExceeded // checking if hashing candidate key is required or not and if required calling the function to hash it

The logic behind the break down is to limit the functionality to each function to do one thing at  a time. (single responsibility principle)
With the above changes if we want to make the changes tomorrow to any particular logic we won't have to test all the function but only the changes to that particular function also the rest of the function wont be needed to touch (open-close principal)
