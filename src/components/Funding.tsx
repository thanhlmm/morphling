const Funding = () => {
  return (
    <div className="flex justify-center">
      <div className="border flex">
        <div className="flex flex-col">
          <div className="stats border-base-300 items-start">
            <div className="stat">
              <div className="stat-title">Cover balance</div>
              <div className="stat-value">$89,400</div>
              <div className="stat-actions space-x-2">
                <button className="btn btn-sm btn-primary">Add funds</button>
                <button className="btn btn-sm btn-success">Claim</button>
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Current staking</div>
              <div className="stat-value">829,400 BNB</div>
              <div className="stat-actions space-x-2">
                <a className="btn btn-sm btn-primary" href="#deposit-bnb">Deposit</a>
                <a className="btn btn-sm btn-success" href="#withdraw-bnb">Withdraw</a>
              </div>
            </div>
          </div>
          <hr />
          <div className="stats border-base-300 py-4 flex flex-col">
            <div className="stat-value text-primary ml-6">Reward pool 🎉</div>
            <div className="">
              <div className="flex flex-row">
                <div className="stat">
                  <div className="stat-title">Lazio</div>
                  <div className="stat-value">400</div>
                </div>
                <div className="stat">
                  <div className="stat-title">BNB</div>
                  <div className="stat-value">89,400</div>
                </div>
              </div>
            </div>
            <div className="stat-actions space-x-2 ml-6">
              <button className="btn btn-primary">Get reward</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="stat">
            <div className="stat-title">Risk ratio</div>
            <div className="stat-value">0.42</div>
            <div className="stat-desc text-info">Total staking pool / Cover balance</div>
            <div className="stat-actions max-w-md whitespace-normal">
              <p>When issue happends, the cover turns into claimable to cover the risk</p>
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Your share</div>
            <div className="stat-value">4.2%</div>
            <div className="stat-actions max-w-md whitespace-normal">
              <p>Your share in staking pool. The reward will returns based on this share</p>
            </div>
          </div>
        </div>
      </div>

      <div id="deposit-bnb" className="modal">
        <div className="modal-box">
          <div className="form-control">
            <label className="label">
              <span className="label-text">BNB Amount</span>
            </label>
            <div className="relative">
              <input type="number" placeholder="0" className="w-full pr-16 input input-primary input-bordered border border-primary" />
              <button className="absolute top-0 right-0 rounded-l-none btn btn-primary">max</button>
            </div>

            <input type="range" max="100" value="50" className="range range-primary" />
          </div>
          <div className="modal-action">
            <button className="btn btn-sm btn-primary">Accept</button>
            <a href="#" className="btn btn-sm">Close</a>
          </div>
        </div>
      </div>

      <div id="withdraw-bnb" className="modal">
        <div className="modal-box">
          <div className="form-control">
            <label className="label">
              <span className="label-text">BNB Amount</span>
            </label>
            <div className="relative">
              <input type="number" placeholder="0" className="w-full pr-16 input input-primary input-bordered border border-primary" />
              <button className="absolute top-0 right-0 rounded-l-none btn btn-primary">max</button>
            </div>

            <input type="range" max="100" value="50" className="range range-primary" />
          </div>
          <div className="modal-action">
            <button className="btn btn-sm btn-primary">Accept</button>
            <a href="#" className="btn btn-sm">Close</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Funding;