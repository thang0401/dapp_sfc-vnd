import React, { FC, useCallback, useState, useMemo, useEffect } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { WalletModalProvider, WalletMultiButton, useWalletModal } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, Connection, PublicKey, TokenAccountsFilter, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Program, AnchorProvider, setProvider, getProvider, BN } from '@coral-xyz/anchor';
import {
    //TOKEN_PROGRAM_ID,
    //ASSOCIATED_TOKEN_PROGRAM_ID,
    getOrCreateAssociatedTokenAccount,
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddressSync,
} from '@solana/spl-token';
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
    const [balance6, setBalance6] = useState<String | null>(null);
    const [balance7, setBalance7] = useState<String | null>(null);
    const [balance8, setBalance8] = useState<String | null>(null);
    const [balance9, setBalance9] = useState<String | null>(null);
    const [balance10, setBalance10] = useState<number | null>(null);
    const [balance11, setBalance11] = useState<number | null>(null);
    const [balance12, setBalance12] = useState<number | null>(null);
    const [balance13, setBalance13] = useState<number | null>(null);
    const [balance14, setBalance14] = useState<number | null>(null);
    const [balance15, setBalance15] = useState<number | null>(null);
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
        const balance15 = await connection.getTokenSupply(new PublicKey("8aHXuC6HjPNQYiBxNhqHD2CN5RxvcqRu5hvKhWHF6He"));
        setBalance15(Number(balance15.value.amount).valueOf() / 1e9);
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
            alert(`Can't find token account`);
        }
        const tokenLPFilt: TokenAccountsFilter = {
            mint: new PublicKey("8aHXuC6HjPNQYiBxNhqHD2CN5RxvcqRu5hvKhWHF6He"),
            programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
        };
        const tokenLPAcc = await connection.getTokenAccountsByOwner(wallet.publicKey, tokenLPFilt);
        if (tokenAcc.value.length > 0) {
            const publicKeyToken = tokenLPAcc.value[0].pubkey;
            const balance14 = await connection.getTokenAccountBalance(publicKeyToken);
            setBalance14(Number(balance14.value.amount).valueOf() / 1e9);
        } else {
            const balance14 = 0;
            setBalance14(balance14);
            alert(`Can't find LP token account`);
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
                const balance13 = Number(accountInfo.kValue).valueOf() / LAMPORTS_PER_SOL;
                setBalance13(balance13);
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
        const [pda3] = PublicKey.findProgramAddressSync(
            [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
            new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
        );
        let accountTarget: any;
        function processAccountTarget() {
            if (accountTarget !== undefined) {
                const balance6 = accountTarget.assetTarget.toBase58();
                setBalance6(balance6);
            } else {
                console.error("Account target is not yet fetched.");
                const balance6 = "Non target";
                setBalance6(balance6);
                alert(`Can't find lock target`);
            }
        }
        Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            .then((IDL) => {
                if (IDL === null) {
                    console.error("Error: IDL not found");
                } else {
                    const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                    programTarget.account.userTarget.fetch(pda3)
                        .then(target => {
                            accountTarget = target;
                            processAccountTarget();
                        })
                        .catch(error => {
                            console.error('Error fetching account target:', error);
                        });
                }
            })
            .catch((error) => {
                console.error("Error fetching IDL: ", error);
            });
        const [pda2] = PublicKey.findProgramAddressSync(
            [Buffer.from("client", "utf8"), thatPubkey.toBuffer()],
            new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
        );
        let accountInfo2: any;
        function processAccountInfo2() {
            if (accountInfo2 !== undefined) {
                const balance5 = accountInfo2.assetAccount.words[0];
                setBalance5(balance5);
                const balance9 = accountInfo2.accountName;
                setBalance9(balance9);
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
                            const balance9 = "";
                            setBalance9(balance9);
                            alert(`Can't find account name`);
                        });
                }
            })
            .catch((error) => {
                console.error("Error fetching IDL: ", error);
            });
        const balance10 = await connection.getBalance(pda);
        setBalance10(balance10 / 1e9);
        const tokenAcc2 = await connection.getTokenAccountsByOwner(pda, tokenFilt);
        if (tokenAcc2.value.length > 0) {
            const publicKeyToken = tokenAcc2.value[0].pubkey;
            const balance11 = await connection.getTokenAccountBalance(publicKeyToken);
            setBalance11(Number(balance11.value.amount).valueOf() / 1e9);
            const balance12 = (Number(balance11.value.amount).valueOf() / 1e9) / (balance10 / 1e9);
            setBalance12(balance12);
        } else {
            const balance11 = 0;
            setBalance11(balance11);
            alert(`Can't find token account`);
        }
    }, [wallet, publicKey, endpoint, setBalance0, setBalance1, setBalance2, setBalance3, setBalance4, setBalance5, setBalance6, setVisible]);
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
    const handleButtonClick = useCallback(async () => {
        try {
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda3] = PublicKey.findProgramAddressSync(
                [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let accountTarget: any;
            let targetKey: any;
            async function processAccountTarget() {
                if (accountTarget !== undefined) {
                    targetKey = accountTarget.assetTarget;
                    const balance0 = targetKey.toBase58();
                    setBalance0(balance0);
                    const connection = new Connection(endpoint, 'finalized');
                    const balance1 = await connection.getBalance(targetKey);
                    setBalance1(balance1 / 1e9);
                    const tokenFilt: TokenAccountsFilter = {
                        mint: new PublicKey("4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ"),
                        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
                    };
                    const tokenAcc = await connection.getTokenAccountsByOwner(targetKey, tokenFilt);
                    if (tokenAcc.value.length > 0) {
                        const publicKeyToken = tokenAcc.value[0].pubkey;
                        const balance3 = await connection.getTokenAccountBalance(publicKeyToken);
                        setBalance3(Number(balance3.value.amount).valueOf() / 1e9);
                    } else {
                        const balance3 = 0;
                        setBalance3(balance3);
                        alert(`Can't find token account`);
                    }
                    const tokenLPFilt: TokenAccountsFilter = {
                        mint: new PublicKey("8aHXuC6HjPNQYiBxNhqHD2CN5RxvcqRu5hvKhWHF6He"),
                        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
                    };
                    const tokenLPAcc = await connection.getTokenAccountsByOwner(targetKey, tokenLPFilt);
                    if (tokenAcc.value.length > 0) {
                        const publicKeyToken = tokenLPAcc.value[0].pubkey;
                        const balance14 = await connection.getTokenAccountBalance(publicKeyToken);
                        setBalance14(Number(balance14.value.amount).valueOf() / 1e9);
                    } else {
                        const balance14 = 0;
                        setBalance14(balance14);
                        alert(`Can't find LP token account`);
                    }
                    const [pda2] = PublicKey.findProgramAddressSync(
                        [Buffer.from("client", "utf8"), targetKey.toBuffer()],
                        new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    );
                    let accountInfo2: any;
                    function processAccountInfo2() {
                        if (accountInfo2 !== undefined) {
                            const balance5 = accountInfo2.assetAccount.words[0];
                            setBalance5(balance5);
                            const balance9 = accountInfo2.accountName;
                            setBalance9(balance9);
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
                                        const balance9 = "";
                                        setBalance9(balance9);
                                        alert(`Can't find account name`);
                                    });
                            }
                        })
                        .catch((error) => {
                            console.error("Error fetching IDL: ", error);
                        });
                    const [pda4] = PublicKey.findProgramAddressSync(
                        [Buffer.from("target", "utf8"), targetKey.toBuffer()],
                        new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    );
                    let accountTarget2: any;
                    function processAccountTarget2() {
                        if (accountTarget !== undefined) {
                            const balance6 = accountTarget2.assetTarget.toBase58();
                            setBalance6(balance6);
                        } else {
                            console.error("Account target is not yet fetched.");
                            const balance6 = "Non target";
                            setBalance6(balance6);
                            alert(`Can't find lock target`);
                        }
                    }
                    Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                        .then((IDL) => {
                            if (IDL === null) {
                                console.error("Error: IDL not found");
                            } else {
                                const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                                programTarget.account.userTarget.fetch(pda4)
                                    .then(target => {
                                        accountTarget2 = target;
                                        processAccountTarget2();
                                    })
                                    .catch(error => {
                                        console.error('Error fetching account target:', error);
                                    });
                            }
                        })
                        .catch((error) => {
                            console.error("Error fetching IDL: ", error);
                        });
                }
            }
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then((IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        programTarget.account.userTarget.fetch(pda3)
                            .then(target => {
                                accountTarget = target;
                                processAccountTarget();
                            })
                            .catch(error => {
                                console.error('Error fetching account target:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                });

        } catch (error) {
            alert(error.message);
        }
    }, [publicKey, endpoint]);
    /*
    const handleButtonCreateVaultSFC = useCallback(async () => {
        try {
            const mintString = "4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ";
            const mintSFC = new PublicKey(mintString);
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const connection = new Connection(endpoint, 'finalized');
            const [pda] = PublicKey.findProgramAddressSync(
                [Buffer.from("vault")],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            const tokenAccount = getAssociatedTokenAddressSync(
                mintSFC,
                pda,
                true,
                TOKEN_PROGRAM_ID,
                ASSOCIATED_TOKEN_PROGRAM_ID
            );
            const ataInfo = await connection.getAccountInfo(tokenAccount);
            if (ataInfo === null) {
                const createTokenAccountIx = createAssociatedTokenAccountInstruction(
                    thatPubkey,
                    tokenAccount,
                    pda,
                    mintSFC,
                    TOKEN_PROGRAM_ID,
                    ASSOCIATED_TOKEN_PROGRAM_ID
                );
                const transaction = new Transaction().add(createTokenAccountIx);
                alert(`Vault SFC Token account opening`);
                const txHash = await wallet.sendTransaction(transaction, connection);
                await connection.confirmTransaction(txHash);
                alert(`Vault SFC Token account opened successful`);
                const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                setBalance7(balance7);
                setBalance8(balance8);
                fetchBalance();
            } else {
                alert(`Vault SFC Token account already exists`);
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }, [publicKey, endpoint, wallet, fetchBalance]);
    */
    const handleButtonSimulateBuy = useCallback(async () => {
        try {
            let t1: any, t2: any;
            if (balance10) {
                t1 = balance10 * LAMPORTS_PER_SOL;
            } else {
                console.error('You not yet choose wallet');
            }
            if (balance11) {
                t2 = balance11 * LAMPORTS_PER_SOL;
            } else {
                console.error('You not yet choose wallet');
            }
            let k1 = Number(balance13).valueOf() * LAMPORTS_PER_SOL;
            let amount = Number(input2).valueOf();
            let realamount = amount * LAMPORTS_PER_SOL;
            let k2 = t1 - realamount;
            let k3 = k1 / k2 * LAMPORTS_PER_SOL;
            let k4 = k3 - t2;
            let k5 = k4 / LAMPORTS_PER_SOL;
            alert(`You will pay ${k5} SFC - VND if you buy ${input2} Dev Sol`);
            alert(`With price ${k5 / amount} for each Dev Sol`);
            alert(`And ratio will be Dev Sol 1 : ${k3 / k2} SFC - VND`);
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }, [balance10, balance11, balance13, input2]);
    const handleButtonSimulateSell = useCallback(async () => {
        try {
            let t1: any, t2: any;
            if (balance10) {
                t1 = balance10 * LAMPORTS_PER_SOL;
            } else {
                console.error('You not yet choose wallet');
            }
            if (balance11) {
                t2 = balance11 * LAMPORTS_PER_SOL;
            } else {
                console.error('You not yet choose wallet');
            }
            let k1 = Number(balance13).valueOf() * LAMPORTS_PER_SOL;
            let amount = Number(input2).valueOf();
            let realamount = amount * LAMPORTS_PER_SOL;
            let k2 = t1 + realamount;
            let k3 = k1 / k2 * LAMPORTS_PER_SOL;
            let k4 = t2 - k3;
            let k5 = k4 / LAMPORTS_PER_SOL;
            alert(`You will earn ${k5} SFC - VND if you sell ${input2} Dev Sol`);
            alert(`With price ${k5 / amount} for each Dev Sol`);
            alert(`And ratio will be Dev Sol 1 : ${k3 / k2} SFC - VND`);
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }, [balance10, balance11, balance13, input2]);
    const handleButtonSimulateMintLP = useCallback(async () => {
        try {
            let t0: any, t1: any, t2: any;
            if (balance15) {
                t0 = balance15 * LAMPORTS_PER_SOL;
            } else {
                console.error('You not yet choose wallet');
            }
            if (balance10) {
                t1 = balance10 * LAMPORTS_PER_SOL;
            } else {
                console.error('You not yet choose wallet');
            }
            if (balance11) {
                t2 = balance11 * LAMPORTS_PER_SOL;
            } else {
                console.error('You not yet choose wallet');
            }
            let k0 = Number(input2).valueOf();
            let k1 = k0 / t0 * t1;
            let k2 = Number(balance12).valueOf();
            let k3 = k1 * k2;
            let k4 = k3 * LAMPORTS_PER_SOL;
            let k5 = t1 + Number(input2).valueOf() * LAMPORTS_PER_SOL;
            let k6 = t2 + k4;
            let amount_sfc = k4;
            let k7 = ((k5 / LAMPORTS_PER_SOL) * (k6 / LAMPORTS_PER_SOL)) * LAMPORTS_PER_SOL;
            alert(`If you want mint ${input2} LPSFC from the LP Pool Vault`);
            alert(`You will provide ${k1} Dev Sol to the LP Pool Vault`);
            alert(`And will provide ${amount_sfc / LAMPORTS_PER_SOL} SFC - VND at the same time`);
            alert(`With ratio Dev Sol 1 : ${balance12} SFC - VND`);
            alert(`And pool K value will be change to ${k7 / LAMPORTS_PER_SOL}`);
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }, [balance10, balance11, balance12, balance15, input2]);
    const handleButtonSimulateBurnLP = useCallback(async () => {
        try {
            let t0: any, t1: any, t2: any;
            if (balance15) {
                t0 = balance15 * LAMPORTS_PER_SOL;
            } else {
                console.error('You not yet choose wallet');
            }
            if (balance11) {
                t2 = balance11 * LAMPORTS_PER_SOL;
            } else {
                console.error('You not yet choose wallet');
            }
            let k0 = Number(input2).valueOf();
            let k1 = k0 / t0 * t1;
            let k2 = Number(balance12).valueOf();
            let k3 = k1 * k2;
            let k4 = k3 * LAMPORTS_PER_SOL;
            let k5 = t1 - Number(input2).valueOf() * LAMPORTS_PER_SOL;
            let k6 = t2 - k4;
            let amount_sfc = k4;
            let k7 = ((k5 / LAMPORTS_PER_SOL) * (k6 / LAMPORTS_PER_SOL)) * LAMPORTS_PER_SOL;
            alert(`If you want burn ${input2} LPSFC to the LP Pool Vault`);
            alert(`You want withdraw ${k1} Dev Sol from the LP Pool Vault`);
            alert(`And will withdraw ${amount_sfc / LAMPORTS_PER_SOL} SFC - VND at the same time`);
            alert(`With ratio Dev Sol 1 : ${balance12} SFC - VND`);
            alert(`And pool K value will be change to ${k7 / LAMPORTS_PER_SOL}`);
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }, [balance11, balance12, balance15, input2]);
    const handleButtonSummonLP = useCallback(async () => {
        try {
            let mintString = "8aHXuC6HjPNQYiBxNhqHD2CN5RxvcqRu5hvKhWHF6He";
            let mint = new PublicKey(mintString);
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda, bump] = PublicKey.findProgramAddressSync(
                [Buffer.from("vault")],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            const connection = new Connection(endpoint, 'finalized');
            const tokenFiltSFC: TokenAccountsFilter = {
                mint: new PublicKey("4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ"),
                programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
            };
            const tokenAcc = await connection.getParsedTokenAccountsByOwner(thatPubkey, tokenFiltSFC);
            const tokenAcc2 = await connection.getParsedTokenAccountsByOwner(pda, tokenFiltSFC);
            const tokenFiltLP: TokenAccountsFilter = {
                mint: new PublicKey("8aHXuC6HjPNQYiBxNhqHD2CN5RxvcqRu5hvKhWHF6He"),
                programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
            };
            const tokenAcc3 = await connection.getParsedTokenAccountsByOwner(thatPubkey, tokenFiltLP);
            let amount = Number(input2).valueOf();
            let realamount = amount * LAMPORTS_PER_SOL;
            const amountBN = new BN(realamount);
            let ratio = Number(balance12).valueOf();
            let realratio = ratio * LAMPORTS_PER_SOL;
            const ratioBN = new BN(realratio);
            const bumpBN = new BN(bump);
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then(async (IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        alert(`You providing your liquidity to the vault`);
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        let txHash = await programTarget.methods
                            .provideLiquidity(amountBN, ratioBN, bumpBN)
                            .accounts({
                                donatorsfc: tokenAcc.value[0].pubkey,
                                vaultsfc: tokenAcc2.value[0].pubkey,
                                donatorlp: tokenAcc3.value[0].pubkey,
                                vaultsol: pda,
                                mint: mint,
                                signer: thatPubkey,
                                token: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
                                systemProgram: SystemProgram.programId,
                            })
                            .rpc();
                        await connection.confirmTransaction(txHash);
                        alert(`You has been provided your liquidity to the vault successful`);
                        const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                        const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                        setBalance7(balance7);
                        setBalance8(balance8);
                        fetchBalance();
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                    alert(error.message);
                });
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }, [publicKey, endpoint, input2, balance12, fetchBalance]);
    const handleButtonBuySol = useCallback(async () => {
        try {
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda] = PublicKey.findProgramAddressSync(
                [Buffer.from("vault")],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            const connection = new Connection(endpoint, 'finalized');
            const tokenFilt: TokenAccountsFilter = {
                mint: new PublicKey("4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ"),
                programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
            };
            const tokenAcc = await connection.getParsedTokenAccountsByOwner(thatPubkey, tokenFilt);
            const tokenAcc2 = await connection.getParsedTokenAccountsByOwner(pda, tokenFilt);
            let amount = Number(input2).valueOf();
            let realamount = amount * LAMPORTS_PER_SOL;
            const amountBN = new BN(realamount);
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then(async (IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        alert(`You buy your Dev Sol from the vault`);
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        let txHash = await programTarget.methods
                            .buySol(amountBN)
                            .accounts({
                                donator: tokenAcc.value[0].pubkey,
                                vaultsfc: tokenAcc2.value[0].pubkey,
                                vaultsol: pda,
                                signer: thatPubkey,
                                token: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
                                systemProgram: SystemProgram.programId,
                            })
                            .rpc();
                        await connection.confirmTransaction(txHash);
                        alert(`You has been buyed your Dev Sol from the vault successful`);
                        const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                        const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                        setBalance7(balance7);
                        setBalance8(balance8);
                        fetchBalance();
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                    alert(error.message);
                });
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }, [publicKey, endpoint, input2, fetchBalance]);
    const handleButtonTributeLP = useCallback(async () => {
        try {
            let mintString = "8aHXuC6HjPNQYiBxNhqHD2CN5RxvcqRu5hvKhWHF6He";
            let mint = new PublicKey(mintString);
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda, bump] = PublicKey.findProgramAddressSync(
                [Buffer.from("vault")],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            const connection = new Connection(endpoint, 'finalized');
            const tokenFiltSFC: TokenAccountsFilter = {
                mint: new PublicKey("4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ"),
                programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
            };
            const tokenAcc = await connection.getParsedTokenAccountsByOwner(thatPubkey, tokenFiltSFC);
            const tokenAcc2 = await connection.getParsedTokenAccountsByOwner(pda, tokenFiltSFC);
            const tokenFiltLP: TokenAccountsFilter = {
                mint: new PublicKey("8aHXuC6HjPNQYiBxNhqHD2CN5RxvcqRu5hvKhWHF6He"),
                programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
            };
            const tokenAcc3 = await connection.getParsedTokenAccountsByOwner(thatPubkey, tokenFiltLP);
            let amount = Number(input2).valueOf();
            let realamount = amount * LAMPORTS_PER_SOL;
            const amountBN = new BN(realamount);
            const bumpBN = new BN(bump);
            let ratio = Number(balance12).valueOf();
            let realratio = ratio * LAMPORTS_PER_SOL;
            const ratioBN = new BN(realratio);
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then(async (IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        alert(`You withdrawing your liquidity from the vault`);
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        let txHash = await programTarget.methods
                            .withdrawLiquidity(amountBN, ratioBN, bumpBN)
                            .accounts({
                                donatorsfc: tokenAcc.value[0].pubkey,
                                vaultsfc: tokenAcc2.value[0].pubkey,
                                donatorlp: tokenAcc3.value[0].pubkey,
                                vaultsol: pda,
                                mint: mint,
                                signer: thatPubkey,
                                token: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
                                systemProgram: SystemProgram.programId,
                            })
                            .rpc();
                        await connection.confirmTransaction(txHash);
                        alert(`You has been withdrawed your Sol from the vault successful`);
                        const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                        const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                        setBalance7(balance7);
                        setBalance8(balance8);
                        fetchBalance();
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                    alert(error.message);
                });
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }, [publicKey, endpoint, input2, balance12, fetchBalance]);
    const handleButtonSellSol = useCallback(async () => {
        try {
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda, bump] = PublicKey.findProgramAddressSync(
                [Buffer.from("vault")],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            const connection = new Connection(endpoint, 'finalized');
            const tokenFilt: TokenAccountsFilter = {
                mint: new PublicKey("4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ"),
                programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
            };
            const tokenAcc = await connection.getParsedTokenAccountsByOwner(thatPubkey, tokenFilt);
            const tokenAcc2 = await connection.getParsedTokenAccountsByOwner(pda, tokenFilt);
            let amount = Number(input2).valueOf();
            let realamount = amount * LAMPORTS_PER_SOL;
            const amountBN = new BN(realamount);
            const bumpBN = new BN(bump);
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then(async (IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        alert(`You selling your Sol from the vault`);
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        let txHash = await programTarget.methods
                            .sellSol(amountBN, bumpBN)
                            .accounts({
                                donator: tokenAcc.value[0].pubkey,
                                vaultsfc: tokenAcc2.value[0].pubkey,
                                vaultsol: pda,
                                signer: thatPubkey,
                                token: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
                                systemProgram: SystemProgram.programId,
                            })
                            .rpc();
                        await connection.confirmTransaction(txHash);
                        alert(`You has been selled your Sol from the vault successful`);
                        const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                        const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                        setBalance7(balance7);
                        setBalance8(balance8);
                        fetchBalance();
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                    alert(error.message);
                });
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }, [publicKey, endpoint, input2, fetchBalance]);
    /*const handleButtonSummonSol = useCallback(async () => {
        try {
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const connection = new Connection(endpoint, 'finalized');
            const [pda] = PublicKey.findProgramAddressSync(
                [Buffer.from("vault")],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let amount = Number(input2).valueOf();
            let realamount = amount * LAMPORTS_PER_SOL;
            const amountBN = new BN(realamount);
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then(async (IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        alert(`You summoning your Sol from the vault`);
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        let txHash = await programTarget.methods
                            .summonSol(amountBN)
                            .accounts({
                                vault: pda,
                                signer: thatPubkey,
                            })
                            .rpc();
                        await connection.confirmTransaction(txHash);
                        alert(`You has been summoned your Sol from the vault successful`);
                        const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                        const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                        setBalance7(balance7);
                        setBalance8(balance8);
                        fetchBalance();
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                    alert(error.message);
                });
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }, [publicKey, endpoint, input2, fetchBalance]);
    const handleButtonTributeStable = useCallback(async () => {
        try {
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
            const connection = new Connection(endpoint, 'finalized');
            const tokenFilt: TokenAccountsFilter = {
                mint: new PublicKey("4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ"),
                programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
            };
            const tokenAcc = await connection.getParsedTokenAccountsByOwner(thatPubkey, tokenFilt);
            const tokenAcc2 = await connection.getParsedTokenAccountsByOwner(vaultDataPda, tokenFilt);
            try {
                let amount = Number(input2).valueOf();
                let realamount = amount * LAMPORTS_PER_SOL;
                const amountBN = new BN(realamount);
                Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    .then(async (IDL) => {
                        if (IDL === null) {
                            console.error("Error: IDL not found");
                        } else {
                            alert(`You tributing your SFC - VND to the Vault`);
                            const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                            let txHash = await programTarget.methods
                                .tributeStable(amountBN)
                                .accounts({
                                    donator: tokenAcc.value[0].pubkey,
                                    vault: tokenAcc2.value[0].pubkey,
                                    signer: thatPubkey,
                                    token: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
                                })
                                .rpc();
                            await connection.confirmTransaction(txHash);
                            alert(`You has been tributed your SFC - VND to the Vault successful`);
                            const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                            const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                            setBalance7(balance7);
                            setBalance8(balance8);
                            fetchBalance();
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
    }, [publicKey, endpoint, input2, fetchBalance]);
    const handleButtonTributeSol = useCallback(async () => {
        try {
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const connection = new Connection(endpoint, 'finalized');
            const [pda] = PublicKey.findProgramAddressSync(
                [Buffer.from("vault")],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let amount = Number(input2).valueOf();
            let realamount = amount * LAMPORTS_PER_SOL;
            const amountBN = new BN(realamount);
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then(async (IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        alert(`You tributing your Sol to the vault`);
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        let txHash = await programTarget.methods
                            .tributeSol(amountBN)
                            .accounts({
                                vault: pda,
                                signer: thatPubkey,
                                systemProgram: SystemProgram.programId,
                            })
                            .rpc();
                        await connection.confirmTransaction(txHash);
                        alert(`You has been tributed your Sol to the vault successful`);
                        const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                        const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                        setBalance7(balance7);
                        setBalance8(balance8);
                        fetchBalance();
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                    alert(error.message);
                });
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }, [publicKey, endpoint, input2, fetchBalance]);
    const handleButtonSummonStable = useCallback(async () => {
        try {
            const [vaultDataPda, bump] = PublicKey.findProgramAddressSync(
                [Buffer.from("vault")],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            };
            const connection = new Connection(endpoint, 'finalized');
            const tokenFilt: TokenAccountsFilter = {
                mint: new PublicKey("4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ"),
                programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
            };
            const tokenAcc = await connection.getParsedTokenAccountsByOwner(thatPubkey, tokenFilt);
            const tokenAcc2 = await connection.getParsedTokenAccountsByOwner(vaultDataPda, tokenFilt);
            try {
                let amount: number = Number(input2).valueOf();
                let realamount = amount * LAMPORTS_PER_SOL;
                const amountBN = new BN(realamount);
                const bumpBN = new BN(bump);
                Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    .then(async (IDL) => {
                        if (IDL === null) {
                            console.error("Error: IDL not found");
                        } else {
                            alert(`You summoning your SFC - VND from the Vault`);
                            const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                            let txHash = await programTarget.methods
                                .summonStable(amountBN, bumpBN)
                                .accounts({
                                    donator: tokenAcc.value[0].pubkey,
                                    vault: tokenAcc2.value[0].pubkey,
                                    authority: vaultDataPda,
                                    signer: thatPubkey,
                                    token: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
                                })
                                .rpc();
                            await connection.confirmTransaction(txHash);
                            alert(`You has been summoned your SFC - VND from the Vault successful`);
                            const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                            const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                            setBalance7(balance7);
                            setBalance8(balance8);
                            fetchBalance();
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
    }, [publicKey, endpoint, input2, fetchBalance]);*/
    const handleButtonUserMessageTarget = useCallback(async () => {
        try {
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda3] = PublicKey.findProgramAddressSync(
                [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let accountTarget: any;
            let targetKey: any;
            function processAccountTarget() {
                if (accountTarget !== undefined) {
                    targetKey = accountTarget.assetTarget;
                    const [toDataPda] = PublicKey.findProgramAddressSync(
                        [Buffer.from("client", "utf8"), targetKey.toBuffer()],
                        new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    );
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
                        Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                            .then(async (IDL) => {
                                if (IDL === null) {
                                    console.error("Error: IDL not found");
                                } else {
                                    alert(`You sending message to this target`);
                                    const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                                    let txHash = await programTarget.methods
                                        .userMessageTarget(input)
                                        .accounts({
                                            target: targetDataPda,
                                            fromclient: fromDataPda,
                                            toclient: toDataPda,
                                            signer: thatPubkey,
                                        })
                                        .rpc();
                                    await connection.confirmTransaction(txHash);
                                    alert(`You has been sended message to this target successful`);
                                    const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                                    const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                                    setBalance7(balance7);
                                    setBalance8(balance8);
                                }
                            })
                            .catch((error) => {
                                console.error("Error fetching IDL: ", error);
                                alert(error.message);
                            });
                    } catch (e) {
                        console.log(`${e}`);
                    }
                }
            }
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then((IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        programTarget.account.userTarget.fetch(pda3)
                            .then(target => {
                                accountTarget = target;
                                processAccountTarget();
                            })
                            .catch(error => {
                                console.error('Error fetching account target:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                });
        } catch (error) {
            alert(error.message);
        }
    }, [publicKey, wallet, endpoint, input]);
    const handleButtonUserMessage = useCallback(async () => {
        try {
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
                        alert(`You sending message to everyone`);
                        let txHash = await programTarget.methods
                            .userMessage(input)
                            .accounts({
                                client: pda2,
                                signer: thatPubkey,
                                systemProgram: SystemProgram.programId,
                            })
                            .rpc()
                        await connection.confirmTransaction(txHash);
                        alert(`You has been sended message to everyone successful`);
                        const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                        const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                        setBalance7(balance7);
                        setBalance8(balance8);
                        fetchBalance();
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                    alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    }, [publicKey, wallet, endpoint, input, fetchBalance]);
    const handleButtonChangeNameTarget = useCallback(async () => {
        try {
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda3] = PublicKey.findProgramAddressSync(
                [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let accountTarget: any;
            let targetKey: any;
            function processAccountTarget() {
                if (accountTarget !== undefined) {
                    targetKey = accountTarget.assetTarget;
                    const [playerDataPda] = PublicKey.findProgramAddressSync(
                        [Buffer.from("client", "utf8"), targetKey.toBuffer()],
                        new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    );
                    const connection = new Connection(endpoint, 'finalized');
                    const [targetDataPda] = PublicKey.findProgramAddressSync(
                        [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                        new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    );
                    try {
                        Program.fetchIdl(new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"))
                            .then(async (IDL) => {
                                if (IDL === null) {
                                    console.error("Error: IDL not found");
                                } else {
                                    alert(`You changing the name of this target`);
                                    const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                                    let txHash = await programTarget.methods
                                        .changeNameTarget(input)
                                        .accounts({
                                            target: targetDataPda,
                                            client: playerDataPda,
                                            signer: thatPubkey,
                                        })
                                        .rpc();
                                    await connection.confirmTransaction(txHash);
                                    alert(`You has been changed the name of this target successful`);
                                    const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                                    const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                                    setBalance7(balance7);
                                    setBalance8(balance8);
                                    handleButtonClick();
                                }
                            })
                            .catch((error) => {
                                console.error("Error fetching deposit IDL: ", error);
                                alert(error.message);
                            });
                    } catch (e) {
                        console.log(`${e}`);
                    }
                }
            }
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then((IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        programTarget.account.userTarget.fetch(pda3)
                            .then(target => {
                                accountTarget = target;
                                processAccountTarget();
                            })
                            .catch(error => {
                                console.error('Error fetching account target:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                });

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }, [publicKey, endpoint, input, handleButtonClick]);
    const handleButtonChangeName = useCallback(async () => {
        try {
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
                        alert(`Your account name changing`);
                        let txHash = await programTarget.methods
                            .changeName(input)
                            .accounts({
                                client: pda2,
                                signer: thatPubkey,
                                systemProgram: SystemProgram.programId,
                            })
                            .rpc()
                        await connection.confirmTransaction(txHash);
                        alert(`Your account name changed successful`);
                        const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                        const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                        setBalance7(balance7);
                        setBalance8(balance8);
                        fetchBalance();
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                    alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    }, [publicKey, wallet, endpoint, input, fetchBalance]);
    const handleButtonOpenAssetAcc = useCallback(async () => {
        try {
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
                        alert(`Your asset account opening`);
                        let txHash = await programTarget.methods
                            .initUser()
                            .accounts({
                                client: pda2,
                                signer: thatPubkey,
                                systemProgram: SystemProgram.programId,
                            })
                            .rpc()
                        await connection.confirmTransaction(txHash);
                        alert(`Your asset account opened successful`);
                        const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                        const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                        setBalance7(balance7);
                        setBalance8(balance8);
                        fetchBalance();
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                    alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    }, [publicKey, wallet, endpoint, fetchBalance]);
    const handleButtonOpenTokenAcc = useCallback(async () => {
        try {
            let mintString = "4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ";
            let mint = new PublicKey(mintString);
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const connection = new Connection(endpoint, 'finalized');
            const tokenAccount = getAssociatedTokenAddressSync(
                mint,
                thatPubkey
            );
            const ataInfo = await connection.getAccountInfo(tokenAccount);
            if (ataInfo === null) {
                const ataInstruction = createAssociatedTokenAccountInstruction(
                    thatPubkey,
                    tokenAccount,
                    thatPubkey,
                    mint
                );
                const transaction = new Transaction().add(ataInstruction);
                alert(`Token account opening`);
                const txHash = await wallet.sendTransaction(transaction, connection);
                await connection.confirmTransaction(txHash);
                alert(`Token account opened successful`);
                const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                setBalance7(balance7);
                setBalance8(balance8);
                fetchBalance();
            } else {
                alert(`Token account already exists`);
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }, [publicKey, endpoint, wallet, fetchBalance]);
    const handleButtonOpenLPAcc = useCallback(async () => {
        try {
            let mintString = "8aHXuC6HjPNQYiBxNhqHD2CN5RxvcqRu5hvKhWHF6He";
            let mint = new PublicKey(mintString);
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const connection = new Connection(endpoint, 'finalized');
            const tokenAccount = getAssociatedTokenAddressSync(
                mint,
                thatPubkey
            );
            const ataInfo = await connection.getAccountInfo(tokenAccount);
            if (ataInfo === null) {
                const ataInstruction = createAssociatedTokenAccountInstruction(
                    thatPubkey,
                    tokenAccount,
                    thatPubkey,
                    mint
                );
                const transaction = new Transaction().add(ataInstruction);
                alert(`LP token account opening`);
                const txHash = await wallet.sendTransaction(transaction, connection);
                await connection.confirmTransaction(txHash);
                alert(`LP token account opened successful`);
                const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                setBalance7(balance7);
                setBalance8(balance8);
                fetchBalance();
            } else {
                alert(`LP token account already exists`);
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }, [publicKey, endpoint, wallet, fetchBalance]);
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
                        alert(`Your asset account closing`);
                        let txHash = await programTarget.methods
                            .clearUser()
                            .accounts({
                                client: pda,
                                signer: thatPubkey,
                            })
                            .rpc();
                        await connection.confirmTransaction(txHash);
                        alert(`Your asset account closed successful`);
                        const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                        const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                        setBalance7(balance7);
                        setBalance8(balance8);
                        fetchBalance();
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                    alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    }, [publicKey, wallet, endpoint, fetchBalance]);
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
                        alert(`You locking to this target`);
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
                        alert(`You has been lock to this target successful`);
                        const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                        const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                        setBalance7(balance7);
                        setBalance8(balance8);
                        fetchBalance();
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                    alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    }, [input, publicKey, wallet, endpoint, fetchBalance]);
    const handleButtonTransferSFC = useCallback(async () => {
        try {
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda3] = PublicKey.findProgramAddressSync(
                [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let accountTarget: any;
            let targetKey: any;
            async function processAccountTarget() {
                if (accountTarget !== undefined) {
                    targetKey = accountTarget.assetTarget;
                    let thatWallet: any;
                    if (wallet && wallet.wallet) {
                        thatWallet = wallet
                    } else {
                        console.error('You not yet choose wallet');
                    }
                    const connection = new Connection(endpoint, 'finalized');
                    const tokenFiltSFC: TokenAccountsFilter = {
                        mint: new PublicKey("4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ"),
                        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
                    };
                    const fromTokenAcc = await connection.getParsedTokenAccountsByOwner(thatPubkey, tokenFiltSFC);
                    const toTokenAcc = await connection.getParsedTokenAccountsByOwner(targetKey, tokenFiltSFC);
                    setProvider(new AnchorProvider(connection, thatWallet, {
                        preflightCommitment: 'recent',
                    }));
                    try {
                        let amount = Number(input2).valueOf();
                        let realamount = amount * LAMPORTS_PER_SOL;
                        const amountBN = new BN(realamount);
                        Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                            .then(async (IDL) => {
                                if (IDL === null) {
                                    console.error("Error: IDL not found");
                                } else {
                                    alert(`You transfering to this target`);
                                    const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                                    let txHash = await programTarget.methods
                                        .tranferToken(amountBN, true)
                                        .accounts({
                                            token: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
                                            fromtoken: fromTokenAcc.value[0].pubkey,
                                            totoken: toTokenAcc.value[0].pubkey,
                                            signer: thatPubkey,
                                        })
                                        .rpc();
                                    await connection.confirmTransaction(txHash);
                                    alert(`You has been transfered to this target successful`);
                                    const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                                    const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                                    setBalance7(balance7);
                                    setBalance8(balance8);
                                    handleButtonClick();
                                }
                            })
                            .catch((error) => {
                                console.error("Error fetching IDL: ", error);
                                alert(error.message);
                            });
                    } catch (e) {
                        console.log(`${e}`);
                    }
                }
            }
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then((IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        programTarget.account.userTarget.fetch(pda3)
                            .then(target => {
                                accountTarget = target;
                                processAccountTarget();
                            })
                            .catch(error => {
                                console.error('Error fetching account target:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                });

        } catch (error) {
            alert(error.message);
        }
    }, [publicKey, wallet, endpoint, input2, handleButtonClick]);
    const handleButtonTransferLP = useCallback(async () => {
        try {
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda3] = PublicKey.findProgramAddressSync(
                [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let accountTarget: any;
            let targetKey: any;
            async function processAccountTarget() {
                if (accountTarget !== undefined) {
                    targetKey = accountTarget.assetTarget;
                    let thatWallet: any;
                    if (wallet && wallet.wallet) {
                        thatWallet = wallet
                    } else {
                        console.error('You not yet choose wallet');
                    }
                    const connection = new Connection(endpoint, 'finalized');
                    const tokenFiltSFC: TokenAccountsFilter = {
                        mint: new PublicKey("8aHXuC6HjPNQYiBxNhqHD2CN5RxvcqRu5hvKhWHF6He"),
                        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
                    };
                    const fromTokenAcc = await connection.getParsedTokenAccountsByOwner(thatPubkey, tokenFiltSFC);
                    const toTokenAcc = await connection.getParsedTokenAccountsByOwner(targetKey, tokenFiltSFC);
                    setProvider(new AnchorProvider(connection, thatWallet, {
                        preflightCommitment: 'recent',
                    }));
                    try {
                        let amount = Number(input2).valueOf();
                        let realamount = amount * LAMPORTS_PER_SOL;
                        const amountBN = new BN(realamount);
                        Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                            .then(async (IDL) => {
                                if (IDL === null) {
                                    console.error("Error: IDL not found");
                                } else {
                                    alert(`You transfering to this target`);
                                    const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                                    let txHash = await programTarget.methods
                                        .tranferToken(amountBN, false)
                                        .accounts({
                                            token: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
                                            fromtoken: fromTokenAcc.value[0].pubkey,
                                            totoken: toTokenAcc.value[0].pubkey,
                                            signer: thatPubkey,
                                        })
                                        .rpc();
                                    await connection.confirmTransaction(txHash);
                                    alert(`You has been transfered to this target successful`);
                                    const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                                    const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                                    setBalance7(balance7);
                                    setBalance8(balance8);
                                    handleButtonClick();
                                }
                            })
                            .catch((error) => {
                                console.error("Error fetching IDL: ", error);
                                alert(error.message);
                            });
                    } catch (e) {
                        console.log(`${e}`);
                    }
                }
            }
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then((IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        programTarget.account.userTarget.fetch(pda3)
                            .then(target => {
                                accountTarget = target;
                                processAccountTarget();
                            })
                            .catch(error => {
                                console.error('Error fetching account target:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                });

        } catch (error) {
            alert(error.message);
        }
    }, [publicKey, wallet, endpoint, input2, handleButtonClick]);
    const handleButtonTransferAsset = useCallback(async () => {
        try {
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda3] = PublicKey.findProgramAddressSync(
                [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let accountTarget: any;
            let targetKey: any;
            function processAccountTarget() {
                if (accountTarget !== undefined) {
                    targetKey = accountTarget.assetTarget;
                    const [toDataPda] = PublicKey.findProgramAddressSync(
                        [Buffer.from("client", "utf8"), targetKey.toBuffer()],
                        new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    );
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
                                    alert(`You transfering to this target`);
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
                                    alert(`You has been transfered to this target successful`);
                                    const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                                    const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                                    setBalance7(balance7);
                                    setBalance8(balance8);
                                    handleButtonClick();
                                }
                            })
                            .catch((error) => {
                                console.error("Error fetching IDL: ", error);
                                alert(error.message);
                            });
                    } catch (e) {
                        console.log(`${e}`);
                    }
                }
            }
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then((IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        programTarget.account.userTarget.fetch(pda3)
                            .then(target => {
                                accountTarget = target;
                                processAccountTarget();
                            })
                            .catch(error => {
                                console.error('Error fetching account target:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                });

        } catch (error) {
            alert(error.message);
        }
    }, [publicKey, wallet, endpoint, input2, handleButtonClick]);
    const handleButtonDepositAsset = useCallback(async () => {
        try {
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda3] = PublicKey.findProgramAddressSync(
                [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let accountTarget: any;
            let targetKey: any;
            function processAccountTarget() {
                if (accountTarget !== undefined) {
                    targetKey = accountTarget.assetTarget;
                    const [playerDataPda] = PublicKey.findProgramAddressSync(
                        [Buffer.from("client", "utf8"), targetKey.toBuffer()],
                        new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    );
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
                                    alert(`You depositing to this target`);
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
                                    alert(`You has been deposited to this target successful`);
                                    const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                                    const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                                    setBalance7(balance7);
                                    setBalance8(balance8);
                                    handleButtonClick();
                                }
                            })
                            .catch((error) => {
                                console.error("Error fetching deposit IDL: ", error);
                                alert(error.message);
                            });
                    } catch (e) {
                        console.log(`${e}`);
                    }
                }
            }
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then((IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        programTarget.account.userTarget.fetch(pda3)
                            .then(target => {
                                accountTarget = target;
                                processAccountTarget();
                            })
                            .catch(error => {
                                console.error('Error fetching account target:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                });

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }, [publicKey, endpoint, input2, handleButtonClick]);
    const handleButtonWithdrawAsset = useCallback(async () => {
        try {
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda3] = PublicKey.findProgramAddressSync(
                [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let accountTarget: any;
            let targetKey: any;
            function processAccountTarget() {
                if (accountTarget !== undefined) {
                    targetKey = accountTarget.assetTarget;
                    const [playerDataPda] = PublicKey.findProgramAddressSync(
                        [Buffer.from("client", "utf8"), targetKey.toBuffer()],
                        new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    );
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
                                    alert(`You withdrawing from this target`);
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
                                    alert(`You has been withdrawed from this target`);
                                    const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                                    const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                                    setBalance7(balance7);
                                    setBalance8(balance8);
                                    handleButtonClick();
                                }
                            })
                            .catch((error) => {
                                console.error("Error fetching IDL: ", error);
                                alert(error.message);
                            });
                    } catch (e) {
                        console.log(`${e}`);
                    }
                }
            }
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then((IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        programTarget.account.userTarget.fetch(pda3)
                            .then(target => {
                                accountTarget = target;
                                processAccountTarget();
                            })
                            .catch(error => {
                                console.error('Error fetching account target:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                });

        } catch (error) {
            alert(error.message);
        }
    }, [publicKey, endpoint, input2, handleButtonClick]);
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
                let realamount = amount * LAMPORTS_PER_SOL;
                const amountBN = new BN(realamount);
                const bumpBN = new BN(bump1);
                Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    .then(async (IDL) => {
                        if (IDL === null) {
                            console.error("Error: IDL not found");
                        } else {
                            alert(`You tributing your asset to the Vault`);
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
                            alert(`You has been tributed your asset successful`);
                            const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                            const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                            setBalance7(balance7);
                            setBalance8(balance8);
                            fetchBalance();
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
    }, [publicKey, endpoint, wallet, input2, fetchBalance]);
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
                let realamount = amount * LAMPORTS_PER_SOL;
                const amountBN = new BN(realamount);
                Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    .then(async (IDL) => {
                        if (IDL === null) {
                            console.error("Error: IDL not found");
                        } else {
                            alert(`You summoning your asset from the Vault`);
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
                            alert(`You summoned your asset from the Vault successful`);
                            const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                            const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                            setBalance7(balance7);
                            setBalance8(balance8);
                            fetchBalance();
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
    }, [publicKey, endpoint, wallet, input2, fetchBalance]);
    const handleButtonTributeTarget = useCallback(async () => {
        try {
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda3] = PublicKey.findProgramAddressSync(
                [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let accountTarget: any;
            let targetKey: any;
            async function processAccountTarget() {
                if (accountTarget !== undefined) {
                    targetKey = accountTarget.assetTarget;
                    let mintString = "4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ";
                    let mint = new PublicKey(mintString);
                    const [vaultDataPda, bump1] = PublicKey.findProgramAddressSync(
                        [Buffer.from("vault")],
                        new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    );
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
                        let realamount = amount * LAMPORTS_PER_SOL;
                        const amountBN = new BN(realamount);
                        const bumpBN = new BN(bump1);
                        Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                            .then(async (IDL) => {
                                if (IDL === null) {
                                    console.error("Error: IDL not found");
                                } else {
                                    alert(`You tributing your asset for this target`);
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
                                    alert(`You has been tributed your asset for this target successful`);
                                    const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                                    const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                                    setBalance7(balance7);
                                    setBalance8(balance8);
                                    handleButtonClick();
                                }
                            })
                            .catch((error) => {
                                console.error("Error fetching inner IDL: ", error);
                                alert(error.message);
                            });

                    } catch (e) {
                        console.log(`${e}`);
                    }
                }
            }
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then((IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        programTarget.account.userTarget.fetch(pda3)
                            .then(target => {
                                accountTarget = target;
                                processAccountTarget();
                            })
                            .catch(error => {
                                console.error('Error fetching account target:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                });

        } catch (error) {
            console.error("Error fetching outer IDL: ", error);
            alert(error.message);
        }
    }, [publicKey, endpoint, wallet, input2, handleButtonClick]);
    const handleButtonSummonTarget = useCallback(async () => {
        try {
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda3] = PublicKey.findProgramAddressSync(
                [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let accountTarget: any;
            let targetKey: any;
            async function processAccountTarget() {
                if (accountTarget !== undefined) {
                    targetKey = accountTarget.assetTarget;
                    let mintString = "4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ";
                    let mint = new PublicKey(mintString);
                    const [vaultDataPda] = PublicKey.findProgramAddressSync(
                        [Buffer.from("vault")],
                        new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                    );
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
                        let realamount = amount * LAMPORTS_PER_SOL;
                        const amountBN = new BN(realamount);
                        Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                            .then(async (IDL) => {
                                if (IDL === null) {
                                    console.error("Error: IDL not found");
                                } else {
                                    alert(`You summoning your asset for this target`)
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
                                    alert(`You has been summoned your asset for this target successful`);
                                    const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                                    const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                                    setBalance7(balance7);
                                    setBalance8(balance8);
                                    handleButtonClick();
                                }
                            })
                            .catch((error) => {
                                console.error("Error fetching inner IDL: ", error);
                                alert(error.message);
                            });
                    } catch (e) {
                        console.log(`${e}`);
                    };
                }
            }
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then((IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        programTarget.account.userTarget.fetch(pda3)
                            .then(target => {
                                accountTarget = target;
                                processAccountTarget();
                            })
                            .catch(error => {
                                console.error('Error fetching account target:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                });

        } catch (error) {
            console.error("Error fetching outer IDL: ", error);
            alert(error.message);
        }
    }, [publicKey, endpoint, wallet, input2, handleButtonClick]);
    const handleButtonOpenTokenTarget = useCallback(async () => {
        try {
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda3] = PublicKey.findProgramAddressSync(
                [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let accountTarget: any;
            let targetKey: any;
            async function processAccountTarget() {
                if (accountTarget !== undefined) {
                    targetKey = accountTarget.assetTarget;
                    let mintString = "4TndGJA5DeL6xZgdPLK3VETy6MVVuZgUWEdPk4KUMNCQ";
                    let mint = new PublicKey(mintString);
                    const connection = new Connection(endpoint, 'finalized');
                    const tokenAccount = getAssociatedTokenAddressSync(
                        mint,
                        targetKey
                    );
                    const ataInfo = await connection.getAccountInfo(tokenAccount);
                    if (ataInfo === null) {
                        const ataInstruction = createAssociatedTokenAccountInstruction(
                            thatPubkey,
                            tokenAccount,
                            targetKey,
                            mint
                        );
                        const transaction = new Transaction().add(ataInstruction);
                        alert(`Token account opening`);
                        const txHash = await wallet.sendTransaction(transaction, connection);
                        await connection.confirmTransaction(txHash);
                        alert(`Token account opened successful`);
                        const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                        const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                        setBalance7(balance7);
                        setBalance8(balance8);
                        handleButtonClick();
                    } else {
                        alert(`Token account already exists`);
                    }
                }
            }
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then((IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        programTarget.account.userTarget.fetch(pda3)
                            .then(target => {
                                accountTarget = target;
                                processAccountTarget();
                            })
                            .catch(error => {
                                console.error('Error fetching account target:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                });

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }, [publicKey, endpoint, wallet, handleButtonClick]);
    const handleButtonOpenLPTarget = useCallback(async () => {
        try {
            let thatPubkey: any;
            if (publicKey) {
                thatPubkey = publicKey;
            } else {
                console.error('You not yet choose wallet');
            }
            const [pda3] = PublicKey.findProgramAddressSync(
                [Buffer.from("target", "utf8"), thatPubkey.toBuffer()],
                new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
            );
            let accountTarget: any;
            let targetKey: any;
            async function processAccountTarget() {
                if (accountTarget !== undefined) {
                    targetKey = accountTarget.assetTarget;
                    let mintString = "8aHXuC6HjPNQYiBxNhqHD2CN5RxvcqRu5hvKhWHF6He";
                    let mint = new PublicKey(mintString);
                    const connection = new Connection(endpoint, 'finalized');
                    const tokenAccount = getAssociatedTokenAddressSync(
                        mint,
                        targetKey
                    );
                    const ataInfo = await connection.getAccountInfo(tokenAccount);
                    if (ataInfo === null) {
                        const ataInstruction = createAssociatedTokenAccountInstruction(
                            thatPubkey,
                            tokenAccount,
                            targetKey,
                            mint
                        );
                        const transaction = new Transaction().add(ataInstruction);
                        alert(`LP token account opening`);
                        const txHash = await wallet.sendTransaction(transaction, connection);
                        await connection.confirmTransaction(txHash);
                        alert(`LP token account opened successful`);
                        const balance7 = `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
                        const balance8 = `https://solscan.io/tx/${txHash}?cluster=devnet`;
                        setBalance7(balance7);
                        setBalance8(balance8);
                        handleButtonClick();
                    } else {
                        alert(`LP token account already exists`);
                    }
                }
            }
            Program.fetchIdl("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX")
                .then((IDL) => {
                    if (IDL === null) {
                        console.error("Error: IDL not found");
                    } else {
                        const programTarget = new Program(IDL, new PublicKey("F7TehQFrx3XkuMsLPcmKLz44UxTWWfyodNLSungdqoRX"), getProvider());
                        programTarget.account.userTarget.fetch(pda3)
                            .then(target => {
                                accountTarget = target;
                                processAccountTarget();
                            })
                            .catch(error => {
                                console.error('Error fetching account target:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching IDL: ", error);
                });

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }, [publicKey, endpoint, wallet, handleButtonClick]);
    return (
        <>
            {<WalletMultiButton />}
            <div>
                <button onClick={handleButtonClick}>Watch Target</button>
                <button onClick={handleButtonLockTarget}>Lock Target</button>
                <input type="text" value={input} onChange={handleInputChange} size={50} />
                <button onClick={fetchBalance}>Watch Asset</button>
                <button onClick={handleButtonTransferAsset}>Transfer Target</button>
                <button onClick={handleButtonOpenAssetAcc}>Open Asset Acc</button>
                <button onClick={handleButtonCloseAssetAcc}>Close Asset Acc</button>
                <button onClick={handleButtonOpenTokenAcc}>Open SFC Acc</button>
                <a href={balance7?.toString()} target="_blank" rel="noopener noreferrer">
                    <button>
                        Solana Explorer
                    </button>
                </a>
                <button onClick={handleButtonChangeName}>Change Name</button>
                <button onClick={handleButtonUserMessage}>User Message</button>
                {/*<button onClick={handleButtonTributeSol}>Tribute Dev Sol</button>
                <button onClick={handleButtonSummonSol}>Summon Dev Sol</button>*/}
                <button onClick={handleButtonBuySol}>Buy Dev Sol</button>
                <button onClick={handleButtonSellSol}>Sell Dev Sol</button>
                <button onClick={handleButtonSummonLP}>Mint LP Token</button>
                <button onClick={handleButtonTributeLP}>Burn LP Token</button>
                <button onClick={handleButtonOpenLPAcc}>Open LP Acc</button>
                <button onClick={handleButtonOpenLPTarget}>Open LP Target</button>
            </div>
            <div>
                <button onClick={handleButtonDepositAsset}>Deposit Target</button>
                <button onClick={handleButtonWithdrawAsset}>Withdraw Target</button>
                <input type="text" value={input2} onChange={handleInputChange2} size={50} />
                <button onClick={handleButtonTributeAsset}>Mint SFC - VND</button>
                <button onClick={handleButtonSummonAsset}>Burn SFC - VND</button>
                <button onClick={handleButtonTributeTarget}>Mint SFC Target</button>
                <button onClick={handleButtonSummonTarget}>Burn SFC Target</button>
                <button onClick={handleButtonOpenTokenTarget}>Open SFC Target</button>
                <a href={balance8?.toString()} target="_blank" rel="noopener noreferrer">
                    <button>
                        Solscan
                    </button>
                </a>
                <button onClick={handleButtonChangeNameTarget}>Name Target</button>
                <button onClick={handleButtonUserMessageTarget}>Message Target</button>
                {/*<button onClick={handleButtonTributeStable}>Tribute Stable</button>
                <button onClick={handleButtonSummonStable}>Summon Stable</button>*/}
                <button onClick={handleButtonSimulateBuy}>Simulate Buy Sol</button>
                <button onClick={handleButtonSimulateSell}>Simulate Sell Sol</button>
                <button onClick={handleButtonSimulateMintLP}>Simulate Mint LP</button>
                <button onClick={handleButtonSimulateBurnLP}>Simulate Burn LP</button>
                <button onClick={handleButtonTransferSFC}>Transfer SFC - VND</button>
                <button onClick={handleButtonTransferLP}>Transfer LPSFC</button>
            </div>
            {wallet.connected && (
                <div className="wallet-info">
                    <div>Wallet Address: {balance0}</div>
                    <div>Account Name: {balance9}</div>
                    <div>Target Address: {balance6}</div>
                    <div>Wallet Balance: {balance1} Dev SOL</div>
                    <div>Wallet LP Token: {balance14} LPSFC</div>
                    <div>Wallet Stable Coin: {balance3} SFC - VND</div>
                    <div>Wallet Asset: {balance5} VND</div>
                    <div>Stable Coin Supply: {balance2} SFC - VND</div>
                    <div>Total Asset Base: {balance4} VND</div>
                    <div>LP Token Supply: {balance15} LPSFC</div>
                    <div>Pool Gas Token: {balance10} Dev SOL</div>
                    <div>Pool Stable Coin: {balance11} SFC - VND</div>
                    <div>Pool Ratio Dev Sol 1 : {balance12} SFC - VND</div>
                    <div>Pool K value: {balance13}</div>
                    <div>
                        <img src="https://i.ibb.co/vxRnDKx/SFC-VND.jpg" alt="SFC - VND Logo" title='SFC - VND Logo' width="100" height="100" />
                        <img src="https://i.ibb.co/wMRXC4M/LP-Token-Logo.webp" alt="LPSFC Logo" title='LPSFC Logo' width="100" height="100" />
                    </div>
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
