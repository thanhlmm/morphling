//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Morphling is Ownable {
    uint256 public bonus_percent;
    mapping (address => uint256) cover_tokens;
    address[] cover_tokens_address;
    uint256 private cover_pool_total;
    mapping (address => uint256) staking_pool;
    uint256 private staking_pool_total = 0;
    uint256 private staking_pool_fee_total = 0; // Store chargeable pool
    uint256 private reward_bnb_total;
    uint256 private reward_token_total;
    IERC20 reward_token;

    uint8 private state = 1; // 1.funding, 2.locking, 3.reward, 4.claim_cover
    uint32 private ROUND = 1000000;
    uint256 public min_free;

    modifier atStage(uint8 _stage) {
        require(state == _stage, "Required state");
        _;
    }

    constructor(uint256 _bonus_percent, uint256 _min_free, address _reward_token) {
        console.log("Deploying Morphling");
        bonus_percent = _bonus_percent;
        min_free = _min_free;

        // TODO: Maybe we can delay to put reward address
        reward_token = IERC20(_reward_token);
    }

    function get_state() public view returns (uint8) {
        return state;
    }

    function update_status(uint8 _next_state) public onlyOwner {
        // TODO: Verify owner of this contract
        // TODO: Verify next state
        if (_next_state == 2) {
            require(state == 1, "Last state must be Funding (1)");
            // require(staking_pool_total > 0 && cover_pool_total > 0, "Cover pool & BNB pool must have value");
            state = _next_state;
        }

        if (_next_state == 3) {
            require(state == 2 || state == 1, "Last state must be Locking (2)");
            require(reward_bnb_total > 0, "BNB reward pool must have value");
            require(reward_token_total > 0, "BNB reward pool must have value");
            state = _next_state;
        }

        if (_next_state == 4) {
            // TODO: Only transform to this state after a time
        }
    }

    /**
        Funding step
    */
    function get_total_fund() public view returns (uint256) {
        return staking_pool_total;
    }

    function get_user_share(address _user) public view returns (uint256) {
        console.log("user_share", staking_pool[_user], get_total_fund());
        uint256 user_share = staking_pool[_user] * ROUND / staking_pool_total;

        return user_share;
    }

    function get_my_staking(address _user) public view returns (uint256) {
        return staking_pool[_user];
    }

    function deposit_fund() payable public atStage(1) {
        // DONE: What if deposit 2 time. 1st time below FEE baseline and 2nd time large than FEE baseline
        if (staking_pool[msg.sender] > min_free) {
            // TODO: Optimize by store in memory var
            staking_pool_fee_total -= staking_pool[msg.sender];
        }
        
        staking_pool[msg.sender] += msg.value;
        staking_pool_total += msg.value;

        if (staking_pool[msg.sender] > min_free) {
            staking_pool_fee_total += staking_pool[msg.sender];
        }
    }

    function withdraw_bnb(uint256 _amount) payable public atStage(1) {
        require(state == 1, "Only withdrawable in Funding phase");
        require(_amount <= staking_pool[msg.sender], "out of amount");

        if (staking_pool[msg.sender] > min_free) {
            staking_pool_fee_total -= staking_pool[msg.sender];
        }
        staking_pool[msg.sender] -= _amount;
        staking_pool_total -= _amount;

        if (staking_pool[msg.sender] > min_free) {
            staking_pool_fee_total += staking_pool[msg.sender];
        }

        address payable recipient = payable(msg.sender);
        recipient.transfer(_amount);
    }

    function deposit_cover(address _token_address, uint256 _amount) payable public onlyOwner atStage(1) {
        IERC20 cover_token = IERC20(_token_address);
        uint256 tokenBalance = cover_token.balanceOf(msg.sender);
        require(_amount <= tokenBalance, "balance is low");
        require(_amount > 0, "Missing amount");

        cover_token.transferFrom(msg.sender, address(this), _amount);
        if (cover_tokens[_token_address] <= 0) {
            cover_tokens_address.push(_token_address);
        }
        cover_tokens[_token_address] += _amount;
    }

    function get_cover_token_address() public view returns (address[] memory) {
        return cover_tokens_address;
    }

    /**
        Locking step
    */
    function withdraw_fund(address payable _to) public onlyOwner atStage(2) {
        // DONE: Check only withdraw 1 time. It only withdrawable if have enough fund
        // staking_pool_total = 0;
        bool sent = _to.send(staking_pool_total);
        require(sent, "Failed to send BNB");
    }

    /**
        Reward step
    */
    function get_total_reward_bnb() public view returns (uint256) {
        return reward_bnb_total;
    }

    function get_total_reward_token() public view returns (uint256) {
        return reward_token_total;
    }

    function deposit_reward_bnb() payable public atStage(2) {
        // TODO: Remove me
        reward_bnb_total += msg.value;
    }

    function deposit_reward_token(uint256 _amount) payable public onlyOwner atStage(2) {
        uint256 tokenBalance = reward_token.balanceOf(msg.sender);
        require(_amount <= tokenBalance, "balance is low");
        reward_token.transferFrom(msg.sender, address(this), _amount);

        reward_bnb_total += msg.value;
        reward_token_total += _amount;
    }

    function get_reward_bnb(address _address) public view returns (uint256) {
        uint256 share = get_user_share(_address);
        return (reward_bnb_total * share) / ROUND;
    }

    function get_reward_token(address _address) public view returns (uint256) {
        uint256 share = get_user_share(_address);
        uint256 fee = 0;
        console.log("User staking", staking_pool[_address], min_free);
        if (staking_pool[_address] > min_free) {
            // Charge extra fee if user stack higher than min_free
            console.log("Charge fee");
            fee = bonus_percent;
        }

        return ((reward_token_total * share) / ROUND)*(100 - fee) / 100; // TODO: Fix this to more accuracy percent
    }

    function widthdraw_reward() public atStage(3) {
        require(staking_pool[msg.sender] > 0, "You dont have BNB to withdraw");
        address payable recipient = payable(msg.sender);

        // Withdraw BNB
        bool sent = recipient.send(get_reward_bnb(msg.sender));
        require(sent, "Failed to send BNB");

        // Withdraw Token
        bool sentToken = reward_token.transfer(msg.sender, get_reward_token(msg.sender));
        require(sentToken, "Failed to send Token");

        staking_pool[msg.sender] = 0;
    }

    function get_staking_pool_fee_total() public view returns (uint256) {
        return staking_pool_fee_total;
    }

    function withdraw_reward_bonus() payable public onlyOwner atStage(3) {
        require(staking_pool_fee_total > 0, "The bonus pool is over");

        bool sentToken = reward_token.transfer(msg.sender, staking_pool_fee_total * bonus_percent / 100 );
        require(sentToken, "Failed to send Token");
        staking_pool_fee_total = 0;
    }

    /**
        Claim cover step
    */

    function request_cover() public {
        // Only withdraw if more than 1/2 people approve and 1/2 of funding amount is requested to claim


        // if (_next_state == 4) {
        //     // TODO: What if users get all reward then trying to claim fund
        //     require(reward_bnb_total == 0, "BNB reward pool must empty");
        //     require(reward_token_total == 0, "BNB reward pool must empty");
        // }

    }

    function withdraw_cover(address _token_address) public onlyOwner {
        require(state == 3, "Only withdraw cover in Reward phase");
        IERC20 cover_token = IERC20(_token_address);
        cover_token.transfer(owner(), cover_tokens[_token_address]);
        // TODO: What if it send more than the token available
        cover_tokens[_token_address] = 0;
    }
}
