import { Web3ReactProvider } from "@web3-react/core";

import Demo, { getLibrary } from "../components/Demo";

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="container min-h-screen mx-auto">
        <Demo />
      </div>
      <footer className="p-10 footer bg-base-200 text-base-content">
        <div>
          <p>
            Morphling
            <br />
            Built with ❤️ from{" "}
            <a className="link" href="https://thanhle.blog">
              Thanh Le
            </a>
          </p>
        </div>
      </footer>
    </Web3ReactProvider>
  );
}

export default App;
