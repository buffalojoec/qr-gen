import { FC, useCallback, useState } from "react";
import QRCode from "react-qr-code";
import * as anchor from "@project-serum/anchor";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";


const QrCodeGen: FC = () => {

    const [keypair, setKeypair] = useState<anchor.web3.Keypair>();
    // const wallet = useAnchorWallet();
    const [wallet, setWallet] = useState<AnchorWallet>(undefined);

    const generateQrCode = useCallback(async () => {
        const k = anchor.web3.Keypair.generate();
        const connection = new anchor.web3.Connection("https://api.devnet.solana.com", "confirmed");
        const sx = await connection.requestAirdrop(k.publicKey, 1 * anchor.web3.LAMPORTS_PER_SOL);
        await connection.confirmTransaction(sx);
        setKeypair(k);
    }, [keypair])

    // const importGeneratedWallet = useCallback(async () => {
    //     setWallet(
            
    //     )
    // }, [keypair]);

    return (
        <div>
            { keypair ?
            <div>
                <h3>Your new Burner Wallet:</h3>
                <p>{keypair.publicKey.toString()}</p>
                <QRCode value={`[${keypair.secretKey.toString()}]`} />
                <p>Scan this QR code and choose "Copy", then import the private key into your favorite wallet!</p>
                <button>OK, I scanned it!</button> {/*Clicking this button will pipe the new wallet into the Anchor wallet*/}
                {wallet && <p>Anchor Wallet: {wallet.publicKey}</p>}
            </div>
            :
            <button onClick={(e) => generateQrCode()}>
                Generate Burner Wallet
            </button>
            }
        </div>
    )
}
export default QrCodeGen;