import React, { FC, useCallback, useState, useMemo, useEffect } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { WalletModalProvider, WalletMultiButton, useWalletModal } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, Connection, PublicKey, TokenAccountsFilter, SystemProgram } from '@solana/web3.js';
import { Program, AnchorProvider, setProvider, getProvider, BN } from '@project-serum/anchor';
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import { Buffer } from 'buffer';
import './App.css';
window.Buffer = window.Buffer || require("buffer").Buffer;
const WalletComponent: FC<{ endpoint: string }> = ({ endpoint }) => {
    const wallet = useWallet();
    const { publicKey } = useWallet();
    const { setVisible } = useWalletModal();
    const [balance0, setBalance0] = useState<String | null>(null);
    const [balance1, setBalance1] = useState<number | null>(null);
    const [balance2, setBalance2] = useState<number | null>(null);
    const [balance3, setBalance3] = useState<number | null>(null);
    const [balance4, setBalance4] = useState<number | null>(null);
    const [balance5, setBalance5] = useState<number | null>(null);
    const fetchBalance = useCallback(async () => {
        if (!wallet.connected) {
            setVisible(true);
            return;
        }
        if (!wallet.publicKey) {
            throw new WalletNotConnectedError();
        }
        const balance0 = wallet.publicKey.toBase58();
        setBalance0(balance0);
        const connection = new Connection(endpoint, 'finalized');
        const balance1 = await connection.getBalance(new PublicKey(wallet.publicKey));
        setBalance1(balance1 / 1e9);
        const balance2 = await connection.getTokenSupply(new PublicKey("4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ"));
        setBalance2(Number(balance2.value.amount).valueOf() / 1e9);
        const tokenFilt: TokenAccountsFilter = {
            mint: new PublicKey("4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ"),
            programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
        };
        const tokenAcc = await connection.getTokenAccountsByOwner(wallet.publicKey, tokenFilt);
        if (tokenAcc.value.length > 0) {
            const publicKeyToken = tokenAcc.value[0].pubkey;
            const balance3 = await connection.getTokenAccountBalance(publicKeyToken);
            setBalance3(Number(balance3.value.amount).valueOf() / 1e9);
        } else {
            const balance3 = 0;
            setBalance3(balance3);
        }
        const [pda] = PublicKey.findProgramAddressSync(
            [Buffer.from("vault")],
            new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
        );
        let thatWallet: any;
        if (wallet && wallet.wallet) {
            thatWallet = wallet
        } else {
            console.error('You not yet choose wallet');
        }
        setProvider(new AnchorProvider(connection, thatWallet, {
            preflightCommitment: 'recent',
        }));
        let accountInfo: any;
        function processAccountInfo() {
            if (accountInfo !== undefined) {
                const balance4 = accountInfo.assetAccount.words[0];
                setBalance4(balance4);
            } else {
                console.error("Account info is not yet fetched.");
            }
        }
        Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            .then((IDL) => {
                if (IDL === null) {
                    console.error("Error: IDL not found");
                } else {
                    const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                    programTarget.account.userInfor.fetch(pda)
                        .then(info => {
                            accountInfo = info;
                            processAccountInfo();
                        })
                        .catch(error => {
                            console.error('Error fetching account info:', error);
                        });
                }
            })
            .catch((error) => {
                console.error("Error fetching IDL: ", error);
            });
        let thatPubkey: any;
        if (publicKey) {
            thatPubkey = publicKey;
        } else {
            console.error('You not yet choose wallet');
        }
        const [pda2] = PublicKey.findProgramAddressSync(
            [Buffer.from("client", "utf8"), thatPubkey.toBuffer()],
            new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
        );
        let accountInfo2: any;
        function processAccountInfo2() {
            if (accountInfo2 !== undefined) {
                const balance5 = accountInfo2.assetAccount.words[0];
                setBalance5(balance5);
            } else {
                console.error("Account info is not yet fetched.");
            }
        }
        Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            .then((IDL) => {
                if (IDL === null) {
                    console.error("Error: IDL not found");
                } else {
                    const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                    programTarget.account.userInfor.fetch(pda2)
                        .then(info => {
                            accountInfo2 = info;
                            processAccountInfo2();
                        })
                        .catch(error => {
                            console.error('Error fetching account info:', error);
                            const balance5 = 0;
                            setBalance5(balance5);
                            alert(`Can't find asset account`);
                        });
                }
            })
            .catch((error) => {
                console.error("Error fetching IDL: ", error);
            });
    }, [wallet, publicKey, endpoint, setBalance0, setBalance1, setBalance2, setBalance3, setBalance4, setBalance5, setVisible]);
    useEffect(() => {
        if (wallet.connected) {
            fetchBalance();
        } else {
            setVisible(true);
        }
    }, [wallet.connected, fetchBalance, setVisible]);
    const [input, setInput] = useState("");
    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInput(event.target.value);
    };
    const [input2, setInput2] = useState("");
    const handleInputChange2 = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInput2(event.target.value);
    };
    const handleButtonClick = async () => {
        try {
            const publicKey = new PublicKey(input);
            const balance0 = publicKey.toBase58();
            setBalance0(balance0);
            const connection = new Connection(endpoint, 'finalized');
            const balance1 = await connection.getBalance(publicKey);
            setBalance1(balance1 / 1e9);
            const tokenFilt: TokenAccountsFilter = {
                mint: new PublicKey("4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ"),
                programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
            };
            const tokenAcc = await connection.getTokenAccountsByOwner(publicKey, tokenFilt);
            if (tokenAcc.value.length > 0) {
                const publicKeyToken = tokenAcc.value[0].pubkey;
                const balance3 = await connection.getTokenAccountBalance(publicKeyToken);
                setBalance3(Number(balance3.value.amount).valueOf() / 1e9);
            } else {
                const balance3 = 0;
                setBalance3(balance3);
            }
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda2] = PublicKey.findProgramAddressSync(
                [Buffer.from("client", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let accountInfo2: any;
            function processAccountInfo2() {
                if (accountInfo2 !== undefined) {
                    const balance5 = accountInfo2.assetAccount.words[0];
                    setBalance5(balance5);
                } else {
                    console.error("Account info is not yet fetched.");
                }
            }
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then((IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        programTarget.account.userInfor.fetch(pda2)
                            .then(info => {
                                accountInfo2 = info;
                                processAccountInfo2();
                            })
                            .catch(error => {
                                console.error('Error fetching account info:', error);
                                const balance5 = 0;
                                setBalance5(balance5);
                                alert(`Can't find asset account`);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                });
        } catch (error) {
            console.error("Chuỗi không hợp lệ", error);
            alert(error.message);
        }
    };
    const handleButtonOpenAssetAcc = useCallback(async () => {
        try {
            const [pda] = PublicKey.findProgramAddressSync(
                [Buffer.from("vault")],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda2] = PublicKey.findProgramAddressSync(
                [Buffer.from("client", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let thatWallet: any;
            if (wallet && wallet.wallet) {
                thatWallet = wallet
            } else {
                console.error('You not yet choose wallet');
            }
            const connection = new Connection(endpoint, 'finalized');
            setProvider(new AnchorProvider(connection, thatWallet, {
                preflightCommitment: 'recent',
            }));
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then(async (IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        alert(`Asset account opening`);
                        let txHash = await programTarget.methods
                            .initUser()
                            .accounts({
                                vault: pda,
                                client: pda2,
                                signer: thatPubkey,
                                systemProgram: SystemProgram.programId,
                            })
                            .rpc()
                        await connection.confirmTransaction(txHash);
                        alert(`Asset account opened successful`);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                    alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    }, [wallet, publicKey, endpoint]);
    const handleButtonCloseAssetAcc = useCallback(async () => {
        try {
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda] = PublicKey.findProgramAddressSync(
                [Buffer.from("client", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let thatWallet: any;
            if (wallet && wallet.wallet) {
                thatWallet = wallet
            } else {
                console.error('You not yet choose wallet');
            }
            const connection = new Connection(endpoint, 'finalized');
            setProvider(new AnchorProvider(connection, thatWallet, {
                preflightCommitment: 'recent',
            }));
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then(async (IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        alert(`Asset account closing`);
                        let txHash = await programTarget.methods
                            .clearUser()
                            .accounts({
                                client: pda,
                                signer: thatPubkey,
                            })
                            .rpc();
                        await connection.confirmTransaction(txHash);
                        alert(`Asset account closed successful`);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                    alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    }, [wallet, publicKey, endpoint]);
    const handleButtonLockTarget = useCallback(async () => {
        try {
            let targetKeyString = input;
            let targetKey = new PublicKey(targetKeyString);
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [targetDataPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let thatWallet: any;
            if (wallet && wallet.wallet) {
                thatWallet = wallet
            } else {
                console.error('You not yet choose wallet');
            }
            const connection = new Connection(endpoint, 'finalized');
            setProvider(new AnchorProvider(connection, thatWallet, {
                preflightCommitment: 'recent',
            }));
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then(async (IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        let txHash = await programTarget.methods
                            .lockTarget(targetKey)
                            .accounts({
                                target: targetDataPda,
                                signer: thatPubkey,
                                systemProgram: SystemProgram.programId,
                            })
                            .rpc();
                        await connection.confirmTransaction(txHash);
                        alert(`Your txHash is: ${txHash}`);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                    alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    }, [input, publicKey, wallet, endpoint]);
    const handleButtonTransferAsset = useCallback(async () => {
        try {
            let targetKeyString = input;
            let targetKey = new PublicKey(targetKeyString);
            const [toDataPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("client", "utf8"), targetKey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [targetDataPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            const [fromDataPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("client", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let thatWallet: any;
            if (wallet && wallet.wallet) {
                thatWallet = wallet
            } else {
                console.error('You not yet choose wallet');
            }
            const connection = new Connection(endpoint, 'finalized');
            setProvider(new AnchorProvider(connection, thatWallet, {
                preflightCommitment: 'recent',
            }));
            try {
                let amount = Number(input2).valueOf();
                const amountBN = new BN(amount);
                Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    .then(async (IDL) => {
                        if (IDL === null) {
                            console.error("Error: IDL not found");
                        } else {
                            const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                            let txHash = await programTarget.methods
                                .tranferAsset(amountBN)
                                .accounts({
                                    target: targetDataPda,
                                    fromclient: fromDataPda,
                                    toclient: toDataPda,
                                    signer: thatPubkey,
                                })
                                .rpc();
                            await connection.confirmTransaction(txHash);
                            alert(`Your txHash is: ${txHash}`);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching IDL: ", error);
                        alert(error.message);
                    });
            } catch (e) {
                console.log(`${e}`);
            }
        } catch (error) {
            alert(error.message);
        }
    }, [input, publicKey, wallet, endpoint, input2]);
    const handleButtonDepositAsset = useCallback(async () => {
        try {
            let targetKeyString = input;
            let targetKey = new PublicKey(targetKeyString);
            const [playerDataPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("client", "utf8"), targetKey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = new PublicKey(publicKey.toBase58())
            } else {
                console.error('You not yet choose wallet');
            };
            const connection = new Connection(endpoint, 'finalized');
            const [targetDataPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            try {
                let amount = Number(input2).valueOf();
                const amountBN = new BN(amount);
                Program.fetchIdl(new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"))
                    .then(async (IDL) => {
                        if (IDL === null) {
                            console.error("Error: IDL not found");
                        } else {
                            const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                            let txHash = await programTarget.methods
                                .depositAsset(amountBN)
                                .accounts({
                                    target: targetDataPda,
                                    client: playerDataPda,
                                    signer: thatPubkey,
                                })
                                .rpc();
                            await connection.confirmTransaction(txHash);
                            alert(`Your txHash is ${txHash}`);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching deposit IDL: ", error);
                        alert(error.message);
                    });
            } catch (e) {
                console.log(`${e}`);
            }
        } catch (error) {
            alert(error.message);
        }
    }, [input, publicKey, endpoint, input2]);
    const handleButtonWithdrawAsset = async () => {
        try {
            let targetKeyString = input;
            let targetKey = new PublicKey(targetKeyString);
            const [playerDataPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("client", "utf8"), targetKey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            };
            const [targetDataPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            const connection = new Connection(endpoint, 'finalized');
            try {
                let amount: number = Number(input2).valueOf();
                const amountBN = new BN(amount);
                Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    .then(async (IDL) => {
                        if (IDL === null) {
                            console.error("Error: IDL not found");
                        } else {
                            const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                            let txHash = await programTarget.methods
                                .withdrawAsset(amountBN)
                                .accounts({
                                    target: targetDataPda,
                                    client: playerDataPda,
                                    signer: thatPubkey,
                                })
                                .rpc();
                            await connection.confirmTransaction(txHash);
                            alert(`Your txHash is ${txHash}`);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching IDL: ", error);
                        alert(error.message);
                    });
            } catch (e) {
                console.log(`${e}`);
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const handleButtonTributeAsset = useCallback(async () => {
        try {
            let mintString = "4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ";
            let mint = new PublicKey(mintString);
            const [vaultDataPda, bump1] = PublicKey.findProgramAddressSync(
                [Buffer.from("vault")],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            };
            const [donatorDataPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("client", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            const connection = new Connection(endpoint, 'finalized');
            let thatWallet: any;
            if (wallet && wallet.wallet) {
                thatWallet = wallet
            } else {
                console.error('You not yet choose wallet');
            }
            const tokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                thatWallet,
                mint,
                thatPubkey
            )
            try {
                let amount: number = Number(input2).valueOf();
                const amountBN = new BN(amount);
                const bumpBN = new BN(bump1);
                Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    .then(async (IDL) => {
                        if (IDL === null) {
                            console.error("Error: IDL not found");
                        } else {
                            const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                            let txHash = await programTarget.methods
                                .tributeAsset(amountBN, bumpBN)
                                .accounts({
                                    mint: mint,
                                    tk: tokenAccount.address,
                                    donator: donatorDataPda,
                                    vault: vaultDataPda,
                                    signer: thatPubkey,
                                    token: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
                                    authority: vaultDataPda
                                })
                                .rpc();
                            await connection.confirmTransaction(txHash);
                            alert(`Your txHash is ${txHash}`);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching inner IDL: ", error);
                        alert(error.message);
                    });

            } catch (e) {
                console.log(`${e}`);
            }
        } catch (error) {
            console.error("Error fetching outer IDL: ", error);
            alert(error.message);
        }
    }, [publicKey, endpoint, input2, wallet]);
    const handleButtonSummonAsset = useCallback(async () => {
        try {
            let mintString = "4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ";
            let mint = new PublicKey(mintString);
            const [vaultDataPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("vault")],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            };
            const [donatorDataPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("client", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            const connection = new Connection(endpoint, 'finalized');
            let thatWallet: any;
            if (wallet && wallet.wallet) {
                thatWallet = wallet
            } else {
                console.error('You not yet choose wallet');
            }
            const tokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                thatWallet,
                mint,
                thatPubkey
            )
            try {
                let amount: number = Number(input2).valueOf();
                const amountBN = new BN(amount);
                Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    .then(async (IDL) => {
                        if (IDL === null) {
                            console.error("Error: IDL not found");
                        } else {
                            const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                            let txHash = await programTarget.methods
                                .summonAsset(amountBN)
                                .accounts({
                                    mint: mint,
                                    tk: tokenAccount.address,
                                    donator: donatorDataPda,
                                    vault: vaultDataPda,
                                    signer: thatPubkey,
                                    token: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
                                })
                                .rpc();
                            await connection.confirmTransaction(txHash);
                            alert(`Your txHash is ${txHash}`);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching inner IDL: ", error);
                        alert(error.message);
                    });
            } catch (e) {
                console.log(`${e}`);
            }

        } catch (error) {
            console.error("Error fetching outer IDL: ", error);
            alert(error.message);
        }
    }, [publicKey, endpoint, input2, wallet]);
    const handleButtonTributeTarget = useCallback(async () => {
        try {
            let mintString = "4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ";
            let mint = new PublicKey(mintString);
            let targetKeyString = input;
            let targetKey = new PublicKey(targetKeyString);
            const [vaultDataPda, bump1] = PublicKey.findProgramAddressSync(
                [Buffer.from("vault")],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            };
            const [donatorDataPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("client", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            const connection = new Connection(endpoint, 'finalized');
            let thatWallet: any;
            if (wallet && wallet.wallet) {
                thatWallet = wallet
            } else {
                console.error('You not yet choose wallet');
            }
            const tokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                thatWallet,
                mint,
                targetKey
            )
            try {
                let amount: number = Number(input2).valueOf();
                const amountBN = new BN(amount);
                const bumpBN = new BN(bump1);
                Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    .then(async (IDL) => {
                        if (IDL === null) {
                            console.error("Error: IDL not found");
                        } else {
                            const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                            let txHash = await programTarget.methods
                                .tributeAsset(amountBN, bumpBN)
                                .accounts({
                                    mint: mint,
                                    tk: tokenAccount.address,
                                    donator: donatorDataPda,
                                    vault: vaultDataPda,
                                    signer: thatPubkey,
                                    token: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
                                    authority: vaultDataPda
                                })
                                .rpc();
                            await connection.confirmTransaction(txHash);
                            alert(`Your txHash is ${txHash}`);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching inner IDL: ", error);
                        alert(error.message);
                    });

            } catch (e) {
                console.log(`${e}`);
            }
        } catch (error) {
            console.error("Error fetching outer IDL: ", error);
            alert(error.message);
        }
    }, [input, publicKey, endpoint, wallet, input2]);
    const handleButtonSummonTarget = useCallback(async () => {
        try {
            let mintString = "4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ";
            let mint = new PublicKey(mintString);
            const [vaultDataPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("vault")],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            };
            let targetKeyString = input;
            let targetKey = new PublicKey(targetKeyString);
            const [playerDataPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("client", "utf8"), targetKey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            const [targetDataPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            const connection = new Connection(endpoint, 'finalized');
            let thatWallet: any;
            if (wallet && wallet.wallet) {
                thatWallet = wallet
            } else {
                console.error('You not yet choose wallet');
            }
            const tokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                thatWallet,
                mint,
                thatPubkey
            )
            try {
                let amount: number = Number(input2).valueOf();
                const amountBN = new BN(amount);
                Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    .then(async (IDL) => {
                        if (IDL === null) {
                            console.error("Error: IDL not found");
                        } else {
                            const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                            let txHash = await programTarget.methods
                                .summonTarget(amountBN)
                                .accounts({
                                    target: targetDataPda,
                                    client: playerDataPda,
                                    mint: mint,
                                    tk: tokenAccount.address,
                                    vault: vaultDataPda,
                                    signer: thatPubkey,
                                    token: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
                                })
                                .rpc();
                            await connection.confirmTransaction(txHash);
                            alert(`Your txHash is ${txHash}`);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching inner IDL: ", error);
                        alert(error.message);
                    });
            } catch (e) {
                console.log(`${e}`);
            };
        } catch (error) {
            console.error("Error fetching outer IDL: ", error);
            alert(error.message);
        }
    }, [input, publicKey, endpoint, wallet, input2]);
    return (
        <>
            <WalletMultiButton />
            <div>
                <button onClick={handleButtonClick}>Watch Target</button>
                <button onClick={handleButtonLockTarget}>Lock Target</button>
                <input type="text" value={input} onChange={handleInputChange} size={50} />
                <button onClick={fetchBalance}>Watch Asset</button>
                <button onClick={handleButtonTransferAsset}>Transfer Target</button>
                <button onClick={handleButtonOpenAssetAcc}>Open Asset Acc</button>
                <button onClick={handleButtonCloseAssetAcc}>Close Asset Acc</button>
            </div>
            <div>
                <button onClick={handleButtonDepositAsset}>Deposit Target</button>
                <button onClick={handleButtonWithdrawAsset}>Withdraw Target</button>
                <input type="text" value={input2} onChange={handleInputChange2} size={50} />
                <button onClick={handleButtonTributeAsset}>Tribute Asset</button>
                <button onClick={handleButtonSummonAsset}>Summon Asset</button>
                <button onClick={handleButtonTributeTarget}>Tribute Target</button>
                <button onClick={handleButtonSummonTarget}>Summon Target</button>
            </div>
            {wallet.connected && (
                <div className="wallet-info">
                    <div>Wallet Address: {balance0}</div>
                    <div>Wallet Balance: {balance1} Dev SOL</div>
                    <div>Wallet Stable Coin: {balance3} SFC - VND</div>
                    <div>Wallet Asset: {balance5} VND</div>
                    <div>Stable Coin Supply: {balance2} SFC - VND</div>
                    <div>Total Asset Base: {balance4} VND</div>
                </div>
            )}
        </>
    );
}
const App: FC = () => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(() => [], []);
    const onError = useCallback(
        (error: WalletNotConnectedError) => {
            console.error(error);
            alert(error.message);
        },
        []
    );
    return (
        <ConnectionProvider endpoint={endpoint}>
            <div className="wallets-container">
                <WalletProvider wallets={wallets} autoConnect onError={onError}>
                    <WalletModalProvider>
                        <WalletComponent endpoint={endpoint} />
                    </WalletModalProvider>
                </WalletProvider>
            </div>
        </ConnectionProvider>
    );
}
export default App;