import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";

export default function App() {
  const address = useAddress();
  const { contract } = useContract("0xB87D3335399f0AD77139D54ea5CaC6D8747043e5", "nft-drop");
  const { mutateAsync: claim, isLoading } = useContractWrite(contract, "claim");

  const mint = async () => {
    try {
      const data = await claim({ args: [1] });
      alert("🎉 Mint successful!");
      console.log("Minted:", data);
    } catch (err) {
      alert("❌ Mint failed.");
      console.error(err);
    }
  };

  return (
    <main style={{
      backgroundColor: 'black',
      color: 'yellow',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Zama Secret NFT</h1>
      {address ? (
        <>
          <p style={{ marginBottom: '1rem' }}>Wallet: {address.slice(0, 6)}...{address.slice(-4)}</p>
          <button onClick={mint} disabled={isLoading} style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'yellow',
            color: 'black',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            {isLoading ? "Minting..." : "Mint NFT"}
          </button>
        </>
      ) : (
        <p>Connect your wallet using the top bar</p>
      )}
    </main>
  );
}
