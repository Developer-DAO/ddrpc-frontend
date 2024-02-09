import { Button } from "./ui/button";
import { Icons } from "./ui/icons";

export interface WalletButtonProps {
  connector: any;
  isLoading: boolean;
  connect: (params: any) => void;
}

export const WalletButton: React.FC<WalletButtonProps> = ({ connector, isLoading, connect }) => {
  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      className="p-2"
      key={connector.uid}
      onClick={() => connect({ connector })}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
      ) : (
        <img src={connector.icon} className="mr-2 h-6 w-6" />
      )}{" "}
      {connector.name}
    </Button>
  );
};