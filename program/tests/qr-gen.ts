import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { QrGen } from "../target/types/qr_gen";

describe("qr-gen", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.QrGen as Program<QrGen>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
