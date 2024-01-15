import React, { useState, useEffect, ChangeEvent } from "react";
import { Input, Popover, Radio, Modal, message, RadioChangeEvent } from "antd";
import {
    ArrowDownOutlined,
    DownOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useSendTransaction, useWaitForTransaction } from "wagmi";
import tokenList from "../tokenList.json";
import "./SwapComponent.css";
import "../App.css";

interface SwapProps {
    address: string;
    isConnected: boolean;
}

interface Token {
    address: string;
    img: string;
    name: string;
    ticker: string;
    decimals: number;
}

interface Prices {
    ratio: number;
}

interface TransactionDetails {
    to: string | null;
    data: string | null;
    value: string | null;
}

const Swap: React.FC<SwapProps> = ({ address, isConnected }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [slippage, setSlippage] = useState<number>(2.5);
    const [tokenOneAmount, setTokenOneAmount] = useState<string | null>(null);
    const [tokenTwoAmount, setTokenTwoAmount] = useState<string | null>(null);
    const [tokenOne, setTokenOne] = useState<Token>(tokenList[0]);
    const [tokenTwo, setTokenTwo] = useState<Token>(tokenList[1]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [changeToken, setChangeToken] = useState<number>(1);
    const [prices, setPrices] = useState<Prices | null>(null);
    const [txDetails, setTxDetails] = useState<TransactionDetails>({
        to: null,
        data: null,
        value: null,
    });

    const { data, sendTransaction } = useSendTransaction({
        mode: "recklesslyUnprepared", // Asegúrate de usar el valor correcto para 'mode'
        request: {
            from: address,
            to: String(txDetails.to),
            data: String(txDetails.data),
            value: String(txDetails.value),
        },
    });


    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });


    function handleSlippageChange(e: RadioChangeEvent) {
        setSlippage(Number(e.target.value));
    }

    function changeAmount(e: React.ChangeEvent<HTMLInputElement>) {
        // Convierte el valor del input a un número
        const newTokenOneAmount = parseFloat(e.target.value);

        // Si el nuevo valor del input es un número válido y si los precios están disponibles
        if (!isNaN(newTokenOneAmount) && prices) {
            // Calcula el monto para tokenTwo basado en el ratio de precios
            const newTokenTwoAmount = (newTokenOneAmount * prices.ratio).toFixed(2);
            // Actualiza el estado con valores convertidos a string
            setTokenOneAmount(newTokenOneAmount.toString());
            setTokenTwoAmount(newTokenTwoAmount);
        } else {
            // Si el input no es un número válido o si no hay precios disponibles, establece ambos estados a null
            setTokenOneAmount(null);
            setTokenTwoAmount(null);
        }
    }

    function switchTokens() {
        setPrices(null);
        setTokenOneAmount(null);
        setTokenTwoAmount(null);
        const one = tokenOne;
        const two = tokenTwo;
        setTokenOne(two);
        setTokenTwo(one);
        fetchPrices(two.address, one.address);
    }

    function openModal(asset: number) {
        setChangeToken(asset);
        setIsOpen(true);
    }

    function modifyToken(i: number){
        setPrices(null);
        setTokenOneAmount(null);
        setTokenTwoAmount(null);
        if (changeToken === 1) {
            setTokenOne(tokenList[i]);
            fetchPrices(tokenList[i].address, tokenTwo.address);
        } else {
            setTokenTwo(tokenList[i]);
            fetchPrices(tokenOne.address, tokenList[i].address);
        }
        setIsOpen(false);
    }

    async function fetchPrices(one: string, two: string) {
        const res = await axios.get(`http://localhost:3001/tokenPrice`, {
            params: { addressOne: one, addressTwo: two }
        });

        setPrices(res.data);
    }


    async function fetchDexSwap(){
        if (tokenOneAmount === null) {
            console.error("tokenOneAmount is null");
            return;
        }
        const allowance = await axios.get(`https://api.1inch.io/v5.0/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`)

        if(allowance.data.allowance === "0"){

            const approve = await axios.get(`https://api.1inch.io/v5.0/1/approve/transaction?tokenAddress=${tokenOne.address}`)

            setTxDetails(approve.data);
            console.log("not approved")
            return

        }

        const tx = await axios.get(
            `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${tokenOne.address}&toTokenAddress=${tokenTwo.address}&amount=${tokenOneAmount.padEnd(tokenOne.decimals + tokenOneAmount.length, '0')}&fromAddress=${address}&slippage=${slippage}`
        );

        let decimals = Number(`1E${tokenTwo.decimals}`)
        setTokenTwoAmount((Number(tx.data.toTokenAmount)/decimals).toFixed(2));

        setTxDetails(tx.data.tx);

    }


    useEffect(()=>{

        fetchPrices(tokenList[0].address, tokenList[1].address)

    }, [])

    useEffect(()=>{

        if(txDetails.to && isConnected){
            sendTransaction();
        }
    }, [txDetails])

    useEffect(()=>{

        messageApi.destroy();

        if(isLoading){
            messageApi.open({
                type: 'loading',
                content: 'Transaction is Pending...',
                duration: 0,
            })
        }

    },[isLoading])

    useEffect(()=>{
        messageApi.destroy();
        if(isSuccess){
            messageApi.open({
                type: 'success',
                content: 'Transaction Successful',
                duration: 1.5,
            })
        }else if(txDetails.to){
            messageApi.open({
                type: 'error',
                content: 'Transaction Failed',
                duration: 1.50,
            })
        }


    },[isSuccess])


    const settings = (
        <>
            <div>Slippage Tolerance</div>
            <div>
                <Radio.Group value={slippage} onChange={handleSlippageChange}>
                    <Radio.Button value={0.5}>0.5%</Radio.Button>
                    <Radio.Button value={2.5}>2.5%</Radio.Button>
                    <Radio.Button value={5}>5.0%</Radio.Button>
                </Radio.Group>
            </div>
        </>
    );

    return (
        <>
            {contextHolder}
            <Modal
                open={isOpen}
                footer={null}
                onCancel={() => setIsOpen(false)}
                title="Select a token"
            >
                <div className="modalContent">
                    {tokenList?.map((e, i) => {
                        return (
                            <div
                                className="tokenChoice"
                                key={i}
                                onClick={() => modifyToken(i)}
                            >
                                <img src={e.img} alt={e.ticker} className="tokenLogo" />
                                <div className="tokenChoiceNames">
                                    <div className="tokenName">{e.name}</div>
                                    <div className="tokenTicker">{e.ticker}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Modal>
            <div className="tradeBox">
                <div className="tradeBoxHeader">
                    <h4>Swap</h4>
                    <Popover
                        content={settings}
                        title="Settings"
                        trigger="click"
                        placement="bottomRight"
                    >
                        <SettingOutlined className="cog" />
                    </Popover>
                </div>
                <div className="inputs">
                    <Input
                        placeholder="0"
                        value={tokenOneAmount ?? ""}  // Asigna un string vacío si tokenOneAmount es null
                        onChange={changeAmount}
                        disabled={!prices}
                    />
                    <Input
                        placeholder="0"
                        value={tokenTwoAmount ?? ""}  // Asigna un string vacío si tokenTwoAmount es null
                        disabled={true}
                    />
                    <div className="switchButton" onClick={switchTokens}>
                        <ArrowDownOutlined className="switchArrow" />
                    </div>
                    <div className="assetOne" onClick={() => openModal(1)}>
                        <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
                        {tokenOne.ticker}
                        <DownOutlined />
                    </div>
                    <div className="assetTwo" onClick={() => openModal(2)}>
                        <img src={tokenTwo.img} alt="assetOneLogo" className="assetLogo" />
                        {tokenTwo.ticker}
                        <DownOutlined />
                    </div>
                </div>
                <div
                    className={`swapButton ${!tokenOneAmount || !isConnected ? "disabled" : ""}`}
                    onClick={() => {
                        if (tokenOneAmount && isConnected) {
                            fetchDexSwap();
                        }
                    }}
                >
                    Swap
                </div>
            </div>
        </>
    );
}

export default Swap;
