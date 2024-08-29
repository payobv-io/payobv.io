import { Card, CardContent } from "./card";
import WalletCard from "./maintainer/escrow-requests/wallet-card";
import ConnectWalletButton from "./connect-wallet-button";

export default function WalletDetailsContainer(){
  return (
    <div className="flex flex-col gap-y-3">
      <WalletCard />
      <ConnectWalletButton />
    </div>
  )
}