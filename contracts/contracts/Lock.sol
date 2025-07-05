// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.28;

/// @title VibeReview - Side Event Review Contract for DevConnect (or any major event)
contract VibeReview {
    address payable public owner;

    struct Review {
        address reviewer;
        uint256 eventId;
        uint8 score; // 1 to 5
        string comment;
        uint256 timestamp;
    }

    // Event ID => list of reviews
    mapping(uint256 => Review[]) public reviewsByEvent;

    // Reviewer => eventId => true/false (to avoid duplicates)
    mapping(address => mapping(uint256 => bool)) public hasReviewed;

    // User => eventId => true if checked in
    mapping(address => mapping(uint256 => bool)) public checkedIn;

    // Aggregate data
    mapping(uint256 => uint256) public totalScores; // total sum of scores per event
    mapping(uint256 => uint256) public reviewCounts; // total number of reviews per event

    event ReviewSubmitted(address indexed reviewer, uint256 indexed eventId, uint8 score, string comment);
    event CheckIn(address indexed user, uint256 indexed eventId, uint256 timestamp);
    event Withdrawal(uint amount, uint when);

    constructor() payable {
        owner = payable(msg.sender);
    }

    /// @notice Check-in to a side event
    /// @dev Prevents duplicate check-ins
    function checkIn(uint256 _eventId) external {
        require(!checkedIn[msg.sender][_eventId], "Already checked in");

        // Optional future validation with SNFT or proof

        checkedIn[msg.sender][_eventId] = true;

        emit CheckIn(msg.sender, _eventId, block.timestamp);
    }

    /// @notice Submit a review for a side event
    /// @dev Only allowed after check-in; prevents duplicates
    function submitReview(uint256 _eventId, uint8 _score, string memory _comment) external {
        require(_score >= 1 && _score <= 5, "Score must be between 1 and 5");
        require(!hasReviewed[msg.sender][_eventId], "Already reviewed this event");
        require(checkedIn[msg.sender][_eventId], "Must check in before reviewing");

        reviewsByEvent[_eventId].push(
            Review({
                reviewer: msg.sender,
                eventId: _eventId,
                score: _score,
                comment: _comment,
                timestamp: block.timestamp
            })
        );
        hasReviewed[msg.sender][_eventId] = true;
        totalScores[_eventId] += _score;
        reviewCounts[_eventId]++;

        emit ReviewSubmitted(msg.sender, _eventId, _score, _comment);
    }

    /// @notice Get average score for a side event
    function getAverageScore(uint256 _eventId) external view returns (uint256) {
        if (reviewCounts[_eventId] == 0) {
            return 0;
        }
        return totalScores[_eventId] / reviewCounts[_eventId];
    }
}